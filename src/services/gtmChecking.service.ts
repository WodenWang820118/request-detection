import { BgGreen, BgRed, cpbUrls } from '../config';
// to check sites that have to login first
// please login first and then run the script
export function checkGtmInstalled(
  requests: string[],
  url: { url: string; gtmId: string }
): void {
  const gtmRequest = requests.filter(request =>
    request.includes('collect?v=2')
  );
  if (gtmRequest.length) {
    const gtmIds = gtmRequest.map(
      request => request.split('tid=')[1].split('&')[0]
    );
    if (!gtmIds.includes(url.gtmId)) {
      console.error(
        BgRed,
        'Error: ',
        url.url,
        'should be',
        url.gtmId,
        'but not found in collection',
        gtmIds
      );
      console.log(`------------------------`);
    } else {
      console.log(BgGreen, `Success: ${url.url} with gtmId: ${url.gtmId}`);
      console.log(`------------------------`);
    }
  } else {
    console.log(BgRed, `No gtmId found for ${url.url}`);
    console.log(`------------------------`);
  }
}
