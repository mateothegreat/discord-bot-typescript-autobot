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
require("moment-duration-format");
const ChatMessage_1 = require("../../db/entity/ChatMessage");
const index_1 = require("../../index");
const { version } = require('../../../package');
class InfoCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'xp.messages',
            aliases: ['messages'],
            group: 'xp',
            memberName: 'xp.messages',
            description: 'Displays message statistics',
            guildOnly: false,
            throttling: {
                usages: 2,
                duration: 30
            }
        });
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield index_1.DB.getRepository(ChatMessage_1.ChatMessage)
                .createQueryBuilder('chat_messages')
                .select(['userid', 'discriminator', 'username', 'COUNT(chat_messages.id) AS total'])
                .orderBy('total', 'DESC')
                .groupBy('userid,discriminator,username')
                .limit(10)
                .getRawMany();
            let fields = [];
            results.forEach(row => {
                fields.push({
                    name: `❯ ${row.total} messages`,
                    value: `<@${row.userid}>`,
                    inline: true
                });
            });
            return msg.embed({
                color: 3447003,
                description: '**Top 10 Chatterboxes**',
                fields
            });
        });
    }
}
exports.default = InfoCommand;
//# sourceMappingURL=XPMessageStats.js.map