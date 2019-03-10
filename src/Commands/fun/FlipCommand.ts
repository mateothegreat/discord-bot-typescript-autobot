import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export default class LMGTFYCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'flip',
            aliases: [ 'flip' ],
            group: 'fun',
            memberName: 'flip',
            description: 'Picks a random value from a | delimited string. (i.e.: >flip yes|no|maybe',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 60000

            }

        });

    }

    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        console.log(msg.content);

        const matches = msg.content.replace(/>\s?flip\s/, '').split('|');

        const embed = new RichEmbed().setColor(0x00AE86)
                                     .setDescription(matches[ Math.floor(Math.random() * matches.length) ]);

        return msg.embed(embed);

    }

}
