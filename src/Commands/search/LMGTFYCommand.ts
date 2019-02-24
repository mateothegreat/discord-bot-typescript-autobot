// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';

export default class LMGTFYCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'google',
            aliases: [ 'lmgtfy' ],
            group: 'search',
            memberName: 'google',
            description: 'Creates a lmgtfy.com link',
            guildOnly: false,
            throttling: {

                usages: 2,
                duration: 30

            }

        });

    }

    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        return msg.embed({

            color: 3447003,
            description: 'cough cough',
            fields: [ {

                name: 'Let me google that for you..',
                value: `https://lmgtfy.com/?q=${ encodeURI(msg.argString) }`,
                inline: true

            } ]

        });

    }

}
