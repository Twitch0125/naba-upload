import { Untar } from "archive/mod.ts";
import { ensureFile } from "fs/mod.ts";
import { copy } from "streams/copy.ts";
import { readerFromStreamReader } from "streams/reader_from_stream_reader.ts";
export default async function extractTar(file: File, to: string) {
  //decompress gzipped tar
  const reader = file.stream().pipeThrough<Uint8Array>(
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
      await copy(reader, writer);
      writer.close();
    }
  }
  return `${to}/report.json`;
}
