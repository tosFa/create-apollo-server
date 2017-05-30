const generator = (config) => {
  return `
    ${imports(config)}
    ${testData(config)}
    ${resolvers(config)}
    
  `;
}

/**
 *
 * @param config
 * @returns {string}
 */
const imports = (config) => {
  return `
    import { find, filter } from 'lodash';
    import { pubsub } from './subscriptions';
    
  `;
};

/**
 *
 * @param config
 * @returns {string}
 */
const testData = (config) => {
  return `
    const authors = [
      { id: 1, firstName: 'Tom', lastName: 'Coleman' },
      { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    ];
    
    const posts = [
      { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
      { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
      { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    ];

  `;
};

/**
 *
 * @param config
 * @returns {string}
 */
const resolvers = (config) => {
  return `
    export default {
      ${queries()}
      ${mutations()}
      ${subscriptions(config)}
      ${nestedQueries(config)}
    };
    
  `;
};

/**
 *
 * @returns {string}
 */
const queries = () => {
  return `
    Query: {
      posts() {
        return posts;
      },
      author(_, { id }) {
        return find(authors, { id: id });
      },
    },
    
  `;
};

/**
 *
 * @returns {string}
 */
const mutations = () => {
  return `
    Mutation: {
      upvotePost(_, { postId }) {
        const post = find(posts, { id: postId });
        if (!post) {
          throw new Error(\`Couldn't find post with id \${postId}\`);
        }
        post.votes += 1;
        pubsub.publish('postUpvoted', post);
        return post;
      },
    },
    
  `;
};

/**
 *
 * @param config
 * @returns {*}
 */
const subscriptions = (config) => {
  if (!config.subscriptions) {
    return '';
  }

  return `
    Subscription: {
      postUpvoted: {
        resolve: (payload) => payload,
          subscribe: () => pubsub.asyncIterator('postUpvoted')
      }
    },
    
  `;
};

/**
 *
 * @param config
 * @returns {string}
 */
const nestedQueries = (config) => {
  return `
    Author: {
      posts(author) {
        return filter(posts, { authorId: author.id });
      },
    },
    Post: {
      author(post) {
        return find(authors, { id: post.authorId });
      },
    },
  `;

};


module.exports = generator;