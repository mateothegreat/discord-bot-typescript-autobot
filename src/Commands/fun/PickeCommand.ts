// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export default class PickeCommand extends Command {

    public static readonly HUGS: string[] = [

        'https://thumbs.gfycat.com/AnyShadyDowitcher-small.gif',

    ];

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'pickle',
            aliases: [ 'pickle' ],
            group: 'fun',
            memberName: 'pickle',
            description: 'Sends a Virtual pickle',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 3600

            }

        });

    }

    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        return msg.channel.sendEmbed({
            color: 3447003,
            description: 'you get a pickle! everybody gets a pickle!',
            files: [

                'assets/pickle.gif'

            ]
        });
    }

}
