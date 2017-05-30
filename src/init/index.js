const readline = require('readline');
const path = require('path');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const prettier = require('prettier');
const execSync = require('child_process').execSync;
const generators = require('../../generators');

function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

var dependencies = {
  common: ['body-parser', 'cors', 'dotenv', 'express', 'graphql', 'graphql-server-express', 'graphql-tools', 'lodash'],
  subscriptions: ['graphql-subscriptions', 'subscriptions-transport-ws'],
  subscriptionsEngine: {
    pubsub: '',
    redis: 'graphql-redis-subscriptions',
    mqtt: 'graphql-mqtt-subscriptions',
    rabbitmq: 'graphql-rabbitmq-subscriptions',
  },
  dataLoader: ['dataloader']
};

var devDpendencies = {
  common: [
    'nodemon',
    'babel-cli',
    'babel-core',
    'babel-preset-es2015',
    'babel-preset-stage-0',
    'eslint',
    'eslint-config-airbnb',
    'babel-plugin-inline-import',
    'eslint-plugin-import'
  ]
};

function writeInstructions(name, outputDir) {
  console.log(`Success! Created ${name} at ${outputDir}
      Inside that directory, you can run several commands:

  yarn start
    Starts the development server.

  We suggest that you begin by typing:

    cd ${name}
    yarn start`);
}

const fileWriter = (path, content) => {
  fs.writeFile(path, content, { flag: 'wx' }, (err) => {
    if (!err) {
      console.log(`Successfully written to ${path}`);
    } else {
      console.log(`An error has occurred during file generation: ${err}`);
    }
  })
};

/**
 * initialize a new GraphQL API instance
 * @param name
 */
function init(config) {
  const skeletonDir = path.join(__dirname, '..', '..', 'skeleton-min');
  const outputDir = path.join(__dirname, '..', '..', 'output', config.name);
  const dataOutputDir = path.join(outputDir, 'data');

  const serverFile = path.join(outputDir, 'server.js');
  const dotevnFile = path.join(outputDir, '.env');
  const gitignoreFile = path.join(outputDir, '.gitignore');

  const schemaFile = path.join(dataOutputDir, 'schema.js');
  const resolversFile = path.join(dataOutputDir, 'resolvers.js');
  const subscriptionsFile = path.join(dataOutputDir, 'subscriptions.js');


  return new Promise((resolve, reject) => {
    if (!fs.pathExistsSync(outputDir)) {
      fs.mkdirsSync(outputDir);
      fs.mkdirsSync(dataOutputDir);
      fs.copySync(skeletonDir, outputDir);

      fileWriter(serverFile, prettier.format(generators.server(config)));
      fileWriter(dotevnFile, generators.dotenv(config));
      fileWriter(gitignoreFile, generators.gitignore(config));

      fileWriter(schemaFile, prettier.format(generators.schema(config)));
      fileWriter(resolversFile, prettier.format(generators.resolvers(config)));
      if (config.subscriptions) {
        fileWriter(subscriptionsFile, prettier.format(generators.subscriptions(config)));
      }



      const args = (shouldUseYarn() ? ['add'] : ['install', '--save', '--save-exact'])
        .concat(dependencies.common).concat(devDpendencies.common).concat(dependencies.subscriptions);
      const command = shouldUseYarn() ? `yarnpkg` : 'npm';

      process.chdir(outputDir);

      const child = spawn(command, args, { stdio: 'inherit' });
      child.on('close', code => {
        if (code !== 0) {
          reject({
            command: `${command} ${args.join(' ')}`,
          });
          return;
        }
        writeInstructions(config.name, outputDir);
        resolve();
      });
    } else {
      console.log('That folder already exists, choose another name');
      resolve();
    }
  });
}

module.exports = init;