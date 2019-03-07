// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export default class FeedmeCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'feedme',
            aliases: [ 'feedme' ],
            group: 'fun',
            memberName: 'feedme',
            description: 'feedme',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 60000

            }

        });

    }

    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        return msg.channel.sendEmbed({
            color: 3447003,
            description: `nom nom nom`,
            files: [

                'assets/chikin.png'

            ]
        });

    }

}
