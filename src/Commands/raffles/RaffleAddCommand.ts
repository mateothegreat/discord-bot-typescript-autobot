import { Message }                                 from 'discord.js';
import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';
import { RaffleUser }                              from '../../db/entities/RaffleUser';
import { DB }                                      from '../../index';

export default class LMGTFYCommand extends Command {

    public constructor(client: CommandoClient) {

        super(client, {

            name: 'raffleadd',
            aliases: [ 'raffleadd' ],
            group: 'raffle',
            memberName: 'raffleadd',
            description: 'Adds a user to the current raffle.',
            guildOnly: false,
            throttling: {

                usages: 1,
                duration: 60 * 60 * 24 * 1000

            }

        });

    }

    public async run(message: CommandMessage): Promise<Message | Message[]> {

        if (!message.author.bot) {

            let raffleUser: RaffleUser = new RaffleUser();

            raffleUser.userid = message.author.id;
            raffleUser.discriminator = message.author.discriminator;
            raffleUser.username = message.author.username;

            DB.manager.save(raffleUser);

        }

        return message.embed({

            color: 3447003,
            description: 'Bitmerge Monthly Raffle',
            fields: [ {

                name: `❯ You've been added to this months raffle!`,
                value: `1-month Nitro gift by one of our members. Use \`> raffleadd\` to get your hat in the ring! Raffles results will be announced at the end of the month.`,
                inline: true

            } ]

        });

    }

}
