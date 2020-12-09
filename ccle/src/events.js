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
                    <h1>{("12/08/20: UCLA signs with Nike's Jordan Brand to fill Under Armor void")}</h1>
                    <h1>Congratulations to Andrea Ghez for being awarded the 2020 Nobel Prize in Physics!"</h1>
                    <div className="physics2">
                    <td onClick={()=> window.open("https://newsroom.ucla.edu/releases/andrea-ghez-wins-2020-nobel-prize-in-physics")}><h3 style={{color:'blue'}}>Click here to read more about her research</h3> </td>
                    </div>
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