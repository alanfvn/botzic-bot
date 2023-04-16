FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
# environment variables
ENV DS_TOKEN=""
ENV CAL_URL=""
ENV CLIENT_ID=""
ENV GUILD_ID=""
ENV TZ=America/Guatemala
# run the bot
CMD [ "npm", "run", "start"]
