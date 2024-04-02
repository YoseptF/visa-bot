import { typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";
import { solveCaptcha } from "./utils";

const startApplication = async (page: Page, ceacAppId?: string | null) => {
  const locationSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_ucLocation_ddlLocation', page);


  locationSelect.select('MEX');

  const solveCaptchaAndSubmit = async () => {
    try {
      await page.waitForNetworkIdle({ idleTime: 300 });

      const captchaImageId = 'c_default_ctl00_sitecontentplaceholder_uclocation_identifycaptcha1_defaultcaptcha_CaptchaImage'

      const captchaSolution = await solveCaptcha(captchaImageId, page);

      const captchaInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_ucLocation_IdentifyCaptcha1_txtCodeTextBox', page);

      await typeIfEmpty(captchaInput, captchaSolution);

      const submitButtonClass = ceacAppId ? '.category.retrieve a' : '.category.create a';

      const submitButton = await waitForSelector(submitButtonClass, page);

      await submitButton.click();

      await page.waitForNetworkIdle({ idleTime: 300 });

      const successSelector = ceacAppId ? 'span#ctl00_SiteContentPlaceHolder_Label5' : 'span#ctl00_SiteContentPlaceHolder_lblBanner';

      try {
        await page.waitForSelector(successSelector, { timeout: 2000 });
        return true;
      } catch (error) {
        console.error('haven\'t found success selector, retrying captcha');
        return false;
      }

    } catch (error) {
      console.error(error);
      return false;
    }
  }

  let agreeSelector = false;

  do {
    agreeSelector = await solveCaptchaAndSubmit();
  } while (!agreeSelector);
}

export default startApplication;