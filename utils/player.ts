import { HttpError } from "fresh";
import { signal } from "@preact/signals";
import { Player } from "shikwasa";
import { stringify } from "@std/yaml";
import { extractYaml } from "@std/front-matter";
import { exists } from "jsr:@std/fs/exists";
import { File, Metadata } from "@/utils/file.ts";
import { Post } from "@/utils/post.ts";
import InternetArchive from 'internetarchive-sdk-js';

const ia = new InternetArchive();

const currentEp = signal<Post>({
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

const player = signal<Player | undefined>();

const retrieveCollection = async function (slug: string, rows?: number, page?: number) {
  const collections = {
    knurd: 'knurd-report-tkp',
    jcast: 'jcast-tkp',
    gundam: 'cafe-com-gundam-tkp'
  };

  if (slug) {
    try {
      const collection = collections[slug];
      const filters = {
        collection: collection,
      };
      const options = {
        rows: rows || 5,
        page: page || 1,
        fields: 'identifier'
      }

      const items = await ia.getItems({ filters, options });

      const episodes = await Promise.all(items.response.docs.map(async (ep) => {
        return await ia.getItem(ep.identifier);
      }));

      const count = items.response.numFound;

      return { episodes, count };
    } catch (e) {

    }
  }
}

const formatMarkdown = (post) => {
  const { content } = post;
  delete post.content;
  return `---\n${stringify(post)}---\n\n${content}\n`;
}

const writeMDBackup = (metadata : Metadata) => {
  const frontmatter = { ...metadata, lastUpdated: Date.now() };

  const mdContent = formatMarkdown(frontmatter);

  return Deno.writeTextFileSync(
    `posts/${metadata.identifier}.md`,
    mdContent,
  );
}

const retrieveEpisode = async function (id: string) {
  try {
    const resp = await fetch(`https://archive.org/metadata/${id}`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = await resp.json();

    if ((Object.keys(data).length === 0)) {
      throw new HttpError(404, "Página não encontrada");
    }

    const audio = data.files.find((file: File) => {
      return file.format.includes("MP3");
    });

    const art = data.files.find((file: File) => {
      return file.source == "original" && file.format == "PNG";
    });

    const files = { audio, art };

    const metadata : Metadata = {
      identifier: data.metadata.identifier,
      creator: data.metadata.creator,
      date: data.metadata.date,
      title: data.metadata.title,
      description: data.metadata.description,
      url_prefix: `https://archive.org/download/${data.metadata.identifier}`
    };

    if (!await exists(`posts/${id}.md`)) {
      writeMDBackup({ ...metadata, audioFile: audio.name, episodeArt: art.name });
    } else {
      const markdown = await Deno.readTextFile(`posts/${id}.md`);
      const { attrs } = extractYaml<Metadata>(markdown);
      if (attrs.title != metadata.title || attrs.date != metadata.date || 
          attrs.description != metadata.description
      ) {
        writeMDBackup({ ...metadata, audioFile: audio.name, episodeArt: art.name });
      }
    }

    return { files, metadata };
  } catch (e) {
    if (e.name === "TimeoutError") {
      if (!await exists(`posts/${id}.md`)) {
        throw new HttpError(404, "Página não encontrada");
      }

      const markdown = await Deno.readTextFile(`posts/${id}.md`);
      const { attrs } = extractYaml<Metadata>(markdown);
      const files = {audio: attrs.audioFile, art: { name: attrs.episodeArt } };
      const metadata : Metadata = { 
        ...attrs, 
        url_prefix: `https://archive.org/download/${attrs.identifier}`
      };
  
      return { files, metadata };
    } else {
      throw new HttpError(404, "Página não encontrada");
    }
  }
}

export {
  retrieveEpisode,
  retrieveCollection,
  currentEp,
  player,
}