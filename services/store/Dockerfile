FROM node:20

WORKDIR /app

COPY package* .
COPY tsconfig-base.json tsconfig-base.json

COPY libs libs
COPY services/store services/store

RUN npm run install-all
RUN npm run build-all

CMD ["node", "/app/services/store"]
