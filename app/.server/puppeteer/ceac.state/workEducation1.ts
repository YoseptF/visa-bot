import { checkIfUnchecked, typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const workEducation1 = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  const primaryOccupation = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlPresentOccupation', page);
  await primaryOccupation.select('N');

  await page.waitForNetworkIdle({ idleTime: 300 });

  const explainOccupation = await waitForSelector('textarea#ctl00_SiteContentPlaceHolder_FormView1_tbxExplainOtherPresentOccupation', page);
  await typeIfEmpty(explainOccupation, 'No reason');

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default workEducation1;