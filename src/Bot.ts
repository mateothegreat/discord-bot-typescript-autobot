import { oneLine }             from 'common-tags';
import { CommandoClient }      from 'discord.js-commando';
import * as path               from 'path';
import { GreetingHandler }     from './Handlers/GreetingHandler';
import { GuildAddHandler }     from './Handlers/GuildAddHandler';
import { KarmaPointHandler }   from './Handlers/KarmaPointHandler';
import { MessageHandler }      from './Handlers/MessageHandler';
import { VoiceChannelHandler } from './Handlers/VoiceChannelHandler';
import { Logger }              from './Logger';

export let CLIENT: CommandoClient;

export class Bot {

    private client: CommandoClient;

    public start(token: string): void {

        Logger.log('Starting bot...');

        this.client = new CommandoClient({

            commandPrefix: '>',
            messageCacheLifetime: 30,
            messageSweepInterval: 60,
            unknownCommandResponse: true,
            owner: process.env.OWNER_ID

        });

        CLIENT = this.client;

        this.client

            .on('error', Logger.log)

            .on('warn', Logger.log)

            .on('debug', Logger.log)

            .on('ready', () => {

                Logger.log(`Client ready; logged in as ${ this.client.user.username }#${ this.client.user.discriminator } (${ this.client.user.id })`);

                this.client.user.setPresence({
                    game: {
                        name: 'all the things!',
                        type: 'WATCHING',
                    },
                    status: 'idle'
                });

                // CLIENT.guilds.first().channels.get('548784663909629952').send(`Bot restart, online now :clap:`);

            })

            .on('disconnect', () => {

                Logger.log('Disconnected!');

            })

            .on('reconnecting', () => {

                Logger.log('Reconnecting...');

            })

            .on('commandError', (cmd, err) => {

                Logger.log(`Error in command ${ cmd.groupID }:${ cmd.memberName }`, err);

            })

            .on('commandBlocked', (msg, reason) => {

                Logger.log(oneLine`Command ${ msg.command ? `${ msg.command.groupID }:${ msg.command.memberName }` : '' } blocked; ${ reason }`);

            })

            .on('commandPrefixChange', (guild, prefix) => {

                Logger.log(oneLine`Prefix ${ prefix === '' ? 'removed' : `changed to ${ prefix || 'the default' }` } ${ guild ? `in guild ${ guild.name } (${ guild.id })` : 'globally' }.`);

            })

            .on('commandStatusChange', (guild, command, enabled) => {

                Logger.log(oneLine`Command ${ command.groupID }:${ command.memberName } ${ enabled ? 'enabled' : 'disabled' } ${ guild ? `in guild ${ guild.name } (${ guild.id })` : 'globally' }.`);
            })

            .on('groupStatusChange', (guild, group, enabled) => {

                Logger.log(oneLine`Group ${ group.id }${ enabled ? 'enabled' : 'disabled' }${ guild ? `in guild ${ guild.name } (${ guild.id })` : 'globally' }.`);

            })

            .on('guildMemberAdd', (member => {

                GreetingHandler.handle(member);
                GuildAddHandler.handle(member);

            }))

            .on('voiceStateUpdate', (oldMember, newMember) => {

                VoiceChannelHandler.handle(oldMember, newMember);

            })

            .on('message', (message => {

                MessageHandler.handleMessage(message);
                KarmaPointHandler.handle(message);

            }));

        this.client.registry.registerGroups([

            [ 'info', 'Info' ],
            [ 'fun', 'Fun Stuff' ],
            [ 'karma', 'Karma Points' ],
            [ 'kb', 'Knowledgebase' ],
            [ 'moderation', 'Moderation Commands' ],
            [ 'profile', 'Manage your Extended Profile' ],
            [ 'programming', 'Programming/Development' ],
            [ 'trivia', 'Polls' ],
            [ 'raffle', 'Raffle' ],
            [ 'search', 'Search' ],
            [ 'xp', 'XP' ],

        ]).registerDefaults().registerCommandsIn(path.join(__dirname, 'Commands'));

        this.client.login(token).then(() => {

            Logger.log('Bot logged into discord server..');

        });

    }

}


