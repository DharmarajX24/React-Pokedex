import React, { useState, useEffect } from 'react';
import './App.css';
import { Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Jumbotron, Card, CardDeck, Badge, Modal } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import { GitHub, MessageSquare, Twitter, Sun } from 'react-feather'
import { getPokeData } from './handlers/getPokeData'
import { getPokemonTrio } from './handlers/getPokeTrio'
import snorunt from './assets/snorunt.png'

function App() {
  const [trioClass, toggleTrioClass] = useState("hidden")
  const [pokeArray, setPokeArray] = useState([])

  const [show, setShow] = useState(false);
  const [smTitle, setSMTitle] = useState('')
  const [smText, setSMText] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <Form.Control id="input-poke-name" className="font-overpass-mono" type="text" placeholder="Pokemon Name" />
              <Form.Text className="text-muted font-expletus">
                A typo or two are fine ;)
            </Form.Text>
            </Form.Group>
            <Button variant="primary" type="button" onClick={getPokeInfo}>
              Search
            </Button>
          </Form>
        </div>
      </Jumbotron>

      <h2 className={"font-expletus " + trioClass}>or here's your lucky trio :)</h2>

      <div className={"my-3 d-flex justify-content-center " + trioClass} style={{ width: "100%" }}>
        <CardDeck className="zero-margin x-card-deck">
          {pokeArray.map(eachPoke =>
            <Card key={eachPoke.name} className="x-card" style={{ backgroundColor: eachPoke.bgCol }}>
              <Card.Img className="x-card-img" variant="top" src={eachPoke.img} />
              <Card.Body className="x-card-body">
                <Card.Title className="font-expletus">{eachPoke.name}</Card.Title>
                {eachPoke.type.map(eachType => 
                  <Badge variant="success" className="font-expletus" style={{margin: "4px"}}>{eachType['type']['name']}</Badge>
                )}
              </Card.Body>
            </Card>
          )}
        </CardDeck>
      </div>

      <Modal id="modal-status" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="d-flex-col-center" closeButton>
          <Card.Img className="x-card-img" src={snorunt}></Card.Img>
          <Modal.Title className="font-expletus my-1">{smTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-expletus">{smText}</Modal.Body>
      </Modal>
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
      setSMTitle("Welcome :)")
      setSMText("Please wait. First time loading may take some time.")
      handleShow()
      try {
        const pokemonData = await getPokeData()
        console.log(JSON.stringify(pokemonData))
        localStorage.setItem('pokemons', JSON.stringify(pokemonData.data))
        localStorage.setItem('firstVisit', true)
      } catch (error) {
        console.log(error);
      }
      handleClose()
    } else {
      console.log('Old user')
    }
  }

  async function generateTrio() {
    const gTrio = await getPokemonTrio()
    setPokeArray(gTrio)
    toggleTrioClass("")
  }
  
  async function getPokeInfo() {
    if (String(document.getElementById('input-poke-name').value).length >= 1) {
      
    } else {
      alert('Please enter a name.')
    }
  }
}

export default App;
