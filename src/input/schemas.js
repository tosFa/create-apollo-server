const inputSchemaStep1 = {
  properties: {
    port: {
      description: 'GraphQL API port',
      default: 8080,
      type: 'integer',
    },
    path: {
      description: 'GraphQL API path.',
      default: 'graphql',
      type: 'string',
    },
    graphiqlPath: {
      description: 'Graphiql interface path.',
      default: 'graphiql',
      type: 'string',
    },
    dataloader: {
      description: 'Add dataloader to the list of dependencies',
      default: true,
      type: 'boolean',
    },
    subscriptions: {
      description: 'Support GraphQL subscriptions.',
      default: true,
      type: 'boolean',
    },
  },
};

const inputSchemaSubscriptions = {
  properties: {
    subscriptionsPort: {
      description: 'GraphQL subscription server port.',
      default: 8090,
      type: 'integer',
    },
    subscriptionsPath: {
      description: 'Subscription server path.',
      default: '/',
      type: 'string',
    },
    subscriptionsEngine: {
      description: 'Subscriptions engine.',
      default: 'pubsub',
      type: 'string',
    },
  },
};

module.exports = {
  inputSchemaStep1,
  inputSchemaSubscriptions,
};