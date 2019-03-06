// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { TriviaQuestion }                          from '../../db/entity/TriviaQuestion';
import { DB }                                      from '../../index';

export default class TriviaListCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'trivia.list',
            aliases: [ 'trivia.list' ],
            group: 'trivia',
            memberName: 'trivia.list',
            description: 'Lists trivia questions.',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 1000

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        if (message.member.roles.find(role => role.name === 'Sudoers') || message.member.roles.find(role => role.name === 'Terabytes')) {

            const results = await DB.getRepository(TriviaQuestion)
                                    .createQueryBuilder('trivia_question')
                                    .select([ 'id', 'question', 'answer' ])
                                    .orderBy('id', 'DESC')
                                    .limit(100)
                                    .getRawMany();

            let fields: any[] = [];

            results.forEach(row => {

                fields.push({

                    name: `#${ row.id }`,
                    value: `❯ ${ row.question }`,
                    inline: false

                });

            });

            return message.embed({

                color: 3447003,
                description: '**Trivia Questions**',
                fields

            });


        } else {

            message.channel.send('You do not have permissions to do that bob :sob:');

        }

    }

}
