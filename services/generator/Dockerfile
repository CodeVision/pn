FROM node:20 as build

WORKDIR /app

COPY package* .
COPY tsconfig-base.json tsconfig-base.json

COPY libs libs
COPY services/generator services/generator

RUN npm run install-all
RUN npm run build-all

FROM node:20-alpine

WORKDIR /app

COPY package* .

COPY --from=build /app/libs/phonenumbers-lib/dist libs/phonenumbers-lib/dist
COPY libs/phonenumbers-lib/package.json libs/phonenumbers-lib/
COPY --from=build /app/services/generator/dist services/generator/dist
COPY services/generator/package.json services/generator/

RUN npm run install-all --omit=dev

CMD ["node", "/app/services/generator"]
