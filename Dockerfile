FROM docker.io/denoland/deno:alpine-1.33.1

EXPOSE 8000

USER deno

WORKDIR /app

ADD . .
RUN deno cache --unstable --no-npm main.ts
CMD ["run", "-A", "--unstable", "main.ts"]