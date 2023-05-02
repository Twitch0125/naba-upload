import {
  copy,
  readerFromStreamReader,
} from "https://deno.land/std@0.185.0/streams/mod.ts";

export default async function saveTar(file: File) {
  const reader = readerFromStreamReader(file.stream().getReader());
  const writer = Deno.createSync("uploads/report.tar.gz");
  await copy(reader, writer);
  return "uploads/report.tar.gz";
}
