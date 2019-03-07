// @ts-ignore
import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export default class LMGTFYCommand extends Command {

    public static readonly HUGS: string[] = [

        'https://tenor.com/view/virtual-hug-ghost-hug-gif-7939501',
        'https://tenor.com/view/penguin-hug-virtual-gif-4532642',
        'https://thumbs.gfycat.com/AnyShadyDowitcher-small.gif',
        'https://tenor.com/view/virtual-hug-random-hug-gif-7939558'

    ];

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
                                     .setImage(LMGTFYCommand.HUGS[ Math.floor(Math.random() * LMGTFYCommand.HUGS.length) ]);

        return msg.embed(embed);

    }

}
