# FROM node:20-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --silent
# RUN npm install -g nodemon
# COPY . .
# EXPOSE 5000
# CMD ["npm","start"]
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
