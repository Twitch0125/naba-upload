import { ensureDir } from "https://deno.land/std@0.185.0/fs/ensure_dir.ts";
import extractTar from "./extractTar.ts";
import saveTar from "./saveTar.ts";

export default async function handleTarUpload(file: File) {
  await ensureDir(Deno.cwd() + "/uploads");
  const newFilePath = await saveTar(
    file,
    Deno.cwd() + "/uploads/report.tar.gz",
  );
  await ensureDir(Deno.cwd() + "/extracted");
  await extractTar(newFilePath, Deno.cwd() + "/extracted");
}
