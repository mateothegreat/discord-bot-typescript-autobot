import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

const { VM } = require('vm2');

export default class JavascriptCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'js',
            aliases: [ 'js' ],
            group: 'programming',
            memberName: 'js',
            description: 'Runs javascript code.',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 3000

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        // @ts-ignore
        const vm = new VM({

            timeout: 1000,

        });

        const matches = message.content.match(/>js (.*)$/);

        console.log(matches);

        const result = vm.run(`(${ matches[ 1 ] })`);

        const embed = new RichEmbed().setColor(0x00AE86)
                                     .setDescription(result);

        return message.embed(embed);

    }

}
