FROM node:20 as build

WORKDIR /app

COPY package* .
COPY tsconfig-base.json tsconfig-base.json

COPY libs libs
COPY services/generator services/generator

RUN npm run install-all
RUN npm run build-all

CMD ["node", "/app/services/generator"]
