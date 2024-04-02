import { checkIfUnchecked, typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const pptVisa = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  const travelDocument = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_TYPE', page);
  await travelDocument.select('R');

  const noBookNumber = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexPPT_BOOK_NUM_NA', page);
  await checkIfUnchecked(noBookNumber);

  const countryIssuerSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_CNTRY', page);
  await countryIssuerSelect.select('MEX');

  const cityIssuerInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUED_IN_CITY', page);
  await typeIfEmpty(cityIssuerInput, 'city');

  const stateIssuerInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUED_IN_STATE', page);
  await typeIfEmpty(stateIssuerInput, 'state');

  const countryIssuerSelect2 = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_IN_CNTRY', page);
  await countryIssuerSelect2.select('MEX');

  const issueDay = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEDay', page);
  await issueDay.select('01');

  const issueMonth = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEMonth', page);
  await issueMonth.select('01');

  const issueYear = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUEDYear', page);
  await typeIfEmpty(issueYear, (new Date().getFullYear() - 1).toString());

  const noExpirationDate = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbxPPT_EXPIRE_NA', page);
  await checkIfUnchecked(noExpirationDate);

  const passportNeverStolen = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblLOST_PPT_IND_1', page);
  await checkIfUnchecked(passportNeverStolen);

  const travelDocumentNumber = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_NUM', page);
  await typeIfEmpty(travelDocumentNumber, '123456789');

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default pptVisa;