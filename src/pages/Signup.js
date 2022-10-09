import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

import Signin from "./examples/Signin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";

import BgImage from "../assets/img/illustrations/signin.svg";
import dandelionContribLogo from "../assets/img/dandelion-contributor-badge.png";
import Preloader from "../components/Preloader";

import { useParams } from 'react-router';
import {useLocation} from "react-router-dom";
import {checkValidationList, inputValidate} from "../utils/utils";

import { uuid as uuidV4 } from 'uuidv4';

const codec = require('json-url')('lzw');

var theWorstHashEver = function(s) {
  for(var i = 0, h = 0xdeadbeef; i < s.length; i++)
      h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
  return String((h ^ h >>> 16) >>> 0);
};

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

export default () => {
    const search = useLocation().search;
    const uuid = new URLSearchParams(search).get('uuid') || (uuidV4());
    const [values,setValues] = useState({
        uuid,
        ipfsPath:  "",
        username:  "",
        fullname:  "",
        adaAmount: 1,
        checkbox:  ""
    });
    const [validValues,setValidValues] = useState({
        uuid: true,
        ipfsPath:  false,
        username:  false,
        fullname:  false,
        adaAmount: false,
        checkbox:  false
    });

    const handle=`@${values.username}`;
    const issuedAt=Math.floor(Date.now() / 1000);
    const expirationDelta=(60*60*24*2);
    const gcCodeTemplate = {
    "type": "tx",
    "ttl": 180,
    "title": `${handle} - dandelion contributor`,
    "description": `Dandelion Contributor IDNFT minting tx`,
    "onSuccessURL": `${process.env.PUBLIC_URL}/#/signin`,
    "outputs": {
      "addr1qxyh3m7vwdw79rw97m0lghjxhhk9pjmsn6dfe2ms2m043ppvrzdp4wcghqx83fez83rz9t0lzjtqn3ug5ujnuugq4jpq39tkw2": [
        { "quantity": `${values.adaAmount}`, "policyId": "ada", "assetName": "ada" }
      ]
    },
    "mints": [
        {
            "script": {
                "issuers": [
                    {
                        "accountIndex": 0,
                        "addressIndex": 0
                    }
                ],
                "beforeSlotOffset": 300
            },
            "assets": [
                {
                    "assetName": handle,
                    "quantity": "1"
                }
            ]
        }
    ],
    "metadata": {
        "721": {
            "0": {
                [handle]: {
                    "url": "contrib.dandelion.link",
                    "name": "Dandelion Contributor IDNFT",
                    "author": ["Dandelion Contrib Portal <contrib@dandelion.link>"],
                    "image": ["ipfs://bafybeihbx6ixbcb3qwsq7qtrao65czojfsmahvgx3z5dc6verivf4356", "va"],
                    "version": "1.0",
                    "mediaType": "image/png",
                    "files": [
                        {
                            "name": "Dandelion Contributor Badge",
                            "mediaType": "image/png",
                            "src": ["ipfs://bafybeihbx6ixbcb3qwsq7qtrao65czojfsmahvgx3z5dc6verivf4356", "va"],
                            "sha256": ""
                        }
                    ]
                }
            }
        },
        "7368": {
            "0": {
                [handle]: {
                    "avatar": {
                        "src": ["ipfs://bafybeihbx6ixbcb3qwsq7qtrao65czojfsmahvgx3z5dc6verivf4356", "va"],
                    },
                    "iss": "https://contrib.dandelion.link",
                    "aud": [
                        "https://dandelion.link"
                    ],
                    "iat": String(issuedAt),
                    "nbf": String(issuedAt),
                    "exp": String(issuedAt + expirationDelta ),
                    "sub": values.uuid ,
                    "id": theWorstHashEver(`${values.username}}`),
                    "name": values.fullname,
                    "dom": "dandelionlink",
                    extras:{
                      "url": "contrib.dandelion.link",
                      "name": "Dandelion Contributor IDNFT",
                      "author": ["Dandelion Contrib Portal <contrib@dandelion.link>"]
                    }
                }
            }
        }
      }
    };
    console.log({values,gcCodeTemplate});

    const onValueChange=(field)=>(event)=>{
        setValues({...values, [field]:event.target.value});

        // Check if the input pass all regex match list
        const validatedList = inputValidate(event.target.value);

        // Get if all regexs are valid
        const validInput = checkValidationList(validatedList);
        setValidValues({...validValues, [field]:validInput});

    }

    const onSubmit=(event)=>{
        event.preventDefault();
        codec.compress(gcCodeTemplate).then(result => {
          window.location.href = `https://wallet.gamechanger.finance/api/1/tx/${result}`;
        });
    }
    const onLoginClick=(event)=>{
        event.preventDefault();
        window.location.href = `https://wallet.gamechanger.finance/api/1/address`;
    }

    const onCheckBoxChange= (field)=>(event)=>{
        setValidValues({...validValues, [field]:event.target.checked});
    }

    const formIsValid = validValues.username && validValues.checkbox && values.uuid!==null;

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
              <FontAwesomeIcon className="me-2" /> Welcome to Dandelion Contrib Portal!
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <div className="w-250 fmxw-250">
              <img src={dandelionContribLogo} alt="Logo" />
            </div>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h4 className="mb-0">Mint a Dandelion Contributor IDNFT</h4>
                </div>
                <p className="text-left">
                    <FontAwesomeIcon className="me-2" /> The IDNFT is minted using your own wallet's private keys, which will make any contributor IDNFT to have a different PolicyID. In order for us to validate them, at least 1 ADA (minUTxO protocol parameter) needs to be sent to our validation address in the minting transaction.
                </p>
                <p className="text-left">
                    <FontAwesomeIcon className="me-2" /> Currently only GameChanger wallet is supported as it was the easiest one to integrate. Give it a try!
                </p>
                <Form className="mt-4">
                  <Form.Group id="uuid" className="mb-4">
                    <Form.Label>Contributor ID</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="inputGroupPrepend">#
                      </InputGroup.Text>
                      <Form.Control autoFocus required disabled type="text" defaultValue={uuid}/>
                    </InputGroup>
                  </Form.Group>
                </Form>
                <Form className="mt-4">
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>Username/Nickname/Handle</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="inputGroupPrepend">@
                      </InputGroup.Text>
                      <Form.Control onChange={onValueChange("username")}  autoFocus required type="text" placeholder="FancyFlower42" />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <Form className="mt-4">
                  <Form.Group id="fullname" className="mb-4">
                    <Form.Label>Full Name (optional)</Form.Label>
                    <InputGroup  >
                      <Form.Control onChange={onValueChange("fullname")} autoFocus type="text" placeholder="" />
                    </InputGroup>
                  </Form.Group>
                  <FormCheck  type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input onChange={onCheckBoxChange("checkbox")} required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I do agree to validate <Card.Link> this IDNFT </Card.Link> as Dandelion Contributor by sending
                      <Form.Group id="adaAmount" className="mb-4">
                        <InputGroup className="mb-3">
                        <InputGroup.Text>$ADA</InputGroup.Text>
                          <Form.Control required onChange={onValueChange("adaAmount")} autoFocus type="number" defaultValue="1" />
                        </InputGroup>
                      </Form.Group>
                    </FormCheck.Label>
                  </FormCheck>

                  <Button disabled={!formIsValid} onClick={onSubmit} variant="primary" type="submit" className="w-100">
                    Contribute
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
