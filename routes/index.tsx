import { page } from "fresh";
import { define } from "../utils.ts";
import { getPosts, Post } from "../utils/posts.ts";
import { PostCard } from "../components/PostCard.tsx";
import { stringify } from "@std/yaml";

interface Item {
  identifier: string;
  oai_updatedate: Date[];
}

interface File {
  format: string;
}

export const handler = define.handlers({
  async GET(_ctx) {
    const posts = await getPosts();
    const collection = "giant-bomb-audio";
    await fetch(
      `https://archive.org/advancedsearch.php?q=collection:${collection}&fl[]=identifier&fl[]=oai_updatedate&rows=10&page=1&sort[]=date+desc&output=json`,
    )
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.response.numFound > 0) {
          data.response.docs.forEach(async (item: Item) => {
            const post = posts.find((el) => {
              return el.id === item.identifier;
            });
            const updateDate = item.oai_updatedate?.at(-1);
            if (
              post === undefined || updateDate && updateDate > post.lastUpdated
            ) {
              const res = await fetch(
                `https://archive.org/metadata/${item.identifier}`,
              );
              const meta = await res.json();
              const audio = meta.files.filter((file: File) => {
                return file.format.includes("MP3");
              });

              const art = meta.files.filter((file: File) => {
                return file.format == "PNG";
              });

              const frontmatter = {
                id: item.identifier,
                creator: meta.metadata.creator,
                title: meta.metadata.title,
                publishedAt: meta.metadata.date,
                summary: meta.metadata.description,
                audioFile: `https://archive.org/download/${item.identifier}/${
                  audio[0].name
                }`,
                episodeArt: `https://archive.org/download/${item.identifier}/${
                  art[0].name
                }`,
                collection: collection,
                content: meta.metadata.description,
                lastUpdated: meta.item_last_updated,
              };

              const mdContent = formatMarkdown(frontmatter);

              Deno.writeTextFileSync(
                `posts/${item.identifier}.md`,
                mdContent,
              );
            }
          });
        }
      });

    return page({ posts });
  },
});

function formatMarkdown(post: Post) {
  const { content } = post;
  delete post.content;
  return `---\n${stringify(post)}---\n\n${content}\n`;
}

export default define.page<typeof handler>(({ data }) => {
  const posts = data.posts;

  return (
    <main class="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 class="text-5xl font-bold">Blog</h1>
      <div class="mt-8">
        {posts.map((post: Post) => <PostCard key={post.id} post={post} />)}
      </div>
    </main>
  );
});
