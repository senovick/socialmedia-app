import { postResolvers } from './posts.js';
import { userResolvers } from './users.js';
import { commentResolver } from './comments.js';
export const resolvers = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolver.Mutation

    },
    Subscription: {
      ...postResolvers.Subscription
    }
};