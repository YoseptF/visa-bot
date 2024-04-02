import { typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const securityQuestion = async (page: Page) => {
  const agreeCheckbox = await waitForSelector('input#ctl00_SiteContentPlaceHolder_chkbxPrivacyAct', page)

  await agreeCheckbox.click();

  const securityQuestion = await waitForSelector('input#ctl00_SiteContentPlaceHolder_txtAnswer:not([disabled])', page);

  await typeIfEmpty(securityQuestion, 'same_answer');

  const submitButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_btnContinue', page);

  await submitButton.click();

  await page.waitForNetworkIdle();
}

export default securityQuestion;