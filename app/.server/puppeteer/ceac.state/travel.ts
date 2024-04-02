import { checkIfUnchecked, typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const travel = async (page: Page) => {

  await page.waitForNetworkIdle({ idleTime: 300 });

  const tripPurposeSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlPurposeOfTrip', page);

  await tripPurposeSelect.select('B')

  const specificitySelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlOtherPurpose', page);

  await specificitySelect.select('B1-B2')

  const travelCheckBox = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblSpecificTravel_1', page);

  await checkIfUnchecked(travelCheckBox);

  const daySelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEDay', page);

  await daySelect.select('1')

  const monthSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEMonth', page);

  await monthSelect.select('1')

  const yearSelect = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_DTEYear', page);

  await typeIfEmpty(yearSelect, (new Date().getFullYear() + 1).toString())

  const lengthInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_LOS', page);

  await typeIfEmpty(lengthInput, '1')

  const lengthSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_LOS_CD', page);

  await lengthSelect.select('W')

  const streetAddressInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxStreetAddress1', page);

  await typeIfEmpty(streetAddressInput, 'street')

  const cityInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxCity', page);

  await typeIfEmpty(cityInput, 'city')

  const stateSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlTravelState', page);

  await stateSelect.select('CA')

  const zipInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbZIPCode', page);

  await typeIfEmpty(zipInput, '90001')

  const personPayingSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlWhoIsPaying', page);

  await personPayingSelect.select('S')

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);

  await nextButton.click();
}

export default travel;