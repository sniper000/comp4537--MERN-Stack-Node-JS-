import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

function ErrorCard() {
  return (
    <>
      <Card border="secondary" style={{ width: "24rem" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Title>
                  <BsFillArrowRightSquareFill />
                  &nbsp;&nbsp;&nbsp; GET /pokemons
                </Card.Title>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <Badge bg="warning">400</Badge>{" "}
              </Col>
              <Col>
                <p style={{ color: "lawngreen" }}>50 ms</p>
              </Col>
              <Col>
                <p>Dec 3 4:56:34 PM</p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      {/* card 2 */}
      <br />
      <Card border="secondary" style={{ width: "24rem" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Title>
                  <BsFillArrowRightSquareFill />
                  &nbsp;&nbsp;&nbsp; GET /pokemons/2000
                </Card.Title>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <Badge bg="danger">500</Badge>{" "}
              </Col>
              <Col>
                <p style={{ color: "lawngreen" }}>50 ms</p>
              </Col>
              <Col>
                <p>Dec 3 4:56:34 PM</p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      {/* card 3 */}
      <br />
      <Card border="secondary" style={{ width: "24rem" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Title>
                  <BsFillArrowRightSquareFill />
                  &nbsp;&nbsp;&nbsp; GET /pokemonImage/28
                </Card.Title>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <Badge bg="danger">500</Badge>{" "}
              </Col>
              <Col>
                <p style={{ color: "lawngreen" }}>50 ms</p>
              </Col>
              <Col>
                <p>Dec 3 4:56:34 PM</p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      {/* card 4 */}
      <br />
      <Card border="secondary" style={{ width: "24rem" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Title>
                  <BsFillArrowRightSquareFill />
                  &nbsp;&nbsp;&nbsp; DELETE /pokemon/3000
                </Card.Title>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <Badge bg="warning" text="dark">
                  402
                </Badge>{" "}
              </Col>
              <Col>
                <p style={{ color: "lawngreen" }}>50 ms</p>
              </Col>
              <Col>
                <p>Dec 3 4:56:34 PM</p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      {/* card 5 */}
      <br />
      <Card border="secondary" style={{ width: "24rem" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Title>
                  <BsFillArrowRightSquareFill />
                  &nbsp;&nbsp;&nbsp; PUT /pokemon/3000
                </Card.Title>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <Badge bg="warning" text="dark">
                  402
                </Badge>{" "}
              </Col>
              <Col>
                <p style={{ color: "lawngreen" }}>50 ms</p>
              </Col>
              <Col>
                <p>Dec 3 4:56:34 PM</p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default ErrorCard;
