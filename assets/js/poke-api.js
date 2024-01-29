

const pokeApi ={}

function convertPokemon(pokemonDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokemonDetail.id;
  pokemon.name = pokemonDetail.name;
  const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
  const [ type ] = types;

  pokemon.type = type;
  pokemon.types = types;
  pokemon.image = pokemonDetail.sprites.other.dream_world.front_default;
  pokemon.altura = pokemonDetail.height;
  pokemon.peso = pokemonDetail.weight;
  pokemon.habilidades = pokemonDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokemon)
};

pokeApi.getPokemons = (offset=0, limit=12) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
};

