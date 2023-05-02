import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import FileUpload from "../islands/FileUpload.tsx";
import handleTarUpload from "../utils/handleTarUpload.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    //write to uploads/reports.tar.gz
    const form = await req.formData();
    if (!form) {
      return await ctx.render();
    }
    const file = form.get("file") as File;
    if (!file) return await ctx.render({ status: "error" });
    await handleTarUpload(file);
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
      <main>
        <form method="post" encType="multipart/form-data">
          <label
            for="file-upload"
            class="text-sm uppercase font-medium tracking-wide text-primary"
          >
            Report Upload
          </label>
          <div class="mt-2 flex justify-center rounded-lg bg-surface border-color-primary/20 border-1 border-dashed px-6 py-10">
            <div class="flow-layout flow-sm">
              <p class="font-semibold">Upload OOTP Online League Report</p>
              <FileUpload name="file" />
              {props.data?.status === "success" && <p>Upload successful!</p>}
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
