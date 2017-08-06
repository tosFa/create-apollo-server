#!/usr/bin/env node
'use strict';
const program = require('commander');
const chalk = require('chalk');
const prompt = require('prompt');
const init = require('./src/init/index');
const schemas = require('./src/input/schemas');
let config = require('./src/input/config');

program
  .version('0.0.1')
  .command('init <req> [optional]')
  .description('Bootstrap a new GraphQL server instance')
  .action(function(name){
    console.log(`Bootstraping ${name} GraphQL server`);

    Object.assign(config, { name });
    configure();
  });

const configure = () => {
  prompt.get(schemas.inputSchemaStep1, (err, result) => {
    Object.assign(config,result);

    if (result.subscriptions) {
      configureSubscriptions();
    } else {
      init(config);
    }
  });
}

const configureSubscriptions = () => {
  prompt.get(schemas.inputSchemaSubscriptions, (err, result) => {
    Object.assign(config,result);
    init(config);
  });
};

program.parse(process.argv);