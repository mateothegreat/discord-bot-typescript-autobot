// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { TriviaQuestion }                          from '../../db/entity/TriviaQuestion';
import { DB }                                      from '../../index';

export default class TriviaDeleteCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'trivia.delete',
            aliases: [ 'trivia.delete' ],
            group: 'trivia',
            memberName: 'trivia.delete',
            description: 'Deletes a trivia question. (i.e.: >trivia.delete 123)',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 1000

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        if (message.member.roles.find(role => role.name === 'Sudoers') || message.member.roles.find(role => role.name === 'Terabytes')) {

            const matches = message.cleanContent.match(/(\d+)/);

            await DB.createQueryBuilder().delete().from(TriviaQuestion).where('id = :id', { id: matches[ 1 ] }).execute();

            return message.channel.send(`Trivia Question # ${ matches[ 1 ] } has been deleted!`);

        } else {

            message.channel.send('You do not have permissions to do that bob :sob:');

        }

    }

}
