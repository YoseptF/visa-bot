import { typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";
import { checkNoOnEverything } from "./utils";

const workEducation3 = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  const language = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl00_tbxLANGUAGE_NAME', page);
  await typeIfEmpty(language, 'spanish');

  await checkNoOnEverything([
    'ctl00_SiteContentPlaceHolder_FormView1_rblSPECIALIZED_SKILLS_IND_1',
    'ctl00_SiteContentPlaceHolder_FormView1_rblCLAN_TRIBE_IND_1',
    'ctl00_SiteContentPlaceHolder_FormView1_rblCOUNTRIES_VISITED_IND_1',
    'ctl00_SiteContentPlaceHolder_FormView1_rblORGANIZATION_IND_1',
    'ctl00_SiteContentPlaceHolder_FormView1_rblMILITARY_SERVICE_IND_1',
    'ctl00_SiteContentPlaceHolder_FormView1_rblINSURGENT_ORG_IND_1',
  ], page)

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default workEducation3;