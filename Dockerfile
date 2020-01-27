FROM node:12

WORKDIR /hexskell-client

# First install only dependencies
COPY ./package.json /hexskell-client/package.json
COPY ./package-lock.json /hexskell-client/package-lock.json
RUN npm install --only=prod

# Add source
COPY . /hexskell-client

ENV PORT=1234
EXPOSE 1234

CMD [ "npm", "run serve" ]