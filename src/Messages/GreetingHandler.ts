import { Message } from 'discord.js';

export class GreetingHandler {

    public static readonly GREETINGS = [
        ':star2: Hey there :name: welcome! Do ya have any fun projects going on? :star2:,',
        ':star2: Great to see ya here :name:! We\'re a community of developers, sysadmins and tech enthusiasts :smiley: Tell us a little about yourself! :star2:',
        ':star2: Welcome to bitmerge :name: :smiley: What ya got cookin over there? :star2:',
        ':star2: Heyo :name:! How goes it? :star2:',
        ':star2: Welcome :name: :smiley: What brings you here? :star2:',
        ':star2: Welcome to our community :name: :smiley: What do you do for work? :star2:',
        ':star2: Hey :name:! Welcome to the community :smile: :star2:',
        ':star2: :name: glad you joined us all! What brings you to this fine community? :star2:'
    ];

    /*

     * Sends a random welcome message and deletes it shortly after.
     *
     */
    public static handle(member: any): void {

        // setTimeout(() => {513072716622987276

        member.guild
              .channels
              .get('513072716622987276')
              .send(this.GREETINGS[ Math.floor(Math.random() * this.GREETINGS.length) ].replace(':name:', member))
              .then((message: Message) => {

                  message.delete(86400 * 2);

              });

        // }, 15000);

    }

}
