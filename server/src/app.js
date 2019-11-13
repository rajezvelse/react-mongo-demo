const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Create new express app
const app = express();

var schema = buildSchema(`
    type Details {
        name: String
        description: String
    }
    type Query {
        hello: Details
    }
`);

var root = {
    hello: () => {
        return {
            name: "Morphius",
            description: "asfdasdadsnaldslk"
        };
    }
};

// Configuring graphql middleware with the express server
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


module.exports = app;
