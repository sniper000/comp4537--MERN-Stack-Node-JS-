import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'

function Pokemon(props) {
    const { pokemonProp } = props
    const [pokemonImage, setPokemonImage] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5500/api/v1/pokemonImage/${pokemonProp.id}`)
            .then(response => response.json())
            .then(data => setPokemonImage(data))
            .catch(error => console.error(error))
    }, [][0])

    return (
        <div>
            <div><PokemonCard pokemonProp={pokemonProp} pokemonImage={pokemonImage} /></div>
            {/* <p>{pokemonImage.url}</p> */}
            {/* <img src={pokemonImage.url}
                width="200"
                height="200" />
            <h1>{pokemonProp.name.english}</h1>
            <p>id {pokemonProp.id}</p>
            <p>{pokemonProp.type}</p>
            <p>{pokemonProp.base.HP}</p>
            <p>{pokemonProp.base.Attack}</p>
            <p>{pokemonProp.base.Defense}</p>
            <p>{pokemonProp.base.Speed}</p>
            <p>Special Defense {pokemonProp.base["Speed Defense"]}</p>
            <p>Special Attack {pokemonProp.base["Speed Attack"]}</p> */}
        </div>
    )
}

export default Pokemon