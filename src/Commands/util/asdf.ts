import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import * as moment                                 from 'moment';
import 'moment-duration-format';

interface Duration extends moment.Duration {

    format: (template?: string, precision?: number, settings?: DurationSettings) => string;

}

interface DurationSettings {

    forceLength: boolean;
    precision: number;
    template: string;
    trim: boolean | 'left' | 'right';

}

const { version }: { version: string } = require('../../../package');

export default class InfoCommand extends Command {

    constructor(client: CommandoClient) {

        super(client, {

            name: 'poll',
            aliases: [ 'poll' ],
            group: 'util',
            memberName: 'poll',
            description: 'Displays information about the bot.',
            guildOnly: false,
            throttling: {

                usages: 2,
                duration: 30

            }

        });

    }

    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        console.log(msg);

        const duration: Duration = moment.duration(this.client.uptime) as Duration;

        return msg.embed({

            color: 3447003,
            description: '**Trivia Manager**',
            fields: [

                {

                    name: '❯ Created Trivia Post',
                    value: msg.argString,
                    inline: false

                }

            ],

            // thumbnail: { url: this.client.user.avatarURL }

        });

    }

}
