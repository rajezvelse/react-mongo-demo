const graphql = require('graphql');
var { TicketType, CreateTicketInput } = require('./types');
var Tickets = require('../../models/tickets');
var PredictTicketNumber = require('../../utils/predict-ticket-number');

// createTicket action definition
var createTicketMutation = {
    type: TicketType,
    args: {
        ticketData: { type: new graphql.GraphQLNonNull(CreateTicketInput) }
    },
    resolve: async (source, { ticketData }, args, context) => {
        console.log(ticketData)

        // Finding the last record
        let lastRecord = await Tickets.find()
            .sort('-createdAt')
            .limit(1);


        let data = ticketData,
            // Generating ticket number 
            ticketNumber = PredictTicketNumber(lastRecord.length ? lastRecord[0]._doc.ticketNumber : null);

        // Create Ticket instance
        let ticket = new Tickets({
            ticketNumber: ticketNumber,
            ...data
        });

        // Persist to DB & return the result
        let result = await ticket.save();

        return {
            ...result._doc
        }
    }

};

// Module definition
exports.createTicket = createTicketMutation;