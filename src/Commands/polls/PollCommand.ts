// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';

export default class PollCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'poll.next',
            aliases: [ 'poll.next' ],
            group: 'polls',
            memberName: 'poll.next',
            description: 'Displays the next poll.',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 86400

            }

        });

    }

    // @ts-ignore
    public async run(message: CommandMessage): Promise<Message | Message[]> {

        const quiz = [

            {

                question: "True or False: Docker containers provide only immutable operating environments",
                answers: [ 'false' ]

            }, {

                question: "True or False: Docker containers provide only immutable operating environments",
                answers: [ 'false' ]

            }, ];

        const item = quiz[ Math.floor(Math.random() * quiz.length) ];

        const filter = (response: any) => {

            return item.answers.some((answer: any) => answer.toLowerCase() === response.content.toLowerCase());

        };

        message.channel.send(item.question).then(() => {

            message.channel
                   .awaitMessages(filter, { maxMatches: 1, time: 60 * 60 * 1000, errors: [ 'time' ] })
                   .then(collected => {

                       message.channel.send(`Thanks <@${ collected.first().author.id }>! You got the correct answer!`);

                   })
                   .catch(collected => {

                       message.channel.send(`Looks like nobody got the answer this time. The correct answer was '${ item.answers[ 0 ] }'.`);

                   });

        });

    }

}
