FROM node:12-alpine AS build

WORKDIR /devel

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile --non-interactive

COPY . .

RUN yarn build

FROM nginx:1.17-alpine AS serve

RUN apk update && apk add curl

WORKDIR /var/www

COPY --from=build /devel/build .
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
