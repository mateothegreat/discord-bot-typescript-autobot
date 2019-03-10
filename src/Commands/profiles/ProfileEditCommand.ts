// @ts-ignore
import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import { Profile }                                 from '../../db/entity/Profile';
import { DB }                                      from '../../index';

export default class ProfileEditCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'profile.edit',
            group: 'profile',
            memberName: 'profile.edit',
            description: 'Updates your profile field(s).',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 1000

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        const matches = message.content.match(/>\s?profile\.edit\s+(\w+)\s+(.*)/);

        let profile: Profile = await DB.getRepository(Profile)
                                       .createQueryBuilder('profile')
                                       .select('*')
                                       .where('userid = :userid AND username = :username AND discriminator = :discriminator', {

                                           userid: message.author.id,
                                           username: message.author.username,
                                           discriminator: message.author.discriminator

                                       })
                                       .getRawOne();

        if (matches && matches.length === 3) {

            if (!profile) {

                profile = new Profile();

            }

            if (matches[ 1 ] === 'title') profile.title = matches[ 2 ];
            else if (matches[ 1 ] === 'about') profile.about = matches[ 2 ];
            else if (matches[ 1 ] === 'email') profile.email = matches[ 2 ];
            else if (matches[ 1 ] === 'sites') profile.sites = matches[ 2 ];
            else if (matches[ 1 ] === 'github') profile.github = matches[ 2 ];
            else if (matches[ 1 ] === 'linkedin') profile.linkedin = matches[ 2 ];
            else if (matches[ 1 ] === 'twitter') profile.twitter = matches[ 2 ];
            else if (matches[ 1 ] === 'facebook') profile.facebook = matches[ 2 ];
            else if (matches[ 1 ] === 'skype') profile.skype = matches[ 2 ];

            if (!profile.id) {

                profile.userid = message.author.id;
                profile.username = message.author.username;
                profile.discriminator = message.author.discriminator;

                DB.manager.save(profile);

            } else {

                DB.createQueryBuilder().update(Profile).set(profile).where('id = :id', { id: profile.id }).execute();

            }

        }

        return message.channel.sendEmbed(new RichEmbed().setThumbnail(message.author.avatarURL)
                                                        .setTitle((profile && !!profile.title) ? profile.title : 'Use `>profile.edit title Your Title Here` to update.')
                                                        .setDescription((profile && !!profile.about) ? profile.about : 'Use `>profile.edit about Some awesome stuff about you here.` to update.')
                                                        .addField('Public Email', (profile && !!profile.email) ? profile.email : 'Use `>profile.edit email you@yourself.com` to update.')
                                                        .addField('Public Site(s)', (profile && !!profile.sites) ? profile.sites : 'Use `>profile.edit sites https://google.com` to update.')
                                                        .addField('GitHub Profile', (profile && !!profile.github) ? profile.github : 'Use `>profile.edit github <url>` to update.')
                                                        .addField('LinkedIn Profile', (profile && !!profile.linkedin) ? profile.linkedin : 'Use `>profile.edit linkedin <url>` to update.')
                                                        .addField('Twitter Profile', (profile && !!profile.twitter) ? profile.twitter : 'Use `>profile.edit twitter <url>` to update.')
                                                        .addField('Facebook Profile', (profile && !!profile.facebook) ? profile.facebook : 'Use `>profile.edit facebook <url>` to update.')
                                                        .addField('Skype Username', (profile && !!profile.skype) ? profile.skype : 'Use `>profile.edit skype username` to update.')
                                                        .setFooter(`Fields left blank will be ommitted.\n**This information will be available to other users on the server who query your profile via >profile @${ message.author.username }**`));

    }

}
