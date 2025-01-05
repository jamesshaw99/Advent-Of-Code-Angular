const fs = require("fs");
const path = require("path");

const challengesDir = path.join(__dirname, "src/app/challenges");

const getChallengeFiles = (dir, year = "") => {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const yearMatch = entry.name.match(/^\d{4}$/);
      if (yearMatch) {
        results = results.concat(getChallengeFiles(entryPath, entry.name));
      }
    } else if (entry.isFile() && entry.name.match(/^day\d{1,2}\.ts$/)) {
      results.push({
        year,
        filePath: path.join(year, entry.name).replace(/\\/g, "/"),
      });
    }
  }

  return results;
};

const challengeFiles = getChallengeFiles(challengesDir);

const sortedChallengeFiles = challengeFiles.sort((a, b) => {
  const yearDiff = parseInt(a.year, 10) - parseInt(b.year, 10);
  if (yearDiff !== 0) return yearDiff;

  const dayA = parseInt(a.filePath.match(/day(\d{1,2})/)[1], 10);
  const dayB = parseInt(b.filePath.match(/day(\d{1,2})/)[1], 10);
  return dayA - dayB;
});

const importStatements = sortedChallengeFiles
  .map(({ year, filePath }) => {
    const className = `year${year}day${filePath.match(/day(\d{1,2})/)[1]}`;
    return `import { ${className} } from '../challenges/${filePath.replace(
      ".ts",
      ""
    )}';`;
  })
  .join("\n");

const challengeArray = sortedChallengeFiles
  .map(({ year, filePath }) => {
    const dayMatch = filePath.match(/day(\d{1,2})/);
    const day = dayMatch ? parseInt(dayMatch[1], 10) : 0;
    const className = `year${year}day${day}`;
    return `{ year: ${year}, day: ${day}, instance: new ${className}() }`;
  })
  .join(",\n");

const challengeLogicFile = `${importStatements}

export const challengeInstances = [
${challengeArray}
];
`;

const outputPath = path.join(
  __dirname,
  "src/app/helpers/challenge-definitions.ts"
);
fs.writeFile(outputPath, challengeLogicFile, (writeErr) => {
  if (writeErr) {
    console.error("Error writing to challenge-definitions.ts:", writeErr);
  } else {
    console.log("challenge-definitions.ts updated successfully!");
  }
});

// // Read the challenges directory to find all challenge files
// fs.readdir(challengesDir, (err, files) => {
//   if (err) {
//     console.error('Error reading challenges directory:', err);
//     return;
//   }

//   // Filter and get all challenge files (e.g., year2023day1.ts)
//   const challengeModules = files
//     .filter(file => file.match(/^year\d{4}day\d{1,2}\.ts$/)) // Match files like year2023day1.ts
//     .map(file => `./challenges/${file}`);

//   // Generate import statements for the challenge modules
//   const importStatements = challengeModules
//     .map(module => `import { ${module.split('/').pop().replace('.ts', '')} } from '.${module.replace('.ts', '')}';`)
//     .join('\n');

//   // Generate the challengeLogic object for exporting
//   const challengeArray = challengeModules
//     .map(module => `{ year: ${module.match(/\d{4}/)[0]}, day: ${module.match(/day(\d{1,2})/)[1]}, instance: new ${module.split('/').pop().replace('.ts', '')}() }`)
//     .join(',\n');

//   const challengeLogicFile = `
// ${importStatements}

// export const challengeInstances = [
// ${challengeArray}
// ];
// `;

//   // Write the challenge logic to challenge-definitions.ts
//   const outputPath = path.join(__dirname, 'src/app/helpers/challenge-definitions.ts');
//   fs.writeFile(outputPath, challengeLogicFile, (writeErr) => {
//     if (writeErr) {
//       console.error('Error writing to challenge-definitions.ts:', writeErr);
//     } else {
//       console.log('challenge-definitions.ts updated successfully!');
//     }
//   });
// });
