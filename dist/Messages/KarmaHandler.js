"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KarmaHandler {
    static handle(message) {
        console.log(JSON.stringify(message.mentions.members.username));
        const matches = message.content.match(/(thanks|thank you).*?<@(.*?)>/);
        console.log(matches);
        if (matches.length > 0) {
            message.reply(`Way to go ${message.mentions.members.username}`);
        }
        // message.reply();
    }
}
exports.KarmaHandler = KarmaHandler;
//# sourceMappingURL=KarmaHandler.js.map