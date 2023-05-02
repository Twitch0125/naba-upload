import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import FileDisplay from "../components/FileDisplay.tsx";

export default function FileUpload(props: { name: string }) {
  const file = useSignal<null | File>(null);
  const parent = useRef(null);

  function handleInput(e: Event) {
    const selectedFile = (e.target as HTMLInputElement).files?.[0];
    if (!selectedFile) return;
    file.value = selectedFile;
  }
  return (
    <div class="mt-4 flow-layout items-baseline text-sm">
      <label class="flex flex-col items-start">
        <input
          id="file-upload"
          required
          name={props.name}
          type="file"
          class="border-primary rounded px-3 py-3"
          onInput={handleInput}
        />
      </label>
      {file.value && <FileDisplay file={file.value} />}
    </div>
  );
}
