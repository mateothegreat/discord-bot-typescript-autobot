// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { TriviaQuestion }                          from '../../db/entity/TriviaQuestion';
import { DB }                                      from '../../index';

export default class TriviaAddCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'trivia.add',
            aliases: [ 'trivia.add' ],
            group: 'trivia',
            memberName: 'trivia.add',
            description: 'Adds a trivia question. (i.e.: >trivia.add "some question": true)',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 10000

            }

        });

    }

    // @ts-ignore
    public async run(message: CommandMessage): Promise<Message | Message[]> {

        if (message.member.roles.find(role => role.name === 'Staff')) {

            const matches = message.cleanContent.match(/"(.*?)":\s+(\w+)/);

            const question: TriviaQuestion = new TriviaQuestion();

            question.question = matches[ 1 ];
            question.answer = Boolean(matches[ 2 ]);

            DB.manager.save(question);

            message.channel.send('Trivia Question has been added!');

        } else {

            message.channel.send('You do not have permissions to do that bob :sob:');

        }

    }

}
