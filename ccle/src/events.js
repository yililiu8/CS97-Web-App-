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
                    <h1> Recent News</h1>
                    <h4 style={{fontSize:'18px', fontFamily: 'Titillium Web', paddingLeft: '16px'}}>12/08/20: UCLA signs with Nike's Jordan Brand to fill Under Armor void</h4>
                    <h1 style={{fontSize:'18px', fontFamily: 'Titillium Web', paddingLeft: '16px'}}>Congratulations to Andrea Ghez for being awarded the 2020 Nobel Prize in Physics!</h1>
                    <td onClick={()=> window.open("https://newsroom.ucla.edu/releases/andrea-ghez-wins-2020-nobel-prize-in-physics")}><h3 style={{color:'blue', paddingLeft: '58px'}}>Click here to read more about her research</h3> </td>
                      {/* <h1> Reminders</h1> */}
                      <h4 style={{fontSize:'18px', fontFamily: 'Titillium Web', paddingLeft: '16px'}}>Finals Week: December 14th-18th</h4>
                      {/* <h3 style={{paddingLeft: '16px', paddingLeft: '58px'}}>{"Don't forget to stay safe during the pandemic :) "}</h3> */}
                      <h4 style={{fontSize:'18px', fontFamily: 'Titillium Web', paddingLeft: '16px'}}>Winter Break Starts December 19th!</h4>
                  </ul>
                  </div>
                  <div className="picturebox">
                  <img src={Logo} alt= "website logo" />
                </div>
              </div>
          );
      }
  }