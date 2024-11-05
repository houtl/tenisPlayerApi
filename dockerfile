FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY . .
RUN ls -l

RUN npm install -g typescript

RUN yarn finstall
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
RUN yarn build

CMD ["yarn", "start"]
