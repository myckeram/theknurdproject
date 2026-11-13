import { useEffect } from "preact/hooks";
import 'shikwasa/dist/style.css';
import { Player } from "shikwasa";
import { Post } from "@/utils/post.ts";
import { player } from "@/utils/player.ts";

export default function EpisodePlayer(props: { post: Post }) {
    useEffect(() => {
      if (props.post.files.audio.name && player.value === undefined) {
        const instance : Player = new Player({
          fixed: {
            type: "fixed"
          },
          container: () => document.querySelector(`.player-fixed`),
          audio: {
            title: props.post.metadata.title,
            artist: props.post.metadata.creator,
            cover: `${props.post.metadata.url_prefix}/${props.post.files.art.name}`,
            src: `${props.post.metadata.url_prefix}/${props.post.files.audio.name}`,
          },
          download: true,
        });

        player.value = instance;
      }
    }, []);

  return <div class={`player-fixed`}></div>;
}
