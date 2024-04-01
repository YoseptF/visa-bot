import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import puppeteer from "puppeteer-extra";
import { waitForSelector } from '../utils';

puppeteer.use(StealthPlugin())

const TIMEOUT = 150000

// open new browser
const browser = await puppeteer.launch({
  headless: false,
  slowMo: 50,
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


await emailInput.type("testo@yosept.me");
await passwordInput.type("1_Password");
await policyCheckBox.click();
await signInButton.click();

await new Promise((resolve) => setTimeout(resolve, TIMEOUT));

await browser.close();