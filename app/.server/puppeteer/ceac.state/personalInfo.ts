import { checkIfUnchecked, typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";
import { saveApplicationId } from "./utils";

const personalInfo = async (page: Page) => {
  await saveApplicationId(page);

  const surnames = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SURNAME', page);

  await typeIfEmpty(surnames, 'surname');

  const givenNames = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_GIVEN_NAME', page);

  await typeIfEmpty(givenNames,'name');

  const noFullName = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_FULL_NAME_NATIVE_NA', page);

  await checkIfUnchecked(noFullName);

  const noOtherNames = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblOtherNames_1', page);

  await checkIfUnchecked(noOtherNames);

  const noTelecode = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblTelecodeQuestion_1', page);

  await checkIfUnchecked(noTelecode);

  const sexSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_GENDER', page);

  await sexSelect.select('M');

  const maritalStatusSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_MARITAL_STATUS', page);

  await maritalStatusSelect.select('S');

  const birthDaySelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlDOBDay', page);

  await birthDaySelect.select('01');

  const birthMonthSelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlDOBMonth', page);

  await birthMonthSelect.select('JAN');

  const birthYearInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear', page);

  await typeIfEmpty(birthYearInput, '1990');

  const cityInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_CITY', page);

  await typeIfEmpty(cityInput, 'city');

  const stateInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_ST_PROVINCE', page);

  await typeIfEmpty(stateInput, 'state');

  const countrySelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_POB_CNTRY', page);

  await countrySelect.select('DF');

  await page.waitForNetworkIdle()

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);

  await nextButton.click();
}

export default personalInfo;