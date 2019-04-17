import { GuildMember, Message, RichEmbed } from 'discord.js';
import { VoiceChannelActivity }            from '../db/entities/VoiceChannelActivity';
import { DB }                              from '../index';

export class VoiceChannelHandler {

    public static async handle(oldMember: GuildMember, newMember: GuildMember) {

        if (!!!oldMember.voiceChannelID && !!newMember.voiceChannelID) {

            const activity: VoiceChannelActivity = new VoiceChannelActivity();

            activity.userid = oldMember.user.id;
            activity.username = oldMember.user.username;
            activity.discriminator = oldMember.user.discriminator;
            activity.status = 'JOINED';

            DB.manager.save(activity);

            let channel = newMember.guild
                                   .channels
                                   .get('548990357996699651');
            // .get('548990357996699651');

            // @ts-ignore
            channel.sendEmbed(new RichEmbed().setColor('RANDOM')
                                             .setThumbnail(newMember.user.avatarURL)
                                             .setTitle('Join the voice chat partyline!')
                                             .setDescription(`<@${ newMember.user.id }> just joined voice chat.. say hi!`)).then((message: Message) => {

                message.delete(5 * 60 * 1000);

            });

        } else {

            const activity: VoiceChannelActivity = new VoiceChannelActivity();

            activity.userid = oldMember.user.id;
            activity.username = oldMember.user.username;
            activity.discriminator = oldMember.user.discriminator;
            activity.status = 'LEFT';

            DB.manager.save(activity);

        }

    }

}
