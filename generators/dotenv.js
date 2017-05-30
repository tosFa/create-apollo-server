const generator = (config) =>
`
GRAPHQL_PORT=${config.port}
GRAPHQL_PATH=${config.path}
WS_PORT=${config.subscriptionsPort}
WS_PORT=${config.subscriptionsPort}
WS_PATH=${config.subscriptionsPath}
GRAPHIQL_PATH=${config.graphiqlPath}
`;

module.exports = generator;