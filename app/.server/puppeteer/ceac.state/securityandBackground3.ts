import { Page } from "puppeteer";
import { checkNoOnEverything } from "./utils";
import { waitForSelector } from "../utils";

const securityandBackground3 = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  await checkNoOnEverything([
    `ctl00_SiteContentPlaceHolder_FormView1_rblIllegalActivity_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblTerroristActivity_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblTerroristSupport_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblTerroristOrg_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblTerroristRel_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblGenocide_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblTorture_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblExViolence_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblChildSoldier_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblReligiousFreedom_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblPopulationControls_1`,
    `ctl00_SiteContentPlaceHolder_FormView1_rblTransplant_1`,
  ], page)

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();


} 

export default securityandBackground3;