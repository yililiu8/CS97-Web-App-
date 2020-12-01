//import React from 'react';
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './login.css';
import {BrowserRouter as Link} from "react-router-dom"; 


export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    //this is where you make sure the username/password is correct and save 
  function validateForm() {
    return email.length > 0 && password.length > 0;
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
            autoFocus
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