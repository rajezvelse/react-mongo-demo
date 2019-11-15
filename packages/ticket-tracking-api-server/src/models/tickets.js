const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ticketsSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    ticketNumber: {
        type: String,
        unique: true,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    status: {
        type: String,
        enum: ['open', 'ongoing', 'completed'],
        default: 'open'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Tickets', ticketsSchema);