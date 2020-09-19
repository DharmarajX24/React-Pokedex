import React, { useState, useEffect } from 'react';
import './App.css';
import { Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Jumbotron, Card, CardDeck } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import { GitHub, MessageSquare, Twitter, Sun } from 'react-feather'
import { getPokeData } from './handlers/getPokeData'
import pokeball from './assets/pokeball.png'

function App() {
  const [poke1Img, setPoke1Img] = useState(pokeball)
  const [poke2Img, setPoke2Img] = useState(pokeball)
  const [poke3Img, setPoke3Img] = useState(pokeball)

  const [pokeImg, setPokeImage] = useState("x-card-img")
  const [trioClass, toggleTrioClass] = useState("hidden")

  useEffect(() => {
    initialize()
  }, [])

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Navbar bg="light" expand="lg" className="d-flex shadow w-100">
        <Navbar.Brand className="font-expletus" href="#home">
          <img
            alt=""
            src="/pokeball.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Pokedex
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <OverlayTrigger
              key='bottom'
              placement='bottom'
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-git`}>
                  View Source Code
                </Tooltip>
              }
            >
              <Nav.Link className="mx-2" href="#home"><GitHub color="black" /></Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              key='bottom'
              placement='bottom'
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-discord`}>
                  Contact on Discord
                </Tooltip>
              }
            >
              <Nav.Link className="mx-2" href="#link"><MessageSquare color="black" /></Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              key='bottom'
              placement='bottom'
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-twitter`}>
                  Tweet
                </Tooltip>
              }
            >
              <Nav.Link className="mx-2" href="#link"><Twitter color="black" /></Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              key='bottom'
              placement='bottom'
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-theme`}>
                  Toggle Theme
                </Tooltip>
              }
            >
              <Nav.Link className="mx-2" href="#link"><Sun color="black" /></Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Jumbotron className="my-5 d-flex-col-center" style={{ width: "90%" }}>
        <h1 className="font-expletus">Search for a Pokemon</h1>
        <div id="div-search-poke">
          <Form className="my-3">
            <Form.Group controlId="formPokeName">
              <Form.Control className="font-overpass-mono" type="text" placeholder="Pokemon Name" />
              <Form.Text className="text-muted font-expletus">
                A typo or two are fine ;)
            </Form.Text>
            </Form.Group>
            <Button variant="primary" type="button">
              Search
            </Button>
          </Form>
        </div>
      </Jumbotron>

      <h2 className={"font-expletus " + trioClass}>or here's your lucky trio :)</h2>

      <div className="my-5 d-flex justify-content-center" style={{ width: "100%" }}>
        <CardDeck className="zero-margin x-card-deck">
          <Card className="x-card">
            <Card.Img id="img-poke-1" className="x-card-img" variant="top" src={poke1Img} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
      </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card className="x-card">
            <Card.Img id="img-poke-2" className="x-card-img" variant="top" src={poke2Img} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to additional
        content.{' '}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card className="x-card">
            <Card.Img id="img-poke-3" className="x-card-img" variant="top" src={poke3Img} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
      </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
      />
    </div>
  );

  async function initialize() {
    if (!localStorage.getItem("firstVisit")) {
      console.log('First Visit')
      try {
        const pokemonData = await getPokeData()
        console.log(JSON.stringify(pokemonData))
        localStorage.setItem('pokemons', JSON.stringify(pokemonData.data))
        localStorage.setItem('firstVisit', true)
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Old user')
    }
    setPoke1Img('https://pokeres.bastionbot.org/images/pokemon/6.png');
  }
}

export default App;
