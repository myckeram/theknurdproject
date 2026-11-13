import { Post } from "@/utils/post.ts";
import { player, currentEp } from "@/utils/player.ts";
import { Signal } from "@preact/signals";

// TODO: Lazy-load island https://usefresh.dev/docs/examples/common-patterns#lazy-loading-island-content
function Image({ prefix, art }) {
  if (art) {
    return (
      <div>
        <img src={`${prefix}/__ia_thumb.jpg`} style="height:200px;" />
      </div>
    );
  }

  return <div></div>;
}

export default function ListItem(props: { post: Post }) {
  return (
    <article>
      <h2><a href={`/posts/${props.post.metadata.identifier}`} class="article-link">{ props.post.metadata.title }</a></h2> 
      <h5><time>{ props.post.metadata.date }</time></h5>
      <Image prefix={props.post.metadata.url_prefix} art={props.post.files.art} />
      <p dangerouslySetInnerHTML={{ __html: props.post.metadata.description }}></p>
      <a onClick={ () => loadEpisodeAndPlay(player, props.post) } class="category-red">Ouça aqui!</a>
    </article>
  );
}

function loadEpisodeAndPlay(player : Signal, episode : Post) {
  currentEp.value = episode; 
  player.value.play();
}