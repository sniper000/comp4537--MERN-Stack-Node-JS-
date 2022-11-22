import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Pokemon from "./Pokemon";
import Pagination from "./Pagination";
import BrandExample from "./BrandExample";
import SearchBar from "./Components/SearchBar";

function PokeList() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);
  const [search, setSearch] = useState({
    text: "",
    normalType: false,
    fightingType: false,
    flyingType: false,
    poisonType: false,
    groundType: false,
    rockType: false,
    bugType: false,
    ghostType: false,
    steelType: false,
    fireType: false,
    waterType: false,
    grassType: false,
    electricType: false,
    psychicType: false,
    iceType: false,
    dragonType: false,
    darkType: false,
    fairyType: false,
  });

  useEffect(() => {
    fetch("http://localhost:5500/api/v1/pokemons")
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error(error));
  }, []);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  console.log("search " + typeof search.text + " " + search.text);

  //Filter by Type
  const currentPokemon = pokemon
    .filter((pokemonFiltered) =>
      search.text.length > 0
        ? pokemonFiltered.name.english.includes(search.text)
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.normalType
        ? pokemonFiltered.type.includes("Normal") === search.normalType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.fightingType
        ? pokemonFiltered.type.includes("Fighting") === search.fightingType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.flyingType
        ? pokemonFiltered.type.includes("Flying") === search.flyingType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.poisonType
        ? pokemonFiltered.type.includes("Poison") === search.poisonType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.groundType
        ? pokemonFiltered.type.includes("Ground") === search.groundType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.rockType
        ? pokemonFiltered.type.includes("Rock") === search.rockType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.bugType
        ? pokemonFiltered.type.includes("Bug") === search.bugType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.ghostType
        ? pokemonFiltered.type.includes("Ghost") === search.ghostType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.steelType
        ? pokemonFiltered.type.includes("Steel") === search.steelType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.fireType
        ? pokemonFiltered.type.includes("Fire") === search.fireType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.waterType
        ? pokemonFiltered.type.includes("Water") === search.waterType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.grassType
        ? pokemonFiltered.type.includes("Grass") === search.grassType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.electricType
        ? pokemonFiltered.type.includes("Electric") === search.electricType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.psychicType
        ? pokemonFiltered.type.includes("Psychic") === search.psychicType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.iceType
        ? pokemonFiltered.type.includes("Ice") === search.iceType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.dragonType
        ? pokemonFiltered.type.includes("Dragon") === search.dragonType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.darkType
        ? pokemonFiltered.type.includes("Dark") === search.darkType
        : pokemonFiltered
    )
    .filter((pokemonFiltered) =>
      search.fairyType
        ? pokemonFiltered.type.includes("Fairy") === search.fairyType
        : pokemonFiltered
    )
    .slice(indexOfFirstPokemon, indexOfLastPokemon);
  const numberOfPages = Math.ceil(pokemon.length / pokemonsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(search);

  return (
    <>
      <div>
        <div>
          <BrandExample />
        </div>
        <br />
        <SearchBar setSearch={setSearch} search={search} />
        <br />
        <div>
          <Grid container spacing={4}>
            {currentPokemon
              // .filter(
              //   (pokemonFiltered) =>
              //     pokemonFiltered.type.includes("Fire") && search.fireType
              // )
              .map((poke) => {
                return (
                  <Grid item xs={4} sm={4}>
                    <Pokemon pokemonProp={poke} search={search} />
                  </Grid>
                );
              })}
          </Grid>
        </div>
        <br />
      </div>
      <div>
        <Pagination
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pokemonsPerPage={pokemonsPerPage}
          totalPokemons={pokemon.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default PokeList;
