import { Message } from 'discord.js';

export class KarmaHandler {

    public static handle(message: Message): void {

        console.log(JSON.stringify(message.mentions.members.username));

        const matches = message.content.match(/(thanks|thank you).*?<@(.*?)>/);
        console.log(matches);

        if (matches.length > 0) {

            message.reply(`Way to go ${ message.mentions.members.username }`);

        }
        // message.reply();
    }

}
