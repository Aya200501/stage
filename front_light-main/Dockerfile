FROM node:20-alpine3.18 as builder

WORKDIR /build

COPY package*json .

RUN npm install 

COPY . .

RUN npm run build

FROM node:20-alpine3.18

WORKDIR /app

RUN npm install serve -g

COPY --from=builder --chown=node:node /build/dist ./dist

EXPOSE 8080

USER node

CMD ["serve", "-s", "dist" , "-l", "tcp://0.0.0.0:8080"]