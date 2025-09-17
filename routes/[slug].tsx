import { HttpError } from "fresh";
import { define } from "../utils.ts";
import { getPost } from "../utils/posts.ts";
import { PostPage } from "../components/PostPage.tsx";

export const handler = define.handlers({
  async GET(ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) throw new HttpError(404);
    return ctx.render(
      <PostPage post={post} />,
    );
  },
});
