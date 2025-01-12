# Use the official Node.js image as a base
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy the API directory
COPY . .

# Install dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm add @faker-js/faker

# Expose the port the API runs on
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start the API application
CMD ["pnpm", "start"]

# Multi-stage example below
# # Stage 1: Build
# FROM node:22 AS builder

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy the package.json and pnpm-lock.yaml files
# COPY package.json pnpm-lock.yaml ./

# # Install dependencies using pnpm
# RUN npm install -g pnpm
# RUN pnpm install

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN pnpm build

# # Stage 2: Production
# FROM node:22-slim

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy only the necessary files from the builder stage
# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package.json ./

# # Expose the port the API runs on
# EXPOSE 3000

# # Healthcheck
# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
#   CMD curl -f http://localhost:3000/ || exit 1

# # Start the API application
# CMD ["node", "dist/main.js"]