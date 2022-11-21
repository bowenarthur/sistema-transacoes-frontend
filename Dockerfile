FROM node:latest

RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend
COPY package.json /usr/src/frontend/
RUN npm install
COPY . /usr/src/frontend
RUN npm run build
EXPOSE 3000
CMD npm run start