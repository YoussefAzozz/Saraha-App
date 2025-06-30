# FROM node:22-slim


FROM node:22-slim as builder
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .



FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app .

# Create a non-root user and group to run the application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup &&  \
    # Change ownership of the working directory to the non-root user
    chown -R appuser:appgroup /app


# Switch to the non-root user
USER appuser

EXPOSE 5000

ENTRYPOINT ["node"]

CMD ["index.js"]
