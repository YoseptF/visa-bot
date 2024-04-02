import { CeacStep } from './utils';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import addressPhone from './addressPhone';
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

puppeteer.use(StealthPlugin())

const TIMEOUT = 5000

// open new browser
const browser = await puppeteer.launch({
  headless: false,
  // slowMo: 50,
  // window size
  defaultViewport: {
    width: 700,
    height: 400,
  },
});

// open new page
const page = await browser.newPage();
// go to visa site
await page.goto("https://ceac.state.gov/genniv/");

page.on('dialog', async dialog => {
  console.debug(dialog.message());

  await dialog.accept();
});

const { data } = await supabase.from('ServerSettings').select('ceacAppId').eq('id', '1').single()

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
  await step(page)
}

await supabase.from('ServerSettings').update({ confirmed: true }).eq('id', '1')

await new Promise((resolve) => setTimeout(resolve, TIMEOUT));