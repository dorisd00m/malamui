import * as React from "react"
import { useDropzone, type Accept, type FileRejection } from "react-dropzone"
import { AlertCircleIcon, CheckCircle2Icon, FileIcon, RotateCcwIcon, UploadCloudIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export type UploadStatus = "queued" | "uploading" | "done" | "error"

export type UploadItem = {
  id: string
  file: File
  /** Object URL for image files */
  preview?: string
  progress: number
  status: UploadStatus
  error?: string
}

export type FileUploadProps = {
  /** MIME map, e.g. { "image/*": [] }. Passed to react-dropzone. */
  accept?: Accept
  /** Max size per file in bytes. */
  maxSize?: number
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  /**
   * Performs the real upload. Call `onProgress(0-100)` while it runs and reject to mark the file as failed.
   * Without it, files are only collected (read them from onFilesChange).
   */
  upload?: (file: File, onProgress: (percent: number) => void) => Promise<void>
  onFilesChange?: (files: File[]) => void
  title?: string
  description?: string
  className?: string
}

const formatBytes = (n: number) => {
  if (n < 1024) return `${n} B`
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 ** 2).toFixed(1)} MB`
}

const rejectionMessage = (r: FileRejection) => {
  const code = r.errors[0]?.code
  if (code === "file-too-large") return "File is too large"
  if (code === "file-invalid-type") return "File type is not allowed"
  if (code === "too-many-files") return "Too many files"
  return r.errors[0]?.message ?? "File rejected"
}

/**
 * Drag-and-drop file picker built on react-dropzone, with previews, progress and per-file errors.
 */
function FileUpload({
  accept,
  maxSize,
  maxFiles,
  multiple = true,
  disabled,
  upload,
  onFilesChange,
  title = "Drag & drop files here",
  description,
  className,
}: FileUploadProps) {
  const [items, setItems] = React.useState<UploadItem[]>([])
  const [rejected, setRejected] = React.useState<{ name: string; reason: string }[]>([])
  const itemsRef = React.useRef(items)
  itemsRef.current = items

  const patch = React.useCallback((id: string, p: Partial<UploadItem>) => {
    setItems((all) => all.map((i) => (i.id === id ? { ...i, ...p } : i)))
  }, [])

  const run = React.useCallback(
    async (item: UploadItem) => {
      if (!upload) return
      patch(item.id, { status: "uploading", progress: 0, error: undefined })
      try {
        await upload(item.file, (percent) => patch(item.id, { progress: Math.max(0, Math.min(100, percent)) }))
        patch(item.id, { status: "done", progress: 100 })
      } catch (e) {
        patch(item.id, { status: "error", error: e instanceof Error ? e.message : "Upload failed" })
      }
    },
    [upload, patch]
  )

  const onDrop = React.useCallback(
    (accepted: File[], rejections: FileRejection[]) => {
      setRejected(rejections.map((r) => ({ name: r.file.name, reason: rejectionMessage(r) })))
      const room = maxFiles ? Math.max(0, maxFiles - itemsRef.current.length) : accepted.length
      const next: UploadItem[] = accepted.slice(0, room).map((file) => ({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        progress: 0,
        status: "queued",
      }))
      if (accepted.length > room) setRejected((r) => [...r, { name: `${accepted.length - room} file(s)`, reason: "Too many files" }])
      if (!next.length) return
      setItems((all) => (multiple ? [...all, ...next] : next))
      next.forEach((n) => void run(n))
    },
    [maxFiles, multiple, run]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled,
    noClick: false,
  })

  React.useEffect(() => {
    onFilesChange?.(items.map((i) => i.file))
  }, [items, onFilesChange])

  // free object URLs
  React.useEffect(
    () => () => {
      itemsRef.current.forEach((i) => i.preview && URL.revokeObjectURL(i.preview))
    },
    []
  )

  const remove = (id: string) =>
    setItems((all) => {
      const gone = all.find((i) => i.id === id)
      if (gone?.preview) URL.revokeObjectURL(gone.preview)
      return all.filter((i) => i.id !== id)
    })

  const hint =
    description ??
    [
      accept ? `Accepted: ${Object.values(accept).flat().join(", ") || Object.keys(accept).join(", ")}` : null,
      maxSize ? `up to ${formatBytes(maxSize)} each` : null,
      maxFiles ? `max ${maxFiles} files` : null,
    ]
      .filter(Boolean)
      .join(" · ")

  return (
    <div data-slot="file-upload" className={cn("w-full space-y-3", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border bg-surface px-6 py-10 text-center transition-colors outline-none hover:border-link focus-visible:ring-2 focus-visible:ring-ring",
          isDragActive && "border-primary bg-accent",
          isDragReject && "border-destructive bg-destructive/10",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} aria-label="Upload files" />
        <span className="grid size-12 place-items-center rounded-full bg-muted text-link">
          <UploadCloudIcon className="size-6" />
        </span>
        <p className="font-medium text-heading">{isDragActive ? (isDragReject ? "Some files are not allowed" : "Drop to upload") : title}</p>
        <p className="text-sm text-muted-foreground">
          or{" "}
          <button
            type="button"
            className="text-link underline-offset-4 hover:underline"
            onClick={(e) => {
              e.stopPropagation()
              open()
            }}
          >
            browse
          </button>{" "}
          from your device
        </p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>

      {rejected.length > 0 && (
        <ul className="space-y-1" aria-live="polite">
          {rejected.map((r, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-(--destructive-text)">
              <AlertCircleIcon className="size-4 shrink-0" />
              <span className="truncate">
                {r.name}: {r.reason}
              </span>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-3 rounded-sm border border-border bg-card p-2.5">
              {i.preview ? (
                <img src={i.preview} alt="" className="size-10 shrink-0 rounded-xs object-cover" />
              ) : (
                <span className="grid size-10 shrink-0 place-items-center rounded-xs bg-muted text-muted-foreground">
                  <FileIcon className="size-5" />
                </span>
              )}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate font-medium text-heading">{i.file.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatBytes(i.file.size)}</span>
                </div>
                {i.status === "error" ? (
                  <p className="text-xs text-(--destructive-text)">{i.error}</p>
                ) : i.status === "done" ? (
                  <p className="flex items-center gap-1 text-xs text-link">
                    <CheckCircle2Icon className="size-3.5" /> Uploaded
                  </p>
                ) : upload ? (
                  <Progress value={i.progress} aria-label={`Uploading ${i.file.name}`} />
                ) : (
                  <p className="text-xs text-muted-foreground">Ready</p>
                )}
              </div>
              {i.status === "error" && (
                <Button variant="ghost" size="icon-sm" aria-label={`Retry ${i.file.name}`} onClick={() => void run(i)}>
                  <RotateCcwIcon />
                </Button>
              )}
              <Button variant="ghost" size="icon-sm" aria-label={`Remove ${i.file.name}`} onClick={() => remove(i.id)}>
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileUpload }
