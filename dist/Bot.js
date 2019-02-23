"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_tags_1 = require("common-tags");
const discord_js_commando_1 = require("discord.js-commando");
const path = require("path");
const Logger_1 = require("./Logger");
const MessageHandler_1 = require("./Messages/MessageHandler");
class Bot {
    start(token) {
        Logger_1.Logger.log('Starting bot...');
        this.client = new discord_js_commando_1.CommandoClient({
            commandPrefix: '>',
            messageCacheLifetime: 30,
            messageSweepInterval: 60,
            unknownCommandResponse: true,
            owner: process.env.OWNER_ID
        });
        this.client
            .on('error', Logger_1.Logger.log)
            .on('warn', Logger_1.Logger.log)
            .on('debug', Logger_1.Logger.log)
            .on('ready', () => {
            Logger_1.Logger.log(`Client ready; logged in as ${this.client.user.username}#${this.client.user.discriminator} (${this.client.user.id})`);
        })
            .on('disconnect', () => {
            Logger_1.Logger.log('Disconnected!');
        })
            .on('reconnecting', () => {
            Logger_1.Logger.log('Reconnecting...');
        })
            .on('commandError', (cmd, err) => {
            Logger_1.Logger.log(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
        })
            .on('commandBlocked', (msg, reason) => {
            Logger_1.Logger.log(common_tags_1.oneLine `Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''} blocked; ${reason}`);
        })
            .on('commandPrefixChange', (guild, prefix) => {
            Logger_1.Logger.log(common_tags_1.oneLine `Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`} ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`);
        })
            .on('commandStatusChange', (guild, command, enabled) => {
            Logger_1.Logger.log(common_tags_1.oneLine `Command ${command.groupID}:${command.memberName} ${enabled ? 'enabled' : 'disabled'} ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`);
        })
            .on('groupStatusChange', (guild, group, enabled) => {
            Logger_1.Logger.log(common_tags_1.oneLine `Group ${group.id}${enabled ? 'enabled' : 'disabled'}${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`);
        })
            .on('message', (message => {
            MessageHandler_1.MessageHandler.handleMessage(message);
        }));
        this.client.registry.registerGroups([
            ['info', 'Info'],
            ['xp', 'XP']
        ]).registerDefaults().registerCommandsIn(path.join(__dirname, 'Commands'));
        this.client.login(token).then(() => {
            Logger_1.Logger.log('Bot logged into discord server..');
        });
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Bot.js.map