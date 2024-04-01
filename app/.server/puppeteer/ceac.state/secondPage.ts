import { Page } from "puppeteer";
import { waitForSelector } from "../utils";

const secondPage = async (page: Page) => {
  const agreeCheckbox = await waitForSelector('input#ctl00_SiteContentPlaceHolder_chkbxPrivacyAct', page)

  await agreeCheckbox.click();

  const securityQuestion = await waitForSelector('input#ctl00_SiteContentPlaceHolder_txtAnswer:not([disabled])', page);

  await securityQuestion.type('same_answer');

  const submitButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_btnContinue', page);

  await submitButton.click();

  await page.waitForNetworkIdle();
}

export default secondPage;