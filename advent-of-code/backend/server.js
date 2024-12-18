const express = require("express");
const { scrapeChallengeData } = require("./scrape");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

app.get("/scrape/:year/:day", async (req, res) => {
  const { year, day } = req.params;
  try {
    const data = await scrapeChallengeData(year, day);
    res.json(data);
  } catch (error) {
    res.status(500).send(`Error scraping challenge data: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
