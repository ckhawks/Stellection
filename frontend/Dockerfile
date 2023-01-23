FROM node:16

WORKDIR /app

RUN mkdir -p /app/frontend
COPY ./frontend/package.json ./frontend
# COPY ./frontend/package-lock.json ./frontend
# COPY ./turbo.json .

# RUN mkdir -p /app/packages/av-common
# COPY ./frontend/package.json /app/frontend/package.json
# COPY ./packages/av-common/package.json /app/packages/av-common/package.json
WORKDIR /app/frontend
RUN npm install


# This fixes EACCESS error on Linux
# RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# Build the project
COPY ./frontend /app/frontend
# RUN npm i -g turbo
# RUN npm i -g del-cli
EXPOSE 3000
CMD ["npm", "run", "start"]

# CMD ["npm", "run", "app:dev"]