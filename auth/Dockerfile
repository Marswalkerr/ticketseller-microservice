# Base Image
FROM node:22-alpine

#Wroking directory
WORKDIR /app

#operations
COPY ./package.json ./
RUN npm install --only=prod
COPY ./ ./

#startup commad
CMD ["npm", "start"]
