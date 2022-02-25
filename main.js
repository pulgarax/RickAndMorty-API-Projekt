import './style.css'

const apiurl = 'https://rickandmortyapi.com/api/character'

fetchCharacters();

async function fetchCharacters() {
  try {
    const response = await fetch(apiurl);
    const data = await response.json();
    console.log(data.results);
  } 
  catch(error) {
    console.log(error);
  } 
}

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
