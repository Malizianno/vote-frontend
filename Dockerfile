# Stage 1: Build the Angular app
FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/vote-frontend/browser /usr/share/nginx/html
EXPOSE 4090
CMD ["nginx", "-g", "daemon off;"]