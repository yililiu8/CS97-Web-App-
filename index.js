import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

function Square(text, date, events, assignments) {
    return (<div className="square">
              <div className="box">
              {text} : {date}
                  <div className="Cal-assignments">
                      <ul>
                          <li>{assignments[0]}</li>
                          <li>{assignments[1]}</li>
                          <li>{assignments[2]}</li>
                          <li>{assignments[3]}</li>
                      </ul>
                  </div>
                  <div className="events">
                      <ul>
                          <li>{events[0]}</li>
                          <li>{events[1]}</li>
                          <li>{events[2]}</li>
                          <li>{events[3]}</li>
                      </ul>
                  </div>
              </div>
            </div>);
  }
  
  class Day extends React.Component {
    constructor(props) {
        super(props); 
        var today = new Date();
        var weekday = today.getDay(); 
        var date = getDates(weekday, today); 
        this.state = {
            elements: {
                "Assignments": true, 
                "Meetings": true
            },
            currentDate: today, 
            dates: date
        }; 
    }
      
    renderSquare(i) {
        //test data 
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      const meetings = {
          0: ["- Akshay's Office Hours @9:30am"],
          1: ["- Howard's Office Hours @1pm", "- Lecture @4pm"], 
          2: [], 
          3: ["- Howard's Office Hours @2pm", "- Lecture @4pm"],
          4: ["- Discussion @10am"]
      }
      const assignments = {
          0: ["- Assignment 4 Due"],
          1: [], 
          2: [], 
          3: ["- Midterm 1"],
          4: []
      }
     
      var today = new Date();
      var weekday = today.getDay(); 
      var dates = getDates(weekday, today); 
      
      if(this.state.elements["Assignments"] === true && this.state.elements["Meetings"] === true) {
          return Square(days[i], dates[i], meetings[i], assignments[i]);
      }
      else if (this.state.elements["Assignments"] === true && this.state.elements["Meetings"] == false) {
          return Square(days[i], dates[i], [], assignments[i]);
      }
      else if (this.state.elements["Assignments"] === false && this.state.elements["Meetings"] == true) {
          return Square(days[i], dates[i], meetings[i], []);
      }
      else {
          return Square(days[i], dates[i], [], []);
      } 
    }
    
    filter(element) {
        if (element === "All") {
            var changeElement = {
                "Assignments": true, 
                "Meetings": true 
            } 
            
        } else {
            var changeElement = this.state.elements
            changeElement[element] = !this.state.elements[element]
        }
        
        this.setState({
            elements: changeElement, 
            currentDate: this.state.currentDate, 
            dates: this.state.dates
        })
    }
      
    updateWeek(count)
    {
        //somehow going to have to grab data from different weeks and update it here too
       if(count === 1)
       {
           var weekday = this.state.currentDate.getDay();  
           var day = new Date(this.state.currentDate.getTime());
           day.setDate(this.state.currentDate.getDate()+7);
           var date = getDates(weekday, day); 
           this.setState({
            elements: this.state.elements,
            currentDate: day, 
            dates: date
          })
       }
       else if (count === -1)
       {
           var weekday = this.state.currentDate.getDay();  
           var day = new Date(this.state.currentDate.getTime());
           day.setDate(this.state.currentDate.getDate()-7);
           var date = getDates(weekday, day); 
           this.setState({
            elements: this.state.elements,
            currentDate: day, 
            dates: date
          })   
       }
    }
  
    render() {
      const title = 'Calendar';
  
      return (
        <div>
          <div className="title">
              {title}
              <button className="arrows" onClick={() => this.updateWeek(-1)}><span>&lt;</span></button>
              <button className="arrows" onClick={() => this.updateWeek(1)}><span>&gt;</span></button>
          </div>
          <div className="day-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
        </div>
              <h3 className="filter-label">Filter by: </h3> 
          <div className="calendar-buttons">
              <button className="buttons" onClick={() => this.filter("Assignments")}><span>Assignments</span></button>
              <button className="buttons" onClick={() => this.filter("Meetings")}><span>Meetings</span></button>
              <button className="buttons" onClick={() => this.filter("All")}><span>Show All</span></button>
          </div>
      </div>
      );
    }
  }

  class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [
            "Git", 
            "Python Scripting", 
            "Shell", 
            "Emacs Editing", 
            "Lisp"
        ],
            searchValue: ""
        }
    }

    getAssignments = (e) => {
        console.log("Onchange says hi!", e.target.value)
        this.setState({
            searchValue: e.target.value,
        })
    }

    render() {
        //const temp_assignments = this.state.assignments;
        const filtered = (this.state.assignments).filter((assign) => {
            return assign.toLowerCase().includes(
                this.state.searchValue.toLowerCase()
                );
        })

        const listMatch = filtered.map((match, index) => 
            <li key = {index}>{match}</li>
        );
        // const filtered = temp_assignments.filter(assign => {
        //     return assign.toLowerCase().includes(this.state.inputValue.toLowerCase())
        // })

        // const filtered = (this.state.assignments).includes(this.state.searchValue)
        // console.log(filtered);
        console.log(listMatch);
        return (
            <AList 
            inputValue = {this.state.searchValue} 
            assignments = {this.state.assignments}
            getAssignments = {this.getAssignments}
            result = {listMatch}
            />
        )
    }
}

