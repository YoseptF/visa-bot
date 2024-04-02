import { checkIfUnchecked, typeIfEmpty, waitForSelector } from '../utils';

import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import puppeteer from "puppeteer-extra";

puppeteer.use(StealthPlugin())

// get first argument
const [, , times] = process.argv;

if (!times) throw new Error('times is required')

// check for flag --debug
const debug = process.argv.includes('--debug')

// open new browser
const browser = await puppeteer.launch({
  headless: debug ? false : true,
  slowMo: debug ? 10 : 0,
  // window size
  defaultViewport: {
    width: 700,
    height: 400,
  },
});

// open new page
const page = await browser.newPage();
// go to visa site
await page.goto("https://ais.usvisa-info.com/en-mx/niv/schedule/56737921/courier");

await page.waitForNetworkIdle({ idleTime: 300 });

// get button with text ok
const okButton = await waitForSelector('xpath/.//button[text()="OK"]', page);

okButton.click();

const emailInput = await waitForSelector('input#user_email', page);
const passwordInput = await waitForSelector('input#user_password', page);
const signInButton = await waitForSelector('input[value="Sign In"]', page);
const policyCheckBox = await waitForSelector('input#policy_confirmed', page);


console.info('getting token...')
await typeIfEmpty(emailInput, "testo@yosept.me");
await typeIfEmpty(passwordInput, "1_Password");
await checkIfUnchecked(policyCheckBox);
await signInButton.click();

await page.waitForNavigation();
// get token from cookie
const token = await page.cookies().then(cookies => cookies.find(cookie => cookie.name === '_yatri_session')?.value);
console.debug('token:', token);

console.debug('going to schedule page...');
const stateSelect = await waitForSelector('select#tiered_form_state', page);
await stateSelect.select('CDMX - Mexico City');

await waitForSelector('option[value="MEXICO CITY"]', page);
const citySelect = await waitForSelector('select#tiered_form_city', page);
await citySelect.select('MEXICO CITY');

await waitForSelector('option[value="3065683"]', page);
const branchSelect = await waitForSelector('select#tiered_form_id', page);
await branchSelect.select('3065683');

const submitButton = await waitForSelector('input[type="submit"]', page);
submitButton.click();

await page.waitForNavigation();

console.debug('getting dates table...');

for await (const _ of Array(Number(times)).keys()) {
  const datesTable = await waitForSelector('table.for-layout', page);

  // get all trs
  const trs = await datesTable.$$('tr');

  const allDates: string[] = []

  for await (const tr of trs) {
    const tds = await tr.$$('td');
    const texts = await Promise.all(tds.map(td => td.evaluate(node => {
      return node.textContent?.replaceAll('\n', '').trim() ?? ''
    })));
    
    allDates.push(texts.join(' | '));
  }

  console.table(allDates);

  await new Promise((resolve) => setTimeout(resolve, 5000));
  await page.reload();
}

await browser.close();