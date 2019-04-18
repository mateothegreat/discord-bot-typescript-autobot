import { Message, RichEmbed }                      from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export default class EightballCommand extends Command {

    public static responses = [
        'it is certain',
        'it is decidedly so',
        'without a doubt',
        'yes — definitely',
        'you may rely on it',
        'as I see it, yes',
        'most likely',
        'outlook good',
        'yes',
        'signs point to yes',
        'ask again later',
        'better not tell you now',
        'cannot predict now',
        'concentrate and ask again',
        'don’t count on it',
        'my reply is no',
        'my sources say no',
        'outlook not so good',
        'very doubtful'
    ];

    public constructor(client: CommandoClient) {

        super(client, {

            name: '8ball',
            aliases: [ '8ball' ],
            group: 'fun',
            memberName: '8ball',
            description: 'Choose your own destiny!',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 3600

            }

        });

    }

    public run(msg: CommandMessage): Promise<Message | Message[]> {

        const embed = new RichEmbed().setTitle('8ball says..')
                                     .setDescription(EightballCommand.responses[ Math.floor(EightballCommand.responses.length * Math.random()) ]);

        return msg.embed(embed);

    }

}
