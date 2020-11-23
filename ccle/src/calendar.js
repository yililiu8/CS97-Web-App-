import React from 'react';
import ReactDOM from 'react-dom';
import './calendar.css';

function Square(text, date, events, assignments) {
    const lecture = "https://ucla.zoom.us/j/92610844994?pwd=a1dNMGNrakM3Q1JqZ284T1hsMUVadz09&"
    return (<div className="square">
              <div className="box">
              {text} : {date}
                  <div className="Cal-assignments">
                      <ul className="cal-list-format">
                          <li>{assignments[0]}</li>
                          <li>{assignments[1]}</li>
                          <li>{assignments[2]}</li>
                          <li>{assignments[3]}</li>
                      </ul>
                  </div>
                  <div className="events">
                      <ul className="cal-list-format">
                          <li><a href="https://zoom.us/" className="zoom-links">{events[0]}</a></li>
                          <li><a href="https://zoom.us/" className="zoom-links">{events[1]}</a></li>
                          <li><a href="https://zoom.us/" className="zoom-links">{events[2]}</a></li>
                          <li><a href="https://zoom.us/" className="zoom-links">{events[3]}</a></li>
                      </ul>
                  </div>
              </div>
            </div>);
  }
  
  export class Day extends React.Component {
    constructor(props) {
        super(props); 
        var today = new Date();
        var weekday = today.getDay(); 
        if (weekday === 0) {
            weekday = 1
            today.setDate(today.getDate() + 1); 
        }
        else if (weekday = 6) {
            weekday = 5
            today.setDate(today.getDate() - 1); 
        }
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
      /*
      var today = new Date();
      var weekday = today.getDay(); 
      var dates = getDates(weekday, today); */
      
      if(this.state.elements["Assignments"] === true && this.state.elements["Meetings"] === true) {
          return Square(days[i], this.state.dates[i], meetings[i], assignments[i]);
      }
      else if (this.state.elements["Assignments"] === true && this.state.elements["Meetings"] == false) {
          return Square(days[i], this.state.dates[i], [], assignments[i]);
      }
      else if (this.state.elements["Assignments"] === false && this.state.elements["Meetings"] == true) {
          return Square(days[i], this.state.dates[i], meetings[i], []);
      }
      else {
          return Square(days[i], this.state.dates[i], [], []);
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
         var weekday_up = this.state.currentDate.getDay();  
         var day_up = new Date(this.state.currentDate.getTime());
         day_up.setDate(this.state.currentDate.getDate()+7);
         var date_up = getDates(weekday_up, day_up); 
            
         this.setState({
          elements: this.state.elements,
          currentDate: day_up, 
          dates: date_up
        })
        }
        else if (count === -1)
        {
         var weekday = this.state.currentDate.getDay();  
         var day = new Date(this.state.currentDate.getTime());
         day.setDate(this.state.currentDate.getDate()-7);
         var date_down = getDates(weekday, day); 
            
         this.setState({
          elements: this.state.elements,
          currentDate: day, 
          dates: date_down
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
  
function datesToString(date)
{
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    return date; 
}

function getDates(dayofWeek, today)
{
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
