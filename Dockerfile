FROM node:14-alpine as builder

WORKDIR /home/node

COPY . /home/node

RUN npm install --verbose

EXPOSE 5000

CMD [ "npm", "run", "start" ]