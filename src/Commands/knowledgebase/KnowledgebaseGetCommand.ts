import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import { KB }                                      from '../../db/entity/KB';
import { DB }                                      from '../../index';

export default class KnowledgebaseGetCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'kb',
            aliases: [ 'kb' ],
            group: 'kb',
            memberName: 'kb',
            description: 'Retrieves a KB entry (i.e.: `>kb docker`)',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 3

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        let kb: KB;

        const matches = message.content.match(/\s+(\w+)/);

        message.delete();
        
        if (matches) {

            kb = await DB.getRepository(KB)
                         .createQueryBuilder('kb')
                         .select('*')
                         .where('command = :command', { command: matches[ 1 ] })
                         .getRawOne();

        }

        if (kb) {

            return message.channel.send(new RichEmbed().setTitle(kb.title)
                                                       .setDescription(kb.content)
                                                       .setThumbnail(kb.thumbnail)
                                                       .setFooter(`Category: ${ kb.category }`));

        } else {

            return message.channel.send(`Could not locate kb entry "${ matches[ 1 ] }" :sob:`);

        }

    }

}
