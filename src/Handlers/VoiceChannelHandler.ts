import { GuildMember, Message, RichEmbed } from 'discord.js';
import { VoiceChannelActivity }            from '../db/entity/VoiceChannelActivity';
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
                                   .get('548784663909629952');
            // .get('548990357996699651');

            const embed: RichEmbed = new RichEmbed().setColor('RANDOM')
                                                    .setThumbnail(newMember.user.avatarURL)
                                                    .setDescription(`<@${ newMember.user.id }> just joined voice chat.. say hi!`);

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
