import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Calendar extends React.Component {
    render() {
      return (
        <div className= "search-bar">
             <div>{"search"}</div>
        <div className="calendar">
             <div>{"November Calendar"}</div>
        </div>
        </div>
      );
    }
  }


  class UpcomingAssignments extends React.Component {
    render() {
      return (
        <div className="assignment-box">
             <div>{"Upcoming Assignments"}</div>
             <ul>
	<li>{"Assignment 1"}
                        <ul>
	<li>{"due date 11/7"}</li>
	<li>{"at 7:00pm PST"}</li>
                        </ul>
                    </li>
	<li>{"Assignment 2"}
                        <ul>
	<li>{"due date 11/8"}</li>
	<li>{"at 8:00pm PST"}</li>
                        </ul>
                    </li>
                </ul>
        </div>
      );
    }
  }

class Textbox extends React.Component {
    render (){
        return (
	<div className= "header">
	    <div>{"NEW CCLE"}</div>
        <ul>
        <ul>
        <ul>
        </ul>
        </ul>
        </ul>
    <div className='rowC'>
            <UpcomingAssignments/>
            <Calendar />
    </div>
    </div>
      );
    }
}

ReactDOM.render(
        <Textbox />,
		document.getElementById('root')
);
