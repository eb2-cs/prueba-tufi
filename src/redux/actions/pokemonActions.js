import { fetchPokemonsStart, fetchPokemonsSuccess, fetchPokemonsFailure } from '../reducers/pokemonReducer';

// Puedes usar una URL de la API que devuelva más detalles del Pokémon.
export const fetchPokemons = () => async (dispatch) => {
    dispatch(fetchPokemonsStart());
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
                name: pokemon.name,
                image: pokemonData.sprites.front_default // Obtén la URL de la imagen
            };
        }));
        dispatch(fetchPokemonsSuccess(pokemonDetails));
    } catch (error) {
        dispatch(fetchPokemonsFailure(error.message));
    }
};