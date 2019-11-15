const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Importing all the types
var tickets = require('./tickets');
var ticketComments = require('./ticket-comments');

// Combining all schema & resolvers used in the application
module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            ...tickets.query,
            ...ticketComments.query
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            ...tickets.mutation,
            ...ticketComments.mutation
        }
    })
});