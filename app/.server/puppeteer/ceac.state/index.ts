import { CeacStep } from './utils';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import addressPhone from './addressPhone';
import chalk from 'chalk';
import personalInfo from './personalInfo';
import personalInfo2 from './personalInfo2';
import pptVisa from './pptVisa';
import previousUSTravel from './previousUSTravel';
import puppeteer from "puppeteer-extra";
import relatives from './relatives';
import retrieveApplication from './retrieveApplication';
import securityQuestion from './securityQuestion';
import securityandBackground1 from './securityandBackground1';
import securityandBackground2 from './securityandBackground2';
import securityandBackground3 from './securityandBackground3';
import securityandBackground4 from './securityandBackground4';
import securityandBackground5 from './securityandBackground5';
import signAndAccept from './signAndAccept';
import startApplication from './startApplication';
import supabase from '../../db'
import travel from './travel';
import travelCompanions from './travelCompanions';
import uSContact from './uSContact';
import workEducation1 from './workEducation1';
import workEducation2 from './workEducation2';
import workEducation3 from './workEducation3';

// get args from shell
const [, , accountUuid] = process.argv

// check for flag --debug
const debug = process.argv.includes('--debug')

if (debug) {
  const { data: debugEntry } = await supabase.from('ServerSettings').select().eq('id', 'test').single()

  if (debugEntry) await supabase.from('ServerSettings').delete().eq('id', 'test')
}

console.debug(chalk.green('Creating account:', accountUuid))

if (!accountUuid) throw new Error('Account uuid not found')

puppeteer.use(StealthPlugin())

// open new browser
const browser = await puppeteer.launch({
  headless: debug ? false : true,
  slowMo: debug ? 10 : 0,
  // window size
  defaultViewport: {
    width: 800,
    height: 800,
  },
  // args: [
  //   '--no-sandbox',
  //   '--disable-setuid-sandbox',
  //   '--proxy-server=51.145.176.250:8080',
  // ],
});

// open new page
const page = await browser.newPage();
// go to visa site
await page.goto("https://ceac.state.gov/genniv/");

page.on('dialog', async dialog => {
  console.debug(dialog.message());

  await dialog.accept();
});

const { data } = await supabase.from('ServerSettings').select('ceacAppId').eq('id', accountUuid).single()

await startApplication(page, data?.ceacAppId);

if (data?.ceacAppId) await retrieveApplication(data.ceacAppId, page);

await page.waitForNetworkIdle({ idleTime: 300 });

// get node query parameter
const url = new URL(page.url())
const node = url.searchParams.get('node') as keyof typeof CeacStep | null

if (!node) throw new Error('Node not found')

const steps = [
  securityQuestion,
  personalInfo,
  personalInfo2,
  travel,
  travelCompanions,
  previousUSTravel,
  addressPhone,
  pptVisa,
  uSContact,
  relatives,
  workEducation1,
  workEducation2,
  workEducation3,
  securityandBackground1,
  securityandBackground2,
  securityandBackground3,
  securityandBackground4,
  securityandBackground5,
  signAndAccept,
].slice(CeacStep[node])

for (const step of steps) {
  console.debug(chalk.green(`Starting step ${step.name}`))
  await step(page)
  console.debug(chalk.green.bold(`Finished step ${step.name}`))
}

const [, , id] = process.argv

const { data: newEntry } = await supabase.from('ServerSettings').update({ confirmed: true }).eq('id', id).select().single()

console.debug(chalk.green('Finished application:'))
console.debug(chalk.bold(newEntry?.ceacAppId))


await browser.close();

// return newEntry?.ceacAppId

