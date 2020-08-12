FROM node:12-alpine as builder

# Create app directory
WORKDIR /app
COPY *.json ./
RUN npm i --no-cache
COPY src/ ./src/
RUN npm run build && rm -rf src/


FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app /app

EXPOSE 3000
CMD ["node", "dist/app.js"]