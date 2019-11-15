const graphql = require('graphql');
const Tickets = require('../../models/tickets');

// Delete Ticket action definition
var deleteTicketMutation = {
    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    args: {
        ticketId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
    },
    resolve: (source, { ticketId }, args, context) => {

        return Tickets.deleteOne({ _id: ticketId }).then(result => {

            if (result.ok) {
                return result.deletedCount > 0 ? 'deleted' : `No ticket found with id: ${ticketId}`;
            } else throw new Error(`Failed to delete ticket with id: ${ticketId}`);

        }).catch(err => {
            throw err;
        })
    }
};

// Module definition
exports.deleteTicket = deleteTicketMutation;