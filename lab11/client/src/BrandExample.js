import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
              width="200"
              height="160"
              className="d-inline-block align-middle"
            />
            <img
              alt=""
              src="https://www.freepnglogos.com/uploads/pokeball-png/pokeball-the-poke-basic-league-accepting-challengers-9.png"
              width="30"
              height="30"
              className="d-inline-block align-middle"
            />Pokedex{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;