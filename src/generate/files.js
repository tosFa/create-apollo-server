const path = require('path');
const fs = require('fs-extra');
const prettier = require('prettier');
const generators = require('../../generators');
const writers = require('../generate/writers');

function generateFiles(config, outputDir) {
  const skeletonDir = path.join(__dirname, '..', '..', 'skeleton');
  const dataOutputDir = path.join(outputDir, 'data');

  const serverFile = path.join(outputDir, 'server.js');
  const dotevnFile = path.join(outputDir, '.env');
  const gitignoreFile = path.join(outputDir, '.gitignore');

  const schemaFile = path.join(dataOutputDir, 'schema.js');
  const resolversFile = path.join(dataOutputDir, 'resolvers.js');
  const subscriptionsFile = path.join(dataOutputDir, 'subscriptions.js');

  fs.mkdirsSync(outputDir);
  fs.mkdirsSync(dataOutputDir);
  fs.copySync(skeletonDir, outputDir);

  writers.fileWriter(serverFile, prettier.format(generators.server(config)));
  writers.fileWriter(dotevnFile, generators.dotenv(config));
  writers.fileWriter(gitignoreFile, generators.gitignore(config));

  writers.fileWriter(schemaFile, prettier.format(generators.schema(config)));
  writers.fileWriter(resolversFile, prettier.format(generators.resolvers(config)));
  if (config.subscriptions) {
    writers.fileWriter(subscriptionsFile, prettier.format(generators.subscriptions(config)));
  }
}

module.exports = generateFiles;
