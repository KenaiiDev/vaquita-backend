FROM node:23-slim
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install --force
CMD ["pnpm", "dev"]
