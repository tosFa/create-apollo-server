# bootstrap-gql-server
The idea behind this library is to provide a simple way to bootstrap a new graphQL server instance.

Inspired by by projects like `create-react-app` and `create-react-native-app` this project aims to provide a similar service.
 
Unlike the before mentioned projects `bootstrap-gql-server` doesn't hide the implementation and comes without an `eject` command

After initializing a new instance of a graphQL server all dependencies are visible in the `package.json` file.


# Install

`yarn add global bootstrap-gql-server`

# Generate new GQL API instance

`bootstrap-gql-server init [project-name]`

`Follow instructions`

`cd [project-name] && yarn start`

go to `localhost:[port]/[gaphiql path]` and start investigating the generated schema

The resulting schema is the same as the one used in the example here https://github.com/apollographql/frontpage-server 


# Current supported configurations include

- GraphQL API port:  *default* (8080)
- GraphQL API path:  *default* (graphql)
- Graphiql interface path: *default* (graphiql)
- Add dataloader to the list of dependencies:  *default* (true)
- Support GraphQL subscriptions: *default* (true)
- GraphQL subscription server port: *default* (8090) [only if subscriptions support = true]
- Subscription server path: *default* (/) [only if subscriptions support = true]
- Subscriptions engine: *default* (pubsub) [only if subscriptions support = true]

# Contributing

This is project is a living thing and it needs caring, if you wan to contribute, please do by submitting PRs, issues...

# Roadmap / What's next

- Add data source support (mySQL, Postegrsql, REST)
- Add support for koa, hapi, restify...
- Add specs / tests
- Deploy to launchpad
- Typescript / Flow
- Improving the codebase in general
- init-advanced, an init command to generate an instance for users with more advanced needs 




