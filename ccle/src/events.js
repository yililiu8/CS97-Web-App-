import React from 'react';
import ReactDOM from 'react-dom';
import './events.css';
import Logo from "./ucla.jpg"

export class Events extends React.Component {
    render() {
        return (
          <div className="event-box">
               <div className="event-title">{"Events and Annoucements"}</div>
              <div className="events">
                  <ul>
                      <h1>{("Finals Week: December 14th-18th")}</h1>
                        <h3>{"Don't forget to stay safe during the pandemic :) "}</h3>
                      <h1>{("Winter Break Starts December 19th!")}</h1>
                  </ul>
                  </div>
                  <div className="picturebox">
                  <img src={Logo} alt= "website logo" />
                </div>
              </div>
          );
      }
  }