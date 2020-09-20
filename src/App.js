import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  Jumbotron,
  Card,
  CardDeck,
  Badge,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { GitHub, MessageSquare, Twitter, Sun } from "react-feather";
import { getPokeData } from "./handlers/getPokeData";
import { getPokemonTrio } from "./handlers/getPokeTrio";
import { findMatch } from "./handlers/findMatch";
import { formatMoves } from "./handlers/dataFormatters"
import snorunt from "./assets/snorunt.png";

function App() {
  const [trioClass, toggleTrioClass] = useState("hidden");
  const [pokeArray, setPokeArray] = useState([]);

  const [show, setShow] = useState(false);
  const [smTitle, setSMTitle] = useState("");
  const [smText, setSMText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showLoader, setShowLoader] = useState(false);
  const loaderClose = () => setShowLoader(false);
  const loaderShow = () => setShowLoader(true);

  const [showPokeInfo, setShowPokeInfo] = useState(false);
  const [pokeImg, setPokeImg] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeMoves, setPokeMoves] = useState("");
  const [pokeType, setPokeType] = useState([]);
  const pokeInfoClose = () => setShowPokeInfo(false);
  const pokeInfoShow = () => setShowPokeInfo(true);

  useEffect(() => {
    generateTrio();
    initialize();
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar bg="light" expand="lg" className="d-flex shadow w-100">
        <Navbar.Brand className="font-expletus" href="#home">
          <img
            alt=""
            src="/pokeball.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Pokedex
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-git`}>
                  View Source Code
                </Tooltip>
              }
            >
              <Nav.Link className="mx-2" href="#home">
                <GitHub color="black" />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-discord`}>
                  Contact on Discord
                </Tooltip>
              }
            >
              <Nav.Link className="mx-2" href="#link">
                <MessageSquare color="black" />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-twitter`}>
                  Tweet
                </Tooltip>
              }
            >
              <Nav.Link className="mx-2" href="#link">
                <Twitter color="black" />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-theme`}>
                  Toggle Theme
                </Tooltip>
              }
            >
              <Nav.Link className="mx-2" href="#link">
                <Sun color="black" />
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Jumbotron
        className="my-5 d-flex-col-center two-rem-padding"
        style={{ width: "90%" }}
      >
        <h1 className="font-expletus">Search for a Pokemon</h1>
        <div id="div-search-poke">
          <Form>
            <Form.Group controlId="formPokeName">
              <Form.Control
                id="input-poke-name"
                className="font-overpass-mono"
                type="text"
                placeholder="Pokemon Name"
              />
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

      <h2 className={"font-expletus " + trioClass}>
        or here's your lucky trio :)
      </h2>

      <div
        className={"my-3 d-flex justify-content-center " + trioClass}
        style={{ width: "100%" }}
      >
        <CardDeck className="zero-margin x-card-deck">
          {pokeArray.map((eachPoke) => (
            <Card
              key={eachPoke.name}
              className="x-card"
              style={{ backgroundColor: eachPoke.bgCol }}
            >
              <Card.Img
                className="x-card-img"
                variant="top"
                src={eachPoke.img}
              />
              <Card.Body className="x-card-body">
                <Card.Title className="font-expletus">
                  {eachPoke.name}
                </Card.Title>
                {eachPoke.type.map((eachType) => (
                  <Badge
                    variant="success"
                    className="font-expletus"
                    style={{ margin: "4px" }}
                  >
                    {eachType["type"]["name"]}
                  </Badge>
                ))}
              </Card.Body>
            </Card>
          ))}
        </CardDeck>
      </div>

      <Modal
        id="modal-status"
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="d-flex-col-center" closeButton>
          <Card.Img
            style={{ height: "6rem", width: "6rem" }}
            src={snorunt}
          ></Card.Img>
          <Modal.Title className="font-expletus my-1">{smTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-expletus">{smText}</Modal.Body>
      </Modal>

      <Modal
        id="modal-loading"
        show={showLoader}
        onHide={loaderClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="d-flex-col-center">
          <Card.Img
            style={{ height: "6rem", width: "6rem" }}
            src={snorunt}
          ></Card.Img>
          <Spinner animation="border" className="my-4" variant="primary" />
        </Modal.Header>
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={showPokeInfo}
        centered
      >
        <div className="h-100 w-100 d-flex-col-center">
          <Card.Img
            className="my-2"
            style={{ height: "8rem", width: "8rem" }}
            src={pokeImg}
          ></Card.Img>
          <p className="font-expletus my-3" style={{ fontSize: "2rem" }}>
            {pokeName}
          </p>
          {pokeType.map((eachType) => (
            <Badge
              variant="success"
              className="font-expletus"
              style={{ margin: "4px" }}
            >
              {eachType["type"]["name"]}
            </Badge>
          ))}
          <p className="font-expletus my-3 mx-2" style={{ fontSize: "0.8rem" }}>
            <b>Moves:</b> {pokeMoves}
          </p>

          <Button className="my-2" variant="danger" onClick={pokeInfoClose}>Dismiss</Button>
        </div>
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
    if (
      !localStorage.getItem("firstVisit") &&
      !localStorage.getItem("pokeNames")
    ) {
      console.log("First Visit");
      setSMTitle("Welcome :)");
      setSMText("Please wait. First time loading may take some time.");
      handleShow();
      try {
        const pokemonData = await getPokeData();
        console.log(JSON.stringify(pokemonData));
        localStorage.setItem("pokemons", JSON.stringify(pokemonData.data[0]));
        localStorage.setItem("pokeNames", JSON.stringify(pokemonData.data[1]));
        localStorage.setItem("firstVisit", true);
        console.log("Data Added");
      } catch (error) {
        console.log(error);
      }
      handleClose();
    } else {
      console.log("Old user");
    }
  }

  async function generateTrio() {
    const gTrio = await getPokemonTrio();
    setPokeArray(gTrio);
    toggleTrioClass("");
  }

  async function getPokeInfo() {
    const pokemonToFind = String(
      document.getElementById("input-poke-name").value
    );
    if (pokemonToFind.length >= 1) {
      const bestMatch = findMatch(pokemonToFind.toLowerCase());
      if (bestMatch.result) {
        //getPokemonInfo
        const pokemonInfo = await (
          await Axios.get(`https://pokeapi.co/api/v2/pokemon/${bestMatch.data}`)
        ).data;
        setPokeImg(
          `https://pokeres.bastionbot.org/images/pokemon/${pokemonInfo.id}.png`
        );
        setPokeName(pokemonInfo.name);
        setPokeType(pokemonInfo.types);
        setPokeMoves(formatMoves(pokemonInfo.moves))
        pokeInfoShow();
      } else {
        if (bestMatch.data !== "error") {
          alert(
            `${bestMatch.data} \nPS: This simple looking alert will be replaced by a modern modal soon :)`
          );
        } else {
          window.location.reload();
        }
      }
    } else {
      alert("Please enter a name.");
    }
  }
}

export default App;
