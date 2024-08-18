import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonReducer'; // Ajusta la ruta según tu estructura

// Combina tus reducers aquí
const rootReducer = combineReducers({
    pokemon: pokemonReducer, // Ajusta el nombre del estado según sea necesario
});

export default rootReducer