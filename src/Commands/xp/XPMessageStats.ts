// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { ChatMessage }                             from '../../db/entity/ChatMessage';
import { DB }                                      from '../../index';

const { version }: { version: string } = require('../../../package');

export default class InfoCommand extends Command {

    constructor(client: CommandoClient) {

        super(client, {

            name: 'xp.messages',
            aliases: [ 'messages' ],
            group: 'xp',
            memberName: 'xp.messages',
            description: 'Displays message statistics',
            guildOnly: false,
            throttling: {

                usages: 2,
                duration: 30

            }

        });

    }

    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        const results = await DB.getRepository(ChatMessage)
                                .createQueryBuilder('chat_messages')
                                .select([ 'userid', 'discriminator', 'username', 'COUNT(chat_messages.id) AS total' ])
                                .orderBy('total', 'DESC')
                                .groupBy('userid,discriminator,username')
                                .limit(10)
                                .getRawMany();

        let fields: any[] = [];

        results.forEach(row => {

            fields.push({

                name: `❯ ${ row.total } messages`,
                value: `<@${ row.userid }>`,
                inline: true

            });
        });

        return msg.embed({

            color: 3447003,
            description: '**Top 10 Chatterboxes**',
            fields

        });

    }

}
