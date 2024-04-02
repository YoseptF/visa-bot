import { checkIfUnchecked, typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const uSContact = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  const noContactPerson = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbxUS_POC_NAME_NA', page);
  await checkIfUnchecked(noContactPerson);

  const orgName = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ORGANIZATION', page);
  await typeIfEmpty(orgName, 'organization');

  const relationShipSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_REL_TO_APP', page);
  await relationShipSelect.select('O');

  const employerAddress = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_LN1', page);
  await typeIfEmpty(employerAddress, 'address');

  const employerCity = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_CITY', page);
  await typeIfEmpty(employerCity, 'city');

  const employerState = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_ADDR_STATE', page);
  await employerState.select('CA');

  const employerZip = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_POSTAL_CD', page);
  await typeIfEmpty(employerZip, '90001');

  const employerPhone = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_HOME_TEL', page);
  await typeIfEmpty(employerPhone, '5555555555');

  const noEmployerEmail = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexUS_POC_EMAIL_ADDR_NA', page);
  await checkIfUnchecked(noEmployerEmail);

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default uSContact;