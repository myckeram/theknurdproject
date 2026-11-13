import { Context, page} from "fresh";
import { define } from "@/utils.ts";
import { retrieveEpisode, currentEp } from "@/utils/player.ts";
import ListItem from "@/islands/ListItem.tsx";

export const handler = define.handlers({
  async GET(ctx : Context) {
    const episode = await retrieveEpisode(ctx.params.id);
    currentEp.value = episode;

    return page(episode);
  },
});

export default define.page<typeof handler>(({ data }) => {
  return (
    <>
      <ListItem post={data} />
    </>
  );
});
