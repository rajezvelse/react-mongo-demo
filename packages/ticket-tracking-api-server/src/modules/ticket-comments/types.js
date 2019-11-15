const graphql = require('graphql');

// Ticket comment type GgraphQL definition
exports.TicketCommentType = new graphql.GraphQLObjectType({
    name: 'TicketComment',
    fields: {
        _id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) },
        comment: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        createdAt: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        ticketId: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLID),
            resolve: (source) => {
                return source.ticket._id;
            }
        }
    }
});

// Add new ticket comment input data type GraphQL definition
exports.AddTicketCommentInput = new graphql.GraphQLInputObjectType({
    name: 'AddTicketCommentInput',
    fields: {
        ticketId: { type: new graphql.GraphQLNonNull(graphql.GraphQLID), },
        comment: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
    }
})


