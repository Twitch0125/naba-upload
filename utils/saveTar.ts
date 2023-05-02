import {
  copy,
  readerFromStreamReader,
} from "https://deno.land/std@0.185.0/streams/mod.ts";

export default async function saveTar(file: File, to: string) {
  const reader = readerFromStreamReader(file.stream().getReader());
  const writer = await Deno.create(to);
  await copy(reader, writer);
  await writer.close()
  return to;
}
