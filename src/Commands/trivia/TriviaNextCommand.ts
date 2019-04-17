import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import { TriviaPoint }                             from '../../db/entities/TriviaPoint';
import { TriviaQuestion }                          from '../../db/entities/TriviaQuestion';
import { DB }                                      from '../../index';

export default class TriviaNextCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'trivia.next',
            aliases: [ 'trivia' ],
            group: 'trivia',
            memberName: 'trivia.next',
            description: 'Asks a trivia question',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 30000

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        let question: TriviaQuestion;

        const matches = message.content.match(/(\d+)/);

        if (!!matches) {

            question = await DB.getRepository(TriviaQuestion)
                               .createQueryBuilder('trivia_question')
                               .select([ 'id', 'question', 'answer' ])
                               .where('id = :id', { id: matches[ 1 ] })
                               .getRawOne();

        } else {

            question = await DB.getRepository(TriviaQuestion)
                               .createQueryBuilder('trivia_question')
                               .select([ 'id', 'question', 'answer' ])
                               .orderBy('RAND()')
                               .limit(1)
                               .getRawOne();

        }

        if (question) {

            const filter = (response: any) => {

                return question.answer.toLowerCase() === response.content.toLowerCase();

            };

            message.channel.sendEmbed({

                color: 3447003,
                description: `${ question.question }`

            }).then(() => {

                message.channel
                       .awaitMessages(filter, { maxMatches: 1, time: 60 * 60 * 1000, errors: [ 'time' ] })
                       .then(collected => {

                           message.channel.send(`Woohoo <@${ collected.first().author.id }>! You got the correct answer & earned a point!\nUse \`>trivia.stats\` to see the leaderboard!`);

                           const point: TriviaPoint = new TriviaPoint();

                           point.userid = collected.first().author.id;
                           point.username = collected.first().author.username;
                           point.discriminator = collected.first().author.discriminator;
                           point.question_id = question.id;

                           DB.manager.save(point);

                       })
                       .catch(() => {

                           message.channel.send(`Looks like nobody got the answer this time. The correct answer was '${ question.answer ? 'true' : 'false' }'.`);

                       });

            });

        } else {

            return message.channel.send(`Could not locate question id ${ matches[ 1 ] } :sob:`);

        }

    }

}
