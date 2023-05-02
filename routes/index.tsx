import { Head } from "$fresh/runtime.ts";
import {
  copy,
  readerFromStreamReader,
} from "https://deno.land/std@0.185.0/streams/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import FileUpload from "../islands/FileUpload.tsx";
export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    //save input-file field from form and write to uploads/reports.tar.gz
    const form = await req.formData();
    const file = form.get("file") as File;
    if (!file) {
      console.error("ERROR", file);
      return await ctx.render({ status: "error" });
    }
    const reader = readerFromStreamReader(file.stream().getReader());
    const writer = Deno.createSync("uploads/report.tar.gz");
    await copy(reader, writer);
    return await ctx.render({ status: "success" });
  },
};
export default function Home(props: PageProps<{ status: string }>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link rel="stylesheet" href="/uno.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <FileUpload />
      {props.data?.status === "success" && <p>Upload successful!</p>}
    </>
  );
}
