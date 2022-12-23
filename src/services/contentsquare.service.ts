export function getContentSquareRequests(requests: string[]) {
  // regex: /^(https:\/\/c.contentsquare.net)\/(pageview|events)\?.*/gm
  const matched = requests.filter(request =>
    request.match(/^(https:\/\/c.contentsquare.net)\/(pageview|events)\?.*/gm)
  );
  console.log('matched: ', matched);
}
