
let listPokemon = document.getElementById('pokemonList');
let loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonHtml(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}"> 
        <span class="number">${pokemon.pokemonNumber}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
              ${convertPokemonTypesToList(pokemon.types).join('')}
            </ol>
            <img src="${pokemon.image}" alt="${pokemon.name}">
        </div>
    </li>
    `
};

function convertPokemonTypesToList(pokemonTypes) {
   return pokemonTypes.map((type) => `<li class="type ${type}">${type}</li>`);
}

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        listPokemon.innerHTML += pokemons.map(convertPokemonHtml).join('');
    })
}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecords = offset + limit;
    if (qtdRecords >= maxRecords) {
        const newLimit = maxRecords - offset ;
        loadPokemonsItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else {
        loadPokemonsItens(offset, limit);
    }
    
});
