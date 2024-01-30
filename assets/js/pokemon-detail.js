let currentPokemonId = null;
const pokemonDetail = document.getElementById("pokemonDetail");
const pokemonContent = document.getElementById("pokemonContent");
const pokeBody = document.getElementsByTagName("body")[0];


document.addEventListener("DOMContentLoaded", () => {
  const pokemonId = new URLSearchParams(window.location.search).get("pokemon");

  currentPokemonId = pokemonId;
  getPokemon(pokemonId);
});

function getPokemon(pokemonId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  return fetch(url)
    .then((response) => response.json())
    .then(convertPokemon)
    .then((pokemon) => {
      const newHtmlDetail = `
      <div class="header">
        <a href="./index.html"><i class="fa-solid fa-arrow-left"></i></a>
        <i class="fa-regular fa-heart"></i>
      </div>

      <section class="info">
        <div class="detail">
          <h2>${pokemon.name}</h2>
          <span>#${pokemon.number}</span>
        </div>
        <ul class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
        </ul>
        <img src="${pokemon.image}"
        alt="${pokemon.name}" />
      </section>`;
      const newHtmlContent = `
      <div class="about">
        <div class="about-content">
          <span>Altura</span>
          <h3>${pokemon.altura / 10} m</h3>
        </div>
        <div class="about-content">
          <span>Peso</span>
          <h3>${pokemon.peso / 10} kg</h3>
        </div>
        <div class="about-content">
          <span>Habilidades</span>
          <div>
          ${pokemon.habilidades.map((habilidade) => `<h3>${habilidade}</h3>`).join("")}
          </div>
        </div>
      </div>`
      pokeBody.classList.add(`${pokemon.type}`);
      pokemonDetail.innerHTML += newHtmlDetail;
      pokemonContent.innerHTML += newHtmlContent;
    });
}
