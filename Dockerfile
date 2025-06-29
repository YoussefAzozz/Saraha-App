# FROM node:22-slim
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

# Create a non-root user and group to run the application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && npm install --production && npm cache clean --force && \
    # Change ownership of the working directory to the non-root user
    chown -R appuser:appgroup /app


# Export environment variables

# ENV MODE=development \
#     Port=5000 \
#     connection="mongodb://mongodbcontainer:27017/mongoose_test" \
#     TOKEN_SIGNATURE="azozprofessional" \
#     BEARER_TOKEN="Bearer " \
#     SALT_ROUND=9 \
#     SECRET_KEY="secret key 123" \
#     EMAIL_PASSWORD="tkre eflv qutx agui" \
#     EMAIL="yossefazozz40@gmail.com" \
#     cloud_name=dhqnmgd9y \
#     api_key=743176655549121 \
#     api_secret="kixPMF0ByoNphamiDdNAUE6FPDg" \
#     CLIENT_ID="824719290854-4cip3jag3ljtdk86u38vnhbrvcqvu7nk.apps.googleusercontent.com"


# Switch to the non-root user
USER appuser

# EXPOSE 5000

ENTRYPOINT ["node"]

CMD ["index.js"]
