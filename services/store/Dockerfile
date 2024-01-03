FROM node:20 as build

WORKDIR /app

COPY package* .
COPY tsconfig-base.json tsconfig-base.json

COPY libs libs
COPY services/store services/store

RUN npm run install-all
RUN npm run build-all

FROM node:20-alpine

WORKDIR /app

COPY package* .

COPY --from=build /app/libs/phonenumbers-lib/dist libs/phonenumbers-lib/dist
COPY libs/phonenumbers-lib/package.json libs/phonenumbers-lib/
COPY --from=build /app/services/store/dist services/store/dist
COPY services/store/package.json services/store/

RUN npm run install-all --omit=dev

CMD ["node", "/app/services/store"]
