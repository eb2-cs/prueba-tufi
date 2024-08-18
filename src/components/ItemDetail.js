import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {
    const { name } = useParams(); // Obtener el nombre del Pokémon desde la URL
    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemDetail = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemon(data);

                const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
                if (!speciesResponse.ok) {
                    throw new Error('Species network response was not ok');
                }
                const speciesData = await speciesResponse.json();
                setSpecies(speciesData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchItemDetail();
    }, [name]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const descriptionInSpanish = species.flavor_text_entries.find(
        (entry) => entry.language.name === 'es'
    )?.flavor_text;

    return (
        pokemon && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                
                {/* Imagen del Pokémon */}
                <img 
                    src={pokemon.sprites.other["official-artwork"].front_default} 
                    alt={pokemon.name} 
                    style={{ width: '200px', height: '200px' }} 
                />
                <div style={{  textAlign: 'left'  }}  >

                    {/* Detalles generales */}
                    <p><strong>ID:</strong> {pokemon.id}</p>
                    <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                    <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                    <p><strong>Tipo:</strong> {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>

                    {/* Habilidades */}
                    <h3>Habilidades</h3>
                    <ul>
                        {pokemon.abilities.map((abilityInfo, index) => (
                            <li key={index}>{abilityInfo.ability.name}</li>
                        ))}
                    </ul>



                    {/* Descripción en la Pokédex */}
                    {descriptionInSpanish && (
                        <div style={{ marginTop: '20px' }}>
                            <h3>Descripción</h3>
                            <p>{descriptionInSpanish}</p>
                        </div>
                    )}


                </div>

            </div>
        )
    );
};

export default ItemDetail;