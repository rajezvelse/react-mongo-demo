var ticketsList = require('./tickets-list');
var createTicket = require('./create-ticket');
var updateTicket = require('./update-ticket');
var getTicket = require('./get-ticket');
var deleteTicket = require('./delete-ticket')

// Merging all the ticket related quries & mutations
module.exports = {
    query: {
        ...ticketsList,
        ...getTicket
    },
    mutation: {
        ...createTicket,
        ...updateTicket,
        ...deleteTicket
    }
}