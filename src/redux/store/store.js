import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer'; // Ajusta la ruta según tu estructura

const store = configureStore({
    reducer: rootReducer,
    // Puedes añadir otros middlewares aquí si lo deseas
});

export default store;