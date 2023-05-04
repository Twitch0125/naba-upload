/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { load } from "https://deno.land/std@0.176.0/dotenv/mod.ts";
const env = await load();
Deno.env.set("AUTH_PASSWORD", env.AUTH_PASSWORD);
await start(manifest);
