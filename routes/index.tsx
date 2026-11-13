import { Head } from "fresh/runtime";
import { Context, page} from "fresh";
import { define } from "../utils.ts";
import { retrieveCollection } from "@/utils/player.ts";
import Pagination from "@/components/Pagination.tsx";
import ListItem from "@/islands/ListItem.tsx";

export const handler = define.handlers({
  async GET(ctx : Context) {
    const currPage = ctx.url.searchParams.get("page") || 1;
    const rows = 10;
    const { episodes, count } = await retrieveCollection('jcast', rows, currPage);
    const numPages = Math.ceil(count / rows);


    return page({ episodes, numPages, currPage });
  },
});

export default define.page(function Home({ data }) {
  return (
    <>
      {data.currPage > 1 && <Pagination currPage={data.currPage} numPages={data.numPages} />}
      {data.episodes.map(ep => (
        <ListItem post={ep} />
      ))}
      <Pagination currPage={data.currPage} numPages={data.numPages} />
      
    </>
  );
});
