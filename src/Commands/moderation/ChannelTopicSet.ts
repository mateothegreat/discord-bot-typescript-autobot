// @ts-ignore
import { Channel, Message }                        from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import 'moment-duration-format';
import { Config }                                  from '../../Config';

export default class ChannelTopicSet extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'channel.topic',
            aliases: [ 'channel.topic' ],
            group: 'moderation',
            memberName: 'channel.topic',
            description: 'Sets a channel topic.',
            guildOnly: false,
            throttling: {

                usages: 2,
                duration: 30

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        if (message.member.roles.find(role => Config.ROLES_ADMIN.indexOf(role.name) > -1)) {

            const matches = message.cleanContent.match(/#(.*?):\s+(.*)/);

            if (matches.length === 3) {

                const channel: Channel = message.guild.channels.find(channel => channel.name === matches[ 1 ]);

                console.log(channel);

                if (channel) {

                    message.guild.channels.get(channel.id).setTopic(matches[ 2 ]);

                    return message.channel.send(`Topic for #${ matches[ 1 ] } set to: ${ matches[ 2 ] }`);

                } else {

                    return message.channel.send(`Could not find channel "${ matches[ 1 ] }"!`);

                }

            } else {

                return message.channel.send('Error, format should be: #channel-name: some topic');

            }

        } else {

            return message.channel.send('You do not have permissions to do that bob :sob:');

        }

    }

}
