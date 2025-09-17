import { Post } from "../utils/posts.ts";
import EpisodePlayer from "../islands/EpisodePlayer.tsx";

export function PostCard(props: { key: string; post: Post }) {
  const { post } = props;

  return (
    <div class="py-8 border(t gray-200)">
      <a class="sm:col-span-2" href={`/${post.id}`}>
        <h3 class="text(3xl gray-900) font-bold">
          {post.title}
        </h3>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-gray-900">
          {post.summary}
        </div>
      </a>
      <EpisodePlayer post={post} />
    </div>
  );
}
