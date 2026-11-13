import { File, Metadata } from "@/utils/file.ts";

export interface Post {
  files: {
    audio: File,
    art: File
  },
  metadata: Metadata
}
