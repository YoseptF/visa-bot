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
await page.goto("https://ceac.state.gov/genniv/");

await page.waitForNetworkIdle({ idleTime: 2000 });

await page.waitForSelector('a.LBD_SoundLink');

await page.evaluateHandle(() => {
  (document.querySelector('a.LBD_SoundLink')! as HTMLAnchorElement).click();
})

await page.waitForSelector('audio');

const mediaStream = await page.evaluate(async() => {

  const audioElement = document.querySelector('audio') as unknown as HTMLCanvasElement

  console.debug('Audio Element', audioElement);

  if (!audioElement) throw new Error('Audio element not found');

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const mediaStream1 = audioElement.captureStream();
  console.debug('Audio playing 0');

  const audio = new Audio();
  audio.autoplay = true;
  audio.srcObject = mediaStream1;
  console.debug('Audio playing 1', audio);

  audio.play();

  console.debug('Audio playing 2', audio);
});

console.debug('Media Stream', mediaStream);