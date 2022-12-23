import { USER_AGENT, HEADERLESS, cpbUrls, contentsquare } from './config';
import puppeteer from 'puppeteer';
import { checkGtmInstalled } from './services/gtmChecking.service';
import { getContentSquareRequests } from './services/contentsquare.service';

async function getAllRequests(
  puppeteer: typeof import('puppeteer'),
  url: string
) {
  const requests: string[] = [];
  const browser = await puppeteer.launch({
    headless: HEADERLESS,
    defaultViewport: { width: 1920, height: 1080 },
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  await page.setUserAgent(USER_AGENT);

  page.on('request', async request => {
    try {
      if (request.isInterceptResolutionHandled()) return;
      requests.push(request.url());
      request.continue();
    } catch (error) {
      throw error;
      // request.abort();
    }
  });

  await page.goto(`${url}`, { waitUntil: 'networkidle2' });
  await page.reload({ waitUntil: 'networkidle2' });
  await browser.close();
  // console.log('all requests: ', requests);
  return requests;
}

(async () => {
  for (const url of contentsquare) {
    await getAllRequests(puppeteer, url.url).then(requests => {
      getContentSquareRequests(requests);
    });
  }
})();
