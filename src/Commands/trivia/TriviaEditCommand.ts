// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { TriviaQuestion }                          from '../../db/entity/TriviaQuestion';
import { DB }                                      from '../../index';

export default class TriviaNextCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'trivia.edit',
            aliases: [ 'trivia.edit' ],
            group: 'trivia',
            memberName: 'trivia.edit',
            description: 'Edit trivia question by id number',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 5000

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
        }

        if (question) {

            const matches = message.content.match(/(\d+)\s+([a-z]+)\s+(.*?)$/s);

            console.log(matches);

            if (matches) {

                if (matches[ 2 ] === 'question') {

                    question.question = matches[ 3 ];

                } else if (matches[ 2 ] === 'answer') {

                    question.answer = matches[ 3 ];

                } else if (matches[ 2 ] === 'description') {

                    question.description = matches[ 3 ];

                } else {

                    return message.channel.send("Argument not found.\n\nUsage:\n> trivia.edit # question|answer|description");

                }

                DB.createQueryBuilder().update(TriviaQuestion).set(question).where('id = :id', { id: matches[ 1 ] }).execute();

                return message.channel.send(`Question #${ question.id } has been saved!`);

            } else {

                return message.channel.send("Argument not found.\n\nUsage:\n> trivia.edit # question|answer|description");

            }

        } else {

            return message.channel.send(`Could not locate question id ${ matches[ 1 ] } :sob:`);

        }

    }

}
