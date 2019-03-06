// @ts-ignore
import { Message, RichEmbed }                      from 'discord.js';
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
        const embed = new RichEmbed().setImage('file://assets/logo.png')
                                     .setTitle('Welcome to bitmerge')
                                     .setDescription("Welcome to bitmerge!\n\nCheck out our forum at https://forum.bitmerge.org/ and our github at https://github.com/bitmerge.\n\nDon't forget to tell us about yourself in #introduct-yourself!");

        msg.channel.sendEmbed({
            color: 3447003,
            description: "Welcome to **bitmerge**!\nWe're a community of technology enthusiasts, developers and devops engineers.\n\nCheck out our forum at https://forum.bitmerge.org/ and our github at https://github.com/bitmerge.\n\nDon't forget to tell us about yourself in #introduct-yourself!",
            files: [

                'assets/logo.png'

            ]
        });

        //     msg.channel.sendMessage({
        //         embed: {
        //             color: 3447003,
        //             description: 'Welcome to bitmerge!',
        //             files: [
        //
        //                 'assets/logo.png'
        //
        //             ]
        //         }
        // });

        // return msg.embed(embed);

    }

}
