import { checkIfUnchecked, typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";

const workEducation3 = async (page: Page) => {
  const noClan = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblCLAN_TRIBE_IND_1', page);
  await checkIfUnchecked(noClan);

  const language = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl00_tbxLANGUAGE_NAME', page);
  await typeIfEmpty(language, 'spanish');

  const noTravel = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblCOUNTRIES_VISITED_IND_1', page);
  await checkIfUnchecked(noTravel);

  const noSocial = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblORGANIZATION_IND_1', page);
  await checkIfUnchecked(noSocial);

  const noSpecialSkills = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblSPECIALIZED_SKILLS_IND_1', page);
  await checkIfUnchecked(noSpecialSkills);

  const noMilitary = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblMILITARY_SERVICE_IND_1', page);
  await checkIfUnchecked(noMilitary);

  const noServed = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblINSURGENT_ORG_IND_1', page);
  await checkIfUnchecked(noServed);

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default workEducation3;