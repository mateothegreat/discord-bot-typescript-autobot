"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_tags_1 = require("common-tags");
const discord_js_commando_1 = require("discord.js-commando");
const moment = require("moment");
require("moment-duration-format");
const { version } = require('../../../package');
class InfoCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            aliases: ['information'],
            group: 'util',
            memberName: 'info',
            description: 'Displays information about the bot.',
            guildOnly: false,
            throttling: {
                usages: 2,
                duration: 30
            }
        });
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const duration = moment.duration(this.client.uptime);
            return msg.embed({
                color: 3447003,
                description: '**AutoBot Statistics**',
                fields: [
                    {
                        name: '❯ Uptime',
                        value: duration.format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]'),
                        inline: true
                    }, {
                        name: '❯ Memory usage',
                        value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
                        inline: true
                    }, {
                        name: '❯ General Stats',
                        value: common_tags_1.stripIndents `
					• Guilds: ${this.client.guilds.size}
					• Channels: ${this.client.channels.size}
					• Users: ${this.client.guilds.map((guild) => guild.memberCount).reduce((a, b) => a + b)}
					`,
                        inline: true
                    }, {
                        name: '❯ Version',
                        value: `v${version}`,
                        inline: true
                    }
                ],
                thumbnail: { url: this.client.user.avatarURL }
            });
        });
    }
}
exports.default = InfoCommand;
//# sourceMappingURL=InfoCommand.js.map