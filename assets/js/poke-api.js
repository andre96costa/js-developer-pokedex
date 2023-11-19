const pokeApi = {}

function convetPokeApiDetailToPokemon(pokemonDetails) {
    const pokemon = new Pokemon();
    pokemon.name = pokemonDetails.name;
    pokemon.pokemonNumber = pokemonDetails.id;
    pokemon.types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemonDetails.types[0].type.name;
    pokemon.image = pokemonDetails.sprites.other.dream_world.front_default;
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((reponse) => reponse.json())
    .then((pokemon) => convetPokeApiDetailToPokemon(pokemon))

}

pokeApi.getPokemons =  (offset= 0, limit = 10) => {
    console.log('offset',offset);
    console.log('limit', limit);
    const url  = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((datailRequests) => Promise.all(datailRequests))
    .then((pokemonDetails) => {
        console.log(pokemonDetails);
        return pokemonDetails;
    })
    .catch((error) => console.log(error));
}