import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PokemonCard(props) {
    const { pokemonProp, pokemonImage } = props
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pokemonImage.url} />
      <Card.Body>
        <Card.Title>{pokemonProp.name.english}</Card.Title>
        <Card.Text>id: {pokemonProp.id}</Card.Text>
        <Card.Text>Types: {pokemonProp.type}</Card.Text>
        <Card.Text>HP: {pokemonProp.base.HP}</Card.Text>
        <Card.Text>Attack: {pokemonProp.base.Attack}</Card.Text>
        <Card.Text>Defense: {pokemonProp.base.Defense}</Card.Text>
        <Card.Text>Speed: {pokemonProp.base.Speed}</Card.Text>
        <Card.Text>Special Defense {pokemonProp.base["Speed Defense"]}</Card.Text>
        <Card.Text>Special Attack {pokemonProp.base["Speed Attack"]}</Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;