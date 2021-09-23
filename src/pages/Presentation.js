import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faFolder,
  faUsersCog
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Image, Button, Container, Tooltip, OverlayTrigger, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { Routes } from "../routes";
import cardanoLogo from "../assets/img/technologies/Cardano-original-white.png";
import peopleLogo from "../assets/img/illustrations/people.png";
import {useLocation} from "react-router-dom";

export default () => {
  const location = useLocation();
  const search = location.search;
  const uuid    = new URLSearchParams(search).get('uuid');
  const address = new URLSearchParams(search).get('address');

  if (uuid!==null){
    window.location.href = `${PUBLIC_URL}/#${Routes.Signup.path}?uuid=${uuid}`;
    // return <Redirect
    //     push
    //     to={{
    //       pathname: `${Routes.Signup.path}?uuid=caca`,
    //       state: { from: location }
    //     }}
    // />
  }
  if (address!==null){
    window.location.href = `${PUBLIC_URL}/#${Routes.Signin.path}?address=${address}`;
    // return <Redirect
    //     to={{
    //       pathname: Routes.Signin.path+`?address=${address}`,
    //       state: { from: location }
    //     }}
    // />
  }


  const PagePreview = (props) => {
    const { name, image, link } = props;

    return (
      <Col xs={6} className="mb-5">
        <Card.Link as={Link} to={link} className="page-preview page-preview-lg scale-up-hover-2">
          <Image src={image} className="shadow-lg rounded scale" alt="Dashboard page preview" />

          <div className="text-center show-on-hover">
            <h6 className="m-0 text-center text-white">
              {name} <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2" />
            </h6>
          </div>
        </Card.Link>
      </Col>
    );
  };

  const Feature = (props) => {
    const { title, description, icon } = props;

    return (
      <Col xs={12} sm={6} lg={3}>
        <Card className="bg-white shadow-soft text-primary rounded mb-4">
          <div className="px-3 px-lg-4 py-5 text-center">
            <span className="icon icon-lg mb-4">
              <FontAwesomeIcon icon={icon} />
            </span>
            <h5 className="fw-bold text-primary">{title}</h5>
            <p>{description}</p>
          </div>
        </Card>
      </Col>
    );
  };

  const FolderItem = (props) => {
    const { name, icon, tooltip, iconColor } = props;
    const color = iconColor ? `text-${iconColor}` : "";

    return (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="left"
        overlay={<Tooltip>{tooltip}</Tooltip>}
      >
        <li data-toggle="tooltip" data-placement="left" title="Main folder that you will be working with">
          <FontAwesomeIcon icon={icon ? icon : faFolder} className={`${color} me-2`} /> {name}
        </li>
      </OverlayTrigger>
    );
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" bg="dark" className="navbar-transparent navbar-theme-primary sticky-top">
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 d-flex align-items-center">
            <Image src={cardanoLogo} />
            <span className="ms-2 brand-text d-none d-md-inline">Cardano Summit</span>
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            {/*<Button as={HashLink} to="#download" variant="outline-white" className="ms-3"><FontAwesomeIcon icon={faDownload} className="me-1" /> Entrar </Button>*/}
            <Button as={HashLink} to={Routes.Signin.path} variant="outline-white" className="ms-3"><FontAwesomeIcon icon={faExternalLinkAlt} className="me-1" /> Entrar </Button>
          </div>
        </Container>
      </Navbar>
      <section className="landing-header section-header overflow-hidden pt-5 pt-lg-6 pb-9 pb-lg-12 bg-primary text-white" id="home">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <h1 className="fw-bolder">Sevilla Cardano Summit 2021</h1>
              <p className="text-muted fw-light mb-5 h5">En vivo junto a miles de ciudades del mundo, el 25 y 25 de Septiembre. La asistencia es libre y gratuita!</p>
              <div className="d-flex align-items-center justify-content-center">
                <Button variant="secondary" as={HashLink} to={Routes.Signup.path} className="text-dark me-3">
                  Registrarse <FontAwesomeIcon icon={faExternalLinkAlt} className="d-none d-sm-inline ms-1" />
                </Button>
                {/*<GitHubButton className="mt-lg-2" href="https://github.com/themesberg/volt-react-dashboard" data-size="large" data-show-count="true" aria-label="Star themesberg/volt-react-dashboard on GitHub">Star</GitHubButton>*/}
              </div>
              <div className="d-flex justify-content-center flex-column mb-6 mb-lg-5 mt-5">
                <div className="text-center">
                  <a href="">
                    <FontAwesomeIcon icon={faUsersCog} className="me-1 landing-icon" />
                    <p className="text-muted font-small m-0">La Repsistance + GameChanger Wallet</p>
                  </a>
                  <div>
                    <Image className="people-graphics" src={peopleLogo} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <footer className="landing-footer footer py-6 bg-dark text-white">
        <hr className="bg-gray my-5" />
        <Container>
          <Row>
            <Col md={8}>
              <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 mb-3 d-flex align-items-center">
                <Image src={cardanoLogo} />
                <span className="ms-2 brand-text">Cardano</span>
              </Navbar.Brand>
              <p>Combina tecnologías pioneras para proporcionar una seguridad y sostenibilidad sin precedentes a las aplicaciones, sistemas y sociedades descentralizadas.</p>
            </Col>

          </Row>

        </Container>
      </footer>
    </>
  );
};
