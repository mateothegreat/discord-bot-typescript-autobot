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
const discord_js_commando_1 = require("discord.js-commando");
const moment = require("moment");
require("moment-duration-format");
const { version } = require('../../../package');
class InfoCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            aliases: ['poll'],
            group: 'util',
            memberName: 'poll',
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
            console.log(msg);
            const duration = moment.duration(this.client.uptime);
            return msg.embed({
                color: 3447003,
                description: '**Trivia Manager**',
                fields: [
                    {
                        name: '❯ Created Trivia Post',
                        value: msg.argString,
                        inline: false
                    }
                ],
            });
        });
    }
}
exports.default = InfoCommand;
//# sourceMappingURL=asdf.js.map