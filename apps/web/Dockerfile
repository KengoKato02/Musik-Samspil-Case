# Use the official Node.js image as a base
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy the web directory
COPY . .

# Install dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install

# Expose the port the web app runs on
EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5173/health || exit 1

# Start the web application
CMD ["pnpm", "dev"]
