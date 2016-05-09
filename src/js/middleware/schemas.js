import { Schema, arrayOf } from 'normalizr';

const userSchema = new Schema('users', {
    idAttribute: '_id',
});

const peerSchema = new Schema('peers', {
    idAttribute: '_id'
});

const channelSchema = new Schema('channels', {
    idAttribute: '_id',
});

const ticketMessageSchema = new Schema('ticketsMessages', {
    idAttribute: '_id',
});

ticketMessageSchema.define({
    from: peerSchema
});

const ticketSchema = new Schema('tickets', {
    idAttribute: '_id',
});
ticketSchema.define({
    messages: arrayOf(ticketMessageSchema),
    chat: peerSchema
});

export default {
    USER: userSchema,
    PEER: peerSchema,
    USER_ARRAY: arrayOf(userSchema),
    CHANNEL: channelSchema,
    CHANNEL_ARRAY: arrayOf(channelSchema),
    TICKET: ticketSchema,
    TICKET_ARRAY: arrayOf(ticketSchema),
    TICKETMESSAGE: (ticketMessageSchema)
};



const wsMessage = new Schema('wsMessage');
wsMessage.define({
    message: ticketMessageSchema
});

const wsChannel = new Schema('wsChannel');
wsChannel.define({
    channel: channelSchema
});

const wsUser = new Schema('wsUser');
wsUser.define({
    user: userSchema
});

const wsTicket = new Schema('wsTicket');
wsTicket.define({
    ticket: ticketSchema
});

export const wsSchemas = {
    'message.sending': wsMessage,
    'message.sent': wsMessage,
    'message.received': wsMessage,

    'user.created': wsUser,
    'user.deleted': wsUser,

    'ticket.assigned': wsTicket,
    'ticket.received': wsTicket
}
