// @ts-ignore
import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export default class ColorCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'logo',
            aliases: [ 'logo' ],
            group: 'fun',
            memberName: 'logo',
            description: 'Displays the logo',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 60000

            }

        });

    }

    // @ts-ignore
    public async run(msg: CommandMessage): Promise<Message | Message[]> {

        console.log(msg.content);
        //
        // const matches = msg.content.match(/>color #(.*)/);
        //
        // const embed = new RichEmbed().setImage('https://forum.bitmerge.org/uploads/default/original/1X/60874dc358ef63929f3ba8094b05401a080a54af.svg')
        //                              .setTitle('Welcome to bitmerge')
        //                              .setDescription('Welcome to bitmerge!');

        msg.channel.sendMessage({
            embed: {
                color: 3447003,
                description: 'Welcome to bitmerge!',
                image: { url: 'https://forum.bitmerge.org/uploads/default/original/1X/60874dc358ef63929f3ba8094b05401a080a54af.svg' }
            }
        });

        // return msg.embed(embed);

    }

}
