import "./style.css";



const apiurl = "https://rickandmortyapi.com/api/character";


fetchCharacters();

const cardsContainer = document.querySelector("[data-js=cards]");
let episodeLink = "";
let currentFilter = "all";
const filterForm = document.querySelector("[data-js=filter-form]");

async function fetchCharacters() {
  try {
    const response = await fetch(apiurl);
    const data = await response.json();
    let episodeData = "";
    cardsContainer.innerHTML = "";
    data.results
      .filter(
        (card) =>
          card.status == currentFilter ||
          currentFilter == "all" ||
          card.species == currentFilter
      )
      .forEach(async (card) => {
        const cardElement = document.createElement("article");
        episodeLink = card.episode[0];
        const secondResponse = await fetch(episodeLink);
        const episodeData = await secondResponse.json();
        console.log(episodeData);
        cardElement.className = "Card";
        cardElement.innerHTML = `
    <img src="${card.image}"/>
      <section class="Card__information">
        <h2 class='card-header'>${card.name}</h2>
        <p>${card.status} - ${card.species}</p>
        <h3 class="Card__information-headline">Last known location:</h3>
        <p>${card.location.name}</p>
        <h3 class="Card__information-headline">First seen in:</h3>
        <p>
        ${episodeData.name}
        </p>
      </section>
      `;
        cardsContainer.append(cardElement);
      });
  } catch (error) {
    console.log(error);
  }
}

filterForm.addEventListener("change", () => {
  currentFilter = filterForm.elements["tag-filter"].value;
  fetchCharacters();
});
