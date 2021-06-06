# Frontend build
FROM node:8.11 as admin
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY public ./public
COPY src ./src
COPY tsconfig.json ./
ARG REACT_APP_API_URL
RUN REACT_APP_API_URL=$REACT_APP_API_URL \
  npm run build

# Final image
FROM nginx:1.14.2-alpine
COPY --from=admin /usr/src/app/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
