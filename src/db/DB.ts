import { Connection, createConnection } from 'typeorm';

export class DB {

    public static connection: Connection;

    public static async connect() {

        try {

            DB.connection = await createConnection({

                type: "mysql",
                host: process.env.MYSQL_HOST,
                port: 3306,
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                entities: [ './entities' ],
                synchronize: true,
                logging: true

            });

        } catch (e) {

            console.log(e);

        }

    }

}
