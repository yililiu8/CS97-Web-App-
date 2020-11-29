import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Day } from './calendar.js'
import { SearchBar } from './searchBar.js'
import { UpcomingAssignments, Test } from './assignments.js'

import {BrowserRouter as Router, Route, Switch, Link, Redirect, useRouteMatch, useNavigate} from "react-router-dom"

//const express = require('express');
// const app = express();

// app.use((req, res) => {
//   res.send('<h1>IS THIS WORKING?<h1>');
// })

// app.listen(3000, () => {
//   console.log("LISTENING!");
// })

class Textbox extends React.Component {
    render (){
    return (
        <Router>
	       <div className= "header">
	           <div className= "logo">
                    <Link to="/">NEW CCLE</Link> 
                </div>
                <div className="calendar-nav">
                    <Link to="/calendar">Calendar</Link> 
                </div> 
            </div>
            <Switch> 
                <Route exact path="/">
                    <div className='row1'>
                        <UpcomingAssignments/>
                        <Calendar />
                    </div>
                    <div className="search-separate">
                        <SearchBar />
                    </div>
                </Route>
                <Route path="/calendar">
                    <Calendar />
                </Route>
                <Route path="/:id"
                    children={<Test />} />
            </Switch>
         </Router>
      );
    }
}

class Calendar extends React.Component {
    render() {
      return (
        // <div className= "searchBar">
        //     <SearchBar />
        <div className="calendar">
          <div className="calendar-days">
            <Day />
          </div>
          <br></br>
          <div className="calendar-buttons">
            <ol>{/* TODO */}</ol>
          </div>
          {/* <div className="searchBar">
            <SearchBar />
          </div> */}
        </div>
      
      //</div>
    );
  }
}





ReactDOM.render(
        <Textbox />,
		document.getElementById('root')
);
