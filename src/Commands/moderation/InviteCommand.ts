import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export default class InviteCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'invite',
            aliases: [ 'invite' ],
            group: 'moderation',
            memberName: 'invite',
            description: 'Sends an invite code to the channel.',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 3 * 60 * 1000

            }

        });

    }

    // @ts-ignore
    public async run(message: CommandMessage): Promise<Message | Message[]> {

        // const membersWithRoles = message.guild.members.filter(member => {
        //
        //     return member.roles.filter(role => {
        //
        //         return Config.ROLES_SEND_REPORTS_TO.indexOf(role.name) > -1
        //
        //     });
        //
        // });
        //
    }

}
