
interface FileDisplayProps {
  file: File;
}
export default function FileDisplay(props: FileDisplayProps) {
  const dateFormatter = Intl.DateTimeFormat();

  return (
    <div class="flex flex-col gap flow-xs">
      <div class="flex items-center gap-1 font-semibold">
        <span class="i-tabler-file-zip -ml-5 block text-primary/70 w-4 h-4" />
        {props.file.name}
      </div>
      <div class="text-primary/70">
        File size: {Number(props.file.size / 1000 / 1000).toFixed(2)} MB
      </div>
      <div class="text-primary/70">
        Last modified: {dateFormatter.format(props.file.lastModified)}
      </div>
      <button class="btn btn-primary disabled:bg-primary/50">
        <div class="flex mx-auto gap">
          <span class="i-tabler-file-upload w-5 h-5 inline-block" />
          Upload
        </div>
      </button>
    </div>
  );
}
