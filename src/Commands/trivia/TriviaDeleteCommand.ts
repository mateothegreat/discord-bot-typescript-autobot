import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { Config }                                  from '../../Config';
import { TriviaQuestion }                          from '../../db/entities/TriviaQuestion';
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

        if (message.member.roles.find(role => Config.ROLES_ADMIN.indexOf(role.name) > -1)) {

            const matches = message.cleanContent.match(/([\d]+)/g);

            for (let i = 0; i < matches.length; i++) {

                await DB.createQueryBuilder().delete().from(TriviaQuestion).where('id = :id', { id: matches[ i ] }).execute();

                message.channel.send(`Trivia Question # ${ matches[ i ] } has been deleted!`);

            }

        } else {

            return message.channel.send('You do not have permissions to do that bob :sob:');

        }

    }

}
