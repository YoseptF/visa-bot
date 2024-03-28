import { launch } from "puppeteer";

const TIMEOUT = 5000

// open new browser
const browser = await launch({
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

await page.setDefaultNavigationTimeout(0);

// get button with text ok
const okButton = await page.waitForSelector('xpath/.//button[text()="OK"]');

if(!okButton) throw new Error("Ok Button not found");

okButton.click();

const emailInput = await page.waitForSelector('input#user_email');
const passwordInput = await page.waitForSelector('input#user_password');
const signInButton = await page.waitForSelector('input[value="Sign In"]');
// const policyCheckBox = await page.waitForSelector('input#policy_confirmed');

if(!emailInput || !passwordInput || !signInButton) throw new Error("Inputs not found");

await emailInput.type("email");
await passwordInput.type("password");

console.debug("emailInput", emailInput);
console.debug("passwordInput", passwordInput);


// check if it needs to sign in
const signIn = await page.$("button#signIn");

console.debug("signIn", signIn);

await new Promise((resolve) => setTimeout(resolve, TIMEOUT));

await browser.close();