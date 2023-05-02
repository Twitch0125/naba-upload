import { fetch as fileFetch } from "file_fetch";
import extractTar from "../../utils/extractTar.ts";
import saveTar from "../../utils/saveTar.ts";
import { exists } from "fs/exists.ts";
import { assert } from "https://deno.land/std@0.96.0/_util/assert.ts";

Deno.test(
  "POST index route",
  { permissions: { read: true, write: true } },
  async (t) => {
    t.name = "handle file save";
    const url = Deno.cwd() + "/test/data/test-dir.tar.gz";
    const res = await fileFetch(import.meta.resolve(url));
    const file = new File([await res.arrayBuffer()], "test-dir.tar.gz");
    const saveUrl = Deno.cwd() + "/test/data/test.tar.gz";
    await saveTar(file, saveUrl);
    await extractTar(saveUrl, Deno.cwd() + "/test/data/extracted");
    assert(await exists(saveUrl));
    await t.step("cleanup", async () => {
      await Deno.remove(saveUrl);
      await Deno.remove(Deno.cwd() + "/test/data/extracted", { recursive: true })
    })
  },
);
