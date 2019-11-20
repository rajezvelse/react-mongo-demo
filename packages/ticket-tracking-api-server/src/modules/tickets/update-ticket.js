const graphql = require('graphql');
var { TicketType, UpdateTicketInput } = require('./types');
var Tickets = require('../../models/tickets');

// updateTicket action definition
var updateTicketMutation = {
    type: TicketType,
    args: {
        ticketId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        ticketData: { type: new graphql.GraphQLNonNull(UpdateTicketInput) }
    },
    resolve: async (source, { ticketId, ticketData }, args, context) => {

        // Finding the record to update
        let record = await Tickets.findById(ticketId);

        if (!record) throw new Error('No Ticket record fond with _id: ' + ticketId);

        let data = ticketData;

        // Update Ticket data
        record.subject = data.subject || record.subject;
        record.description = data.description || record.description;
        record.priority = data.priority || record.priority;
        record.status = data.status || record.status;
        record.updatedAt = new Date().toISOString();

        // Persist to DB & return the result
        let result = await record.save();
        return {
            ...result._doc
        };

    }

};

// Module definition
exports.updateTicket = updateTicketMutation;