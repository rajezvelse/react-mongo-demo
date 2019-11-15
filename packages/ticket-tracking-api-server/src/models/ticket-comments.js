const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ticketCommentsSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Tickets'
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

module.exports = mongoose.model('TicketComments', ticketCommentsSchema);
