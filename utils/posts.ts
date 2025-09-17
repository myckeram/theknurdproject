import { extract } from "@std/front-matter/any";
import { join } from "@std/path";

export interface Post {
  id: string;
  creator: string;
  title: string;
  publishedAt: Date;
  summary: string;
  episodeArt: string;
  audioFile: string;
  collection: string;
  content?: string;
  lastUpdated: Date;
}

export const getPosts = async (): Promise<Post[]> => {
  const files = Deno.readDir("./posts");
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
};

export const getPost = async (slug: string): Promise<Post | null> => {
  const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
  const { attrs, body } = extract(text);
  const post = attrs as Post;
  return {
    id: post.id,
    creator: post.creator,
    title: post.title,
    publishedAt: new Date(post.publishedAt),
    summary: post.summary,
    content: body,
    episodeArt: post.episodeArt,
    audioFile: post.audioFile,
    collection: post.collection,
    lastUpdated: post.lastUpdated,
  };
};
