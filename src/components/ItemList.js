import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPokemons } from '../redux/actions/pokemonActions';
import { ItemCard } from './styles';
import { setSearchQuery } from '../redux/reducers/pokemonReducer';

const ItemList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pokemons, loading, error, searchQuery } = useSelector((state) => state.pokemon);

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClick = (name) => {
        navigate(`/pokemon/${name}`);  
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Listado de Pokémon</h2>

            <input
                type="text"
                placeholder="Buscar por nombre o por palabra clave Pokémon"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ display: 'block', margin: '0 auto 20px', padding: '10px', width: '49%' }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {filteredPokemons.map((pokemon) => (
                    <ItemCard key={pokemon.name} onClick={() => handleClick(pokemon.name)}>
                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                        />
                        <p>{pokemon.name}</p>
                    </ItemCard>
                ))}
            </div>
        </div>
    );
};

export default ItemList;