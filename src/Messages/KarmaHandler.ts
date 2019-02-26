import { Message } from 'discord.js';
import { CLIENT }  from '../Bot';

export class KarmaHandler {

    public static handle(message: Message): any {

        const matches = message.content.match(/(thanks|thank you).*?<@(.*?)>/);
        console.log(matches);

        if (matches && matches.length > 0) {

            CLIENT.fetchUser(matches[ 2 ]).then(member => {

                // CLIENT.guilds.first().channels.get('513072716622987276').send(`Way to go @${ member.username }#${ member.discriminator } you've earned a karma point!`);

                // member.guild
                //       .channels
                //       .get('513072716622987276')
                //       .send(this.GREETINGS[ Math.floor(Math.random() * this.GREETINGS.length) ].replace(':name:', member));

            });


        }
        // message.reply();
    }

}

