# 1) Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build-time API URL (optional)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# 2) Run stage (nginx)
FROM nginx:alpine

# React build output goes to /app/dist (Vite)
COPY --from=build /app/dist /usr/share/nginx/html

# SPA routing support (React Router)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
