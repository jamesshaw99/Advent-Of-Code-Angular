const express = require("express");
const axios = require('axios');
const { scrapeChallengeData } = require("./scrape");
const {
  readCachedInput,
  writeCachedInput,
  readCachedDescription,
  writeCachedDescription,
} = require("./cache");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

require('dotenv').config();

const sessionKey = process.env.SESSION_KEY;

function isValidYearDay(year, day) {
  return /^\d{4}$/.test(year) && /^\d{1,2}$/.test(day);
}

function looksLikeLoginPage(text) {
  return typeof text === 'string' && /<html|please log in/i.test(text);
}

app.get('/challenge/:year/:day', (req, res) => {
  const year = req.params.year;
  const day = req.params.day;

  if (!isValidYearDay(year, day)) {
    res.status(400).send('Invalid year/day');
    return;
  }

  const cached = readCachedInput(year, day);
  if (cached !== null) {
    res.json(cached);
    return;
  }

  axios.get(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      'Cookie': `session=${sessionKey}`
    },
    responseType: 'text'
  })
  .then((response) => {
    const challengeData = response.data;
    if (looksLikeLoginPage(challengeData)) {
      res.status(401).send('AoC session is invalid or expired — check SESSION_KEY');
      return;
    }
    writeCachedInput(year, day, challengeData);
    res.json(challengeData);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error fetching challenge data');
  });
});

app.get("/scrape/:year/:day", async (req, res) => {
  const { year, day } = req.params;

  if (!isValidYearDay(year, day)) {
    res.status(400).send('Invalid year/day');
    return;
  }

  const cached = readCachedDescription(year, day);
  if (cached) {
    res.json(cached);
    return;
  }

  try {
    const data = await scrapeChallengeData(year, day);
    writeCachedDescription(year, day, data);
    res.json(data);
  } catch (error) {
    res.status(500).send(`Error scraping challenge data: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
