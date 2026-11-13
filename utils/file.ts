interface File {
  name: string;
  source: string;
  format: string;
}

interface Metadata {
  identifier: string;
  creator?: string;
  date: Date;
  title: string;
  description: string;
  url_prefix: string;
  audioFile?: string;
  episodeArt?: string;
}

export type {
  File,
  Metadata,
}