import { signal } from "@preact/signals";
import { Post } from "@/utils/post.ts";

export const currentEp = signal<Post>({
  files: {
    audio: {
      name: '',
      source: '',
      format: '',
    },
    art: {
      name:  '',
      source:  '',
      format:  '',
    }
  },
  metadata: {
    identifier:  '',
    date: new Date(0),
    title:  '',
    description:  '',
    url_prefix:  '',
  }
});