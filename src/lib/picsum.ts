/** Placeholder photos from https://picsum.photos. The same seed always returns the same image. */
export const picsum = (seed: string, width: number, height = width) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
