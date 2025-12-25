FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy all source files
COPY . .

# Build for production
RUN pnpm run build

EXPOSE 3000

# Serve the built files
CMD ["pnpm", "run", "preview", "--host", "0.0.0.0", "--port", "3000"]