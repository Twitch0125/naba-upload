import { Untar } from "https://deno.land/std@0.185.0/archive/mod.ts";
import { ensureDir, ensureFile } from "https://deno.land/std@0.185.0/fs/mod.ts";
import { copy } from "https://deno.land/std@0.185.0/streams/mod.ts";

export default async function extractTar(path: string, to: string) {
  const reader = await Deno.open(path, { read: true });
  const untar = new Untar(reader);

  for await (const entry of untar) {
    console.log(entry); // metadata

    if (entry.type === "directory") {
      await ensureDir(entry.fileName);
      continue;
    }

    await ensureFile(entry.fileName);
    const file = await Deno.open(entry.fileName, { write: true });
    // <entry> is a reader.
    await copy(entry, file);
  }
  reader.close();
}
