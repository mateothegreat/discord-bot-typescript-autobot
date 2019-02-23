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
class PollCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            aliases: ['aa'],
            group: 'util',
            memberName: 'aa',
            description: 'Create a poll',
            guildOnly: false,
            throttling: {
                usages: 2,
                duration: 30
            }
        });
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(msg.content);
            return msg.embed({
                color: 3447003,
                description: '**AutoBot Statistics**',
                fields: [
                    {
                        name: '❯ Poll added',
                        value: msg.content,
                        inline: true
                    }
                ],
                thumbnail: { url: this.client.user.avatarURL }
            });
        });
    }
}
exports.PollCommand = PollCommand;
//# sourceMappingURL=PollCommand.js.map