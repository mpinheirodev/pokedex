const pokemonList = document.getElementById("pokemonsList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadMoreItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
      <a href="./poke-detail.html?pokemon=${
        pokemon.number
      }"><li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="details">
            <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
            </ol>

            <img
              src="${pokemon.image}"
              alt="${pokemon.name}"
            />
          </div>
        </li></a>`
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadMoreItems(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsNextPage = offset + limit;

  if (qtdRecordsNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadMoreItems(offset, newLimit);

    loadMoreBtn.parentElement.removeChild(loadMoreBtn);
  } else {
    loadMoreItems(offset, limit);
  }
});
