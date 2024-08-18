import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia la importación aquí
import { Provider } from 'react-redux';
import store from './redux/store/store'; // Ajusta la ruta según tu estructura
import App from './App';

// Obtén el contenedor raíz del DOM
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}

// Crea un objeto root y renderiza la aplicación
const root = ReactDOM.createRoot(rootElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);