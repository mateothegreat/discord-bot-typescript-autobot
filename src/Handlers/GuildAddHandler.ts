import { GuildMember } from 'discord.js';
import { Logger }      from '../Logger';

export class GuildAddHandler {

    public static async handle(member: GuildMember) {

        if (!member.guild.roles.find(role => role.name === 'Bits')) {

            member.addRole(member.guild.roles.find(role => role.name === 'Active'));

            Logger.log(`Assigned new member "${ member.user.username }" the "Bits" Role.`);

        }
            
    }

}
