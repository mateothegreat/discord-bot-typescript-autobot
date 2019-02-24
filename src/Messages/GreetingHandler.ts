export class GreetingHandler {

    public static readonly GREETINGS = [
        'Hey there :name:! Welcome .. what are ya working on these days?',
        'Great to see ya here :name:!! We\'re a community of developers, sysadmins and tech enthusiasts :) Tell us a little about yourself!',
        'Welcome to bitmerge :name: :-) What ya got cookin over there?',
        ':name: glad you joined us all! Are you a devops guru too?'
    ];

    public static handle(member: any): void {

        setTimeout(() => {

            member.guild.channels.get('548784663909629952').send(this.GREETINGS[ Math.floor(Math.random() * this.GREETINGS.length) ].replace(':name:', member));

        }, 15000);

    }

}
