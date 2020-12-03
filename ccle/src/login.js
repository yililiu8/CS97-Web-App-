//import React from 'react';
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './login.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useRouteMatch, useNavigate} from "react-router-dom"; 

var data1 = false;




export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState("");

    //this is where you make sure the username/password is correct and save 
  function validateForm() {
    fetch(`/login?email=${email}&password=${password}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      setValid(data.response);
    })
    return valid;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="login-box">
      <h3 className="Login"> Student Login </h3>
      <br />
      <div className="login-items">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label className="email-text">Email</Form.Label>
            <br />
          <Form.Control
            autoFocusls
            
            type="email"
            className="login-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className="email-text">Password</Form.Label>
            <br />
          <Form.Control
            type="password"
            className="login-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Link to="/home">
        <Button block size="lg" type="submit" className="login-button" disabled={!validateForm()}>
            Login
        </Button>
        </Link>
      </Form>
        </div>
    </div>
  );
}