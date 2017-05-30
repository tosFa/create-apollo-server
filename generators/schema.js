const generator = (config) => {
  return `
    ${imports(config)}
    ${schema(config)}
    ${exp(config)}
  `;
};

/**
 * generate import chunk of the schema code
 * @param config
 * @returns {string}
 */
const imports = (config) => {
  return `
    import { makeExecutableSchema } from 'graphql-tools';
    import resolvers from './resolvers';
  `;
};


/**
 * generate typeDef chunk of the schema code
 * @param config
 * @returns {string}
 */
const schema = (config) => {
  let schema = `
    type Author {
      id: Int! # the ! means that every author object _must_ have an id
      firstName: String
      lastName: String
      posts: [Post] # the list of Posts by this author
    }
    type Post {
      id: Int!
      title: String
      author: Author
      votes: Int
    }
    # the schema allows the following query:
    type Query {
      posts: [Post]
      author(id: Int!): Author
    }
    # this schema allows the following mutation:
    type Mutation {
      upvotePost (
        postId: Int!
      ): Post
    }
  `;

  if (config.subscriptions) {
    schema += `
      type Subscription {
        postUpvoted: Post
      }
    `;
  }

  return `const schema = \`${schema}\``;
};

/**
 * generate export chunk of the schema code
 * @param config
 * @returns {string}
 */
const exp = (config) => {
  return `
    export default makeExecutableSchema({
      typeDefs: schema,
      resolvers,
    });

  `;
};

module.exports = generator;