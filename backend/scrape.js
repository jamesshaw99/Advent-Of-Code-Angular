const puppeteer = require("puppeteer");

async function scrapeChallengeData(year, day) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const cookies = [
    {
      name: "session",
      value: process.env.SESSION_KEY,
      domain: ".adventofcode.com",
      path: "/",
      httpOnly: true,
      secure: true,
    },
  ];

  await browser.setCookie(...cookies);

  const url = `https://adventofcode.com/${year}/day/${day}`;
  await page.goto(url);

  await page.waitForSelector(".day-desc");

  const challengeData = await page.evaluate(() => {
    const title = document
      .querySelector("h2")
      .innerText.replaceAll("---", "")
      .trim();

    const part1DescriptionElement = document.querySelectorAll("article.day-desc")[0];
    const part1Description = part1DescriptionElement.cloneNode(true);
    const h2Part1 = part1Description.querySelector("h2");
    if (h2Part1) {
      h2Part1.remove();
    }

    const part2DescriptionElement = document.querySelector("article.day-desc h2#part2");
    let part2Description = "";
    if (part2DescriptionElement) {
      const part2DescriptionNode = part2DescriptionElement.closest("article");
      
      const clonedPart2 = part2DescriptionNode.cloneNode(true);
      const h2Part2 = clonedPart2.querySelector("h2");
      if (h2Part2) {
        h2Part2.remove();
      }
      
      part2Description = clonedPart2.innerHTML;
    }

    return {
      title,
      part1Description: part1Description.innerHTML,
      part2Description: part2Description,
    };
  });

  await browser.close();
  return challengeData;
}

module.exports = { scrapeChallengeData };