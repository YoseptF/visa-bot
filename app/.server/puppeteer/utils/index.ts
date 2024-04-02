import { ElementHandle, Page } from "puppeteer";

const getImageAsBase64Internal = (imageId: string) => {
  const imageElement = document.getElementById(imageId) as HTMLImageElement;

  if (!imageElement) {
    console.error(`Image with ID ${imageId} not found`);
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("Failed to get canvas context");
    return null;
  }

  ctx.drawImage(imageElement, 0, 0);

  try {
    // You can specify image quality as a parameter if needed
    const dataURL = canvas.toDataURL('image/jpeg');
    return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''); // Remove the initial data:image part
  } catch (error) {
    console.error("Error generating Base64:", error);
    return null;
  }
}

export const getImageAsBase64 = async (imageId: string, page: Page) => {
  const image = await page.evaluate(getImageAsBase64Internal, imageId)

  if (!image) throw new Error("Failed to get image");

  return image;
}

export const waitForSelector = async <Selector extends string>(selector: Selector, page: Page) => {
  const element = await page.waitForSelector(selector);

  if (!element) throw new Error("Element not found: " + selector);

  return element;
}

export const typeIfEmpty = async <Element extends ElementHandle<HTMLInputElement | HTMLTextAreaElement>>(element: Element, text: string) => {
  const value = await element.evaluate((el) => el.value);

  if (!value) await element.type(text);
}

export const checkIfUnchecked = async <Element extends ElementHandle<HTMLInputElement>>(element: Element) => {
  
  const checked = await element.evaluate((el) => el.checked);

  if (!checked) await element.click();
}