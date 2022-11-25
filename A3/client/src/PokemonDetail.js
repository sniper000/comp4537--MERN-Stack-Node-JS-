import React from "react";
import { useParams, useLocation } from "react-router-dom";
import BrandExample from "./BrandExample";
import Card from "react-bootstrap/Card";

function PokemonDetail() {
  const { id } = useParams();
  const location = useLocation();
  const getThreeDigitId = (id) => {
    if (id < 10) return `00${id}`;
    if (id < 100) return `0${id}`;
    return id;
  };
  return (
    <div>
      <BrandExample />
      <h1>PokemonDetail Page {id}</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`https://github.com/fanzeyi/pokemon.json/raw/master/images/${getThreeDigitId(
            location.state.id
          )}.png`}
        />
        <Card.Body>
          <Card.Title>{location.state.name}</Card.Title>
          <Card.Text>#{location.state.id}</Card.Text>
          <Card.Text>Types: {location.state.type}</Card.Text>
          <Card.Text>HP: {location.state.hp}</Card.Text>
          <Card.Text>Attack: {location.state.attack}</Card.Text>
          <Card.Text>Defense: {location.state.defense}</Card.Text>
          <Card.Text>Speed: {location.state.speed}</Card.Text>
          <Card.Text>Special Defense {location.state.specialDefense}</Card.Text>
          <Card.Text>Special Attack {location.state.specialAttack}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PokemonDetail;
