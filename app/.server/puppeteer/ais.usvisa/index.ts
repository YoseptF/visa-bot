import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import puppeteer from "puppeteer-extra";

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

// get button with text ok
const okButton = await page.waitForSelector('xpath/.//button[text()="OK"]');

if (!okButton) throw new Error("Ok Button not found");

okButton.click();

const emailInput = await page.waitForSelector('input#user_email');
const passwordInput = await page.waitForSelector('input#user_password');
const signInButton = await page.waitForSelector('input[value="Sign In"]');
const policyCheckBox = await page.waitForSelector('input#policy_confirmed');

if (
  !emailInput
  || !passwordInput
  || !signInButton
  || !policyCheckBox
) {
  console.debug({
    emailInput: !!emailInput,
    passwordInput: !!passwordInput,
    signInButton: !!signInButton,
    policyCheckBox: !!policyCheckBox,
  })
  throw new Error("Inputs not found");
}

await emailInput.type("testo@yosept.me");
await passwordInput.type("1_Password");
await policyCheckBox.click();
await signInButton.click();

await new Promise((resolve) => setTimeout(resolve, TIMEOUT));

await browser.close();