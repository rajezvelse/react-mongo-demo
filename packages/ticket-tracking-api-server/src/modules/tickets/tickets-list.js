const graphql = require('graphql');
var { TicketType } = require('./types');
var Tickets = require('../../models/tickets');

// Fetch tickets list action definition
var ticketsQuery = {
    type: new graphql.GraphQLList(TicketType),
    resolve: (source, args, context) => {
        return Tickets.find()
            .then(data => data)
            .catch(err => {
                throw err;
            })
    }
}

// Module definition
exports.tickets = ticketsQuery;