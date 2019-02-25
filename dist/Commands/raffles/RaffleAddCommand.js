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
const RaffleUser_1 = require("../../db/entity/RaffleUser");
const index_1 = require("../../index");
class LMGTFYCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'raffleadd',
            aliases: ['raffleadd'],
            group: 'raffle',
            memberName: 'raffleadd',
            description: 'Adds a user to the current raffle.',
            guildOnly: false,
            throttling: {
                usages: 1,
                duration: 3600
            }
        });
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.author.bot) {
                let raffleUser = new RaffleUser_1.RaffleUser();
                raffleUser.userid = message.author.id;
                raffleUser.discriminator = message.author.discriminator;
                raffleUser.username = message.author.username;
                index_1.DB.manager.save(raffleUser);
            }
            return message.embed({
                color: 3447003,
                description: 'Mohthly Raffle',
                fields: [{
                        name: `❯ You've been added to this months raffle!`,
                        value: `1-month Nitro gift by one of our members. Use > raffleadd to get your hat in the ring! Raffles results will be announced at the end of the month.`,
                        inline: true
                    }]
            });
        });
    }
}
exports.default = LMGTFYCommand;
//# sourceMappingURL=RaffleAddCommand.js.map