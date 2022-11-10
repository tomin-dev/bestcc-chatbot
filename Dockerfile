FROM node:18-alpine as builder
WORKDIR /builder-app
COPY . .
RUN npm install
RUN npm run build
RUN npm run prisma-generate

FROM keymetrics/pm2:18-alpine

WORKDIR /app

# Bundle APP files
COPY --from=builder /builder-app/build src/
COPY package.json .
COPY ecosystem.config.js .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production
COPY --from=builder /builder-app/node_modules/.prisma/client node_modules/.prisma/client

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
