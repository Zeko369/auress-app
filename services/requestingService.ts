const answer = async () => {
  const response = await fetch("https://www.auress.org/s/index.php", {
    credentials: "include",
    headers: {
      cookies: "PHPSESSID=7fgn7ahjsntqsq18uhvv0vmd23",
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.8,hr-HR;q=0.5,hr;q=0.3",
      "Content-Type": "application/x-www-form-urlencoded",
      "Upgrade-Insecure-Requests": "1"
    },
    referrer: "https://www.auress.org/s/index.php",
    body: "odgovor=B&browser=App&device=Android",
    method: "POST",
    mode: "cors"
  });
  return response;
};

export { answer };
