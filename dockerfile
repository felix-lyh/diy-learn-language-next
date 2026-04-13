# 1. Install dependencies
FROM node:20.19.6 AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# 2. Build the app
FROM node:20.19.6 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Run the app
FROM node:20.19.6 AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]