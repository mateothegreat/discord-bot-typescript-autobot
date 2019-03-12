import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

const exec = require('child_process').exec;
export default class PortScanCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'scan',
            group: 'util',
            memberName: 'scan',
            description: 'Checks for open ports against a host (`>scan 80,443 google.com`)',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 30

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        const matches = message.content.match(/>\s?scan\s+([\d,]+)\s+([a-z0-9.-]+)/i);

        console.log(matches);

        if (matches && matches.length === 3) {

            const ports = matches[ 1 ].split(',');

            if (ports.length <= 5) {

                exec(`nmap -Pn -p ${ ports.join(',') } ${ matches[ 2 ] }`, (error: string, stdout: string, stderr: string) => {

                    console.log(error);
                    console.log(stdout);
                    console.log(stderr);

                    return message.channel.send(new RichEmbed().setTitle(`Port Scan results for ${ matches[ 2 ] }`)
                                                               .setDescription(stdout || stderr)
                                                               .setFooter(`Run this command yourself with: nmap -Pn -p ${ ports.join(',') } ${ matches[ 2 ] }`));

                });

            } else {

                return message.channel.send('Cannot scan more than five ports!');

            }

        } else {

            return message.channel.send('Invalid format. try `>scan 80,443 google.com`');

        }

    }

}
