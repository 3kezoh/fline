FROM node:lts-alpine

WORKDIR /usr/api

COPY ./dist/apps/api .

RUN npm install --production

ENV PORT=3333

EXPOSE ${PORT}

CMD ["node", "main.js"]