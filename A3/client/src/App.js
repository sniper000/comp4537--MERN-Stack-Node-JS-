import React from "react";
import PokeList from "./PokeList";
import { Route, Routes } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";

function App() {
  return (
    <div>
      {/* <PokeList /> */}
      <Routes>
        <Route path="/*" element={<PokeList />} />
        <Route path="/!#" element={<PokeList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
