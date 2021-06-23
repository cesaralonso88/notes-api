FROM node:14

WORKDIR /home/ec2-user/notes-api

RUN npm install

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "./app.js"]