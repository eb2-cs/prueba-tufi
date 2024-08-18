import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemons: [],
        loading: false,
        error: null,
        searchQuery: '', 
    },
    reducers: {
        fetchPokemonsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPokemonsSuccess(state, action) {
            state.pokemons = action.payload;
            state.loading = false;
        },
        fetchPokemonsFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        setSearchQuery(state, action) {  // Nueva acción para manejar la búsqueda
            state.searchQuery = action.payload;
        },
    },
});

export const { fetchPokemonsStart, fetchPokemonsSuccess, fetchPokemonsFailure, setSearchQuery } = pokemonSlice.actions;
export default pokemonSlice.reducer;