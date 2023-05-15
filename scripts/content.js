function processArticle() {
  console.log('processArticle started');
  const selector = "body";
  const article = document.querySelector(selector);

  const isMediumArticle = () => {
    const ogSiteName = document.querySelector('meta[property="og:site_name"]');
    return ogSiteName && ogSiteName.content.toLowerCase() === 'medium';
  };

  if (article) {
    const text = article.textContent.trim();
    const targetTexts = ["Member-only"];
    const conditionMet = targetTexts.some(targetText => text.includes(targetText)) && isMediumArticle();
    console.log('Condition:', conditionMet);
    console.log('Text:', text)
    if (conditionMet) {
      console.log('Condition met');
      const url = "https://scribe.rip" + location.pathname + location.search + location.hash;
      location.assign(url);
    }
  }
  console.log('processArticle finished');
}

processArticle();
