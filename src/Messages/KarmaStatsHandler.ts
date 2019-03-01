import { Message, RichEmbed } from 'discord.js';
import { CLIENT }             from '../Bot';

export class KarmaStatsHandler {

    public static handle(message: Message): any {

        const matches = message.content.match(/(thanks|thank you).*?<@(.*?)>/);

        const embed = new RichEmbed().setTitle(`Learn more about Karma Points..`)
                                     .setDescription(`Congratulations <@${ member.id }>, you've received a Karma Point!`)
                                     .setAuthor(`Karma From ${ member.username }`)
                                     .setColor(0x00AE86)
                                     .setURL("https://forum.bitmerge.org/t/karma");

        // @ts-ignore
        CLIENT.guilds.first().channels.get(message.channel.id).send({ embed });

    }

}

