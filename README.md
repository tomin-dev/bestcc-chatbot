# Best CC Chatbot

## Build Docker Image

```shell
docker buildx build --platform=linux/amd64 -t roeeyn/bestcc-bot:v1.3 .
```

## Run Container in Production

```shell
docker run --env-file .env -v bestcc_db:/app/prisma/ -d --rm roeeyn/bestcc-bot:v1.3
```
