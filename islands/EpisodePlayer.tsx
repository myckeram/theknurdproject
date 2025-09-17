import { useEffect } from "preact/hooks";
import { Post } from "../utils/posts.ts";
import "shikwasa/dist/style.css";
import { Player } from "shikwasa";

export default function EpisodePlayer(props: { post: Post }) {
  const post = props.post;

  useEffect(() => {
    new Player({
      type: "fixed",
      container: () => document.querySelector(`.player-${post.id}`),
      audio: {
        title: post.title,
        artist: post.creator,
        cover: post.episodeArt,
        src: post.audioFile,
      },
      download: true,
    });
  }, []);

  return <div class={`player-${post.id}`}></div>;
}
