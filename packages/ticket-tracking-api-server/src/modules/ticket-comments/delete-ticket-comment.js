const graphql = require('graphql');
const TicketComments = require('../../models/ticket-comments');

// Delete ticket comment action defintion
var deleteTicketCommentMutation = {
    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    args: {
        commentId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
    },
    resolve: (source, { commentId }, args, context) => {

        return TicketComments.deleteOne({ _id: commentId }).then(result => {

            if (result.ok) {

                return result.deletedCount > 0 ? 'deleted' : `No ticket comment found with id: ${commentId}`;

            } else throw new Error(`Failed to delete ticket comment with id: ${commentId}`);

        }).catch(err => {
            throw err;
        })
    }
};

// Module definition
exports.deleteTicketComment = deleteTicketCommentMutation;