import * as dotenv                      from 'dotenv';

import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { Bot }                          from './Bot';
import { ChatMessage }                  from './db/entities/ChatMessage';
import { KarmaPoint }                   from './db/entities/KarmaPoint';
import { KB }                           from './db/entities/KB';
import { Profile }                      from './db/entities/Profile';
import { RaffleUser }                   from './db/entities/RaffleUser';
import { TriviaPoint }                  from './db/entities/TriviaPoint';
import { TriviaQuestion }               from './db/entities/TriviaQuestion';
import { VoiceChannelActivity }         from './db/entities/VoiceChannelActivity';

export let DB: Connection;

//
// Load your .env file and make it's contents available as
// environment variables.
//
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

//
// Connect to our database
//
dbConnect();

//
// Instantiate the Bot Class
//
const bot: Bot = new Bot();

//
// Start the bot
//
bot.start(process.env.TOKEN);

