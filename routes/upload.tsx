import { Head, asset } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import FileUpload from "../islands/FileUpload.tsx";
import handleTarUpload from "../utils/handleTarUpload.ts";

function createUnauthorizedResponse() {
  return new Response(null, {
    headers: {
      "WWW-Authenticate": 'Basic realm="upload", charset="UTF-8"',
    },
    status: 401,
  });
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
      return createUnauthorizedResponse();
    }
    const credentials = authorization.split("Basic ")[1];
    if (!credentials) {
      return createUnauthorizedResponse();
    }
    let password;
    try {
      const [_, data] = atob(credentials).split(":");
      password = data;
    } catch {
      return new Response(null, {
        status: 400,
      });
    }
    if (password !== Deno.env.get("AUTH_PASSWORD")) {
      return createUnauthorizedResponse();
    }
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
        <title>NABA UPLOAD</title>
        <link rel="stylesheet" href={asset("/uno.css")} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
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
