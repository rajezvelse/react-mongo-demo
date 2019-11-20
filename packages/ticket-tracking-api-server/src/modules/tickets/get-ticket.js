const graphql = require('graphql');
const { TicketDetailsType } = require('./types');
const Tickets = require('../../models/tickets');
const TicketComments = require('../../models/ticket-comments');

// Retrive Ticket record query
var getTicketQuery = {
    type: TicketDetailsType,
    args: {
        ticketId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
    },
    resolve: async (source, { ticketId }, args, context) => {
        let tickets = await Tickets.findById(ticketId);

        if (!tickets) throw new Error(`No ticket found with id: ${ticketId}`);

        // Fetching ticket comments
        let ticketComments = await TicketComments.find({ ticket: ticketId });
        
        return {
            ...tickets._doc,
            comments: ticketComments
        };
    }
};

// Module definition
exports.getTicket = getTicketQuery;