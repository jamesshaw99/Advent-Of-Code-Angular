const fs = require("fs");
const path = require("path");

const cacheDir = path.join(__dirname, "cache");

function dayDir(year, day) {
  return path.join(cacheDir, String(year), String(day));
}

function readCachedInput(year, day) {
  const filePath = path.join(dayDir(year, day), "input.txt");
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
}

function writeCachedInput(year, day, input) {
  const dir = dayDir(year, day);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "input.txt"), input, "utf8");
}

function readCachedDescription(year, day) {
  const filePath = path.join(dayDir(year, day), "description.json");
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeCachedDescription(year, day, description) {
  const dir = dayDir(year, day);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "description.json"),
    JSON.stringify(description),
    "utf8"
  );
}

module.exports = {
  readCachedInput,
  writeCachedInput,
  readCachedDescription,
  writeCachedDescription,
};