class UpcomingAssignments extends React.Component {
    constructor(props){
        super(props);
        this.state={
            clicked: false,
        };
    }
    renderButton(txt){
        return (
            <Redirect 
                text={txt}
                onClick={()=>this.onClick()}
            />
        )
    }
    onClick(){
        this.setState({
            clicked: !this.state.clicked
        });
        console.log("here");
    }
    render() {
      return (
        <div className="assignment-box">
             <div>{"Upcoming Assignments"}</div>
            <div className="assignments">
            	<ul>
                    <p>{this.renderButton("Assignment 1")}</p>
                        <ul>
                            <li>{"due date 11/7"}</li>
                            <li>{"at 7:00pm PST"}</li>
                            <li>{"submission link"}</li>
                        </ul>
                    <p>{this.renderButton("Assignment 2")}</p>
                        <ul>
                            <li>{"due date 11/8"}</li>
                            <li>{"at 8:00pm PST"}</li>
                            <li>{"submission link"}</li>
                        </ul>
                        <div>
                            {'STATE OF THE BUTTON:'}
                            <div>{this.state.clicked ? "CLICKED" : "NOT CLICKED"}</div>
                        </div>
                </ul>
            </div>
        </div>
        );
    }
}

const AList = (props) => {
    return(
        <div className = "searchbar">
            <label htmlFor="search">Search by Assignment Name: </label>
            <input type="text" value = {props.inputValue} onChange = {props.getAssignments}/>
                {props.inputValue && 
                <div className = "smaller">
                    Matches : 
                    <ul>
                        {props.result}
                    </ul>
                </div>
                }
        </div>
    )
}

function Redirect(props) {
    return (
        <button className="redirect" onClick={props.onClick}> 
            {props.text}
        </button>
    );
}

function datesToString(date)
{
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    return date; 
}

function getDates(dayofWeek)
{
    var today = new Date();
    var dates = []; 
    //dates before 
    for(let k = dayofWeek; k > 1; k--) {
        var day = new Date(today.getTime());
        day.setDate(today.getDate() - (k-1));
        dates.push(datesToString(day)); 
    }
    //day of
    dates.push(datesToString(today))
    //days after 
    for(let k = 1; k < (6-dayofWeek); k++) {
        var day = new Date(today.getTime());
        day.setDate(today.getDate() + k);
        dates.push(datesToString(day)); 
    }
    return dates; 
}

ReactDOM.render(
        <Textbox />,
		document.getElementById('root')
);
