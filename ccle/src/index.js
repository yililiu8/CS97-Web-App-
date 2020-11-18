import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Day } from './calendar.js'
import { SearchBar } from './searchBar.js'
import { UpcomingAssignments } from './assignments.js'

class Textbox extends React.Component {
    render (){
    return (
	<div className= "header">
	    <div className= "logo">{"NEW CCLE"}</div>
        <ul>
        <ul>
        <ul>
        </ul>
        </ul>
        </ul>
    <div className='row1'>
        <UpcomingAssignments/>
        <Calendar />
    </div>
    </div>
      );
    }
}

class Calendar extends React.Component {
    render() {
      return (
        <div className= "searchBar">
            <SearchBar />
        <div className="calendar">
            <div className="calendar-days">
            <Day />
        </div>
        <br></br>
        <div className="calendar-buttons">
          <ol>{/* TODO */}</ol>
      </div>
      </div>
      </div>
    );
  }
}



ReactDOM.render(
        <Textbox />,
		document.getElementById('root')
);
