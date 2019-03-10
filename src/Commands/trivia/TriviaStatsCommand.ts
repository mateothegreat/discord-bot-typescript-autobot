import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { TriviaPoint }                             from '../../db/entity/TriviaPoint';
import { DB }                                      from '../../index';

export default class TriviaStatsCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'trivia.stats',
            aliases: [ 'trivia.stats' ],
            group: 'trivia',
            memberName: 'trivia.stats',
            description: 'Displays trivia leaderboard',
            guildOnly: false,
            throttling: {

                usages: 2,
                duration: 30

            }

        });

    }

    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        const results = await DB.getRepository(TriviaPoint)
                                .createQueryBuilder('trivia_point')
                                .select([ 'userid', 'discriminator', 'username', 'COUNT(trivia_point.id) AS total' ])
                                .orderBy('total', 'DESC')
                                .groupBy('userid,discriminator,username')
                                .limit(10)
                                .getRawMany();

        let fields: any[] = [];

        results.forEach(row => {

            fields.push({

                name: `❯ ${ row.total } points`,
                value: `<@${ row.userid }>`,
                inline: true

            });

        });

        return await msg.embed({

            color: 3447003,
            description: '**Trivia Points Leaderboard**',
            fields

        });


    }

}
