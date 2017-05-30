#!/usr/bin/env node
'use strict';
const program = require('commander');
const chalk = require('chalk');
const prompt = require('prompt');
const init = require('./src/init/index');

let config = {
  name: '',
  port: 8080,
  dataloader: false,
  subscriptions: false,
  subscriptionsPort: 8090,
  subscriptionsEngine: 'pubsub',

};

program
  .version('0.0.1')
  .command('init <req> [optional]')
  .description('bootstrap a new GraphQL server')
  .action(function(name){
    console.log(`Bootstraping ${name} GraphQL server`);

    Object.assign(config, { name });
    configure();
  });

const inputSchemaStep1 = {
  properties: {
    port: {
      description: 'Port you want your GraphQL API to run on',
      default: 8080,
      type: 'integer',
    },
    dataloader: {
      description: 'Add dataloader to the list of dependencies',
      default: true,
      type: 'boolean',
    },
    subscriptions: {
      description: 'Setup the server to support GraphQL subscriptions',
      default: true,
      type: 'boolean',
    },
  },
};

const inputSchemaSubscriptions = {
  properties: {
    subscriptionsPort: {
      description: 'Port you want your GraphQL subscription server to run on',
      default: 8090,
      type: 'integer',
    },
    subscriptionsEngine: {
      description: 'Port you want your GraphQL subscription server to run on',
      default: 'pubsub',
      type: 'string',
    },
  },
};

const configure = () => {
  prompt.get(inputSchemaStep1, (err, result) => {
    Object.assign(config,result);

    if (result.subscriptions) {
      configureSubscriptions();
    } else {
      init(config);
    }
  });
}

const configureSubscriptions = () => {
  prompt.get(inputSchemaSubscriptions, (err, result) => {
    Object.assign(config,result);
    init(config);
  });
};

program.parse(process.argv);