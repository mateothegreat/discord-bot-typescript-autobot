// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { KarmaPoint }                              from '../../db/entities/KarmaPoint';
import { DB }                                      from '../../index';

export default class KarmaStatsCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'karmastats',
            aliases: [ 'karmastats' ],
            group: 'karma',
            memberName: 'karmastats',
            description: 'Displays karma statistics',
            guildOnly: false,
            throttling: {

                usages: 2,
                duration: 30

            }

        });

    }

    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        const results = await DB.getRepository(KarmaPoint)
                                .createQueryBuilder('karma_point')
                                .select([ 'to_userid', 'to_discriminator', 'to_username', 'COUNT(karma_point.id) AS total' ])
                                .orderBy('total', 'DESC')
                                .groupBy('to_userid,to_discriminator,to_username')
                                .limit(22)
                                .getRawMany();

        let fields: any[] = [];

        results.forEach(row => {

            fields.push({

                name: `❯ ${ row.total } points`,
                value: `<@${ row.to_userid }>`,
                inline: true

            });

        });

        return await msg.embed({

            color: 3447003,
            description: '**Karma Points Leaderboard**',
            fields

        });


    }

}
