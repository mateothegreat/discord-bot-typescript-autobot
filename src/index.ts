import * as dotenv                      from 'dotenv';

import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { Bot }                          from './Bot';
import { ChatMessage }                  from './db/entity/ChatMessage';
import { Poll }                         from './db/entity/Poll';

export let DB: Connection;

dotenv.config();

async function dbConnect() {

    try {

        DB = await createConnection({

            type: "mysql",
            host: "localhost",
            port: 6603,
            username: "root",
            password: "mysql",
            database: "autobot",
            entities: [
                ChatMessage,
                Poll
            ],
            synchronize: true,
            logging: true

        });

    } catch (e) {

        console.log(e);

    }

}

dbConnect();

const bot: Bot = new Bot();

bot.start(process.env.TOKEN);

