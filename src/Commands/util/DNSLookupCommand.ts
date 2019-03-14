import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

const exec = require('child_process').exec;
export default class PortScanCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'dig',
            group: 'util',
            memberName: 'dig',
            description: 'Performs dns record lookups. (`>dig A matthewdavis.io`)',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 30

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        const matches = message.content.match(/>\s?dig\s+(\w+)\s+([a-z0-9.-]+)/i);

        if (matches && matches.length === 3) {

            const ports = matches[ 1 ].split(',');

            if (ports.length <= 5) {

                exec(`dig ${ matches[ 1 ] } ${ matches[ 2 ] }`, (error: string, stdout: string, stderr: string) => {

                    console.log(error);
                    console.log(stdout);
                    console.log(stderr);

                    return message.channel.send(new RichEmbed().setTitle(`DNS Record Lookup for ${ matches[ 2 ] }`)
                                                               .setDescription(stdout || stderr)
                                                               .setFooter(`Run this command yourself with: dig ${ matches[ 1 ].toUpperCase() } ${ matches[ 2 ] }`));

                });

            }

        } else {

            return message.channel.send('Invalid format. try `>dig <record type> <hostname>`');

        }

    }

}
