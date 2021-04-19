### On install rust et wasm  ###
FROM rust:buster AS build

#Installer wasm
WORKDIR /build
RUN apt install pkg-config
RUN cargo install wasm-pack
COPY ./wasm/Cargo.toml .
COPY ./wasm/src ./src
RUN wasm-pack build

###On Build Node ###
FROM node:12.7-alpine 
WORKDIR /app
COPY package.json .
RUN npm install -f
RUN npm install --save-dev @angular-devkit/build-angular
RUN npm install -g @angular/cli

#On copie tout
COPY . .
RUN rm -rf ./wasm
COPY --from=build /build ./wasm
#COPY ./e2e ./
#COPY ./src ./
#COPY ./.browserslistrc ./
#COPY ./.editorconfig ./
#COPY ./angular.json ./
#COPY ./karma.conf.js ./
#COPY ./nginx.conf ./
#COPY ./package-lock.json ./
#COPY ./package.json ./
#COPY ./proxy.conf.json ./
#COPY ./tsconfig.app.json ./
#COPY ./tsconfig.json ./
#COPY ./tsconfig.spec.json ./
#COPY ./tslint.json ./
#COPY --from=build /build ./

EXPOSE 4200 
CMD ng serve --host 0.0.0.0
