const libraries = {
  pubsub: 'graphql-subscriptions',
  redis: 'graphql-redis-subscriptions',
  mqtt: 'graphql-mqtt-subscriptions',
  rabbitmq: 'graphql-rabbitmq-subscriptions',
};

const clients = {
  pubsub: 'PubSub',
  redis: 'RedisPubSub',
  mqtt: 'MQTTPubSub',
  rabbitmq: 'AmqpPubSub',
};

const generator = (config) => {
  return `
  import { SubscriptionManager } from 'graphql-subscriptions';
  import { ${clients[config.subscriptionsEngine]} } from '${libraries[config.subscriptionsEngine]}';
  import schema from './schema';
  
  const pubsub = new ${clients[config.subscriptionsEngine]}();
  
  const subscriptionManager = new SubscriptionManager({
    schema,
    pubsub,
    setupFunctions: {},
  });
  
  export { subscriptionManager, pubsub };
  `;
};

module.exports = generator;