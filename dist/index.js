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
const dotenv = require("dotenv");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Bot_1 = require("./Bot");
const ChatMessage_1 = require("./db/entity/ChatMessage");
const KarmaPoint_1 = require("./db/entity/KarmaPoint");
const Poll_1 = require("./db/entity/Poll");
const RaffleUser_1 = require("./db/entity/RaffleUser");
dotenv.config();
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            exports.DB = yield typeorm_1.createConnection({
                type: "mysql",
                host: "localhost",
                port: 6603,
                username: "root",
                password: "mysql",
                database: "autobot",
                entities: [
                    ChatMessage_1.ChatMessage,
                    KarmaPoint_1.KarmaPoint,
                    Poll_1.Poll,
                    RaffleUser_1.RaffleUser
                ],
                synchronize: true,
                logging: true
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
dbConnect();
const bot = new Bot_1.Bot();
bot.start(process.env.TOKEN);
//# sourceMappingURL=index.js.map