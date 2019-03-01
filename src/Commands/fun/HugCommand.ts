// @ts-ignore
import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export default class LMGTFYCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'hug',
            aliases: [ 'hug' ],
            group: 'fun',
            memberName: 'hug',
            description: 'Sends a Virtual Hug',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 3600

            }

        });

    }

    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        const embed = new RichEmbed().setColor(0x00AE86)
                                     .setImage('https://thumbs.gfycat.com/AnyShadyDowitcher-small.gif');

        return msg.embed(embed);

    }

}
