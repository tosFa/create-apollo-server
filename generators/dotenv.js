const generator = (config) =>
`
GRAPHQL_PORT=${config.port}
WS_PORT=${config.subscriptionsPort}
`;

module.exports = generator;