import "./style.css";

let apiurl = "https://rickandmortyapi.com/api/character";
let nextPage = "";
let previousPage = "";

fetchCharacters();

const cardsContainer = document.querySelector("[data-js=cards]");
let episodeLink = "";
let currentFilter = "all";
const filterForm = document.querySelector("[data-js=filter-form]");

async function fetchCharacters() {
  try {
    const response = await fetch(apiurl);
    const data = await response.json();
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
        <div class="Card__header-container">
          <h3 class="Card__information-headline no-margin">Last known location:</h3>
          <p class="no-margin">${card.location.name}</p>
        </div>
        <div class="Card__header-container">
          <h3 class="Card__information-headline no-margin">First seen in:</h3>
          <p class="no-margin margin-bottom">
          ${episodeData.name}
          </p>
        </div>
      </section>
      `;
        cardsContainer.append(cardElement);
      });
    nextPage = data.info.next;
    previousPage = data.info.prev;
  } catch (error) {
    console.log(error);
  }
}

filterForm.addEventListener("change", () => {
  currentFilter = filterForm.elements["tag-filter"].value;
  fetchCharacters();
});

const nextPageButton = document.querySelector("[data-js=next-page]");
const previousPageButton = document.querySelector("[data-js=previous-page]");

nextPageButton.addEventListener("click", () => {
  apiurl = nextPage;
  fetchCharacters();
  window.scrollTo(0, 0);
});

previousPageButton.addEventListener("click", () => {
  apiurl = previousPage;
  fetchCharacters();
  window.scrollTo(0, 0);
});
