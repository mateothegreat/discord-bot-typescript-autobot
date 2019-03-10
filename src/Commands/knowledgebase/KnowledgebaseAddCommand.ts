import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { Config }                                  from '../../Config';
import { KB }                                      from '../../db/entity/KB';
import { DB }                                      from '../../index';

export default class KnowledgebaseAddCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'kb.add',
            aliases: [ 'kb.add' ],
            group: 'kb',
            memberName: 'kb.add',
            description: 'Adds a knowledgebase entry.',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 3

            }

        });

    }

    // @ts-ignore
    public async run(message: CommandMessage): Promise<Message | Message[]> {

        if (message.member.roles.find(role => Config.ROLES_ADMIN.indexOf(role.name) > -1)) {

            const matches = message.content.match(/kb\.add\s+(.*?)/);

            const kb: KB = new KB();

            kb.title = matches[ 1 ];

            const inserted = await DB.manager.save(kb);

            message.channel.send(`Knowledgebase #${ inserted.id } entry has been added!`);

        } else {

            message.channel.send('You do not have permissions to do that bob :sob:');

        }

    }

}
