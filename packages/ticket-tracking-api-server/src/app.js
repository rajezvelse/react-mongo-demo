const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
var appRootSchema = require('./modules');

// Create new express app
const app = express();

// Enabling CORS settings for the server
app.use(cors({
    optionsSuccessStatus: 200
}));

// Configuring graphql middleware with the express server
app.use('/graphql', graphqlHTTP({
    schema: appRootSchema,
    graphiql: true
}));


module.exports = app;
