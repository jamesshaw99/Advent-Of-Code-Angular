const express = require("express");
const axios = require('axios');
const { scrapeChallengeData } = require("./scrape");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

require('dotenv').config();

const sessionKey = process.env.SESSION_KEY;

app.get('/challenge/:year/:day', (req, res) => {
  const year = req.params.year;
  const day = req.params.day;

  axios.get(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      'Cookie': `session=${sessionKey}`
    },
    responseType: 'text'
  })
  .then((response) => {
    const challengeData = response.data;
    res.json(challengeData);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error fetching challenge data');
  });
});

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
