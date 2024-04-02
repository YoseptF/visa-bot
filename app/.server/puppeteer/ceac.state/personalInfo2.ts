import { checkIfUnchecked, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const personalInfo2 = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });
  
  const nationalitySelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_NATL', page);
  
  await nationalitySelect.select('MEX');
  
  const noOtherNationality = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblAPP_OTH_NATL_IND_1', page);
  
  await checkIfUnchecked(noOtherNationality);
  
  const permanentResidence = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblPermResOtherCntryInd_1', page);
  
  await checkIfUnchecked(permanentResidence);
  
  const noNationalIdNumber = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_NATIONAL_ID_NA', page);
  
  await checkIfUnchecked(noNationalIdNumber);
  await page.waitForNetworkIdle({ idleTime: 300 });

  const noSocialSecurityNumber = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_SSN_NA', page);

  await checkIfUnchecked(noSocialSecurityNumber);

  const noTaxIdNumber = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_TAX_ID_NA', page);

  await checkIfUnchecked(noTaxIdNumber);

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);

  await nextButton.click();
}

export default personalInfo2;