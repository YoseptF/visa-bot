import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import firstPage from './firstPage';
import puppeteer from "puppeteer-extra";
import secondPage from './secondPage';
import { waitForSelector } from '../utils';

puppeteer.use(StealthPlugin())

const TIMEOUT = 150000

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

await firstPage(page);

await secondPage(page);

const appIdSpan = await waitForSelector('span#ctl00_lblAppID', page);

const surnames = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SURNAME', page);

await surnames.type('surname');

const givenNames = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_GIVEN_NAME', page);

await givenNames.type('name');

const noFullName = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_FULL_NAME_NATIVE_NA', page);

await noFullName.click();

const noOtherNames = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblOtherNames_1', page);

await noOtherNames.click();

const noTelecode = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblTelecodeQuestion_1', page);

await noTelecode.click();

const sexSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_GENDER', page);

await sexSelect.select('M');

const maritakStatusSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_MARITAL_STATUS', page);

await maritakStatusSelect.select('S');

const birthDaySelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlDOBDay', page);

await birthDaySelect.select('01');

const birthMonthSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlDOBMonth', page);

await birthMonthSelect.select('JAN');

const birthYearInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear', page);

await birthYearInput.type('1990', { delay: 100 });

const cityInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_CITY', page);

await cityInput.type('city');

const stateInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_ST_PROVINCE', page);

await stateInput.type('state');

const countrySelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_POB_CNTRY', page);

await countrySelect.select('DF');

await page.waitForNetworkIdle()

const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);

await nextButton.click();

await new Promise((resolve) => setTimeout(resolve, TIMEOUT));