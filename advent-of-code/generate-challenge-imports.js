const fs = require('fs');
const path = require('path');

// Path to the challenges folder
const challengesDir = path.join(__dirname, 'src/app/challenges');

// Read the challenges directory to find all challenge files
fs.readdir(challengesDir, (err, files) => {
  if (err) {
    console.error('Error reading challenges directory:', err);
    return;
  }

  // Filter and get all challenge files (e.g., year2023day1.ts)
  const challengeModules = files
    .filter(file => file.match(/^year\d{4}day\d{1,2}\.ts$/)) // Match files like year2023day1.ts
    .map(file => `./challenges/${file}`);

  // Generate import statements for the challenge modules
  const importStatements = challengeModules
    .map(module => `import { ${module.split('/').pop().replace('.ts', '')} } from '.${module.replace('.ts', '')}';`)
    .join('\n');

  // Generate the challengeLogic object for exporting
  const challengeArray = challengeModules
    .map(module => `{ year: ${module.match(/\d{4}/)[0]}, day: ${module.match(/day(\d{1,2})/)[1]}, instance: new ${module.split('/').pop().replace('.ts', '')}() }`)
    .join(',\n');

  const challengeLogicFile = `
${importStatements}

export const challengeInstances = [
${challengeArray}
];
`;

  // Write the challenge logic to challenge-definitions.ts
  const outputPath = path.join(__dirname, 'src/app/helpers/challenge-definitions.ts');
  fs.writeFile(outputPath, challengeLogicFile, (writeErr) => {
    if (writeErr) {
      console.error('Error writing to challenge-definitions.ts:', writeErr);
    } else {
      console.log('challenge-definitions.ts updated successfully!');
    }
  });
});