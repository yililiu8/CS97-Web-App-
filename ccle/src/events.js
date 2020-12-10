import React from 'react';
import ReactDOM from 'react-dom';
import './events.css';
import Logo from "./winter.png"


export class Events extends React.Component {
    render() {
        return (
          <div className="event-box">
          <div className="event-title">{"Events and Announcements"}</div>
         <div className="events">
                  <ul>
                  <h1 style = {{fontFamily: 'Titillium Web', fontSize: '23px'}}>Click on any of the annoucements below to read more!</h1>
                  <td onClick={()=> window.open("https://www.baltimoresun.com/coronavirus/bs-md-ucla-signs-nike-after-suing-under-armour-20201209-sgrvci3gk5e2fk6wgfmyvasnia-story.html")}><p1 style={{fontSize:'18px', fontFamily: 'Titillium Web', paddingLeft: '16px'}}>12/08/20: UCLA signs with Nike's Jordan Brand to fill Under Armor void</p1></td>
                  <ul></ul>
                  <td onClick={()=> window.open("https://newsroom.ucla.edu/releases/andrea-ghez-wins-2020-nobel-prize-in-physics")}><p2 style={{fontSize:'18px', fontFamily: 'Titillium Web', fontWeight: 'medium' , paddingLeft: '16px'}}>Congratulations to Andrea Ghez for being awarded the 2020 Nobel Prize in Physics!</p2></td>
                  <h1 style = {{fontFamily: 'Titillium Web', fontSize: '20px'}}>Reminders:</h1>
                  <p1 style={{fontSize:'18px', fontFamily: 'Titillium Web', paddingLeft: '16px'}}>Finals Week: December 14th-18th</p1>
                  <ul></ul>
                  <p1 style={{fontSize:'18px', fontFamily: 'Titillium Web', paddingLeft: '16px'}}>Winter Break Starts December 19th :)</p1>
                  </ul>
                  </div>
                  <img className="photo5" src={Logo} />
                 </div>
          );
      }
  }