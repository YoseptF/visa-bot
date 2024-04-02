import { checkIfUnchecked, typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";
import { solveCaptcha } from "./utils";

const signAndAccept = async (page: Page) => {
  for (const _ of Array(7).keys()) {
    await page.waitForNetworkIdle({ idleTime: 300 });
    const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
    await nextButton.click();
  }
  
  const secondCaptchaImageId = 'c_general_esign_signtheapplication_ctl00_sitecontentplaceholder_defaultcaptcha_CaptchaImage'
  
  await page.waitForSelector(`img#${secondCaptchaImageId}`);
  
  const captchaSolution = await solveCaptcha(secondCaptchaImageId, page);
  
  const noAssist = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView3_rblPREP_IND_1', page);
  await checkIfUnchecked(noAssist);
  
  const passportNumberInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_PPTNumTbx', page);
  await typeIfEmpty(passportNumberInput, '123456789');
  
  const captchaInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_CodeTextBox', page);
  await typeIfEmpty(captchaInput, captchaSolution);
  
  const signButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_btnSignApp', page);
  await signButton.click();
  
  await page.waitForNetworkIdle({ idleTime: 300 });
  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default signAndAccept;