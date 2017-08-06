const path = require('path');
const fs = require('fs-extra');
const generateFiles = require('../generate/files');
const writers = require('../generate/writers');
const installer = require('../generate/installer');

/**
 * initialize a new GraphQL API instance
 * @param name
 */
function init(config) {
  const outputDir = path.join(process.cwd(), config.name);

  return new Promise((resolve, reject) => {
    if (!fs.pathExistsSync(outputDir)) {
      generateFiles(config, outputDir);
      installer(outputDir, (code, command, args) => {
        if (code !== 0) {
          reject({ command: `${command} ${args.join(' ')}` });
          return;
        }
        writers.writeInstructions(config.name, outputDir);
        resolve();
      });

    } else {
      console.log('That folder already exists, choose another name');
      resolve();
    }
  });
}

module.exports = init;