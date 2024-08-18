import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from '../redux/actions/pokemonActions';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        const newQuery = event.target.value;
        console.log('New Query:', newQuery); // Verifica el valor del input
        setQuery(newQuery);
        dispatch(fetchPokemons(newQuery));
    };

    return (
        <input
            type="text"
            value={query} // Vincular el valor del input con el estado
            onChange={handleSearch} // Manejar el cambio
            placeholder="Search Pokémon..."
        />
    );
};

export default SearchBar;