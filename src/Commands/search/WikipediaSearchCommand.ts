import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import wiki                                        from 'wikijs';

export default class WikipediaSearchCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'wiki',
            group: 'search',
            memberName: 'wiki',
            description: 'Searches wikipedia',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 3

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        const matches = message.content.match(/>\s?wiki\s+(.*)/);

        if (matches) {

            const result = await wiki().find(matches[ 1 ]);

            const summary = await result.summary();
            const image = await result.mainImage();

            return message.channel.send(new RichEmbed().setAuthor('wikipedia')
                                                       // @ts-ignore
                                                       .setTitle(result.raw.title)
                                                       .setDescription(`${ summary.substr(0, 200) }...`)
                                                       // @ts-ignore
                                                       .setURL(result.raw.fullurl)
                                                       .setThumbnail(image)
                                                       // @ts-ignore
                                                       .setFooter(result.raw.fullurl));
            
        }

    }

}
