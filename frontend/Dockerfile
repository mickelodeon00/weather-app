FROM node:18-alpine

WORKDIR /app

# Install pnpm and serve globally
RUN npm install -g pnpm serve

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]