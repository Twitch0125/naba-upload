FROM docker.io/denoland/deno:alpine-1.34.1

EXPOSE 8000

USER deno

WORKDIR /app

ADD . .
ENV AUTH_PASSWORD=test
RUN deno cache main.ts
CMD ["run", "-A", "--unstable", "main.ts"]