const graphql = require('graphql');
const TicketComments = require('../../models/ticket-comments');
const { TicketCommentType, AddTicketCommentInput } = require('./types');

// Add ticket comment action defintion
var addTicketCommentMutation = {
    type: TicketCommentType,
    args: {
        commentData: { type: new graphql.GraphQLNonNull(AddTicketCommentInput) }
    },
    resolve: (source, args, context) => {
        return TicketComments
            .create({
                ticket: args.commentData.ticketId,
                comment: args.commentData.comment
            })
            .then(record => {
                
                return {
                    ...record._doc
                }
            })
            .catch(err => {
                throw err;
            })
    }
};

// Module definition
exports.addTicketComment = addTicketCommentMutation;