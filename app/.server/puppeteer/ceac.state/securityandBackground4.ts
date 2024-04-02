import { Page } from "puppeteer";
import { checkNoOnEverything } from "./utils";
import { waitForSelector } from "../utils";

const securityandBackground4 = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  await checkNoOnEverything([
    `ctl00_SiteContentPlaceHolder_FormView1_rblImmigrationFraud_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblDeport_1`,
  ], page)

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();


} 

export default securityandBackground4;