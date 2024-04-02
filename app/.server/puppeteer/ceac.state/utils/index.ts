import { checkIfUnchecked, getImageAsBase64, waitForSelector } from "../../utils";

import { Page } from "puppeteer";
import { createTask } from "~/.server/lib/capsolver";
import supabase from "~/.server/db";

export const saveApplicationId = async (page: Page) => {
  const appIdSpan = await waitForSelector('span#ctl00_lblAppID', page);

  const ceacAppId = await appIdSpan.evaluate((el) => el.textContent);

  if (!ceacAppId) throw new Error('App ID not found');

  const { data: ServerSettings, error } = await supabase.from('ServerSettings').upsert({ ceacAppId, id: '1' }).select()
  
  if (error) throw new Error(error.message);
  if (!ServerSettings) throw new Error('App ID not saved');
}

export const checkNoOnEverything = async (ids: string[],page: Page) => {
  for (const id of ids) {
    await page.waitForNetworkIdle({ idleTime: 300 });
    const no = await waitForSelector(`input#${id}`,page);
    await checkIfUnchecked(no);
  }
}

export const solveCaptcha = async (captchaImageId: string, page: Page) => {
  const base64Image = await getImageAsBase64(captchaImageId, page);

  return createTask(base64Image);
}

export enum CeacStep {
  SecureQuestion,
  Personal1,
  Personal2,
  Travel,
  TravelCompanions,
  PreviousUSTravel,
  AddressPhone,
  PptVisa,
  USContact,
  Relatives,
  WorkEducation1,
  WorkEducation2,
  WorkEducation3,
  SecurityandBackground1,
  SecurityandBackground2,
  SecurityandBackground3,
  SecurityandBackground4,
  SecurityandBackground5
}