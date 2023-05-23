import { copy } from "streams/copy.ts";
import { readerFromStreamReader } from "streams/reader_from_stream_reader.ts";

export default async function saveTar(file: File, to: string) {
  const reader = readerFromStreamReader(file.stream().getReader());
  const writer = await Deno.create(to);
  await copy(reader, writer);
  writer.close();
  return to;
}
