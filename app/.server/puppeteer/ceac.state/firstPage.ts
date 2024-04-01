import { getImageAsBase64, waitForSelector } from "../utils";

import { Page } from "puppeteer";
import { createTask } from "~/.server/lib/capsolver";

const firstPage = async (page: Page) => {
  const locationSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_ucLocation_ddlLocation', page);


  locationSelect.select('MEX');

  const solveCaptchaAndSubmit = async () => {
    try {
      await page.waitForNetworkIdle({ idleTime: 300 });

      const captchaImageId = 'c_default_ctl00_sitecontentplaceholder_uclocation_identifycaptcha1_defaultcaptcha_CaptchaImage'

      const base64Image = await getImageAsBase64(captchaImageId, page);

      if (!base64Image) throw new Error('Failed to get base64 image');

      const captchaSolution = await createTask(base64Image);

      const captchaInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_ucLocation_IdentifyCaptcha1_txtCodeTextBox', page);

      await captchaInput.type(captchaSolution);

      const submitButton = await waitForSelector('.category.create a', page);

      await submitButton.click();

      await page.waitForNetworkIdle({ idleTime: 300 });

      return Boolean(await page.waitForSelector('input#ctl00_SiteContentPlaceHolder_chkbxPrivacyAct', { timeout: 2000 }));

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

export default firstPage;