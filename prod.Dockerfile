
# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /app

# Install express for the backend
RUN npm install express

# Copy only necessary files
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js

# Create empty data file if needed, but the server handles it
# RUN echo "{}" > data.json

# Expose port 3000
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
