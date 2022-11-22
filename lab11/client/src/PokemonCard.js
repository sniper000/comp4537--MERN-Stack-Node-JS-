import Card from "react-bootstrap/Card";

function PokemonCard(props) {
  const { pokemonProp } = props;
  const getThreeDigitId = (id) => {
    if (id < 10) return `00${id}`;
    if (id < 100) return `0${id}`;
    return id;
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`https://github.com/fanzeyi/pokemon.json/raw/master/images/${getThreeDigitId(
          pokemonProp.id
        )}.png`}
      />
      <Card.Body>
        <Card.Title>{pokemonProp.name.english}</Card.Title>
        <Card.Text>#{pokemonProp.id}</Card.Text>
        <Card.Text>Types: {pokemonProp.type}</Card.Text>
        <Card.Text>HP: {pokemonProp.base.HP}</Card.Text>
        <Card.Text>Attack: {pokemonProp.base.Attack}</Card.Text>
        <Card.Text>Defense: {pokemonProp.base.Defense}</Card.Text>
        <Card.Text>Speed: {pokemonProp.base.Speed}</Card.Text>
        <Card.Text>Special Defense {pokemonProp.base["Sp. Attack"]}</Card.Text>
        <Card.Text>Special Attack {pokemonProp.base["Sp. Defense"]}</Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
