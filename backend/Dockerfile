FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
# skip devDependencies.
RUN npm install --production 
COPY . .

CMD ["npm", "start"]
