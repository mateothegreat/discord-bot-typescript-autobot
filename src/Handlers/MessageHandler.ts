import { Message, RichEmbed } from 'discord.js';
import { ChatMessage }        from '../db/entity/ChatMessage';
import { DB }                 from '../index';

export class MessageHandler {

    public static async handleMessage(message: Message) {

        if (!message.author.bot) {

            if (!message.member.roles.find(role => role.name === 'Bits')) {

                const results = await DB.getRepository(ChatMessage)
                                        .createQueryBuilder('chat_messages')
                                        .select([ 'COUNT(chat_messages.id) AS total' ])
                                        .where('userid = :userid', { userid: message.member.id })
                                        .getRawOne();

                if (results.total >= 15) {

                    message.member.addRole(message.guild.roles.find(role => role.name === 'Bits'));

                    const embed = new RichEmbed().setTitle(`Learn more about Server Roles..`)
                                                 .setDescription(`Congratulations <@${ message.member.id }>, you've received the Bits Role! You can now join the voice chat and #voice-text channels and raffles.`)
                                                 .setColor(0x00AE86)
                                                 .setURL("https://forum.bitmerge.org/t/roles");

                    // @ts-ignore
                    CLIENT.guilds.first().channels.get(message.channel.id).send({ embed });

                }

            }

            let chatMessage: ChatMessage = new ChatMessage();

            chatMessage.userid = message.author.id;
            chatMessage.discriminator = message.author.discriminator;
            chatMessage.username = message.author.username;
            chatMessage.content = message.content;

            // @ts-ignore
            chatMessage.channel = message.channel.name;

            DB.manager.save(chatMessage);

        }

    }

}
