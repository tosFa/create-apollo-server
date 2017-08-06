const production = {
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

const development = {
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

module.exports = {
  production,
  development,
};