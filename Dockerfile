# 
# ARG ENV_DEPLOY=dev
# Set the base image to node:12-alpine
# FROM node:14.17-alpine as build

# Specify where our app will live in the container
# WORKDIR /app

# COPY package*.json yarn.lock /app/

# RUN yarn || return 0

# Copy the React App to the container
# COPY . /app/

# Prepare the container for building React
# RUN yarn
# We want the production version
# ARG ENV_DEPLOY
# RUN yarn build:$ENV_DEPLOY

# Prepare nginx
FROM nginx:1.19.10-alpine

# Set timezone
RUN apk update && \
    apk add --no-cache tzdata

ENV TZ="Asia/Ho_Chi_Minh"

#COPY --from=build /app/build /usr/share/nginx/html
COPY build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]