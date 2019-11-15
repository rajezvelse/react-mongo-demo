var addTicketComment = require('./add-ticket-comment');
var deleteTicketComment = require('./delete-ticket-comment');

// Merging all the ticket comment related quries & mutations
module.exports = {
    query: {

    },
    mutation: {
        ...addTicketComment,
        ...deleteTicketComment
    }
}