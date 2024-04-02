import { Page } from "puppeteer";
import { checkNoOnEverything } from "./utils";
import { waitForSelector } from "../utils";

const securityandBackground2 = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });
  await checkNoOnEverything([
    `ctl00_SiteContentPlaceHolder_FormView1_rblHumanTrafficking_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblArrested_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblControlledSubstances_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblProstitution_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblMoneyLaundering_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblAssistedSevereTrafficking_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblHumanTraffickingRelated_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblArrested_1`,
  ], page)
  
  await page.waitForNetworkIdle({ idleTime: 1000 });
  
  await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.evaluate(btn => btn.click());
}

export default securityandBackground2;