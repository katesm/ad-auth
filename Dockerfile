# create basic docker for node 
FROM node:latest
# create a directory for the app
WORKDIR /usr/src/app
# copy package.json and package-lock.json
COPY package*.json ./
# install dependencies
RUN npm ci
# copy all files
COPY . .
# build the app
RUN npm run build

# expose port 3000
EXPOSE 3000
# run the app
CMD [ "npm", "run", "prod:serve" ]






