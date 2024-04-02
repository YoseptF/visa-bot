import { checkIfUnchecked, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const travelCompanions = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  const otherPeopleCheckbox = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblOtherPersonsTravelingWithYou_1', page);

  await checkIfUnchecked(otherPeopleCheckbox);

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);

  await nextButton.click();
}

export default travelCompanions;