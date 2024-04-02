import { typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const retrieveApplication = async (ceacAppId:string, page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  const appIdInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_ApplicationRecovery1_tbxApplicationID', page);
  await typeIfEmpty(appIdInput, ceacAppId);

  let retrieveInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_ApplicationRecovery1_btnBarcodeSubmit', page);
  await retrieveInput.click();

  const surnameInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_ApplicationRecovery1_txbSurname', page);
  await typeIfEmpty(surnameInput, 'surna');

  const yearInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_ApplicationRecovery1_txbDOBYear', page);
  await typeIfEmpty(yearInput, '1990');

  const secretAnswerInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_ApplicationRecovery1_txbAnswer', page);
  await typeIfEmpty(secretAnswerInput, 'same_answer');

  retrieveInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_ApplicationRecovery1_btnRetrieve', page);

  await retrieveInput.click();
}

export default retrieveApplication;