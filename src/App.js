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
  ProgressBar,
} from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { GitHub, MessageSquare, Twitter, Sun } from "react-feather";
import { getPokeData } from "./handlers/getPokeData";
import { getPokemonTrio } from "./handlers/getPokeTrio";
import { findMatch } from "./handlers/findMatch";
import { formatMoves, formatStats } from "./handlers/dataFormatters";
import snorunt from "./assets/snorunt.png";
import { themeColClasses } from "./handlers/colors";
const ver = "v1.18.0921.b";

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

  const [showFirst, setShowFirst] = useState(false);
  const firstClose = () => setShowFirst(false);
  const firstShow = () => setShowFirst(true);

  const [showPokeInfo, setShowPokeInfo] = useState(false);
  const [pokeImg, setPokeImg] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeMoves, setPokeMoves] = useState("");
  const [pokeType, setPokeType] = useState([]);
  const [pokeStats, setPokeStats] = useState([]);
  const pokeInfoClose = () => setShowPokeInfo(false);
  const pokeInfoShow = () => setShowPokeInfo(true);

  const [bgCol, setBgCol] = useState(
    themeColClasses(localStorage.getItem("theme") || "light").bgClass
  );
  const [navCol, setNavCol] = useState(
    themeColClasses(localStorage.getItem("theme") || "light").navClass
  );
  const [textCol, setTextCol] = useState(
    themeColClasses(localStorage.getItem("theme") || "light").textClass
  );
  const [iconCol, setIconCol] = useState(
    themeColClasses(localStorage.getItem("theme") || "light").iconClass
  );
  const [cardCol, setCardCol] = useState(
    themeColClasses(localStorage.getItem("theme") || "light").cardClass
  );

  useEffect(() => {
    document.getElementById("input-poke-name").focus();
    generateTrio();
    initialize();
  }, []);

  return (
    <div
      className={"App " + bgCol}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar expand="lg" className={"d-flex shadow w-100 " + navCol}>
        <Navbar.Brand className="font-expletus" href="#home">
          <img
            alt=""
            src="/pokeball.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          <span className={textCol}>Pokedex</span>
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
              <Nav.Link
                className={"mx-2 " + iconCol}
                href="https://github.com/DharmarajX24/React-Pokedex"
              >
                <GitHub />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-discord`}>
                  Coming soon
                </Tooltip>
              }
            >
              <Nav.Link className={"mx-2 " + iconCol} href="#link">
                <MessageSquare />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip className="font-expletus" id={`tooltip-twitter`}>
                  Coming soon
                </Tooltip>
              }
            >
              <Nav.Link className={"mx-2 " + iconCol} href="#link">
                <Twitter />
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
              <Nav.Link className={"mx-2 " + iconCol} onClick={toggleTheme}>
                <Sun />
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Jumbotron
        className={"my-5 d-flex-col-center two-rem-padding " + cardCol}
        style={{ width: "90%" }}
      >
        <h1 className={"font-expletus " + textCol}>Search for a Pokemon</h1>
        <div id="div-search-poke">
          <Form onSubmit={getPokeInfo}>
            <Form.Group controlId="formPokeName">
              <Form.Control
                id="input-poke-name"
                className="font-overpass-mono"
                type="text"
                placeholder="Pokemon Name"
              />
              <Form.Text className={"text-muted font-expletus " + textCol}>
                A typo or two are fine ;)
              </Form.Text>
            </Form.Group>
            <Button key="searchBtn" type="submit" variant="primary">
              Search
            </Button>
          </Form>
        </div>
      </Jumbotron>

      <h2 className={"font-expletus " + trioClass + " " + textCol}>
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
        id="modal-first"
        show={showFirst}
        onHide={firstClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="d-flex-col-center">
          <Modal.Title className="font-expletus">{`React Pokedex ${ver}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol className="font-expletus" type="1">
            <li>Search a pokemon</li>
            <li>Minor typos are fine. You'll get a probable match :)</li>
            <li>Get some cool trios</li>
            <li>Enjoy and feel free to suggest features!</li>
          </ol>
          <Button className=" my-2" onClick={firstClose} variant="danger">
            Dismiss
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={showPokeInfo}
        className="x-bg-transparent"
        centered
      >
        <div
          style={{
            outlineStyle: "solid",
            outlineColor: "white",
            outlineWidth: "1px",
          }}
          className={"h-100 w-100 d-flex-col-center " + bgCol}
        >
          <Card.Img
            className="my-2"
            style={{ height: "8rem", width: "8rem" }}
            src={pokeImg}
          ></Card.Img>
          <p
            className={"font-expletus my-3 " + textCol}
            style={{ fontSize: "2rem" }}
          >
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

          <p
            className={"font-expletus my-3 " + textCol}
            style={{ fontSize: "1.25rem" }}
          >
            Base Stats
          </p>
          {pokeStats.map((eachStat) => (
            <ProgressBar
              className="w-75 my-1 font-roboto-slab"
              now={eachStat.value}
              variant={eachStat.color}
              label={`${eachStat.name} ${eachStat.value}`}
              style={{ fontSize: "0.8rem" }}
            />
          ))}
          <p
            className={"font-expletus my-3 mx-2 " + textCol}
            style={{ fontSize: "0.8rem" }}
          >
            <b>Moves:</b> {pokeMoves}
          </p>
          <Button className="my-2" variant="danger" onClick={pokeInfoClose}>
            Dismiss
          </Button>
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
        localStorage.setItem("theme", "light");
        console.log("Data Added");
      } catch (error) {
        console.log(error);
      }
      handleClose();
    } else {
      console.log("Old user");
    }
    if (!localStorage.getItem(`${ver}`)) {
      firstShow();
      localStorage.setItem(`${ver}`, true);
    }
  }

  async function generateTrio() {
    const gTrio = await getPokemonTrio();
    setPokeArray(gTrio);
    toggleTrioClass("");
  }

  async function getPokeInfo(e) {
    e.preventDefault();
    const pokemonToFind = String(
      document.getElementById("input-poke-name").value
    );
    if (pokemonToFind.length >= 1) {
      loaderShow();
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
        setPokeMoves(formatMoves(pokemonInfo.moves));
        setPokeStats(formatStats(pokemonInfo.stats));
        loaderClose();
        pokeInfoShow();
      } else {
        if (bestMatch.data !== "error") {
          loaderClose();
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

  function toggleTheme() {
    if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
      refreshTheme("dark")
    } else {
      localStorage.setItem("theme", "light");
      refreshTheme("light")
    }
  }

  function refreshTheme(theme) {
    setBgCol(theme);
    setNavCol(theme);
    setTextCol(theme);
    setIconCol(theme);
    setCardCol(theme);
    window.location.reload()
  }
}

export default App;
