FROM node
ENV NODE_ENV production

WORKDIR /srv/app

COPY ./src/package*.json ./
COPY ./src/yarn*.lock ./

RUN yarn install

COPY ./src .

CMD ["yarn", "wait-build-start"]