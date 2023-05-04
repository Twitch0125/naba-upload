import { Handlers } from "$fresh/server.ts";
import { serveDir } from "file_server";
export const handler: Handlers = {
  async GET(req) {
    return await serveDir(req, {
      fsRoot: Deno.cwd() + "/extracted/news/html",
      quiet: true
    });
  },
};
