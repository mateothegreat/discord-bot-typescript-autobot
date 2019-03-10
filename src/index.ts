import * as dotenv                      from 'dotenv';

import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { Bot }                          from './Bot';
import { ChatMessage }                  from './db/entity/ChatMessage';
import { KarmaPoint }                   from './db/entity/KarmaPoint';
import { KB }                           from './db/entity/KB';
import { Profile }                      from './db/entity/Profile';
import { RaffleUser }                   from './db/entity/RaffleUser';
import { TriviaPoint }                  from './db/entity/TriviaPoint';
import { TriviaQuestion }               from './db/entity/TriviaQuestion';
import { VoiceChannelActivity }         from './db/entity/VoiceChannelActivity';

export let DB: Connection;

dotenv.config();

async function dbConnect() {

    try {

        DB = await createConnection({

            type: "mysql",
            host: process.env.MYSQL_HOST,
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [
                ChatMessage,
                KarmaPoint,
                KB,
                Profile,
                RaffleUser,
                TriviaPoint,
                TriviaQuestion,
                VoiceChannelActivity
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

