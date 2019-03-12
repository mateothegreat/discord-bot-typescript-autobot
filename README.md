# discord bot written with typescript

## Features

* Tracks Karma Points when someone thanks another user.
* Automatically assigns new users to a specific role.
* Automatically assigns users to a specific role after N amount of messages.
* Wikipedia Searching

## Fun Stuff
* color: Displays a color
* feedme: feedme
* flip: Picks a random value from a | delimited string. (i.e.: >flip yes|no|maybe
* hug: Sends a Virtual Hug
* logo: Displays the logo

## Karma Points
* karmastats: Displays karma statistics

## Knowledgebase
* kb.add: Adds a knowledgebase entry.
* kb.edit: Manage a knowlesgebase entry
* kb: Retrieves a KB entry (i.e.: >kb docker)

## Moderation Commands
* channel.topic: Sets a channel topic.
* invite: Sends an invite code to the channel.
* report: Sends a report to all staff members.

## Manage your Extended Profile
* profile.edit: Updates your profile field(s).
* profile: View a members extended profile.

## Programming/Development
* js: Runs javascript code.

## Polls
* trivia.add: Adds a trivia question. (i.e.: >trivia.add "some question": true)
* trivia.delete: Deletes a trivia question. (i.e.: >trivia.delete 123)
* trivia.edit: Edit trivia question by id number
* trivia.list: Lists trivia questions.
* trivia.next: Asks a trivia question
* trivia.stats: Displays trivia leaderboard

## Raffle
* raffleadd: Adds a user to the current raffle.
* raffle: Displays current raffle information.

## Search
* google: Creates a lmgtfy.com link
* wiki: Searches wikipedia

## XP
* xp.messages: Displays message statistics

## Commands
* groups: Lists all command groups.
* enable: Enables a command or command group.
* disable: Disables a command or command group.
* reload: Reloads a command or command group.
* load: Loads a new command.
* unload: Unloads a command.

## Utility
* help: Displays a list of available commands, or detailed information for a specified command.
* prefix: Shows or sets the command prefix.
* ping: Checks the bot's ping to the Discord server.
* eval: Executes JavaScript code.
* info: Displays information about the bot.

### Extended Profiles
```
>profile (views current profile)
>profile @username (views a users profile)
>profile.edit (edits your profile)
```
![Profile](docs/images/screenshot-profile.png)

### Trivia
```
>trivia.list (lists add trivia)
>trivia.add (creates a new trivia)
>trivia.edit (edits an existing trivia)
>trivia.delete (delets a trivia entry)
>trivia.next (randomly selects a trivia)
```
![Trivia](docs/images/screenshot-trivia.png)

### Wikipedia Search
```
>wiki <search term(s)>
```
![Wikipedia Search](docs/images/screenshot-wiki.png)
