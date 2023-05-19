import { ensureDir } from "fs/ensure_dir.ts";
import extractTar from "./extractTar.ts";

export default async function handleTarUpload(file: File) {
  await ensureDir(Deno.cwd() + "/extracted");
  await extractTar(file, Deno.cwd() + "/extracted");
}
