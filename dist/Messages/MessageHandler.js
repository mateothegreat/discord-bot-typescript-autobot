"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChatMessage_1 = require("../db/entity/ChatMessage");
const index_1 = require("../index");
class MessageHandler {
    static handleMessage(message) {
        if (!message.author.bot) {
            let chatMessage = new ChatMessage_1.ChatMessage();
            chatMessage.userid = message.author.id;
            chatMessage.discriminator = message.author.discriminator;
            chatMessage.username = message.author.username;
            chatMessage.content = message.content;
            index_1.DB.manager.save(chatMessage);
        }
    }
}
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=MessageHandler.js.map