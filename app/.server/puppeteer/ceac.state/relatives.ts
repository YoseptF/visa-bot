import { checkIfUnchecked, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const relatives = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  const noSurnamesFather = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbxFATHER_SURNAME_UNK_IND', page);
  await checkIfUnchecked(noSurnamesFather);

  const noGivenNamesFather = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbxFATHER_GIVEN_NAME_UNK_IND', page);
  await checkIfUnchecked(noGivenNamesFather);

  const noSurnamesMother = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbxMOTHER_SURNAME_UNK_IND', page);
  await checkIfUnchecked(noSurnamesMother);

  const noGivenNamesMother = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbxMOTHER_GIVEN_NAME_UNK_IND', page);
  await checkIfUnchecked(noGivenNamesMother);

  const noImmediateRelatives = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblUS_IMMED_RELATIVE_IND_1', page);
  await checkIfUnchecked(noImmediateRelatives);

  const noOtherRelatives = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblUS_OTHER_RELATIVE_IND_1', page);
  await checkIfUnchecked(noOtherRelatives);

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default relatives;