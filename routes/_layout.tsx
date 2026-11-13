import { define } from "../utils.ts";
import { currentEp } from "@/utils/player.ts";
import EpisodePlayer from "@/islands/EpisodePlayer.tsx";

export default define.layout(({ Component, state, url }) => {
  return (
    <html lang="en">
      <head>
        <title>The Knurd Project</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Tourney:ital,wdth,wght@0,99.5,600;1,99.5,600&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body>
        <header>
          <h1><a href="#">The Knurd Project</a></h1>
          <p>podcasts independentes</p>
        </header>

        <nav>
          <a href="#" class="category-red">JCast</a>
          <a href="#" class="category-blue">Knurd Report</a>
          <a href="#" class="category-yellow">Café com Gundam</a>
          <a href="#" class="category-purple">Drunk Report</a>
          <a href="#" class="category-green">Deixa que Eu Jogo Sozinho</a>
          <a href="#" class="right">Sobre</a>
        </nav>

        <div class="row">
          <div class="side">
            <h2><a href="#">Knurd Project</a></h2>
            <p>Anime e cultura pop, japonesa ou não.</p>
            <search>
              <form>
                  <input name="busca" id="busca" placeholder="pesquisar" type="text" />
              </form>
            </search> 
            <button style="font-size:22px">RSS <i class="fa fa-rss-square"></i></button>
          </div>
          <main>
            <Component />
          </main>
        </div>

        <footer>
          <p>Created by NSeke Studios.</p>
        </footer>
        <EpisodePlayer post={currentEp.value} />
      </body>
    </html>
  );
});