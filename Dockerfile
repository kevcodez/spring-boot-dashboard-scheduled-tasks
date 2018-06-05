#==================== Building Stage ================================================ 

FROM node:9.11.1-alpine as node

# Create a directory where our app will be placed. This might not be necessary
RUN mkdir -p /dashboard

# Change directory so that our commands run inside this new directory
WORKDIR /dashboard

# Copy dependency definitions
COPY package.json /dashboard

# Install dependencies
RUN yarn install

# Get all the code needed to run the app
COPY . /dashboard

# Expose the port the app runs in
EXPOSE 8080

#Build the app
RUN yarn build

#==================== Setting up stage ==================== 
FROM nginx:1.15.0-alpine

COPY --from=node /dashboard/dist/ /usr/share/nginx/html

COPY ./nginx-dashboard.conf /etc/nginx/conf.d/default.conf