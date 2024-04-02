import { Page } from "puppeteer";
import { checkNoOnEverything } from "./utils";
import { waitForSelector } from "../utils";

const workEducation2 = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  await checkNoOnEverything([
    'ctl00_SiteContentPlaceHolder_FormView1_rblPreviouslyEmployed_1',
    'ctl00_SiteContentPlaceHolder_FormView1_rblOtherEduc_1',
  ], page)

  await page.waitForNetworkIdle({ idleTime: 300 });

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default workEducation2;