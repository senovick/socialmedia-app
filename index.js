import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import { MONGO_URI } from './config/config.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers/index.js';

const pubsub = new PubSub();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
});

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    return server.listen({port: 5000});

}).then(res => {
        console.log(`Server running at ${res.url}`);
    });
