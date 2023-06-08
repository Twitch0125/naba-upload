/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { load } from "dotenv";


Deno.addSignalListener("SIGINT", () => Deno.exit());
Deno.addSignalListener("SIGTERM", () => Deno.exit());
Deno.addSignalListener("SIGABRT", () => Deno.exit());


await load({ export: true });
await start(manifest);
