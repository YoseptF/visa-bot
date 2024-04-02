import { checkIfUnchecked, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const previousUSTravel = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });
  
  const previousUSTravel = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblPREV_US_TRAVEL_IND_1', page);

  await checkIfUnchecked(previousUSTravel);

  const previousVisa = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_IND_1', page);

  await checkIfUnchecked(previousVisa);

  const previousRefusal = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_REFUSED_IND_1', page);

  await checkIfUnchecked(previousRefusal);

  const previousFiling = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblIV_PETITION_IND_1', page);

  await checkIfUnchecked(previousFiling);

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);

  await nextButton.click();
}

export default previousUSTravel;