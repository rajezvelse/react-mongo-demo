const graphql = require('graphql');
var { TicketCommentType } = require('../ticket-comments/types');

var TicketPriorityType = new graphql.GraphQLEnumType({
    name: 'priority',
    values: {
        low: { value: 'low' },
        medium: { value: 'medium' },
        high: { value: 'high' }
    }
});

var TicketStatusType = new graphql.GraphQLEnumType({
    name: 'status',
    values: {
        open: { value: 'open' },
        ongoing: { value: 'ongoing' },
        completed: { value: 'completed' }
    }
});

// Ticket record type
var ticketTypeFields = {
    _id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) },
    ticketNumber: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    subject: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    description: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    priority: {
        type: new graphql.GraphQLNonNull(TicketPriorityType)
    },
    status: {
        type: new graphql.GraphQLNonNull(TicketStatusType)
    },
    createdAt: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        resolve: (source) => {
            return source.createdAt.toISOString()
        }
    },
    updatedAt: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
        resolve: (source) => {
            return source.updatedAt.toISOString()
        }
    }
};

exports.TicketType = new graphql.GraphQLObjectType({
    name: 'Ticket',
    fields: ticketTypeFields
});

exports.TicketDetailsType = new graphql.GraphQLObjectType({
    name: 'TicketDetails',
    fields: {
        ...ticketTypeFields,
        comments: { type: new graphql.GraphQLList(TicketCommentType) }
    }
})

// New Ticket input data type
exports.CreateTicketInput = new graphql.GraphQLInputObjectType({
    name: 'CreateTicketInput',
    fields: {
        subject: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        description: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        priority: {
            type: TicketPriorityType,
            defaultValue: 'low'
        },
        status: {
            type: TicketStatusType,
            defaultValue: 'open'
        }
    }
});

// Update Ticket input data type
exports.UpdateTicketInput = new graphql.GraphQLInputObjectType({
    name: 'UpdateTicketInput',
    fields: {
        subject: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        priority: {
            type: TicketPriorityType,
            defaultValue: 'low'
        },
        status: {
            type: TicketStatusType,
            defaultValue: 'open'
        }
    }
});


