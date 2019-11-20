const ticketPrefix = 'TC';

function PredictTicketNumber(oldTicketNumber) {
    let num;

    if (!oldTicketNumber) {
        num = 1;
    } else {
        num = parseInt(oldTicketNumber.replace(ticketPrefix, '')) + 1;
    }

    num = `000000${num}`.slice(-5);

    return `${ticketPrefix}${num}`;
}

module.exports = PredictTicketNumber;