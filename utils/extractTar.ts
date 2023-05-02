import { Untar } from "https://deno.land/std@0.185.0/archive/mod.ts";
import { ensureFile } from "https://deno.land/std@0.185.0/fs/ensure_file.ts";
import { copy } from "https://deno.land/std@0.185.0/streams/mod.ts";
import { readerFromStreamReader } from "https://deno.land/std@0.185.0/streams/reader_from_stream_reader.ts";
import { fetch as fileFetch } from "file_fetch";
export default async function extractTar(path: string, to: string) {
  //decompress gzipped tar
  const url = import.meta.resolve(path);
  const res = await fileFetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch report file: ${res.status} ${res.statusText}`,
    );
  }
  if (!res.body) throw new Error("No body");

  const reader = res.body.pipeThrough<Uint8Array>(
    new DecompressionStream("gzip"),
  )
    .getReader();

  //extract tar from path and save to extracted folder
  const untar = new Untar(readerFromStreamReader(reader));

  for await (const entry of untar) {
    if (entry.type === "file") {
      await ensureFile(`${to}/${entry.fileName}`);
      const reader = entry;
      const writer = await Deno.create(`${to}/${entry.fileName}`);
      await copy(reader, writer)
      writer.close()
    }
  }
  return `${to}/report.json`;
}
