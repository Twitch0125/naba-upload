import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import FileDisplay from "../components/FileDisplay.tsx";

export default function FileUpload() {
  const file = useSignal<null | File>(null);
  const parent = useRef(null);

  function handleInput(e: Event) {
    const selectedFile = (e.target as HTMLInputElement).files?.[0];
    if (!selectedFile) return;
    file.value = selectedFile;
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const file = form["file-input"].files[0];
    console.log("uploading", file);
    formData.append("file", file);
    fetch(form.action, {
      method: "POST",
      body: formData,
    });
  }
  return (
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
          <div class="mt-4 flow-layout items-baseline text-sm">
            <label class="flex flex-col items-start">
              <input
                id="file-upload"
                required
                name="file"
                type="file"
                class="border-primary rounded px-3 py-3"
                onInput={handleInput}
              />
            </label>
            {file.value && <FileDisplay file={file.value} />}
          </div>
        </div>
      </div>
    </form>
  );
}
