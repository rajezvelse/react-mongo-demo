const express = require('express');
const graphqlHTTP = require('express-graphql');
var appRootSchema  = require('./modules');

// Create new express app
const app = express();

// Configuring graphql middleware with the express server
app.use('/graphql', graphqlHTTP({
    schema: appRootSchema,
    graphiql: true
}));


module.exports = app;
