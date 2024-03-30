import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { executeQuery } from '~/.server/queryClient';
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
await page.goto("https://ceac.state.gov/genniv/");

await page.waitForNetworkIdle({ idleTime: 1000 });

const locationSelect = await page.waitForSelector('select#ctl00_SiteContentPlaceHolder_ucLocation_ddlLocation');

if (!locationSelect) throw new Error("Location select not found");

locationSelect.select('MEX');

await new Promise((resolve) => setTimeout(resolve, 1000));

const captchaImage = 'c_default_ctl00_sitecontentplaceholder_uclocation_identifycaptcha1_defaultcaptcha_CaptchaImage'

const getImageBase64 = (imageId: string) => {
  const imageElement = document.getElementById(imageId);

  if (!imageElement) {
    console.error(`Image with ID ${imageId} not found`);
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("Failed to get canvas context");
    return null;
  }

  ctx.drawImage(imageElement, 0, 0);

  try {
    // You can specify image quality as a parameter if needed
    const dataURL = canvas.toDataURL('image/jpeg');
    return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''); // Remove the initial data:image part
  } catch (error) {
    console.error("Error generating Base64:", error);
    return null;
  }
}

const base64Image = await page.evaluate(getImageBase64, captchaImage);

console.log('base64Image', base64Image);

if (!base64Image) throw new Error('Failed to get base64 image');

interface CapsolverResponse {
  "errorId": number,
  "errorCode": string,
  "errorDescription": string,
  "status": string,
  "solution": {
    "text": string
  },
  "taskId": string
}

const createTask = await executeQuery({
  mutationFn: async (body: string) => {
    const task = await fetch('https://api.capsolver.com/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientKey: process.env.CAPSOLVER_CLIENT_KEY,
        task: {
          type: 'ImageToTextTask',
          websiteURL: 'https://ceac.state.gov/genniv/',
          body,
          case: false
        }
      }),
    });

    const taskData = await task.json() as CapsolverResponse;
    return taskData;
  },
}, base64Image);

console.log('createTask', createTask);

const { solution: { text } } = createTask;

const captchaInput = await page.waitForSelector('input#ctl00_SiteContentPlaceHolder_ucLocation_IdentifyCaptcha1_txtCodeTextBox');

if (!captchaInput) throw new Error("Captcha input not found");

await captchaInput.type(text);

const submitButton = await page.waitForSelector('.category.create a');

if (!submitButton) throw new Error("Submit button not found");

await new Promise((resolve) => setTimeout(resolve, 1000));

await submitButton.click();

await new Promise((resolve) => setTimeout(resolve, TIMEOUT));