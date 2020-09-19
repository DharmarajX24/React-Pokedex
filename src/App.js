import React, { useState, useEffect } from 'react';
import './App.css';
import { Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Jumbotron, Card, CardDeck } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import { GitHub, MessageSquare, Twitter, Sun } from 'react-feather'
import { getPokeData } from './handlers/getPokeData'
import { getPokemonTrio } from './handlers/getPokeTrio' 

function App() {
  const [trioClass, toggleTrioClass] = useState("hidden")

  const [pokeArray, setPokeArray] = useState([])

  useEffect(() => {
    initialize()
    generateTrio()
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

      <Jumbotron className="my-5 d-flex-col-center two-rem-padding" style={{ width: "90%" }}>
        <h1 className="font-expletus">Search for a Pokemon</h1>
        <div id="div-search-poke">
          <Form>
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

      <div className={"my-3 d-flex justify-content-center " + trioClass} style={{ width: "100%" }}>
        <CardDeck className="zero-margin x-card-deck">
          {pokeArray.map(eachPoke =>
            <Card key={eachPoke.name} className="x-card" style={{backgroundColor: eachPoke.bgCol}}>
              <Card.Img className="x-card-img" variant="top" src={eachPoke.img} />
              <Card.Body className="x-card-body">
                <Card.Title className="font-expletus">{eachPoke.name}</Card.Title>
                <Card.Text className="font-expletus">
                  Pokemon
              </Card.Text>
              </Card.Body>
            </Card>
          )}
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
  }

  async function generateTrio() {
    const gTrio = await getPokemonTrio()
    setPokeArray(gTrio)
    toggleTrioClass("")
  }
}

export default App;
