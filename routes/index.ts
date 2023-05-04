import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req) {
    return Response.redirect(req.url + "index.html", 302);
  },
};