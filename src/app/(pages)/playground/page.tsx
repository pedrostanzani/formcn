import { LivePreview } from "@/components/live-preview";
import { PreviewTabs } from "@/components/live-preview/preview-tabs";
import { FormFields } from "@/components/form-fields";
import { Debug } from "@/components/debug";

export default function PlaygroundPage() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 px-4 py-4 sm:flex-row md:px-6">
        <div className="w-full sm:w-1/2">
          <h2 className="mb-3 flex h-9 items-center text-xl font-bold tracking-tight">
            Form fields
          </h2>
          <FormFields />
        </div>
        <div className="w-full sm:w-1/2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Preview</h2>
            <PreviewTabs />
          </div>
          <LivePreview />
        </div>
      </main>
      <div className="px-6 text-xs">
        <Debug />
      </div>
    </>
  );
}
