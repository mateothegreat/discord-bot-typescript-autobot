import { Message }     from 'discord.js';
import { ChatMessage } from '../db/entity/ChatMessage';
import { DB }          from '../index';

export class MessageHandler {

    public static handleMessage(message: Message): void {

        if (!message.author.bot) {

            let chatMessage: ChatMessage = new ChatMessage();

            chatMessage.userid = message.author.id;
            chatMessage.discriminator = message.author.discriminator;
            chatMessage.username = message.author.username;
            chatMessage.content = message.content;

            DB.manager.save(chatMessage);

        }

    }

}
