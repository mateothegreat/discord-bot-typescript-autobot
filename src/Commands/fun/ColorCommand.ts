import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export default class ColorCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'color',
            aliases: [ 'color' ],
            group: 'fun',
            memberName: 'color',
            description: 'Displays a color',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 60000

            }

        });

    }

    public run(msg: CommandMessage): Promise<Message | Message[]> {

        const matches = msg.content.match(/>color #(.*)/);

        const embed = new RichEmbed().setColor(parseInt(matches[ 1 ], 16))
                                     .setDescription(`#${ matches[ 1 ] }`);

        return msg.embed(embed);

    }

}
