import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { Config }                                  from '../../Config';
import { KB }                                      from '../../db/entities/KB';
import { DB }                                      from '../../index';

export default class KnowledgebaseEditCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'kb.edit',
            aliases: [ 'kb.edit' ],
            group: 'kb',
            memberName: 'kb.edit',
            description: 'Manage a knowlesgebase entry',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 5000

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        if (message.member.roles.find(role => Config.ROLES_ADMIN.indexOf(role.name) > -1)) {

            let kb: KB;

            const matches = message.content.match(/(\d+)/);

            if (!!matches) {

                kb = await DB.getRepository(KB)
                             .createQueryBuilder('kb')
                             .select('*')
                             .where('id = :id', { id: matches[ 1 ] })
                             .getRawOne();
            }

            if (kb) {

                const matches = message.content.match(/(\d+)\s+([a-z]+)\s+(.*?)$/s);

                if (matches) {

                    if (matches[ 2 ] === 'command') {

                        kb.command = matches[ 3 ];

                    } else if (matches[ 2 ] === 'category') {

                        kb.category = matches[ 3 ];

                    } else if (matches[ 2 ] === 'title') {

                        kb.title = matches[ 3 ];

                    } else if (matches[ 2 ] === 'content') {

                        kb.content = matches[ 3 ];

                    } else if (matches[ 2 ] === 'footer') {

                        kb.footer = matches[ 3 ];

                    } else if (matches[ 2 ] === 'thumbnail') {

                        kb.thumbnail = matches[ 3 ];

                    } else if (matches[ 2 ] === 'image') {

                        kb.image = matches[ 3 ];

                    } else {

                        return message.channel.send("Argument not found.\n\nUsage:\n> kb.edit # command|category|title|content|footer|thumbnail|image <value>");

                    }

                    DB.createQueryBuilder().update(KB).set(kb).where('id = :id', { id: matches[ 1 ] }).execute();

                    return message.channel.send(`KB #${ kb.id } has been saved!`);

                } else {

                    return message.channel.send("Argument not found.\n\nUsage:\n> kb.edit # command|category|title|content|footer|thumbnail|image <value>");

                }

            } else {

                return message.channel.send(`Could not locate KB id ${ matches[ 1 ] } :sob:`);

            }

        } else {

            return message.channel.send('You do not have permissions to do that bob :sob:');

        }

    }

}
