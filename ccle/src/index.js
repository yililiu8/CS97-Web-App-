import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Day } from './calendar.js'
import { SearchBar } from './searchBar.js'
import { LoginScreen } from './login.js'
import { UpcomingAssignments, Test } from './assignments.js'
import { Events } from './events.js'

import {BrowserRouter as Router, Route, Switch, Link, Redirect, useRouteMatch, useNavigate, useLocation} from "react-router-dom"

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
            <Switch> 
                <Route exact path="/"
                render={() => {
                    return (
                      <Redirect to="/login" />
                    )
                }}
                />    
                <Route path="/login">
                    <LoginScreen />  
                </Route>
                <Route exact path="/home">
                    <div className= "header">
                        <div className= "logo">
                            <Link to="/home">NEW CCLE</Link>
                        </div>
                        <div className="calendar-nav">
                            <Link to="/login">Log Out</Link>
                        </div>
                    </div>
                    <div className='row1'>
                        <UpcomingAssignments/>
                        <Calendar />
                    </div>

                    <div className= 'row1'>
                        <SearchBar />
                        <Events/>
                    </div>
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
