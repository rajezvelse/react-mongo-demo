const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ticketCommentSchema = new Schema({
    _id: Schema.Types.ObjectId,
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('TicketComment', ticketCommentSchema);
