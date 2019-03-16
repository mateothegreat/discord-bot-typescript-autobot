// @ts-ignore
import { Message, RichEmbed, User }                from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import { CLIENT }                                  from '../../Bot';
import { Profile }                                 from '../../db/entities/Profile';
import { DB }                                      from '../../index';

export default class ProfileViewCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'profile',
            group: 'profile',
            aliases: [ 'profile.view' ],
            memberName: 'profile',
            description: 'View a members extended profile.',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 1000

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        const userid = message.content.match(/([\d]{18,})/);

        const user: User = await CLIENT.fetchUser((userid) ? userid[ 1 ] : message.author.id);

        if (user) {

            let profile: Profile = await DB.getRepository(Profile)
                                           .createQueryBuilder('profile')
                                           .select('*')
                                           .where('userid = :userid AND username = :username AND discriminator = :discriminator', {

                                               userid: user.id,
                                               username: user.username,
                                               discriminator: user.discriminator

                                           })
                                           .getRawOne();

            if (profile) {

                return message.channel.sendEmbed(new RichEmbed().setThumbnail(user.avatarURL)
                                                                .setTitle((profile && !!profile.title) ? profile.title : '_none_')
                                                                .setDescription((profile && !!profile.about) ? profile.about : '_none_')
                                                                .addField('Public Email', (profile && !!profile.email) ? profile.email : '_none_')
                                                                .addField('Public Site(s)', (profile && !!profile.sites) ? profile.sites : '_none_')
                                                                .addField('GitHub Profile', (profile && !!profile.github) ? profile.github : '_none_')
                                                                .addField('LinkedIn Profile', (profile && !!profile.linkedin) ? profile.linkedin : '_none_')
                                                                .addField('Twitter Profile', (profile && !!profile.twitter) ? profile.twitter : '_none_')
                                                                .addField('Facebook Profile', (profile && !!profile.facebook) ? profile.facebook : '_none_')
                                                                .addField('Skype Username', (profile && !!profile.skype) ? profile.skype : '_none_')
                                                                .setFooter(`Update your own profile by messaging BitBot and sending >profile.edit`));

            } else {

                return message.channel.send(`The user <@${ user.id }> does not have a profile yet.`);

            }

        } else {

            return message.channel.send('User not found :sob:');

        }

    }

}
