const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    senderID: {
        type: String,
        ref: 'User',
        required: true
    },
    receiverID: {
        type: String,
        ref: 'User',
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    messageStatus: {
        type: String,
        enum: ['Delivered', 'Read', 'Typing'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
