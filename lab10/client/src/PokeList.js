import React, { useEffect, useState } from 'react'
import { Grid, Box } from '@mui/material';
import Pokemon from './Pokemon'
import Pagination from './Pagination'
import BrandExample from './BrandExample'

function PokeList() {
    const [pokemon, setPokemon] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(10)

    useEffect(() => {
        fetch('http://localhost:5500/api/v1/pokemons')
            .then(response => response.json())
            .then(data => setPokemon(data))
            .catch(error => console.error(error))
    }, [])

    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemon = pokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)
    const numberOfPages = Math.ceil(pokemon.length / pokemonsPerPage)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div>
                <div><BrandExample /></div>
                <br/>
                <div>
                    <Grid container spacing={4}>
                        {
                            currentPokemon.map(poke => {
                                return (
                                    <Grid item xs={4} sm={4}>
                                        <Pokemon pokemonProp={poke} />
                                    </Grid>)
                            })
                        }
                    </Grid>
                </div>
                <br/>
            </div>
            <div>
                <Pagination numberOfPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} pokemonsPerPage={pokemonsPerPage} totalPokemons={pokemon.length} paginate={paginate} />
            </div>
        </>
    )
}

export default PokeList