import Card from "react-bootstrap/Card";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

function PokemonCard(props) {
  const { pokemonProp } = props;
  let navigate = useNavigate();
  const getThreeDigitId = (id) => {
    if (id < 10) return `00${id}`;
    if (id < 100) return `0${id}`;
    return id;
  };
  function clickToPokemonDetail() {
    console.log("clicked detail " + pokemonProp.name.english);
    console.log("clicked pokemon id " + pokemonProp.id);
    navigate(`/pokemon/${pokemonProp.id}`, {
      state: {
        id: pokemonProp.id,
        name: pokemonProp.name.english,
        type: pokemonProp.type,
        hp: pokemonProp.base.HP,
        attack: pokemonProp.base.Attack,
        defense: pokemonProp.base.Defense,
        speed: pokemonProp.base.Speed,
        specialDefense: pokemonProp.base["Sp. Attack"],
        specialAttack: pokemonProp.base["Sp. Defense"],
      },
    });
    // <Link to={`/pokemon/${pokemonProp.id}`}>Pokemon Detail Page</Link>;
  }
  return (
    <Card onClick={clickToPokemonDetail} style={{ width: "18rem" }}>
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
