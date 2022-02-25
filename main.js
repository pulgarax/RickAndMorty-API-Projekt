import "./style.css";

const apiurl = "https://rickandmortyapi.com/api/character";

fetchCharacters();

const cardsContainer = document.querySelector("[data-js=cards]");
let episodeLink = "";

async function fetchCharacters() {
  try {
    const response = await fetch(apiurl);
    const data = await response.json();
    let episodeData = "";
    cardsContainer.innerHTML = "";
    data.results.forEach((card) => {
      const cardElement = document.createElement("article");
      episodeLink = card.episode[0];
      // console.log(episodeLink);
      const secondReponse = fetch(episodeLink).then((secondReponse) =>
        secondReponse.json().then((secondData) => {
          episodeData = secondData;
          // console.log(episodeData);
          return episodeData;
        })
      );
      console.log(secondReponse);
      // const episode = secondReponse.json();
      // console.log(episode.results);

      cardElement.className = "Card";
      cardElement.innerHTML = `
    <img src="${card.image}"/>
      <section class="Card__information">
        <h2>${card.name}</h2>
        <p>${card.status} - ${card.species}</p>
        <h3 class="Card__information-headline">Last known location:</h3>
        <p>${card.location.name}</p>
        <h3 class="Card__information-headline">First seen in:</h3>
        <p>
        
        </p>
      </section>
      `;
      cardsContainer.append(cardElement);
    });
  } catch (error) {
    console.log(error);
  }
}
