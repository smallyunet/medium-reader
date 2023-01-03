const article = document.querySelector("body");
if (article) {
  const text = article.textContent;
  if (text.includes("Member-only")) {
    location.assign(
      "https://scribe.rip" + location.pathname + location.search + location.hash
    );
  }
}
