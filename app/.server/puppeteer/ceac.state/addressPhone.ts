import { checkIfUnchecked, typeIfEmpty, waitForSelector } from "../utils";

import { Page } from "puppeteer";
import supabase from "~/.server/db";

const addressPhone = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 300 });
  
  const [,,accountUuid] = process.argv
  
  const { data } = await supabase.from('ServerSettings').select('ceacAppId').eq('id', accountUuid).single()
  
  if (!data?.ceacAppId) throw new Error('App ID not found');
  
  const { ceacAppId } = data
  
  const address1 = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_LN1', page);
  await typeIfEmpty(address1, 'street');
  
  const city = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_CITY', page);
  await typeIfEmpty(city, 'city');
  
  const noState = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_ADDR_STATE_NA', page);
  await checkIfUnchecked(noState);
  
  const noZip = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_ADDR_POSTAL_CD_NA', page);
  await checkIfUnchecked(noZip);
  
  const countrySelect = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_ddlCountry', page);
  await countrySelect.select('MEX');
  
  const sameMailingAddress = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblMailingAddrSame_0', page);
  await checkIfUnchecked(sameMailingAddress);
  
  const phoneInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_HOME_TEL', page);
  await typeIfEmpty(phoneInput, '522222222222');
  
  const noSecondaryPhone = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_MOBILE_TEL_NA', page);
  await checkIfUnchecked(noSecondaryPhone);

  await page.waitForNetworkIdle({ idleTime: 300 });
  
  const noWorkPhone = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_BUS_TEL_NA', page);
  await checkIfUnchecked(noWorkPhone);
  
  const noOtherPhone = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblAddPhone_1', page);
  await checkIfUnchecked(noOtherPhone);
  
  const emailInput = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_EMAIL_ADDR', page);
  await typeIfEmpty(emailInput, `${ceacAppId.toLowerCase()}@yosept.me`);
  
  await page.waitForNetworkIdle({ idleTime: 300 });
  
  const noOtherEmail = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblAddEmail_1', page);
  await checkIfUnchecked(noOtherEmail);

  const socialMediaSeelct = await waitForSelector('select#ctl00_SiteContentPlaceHolder_FormView1_dtlSocial_ctl00_ddlSocialMedia', page);
  await socialMediaSeelct.select('NONE');

  const noWebsite = await waitForSelector('input#ctl00_SiteContentPlaceHolder_FormView1_rblAddSocial_1', page);
  await checkIfUnchecked(noWebsite);

  const nextButton = await waitForSelector('input#ctl00_SiteContentPlaceHolder_UpdateButton3', page);
  await nextButton.click();
}

export default addressPhone;