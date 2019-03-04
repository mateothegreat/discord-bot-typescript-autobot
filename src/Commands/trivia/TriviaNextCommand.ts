// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';

export default class TriviaNextCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'trivia.next',
            aliases: [ 'trivia.next' ],
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

    // @ts-ignore
    public async run(message: CommandMessage): Promise<Message | Message[]> {

        const quiz = [

            {

                question: "True or False: Docker containers provide only immutable operating environments",
                answers: [ 'false' ]

            }, {

                question: "True or False: With Kubernetes, kube-scheduler runs on both worker and master nodes",
                answers: [ 'false' ]

            }, {

                question: "In a load balanced setup, at a minimum, how many nodes makes a 'quorom'?",
                answers: [ '3' ]

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
