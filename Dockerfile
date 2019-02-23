FROM node:alpine AS builder

RUN adduser -S bot

COPY package.json .

RUN npm install

COPY bot.js /bot.js

#
# Change to a less-privileged user than root in the
# event a request escapes the sandbox
#
USER bot

#
# Starts the bot when the docker container is started
#
ENTRYPOINT ["node", "bot.js"]
