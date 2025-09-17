import { render } from "@deno/gfm";
import { Post } from "../utils/posts.ts";
import "shikwasa/dist/style.css";

export function PostPage(props: { post: Post }) {
  const post = props.post;
  return (
    <main class="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 class="text-5xl font-bold">{post.title}</h1>
      <time class="text-gray-500">
        {new Date(post.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <div
        class="mt-8 markdown-body"
        dangerouslySetInnerHTML={{ __html: render(post.content!) }}
      />
    </main>
  );
}
