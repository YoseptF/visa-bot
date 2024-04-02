import { checkIfUnchecked, waitForSelector } from "../utils";

const workEducation2 = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });

  const notPreviouslyEmployed = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblPreviouslyEmployed_1', page);
  await checkIfUnchecked(notPreviouslyEmployed);

  const notPreviouslySchooled = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblOtherEduc_1', page);
  await checkIfUnchecked(notPreviouslySchooled);

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default workEducation2;