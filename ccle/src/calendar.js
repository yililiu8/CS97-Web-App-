import React from 'react';
import ReactDOM from 'react-dom';
import './calendar.css';
const axios = require('axios');

function Square(text, date, events, assignments) {
    const lecture = "https://ucla.zoom.us/j/92610844994?pwd=a1dNMGNrakM3Q1JqZ284T1hsMUVadz09&"
    const num_assign = assignments.length
    const num_events = events.length
    return (<div className="square">
              <div className="box">
              {text} : {date}
                  <div className="Cal-assignments">
                      <ul className="cal-list-format">
                        {[...Array(num_assign)].map((x, k) =>
                        <li> {assignments[k]} </li>)}
                      </ul>
                  </div>
                  <div className="Cal-events">
                      <ul className="cal-list-format">
                        {[...Array(num_events)].map((x, k) =>
                            <li><a href="https://zoom.us/" className="zoom-links"> {events[k]} </a></li>)}
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
        else if (weekday === 6) {
            weekday = 5
            today.setDate(today.getDate() - 1);
        }
        var date = getDates(weekday, today);

        this.state = {
            elements: {
                "Assignments": true,
                "Office Hours" : true,
                "Discussions" : true,
                "Lectures" : true,
            },
            currentDate: today, 
            dates: date,
            meetings: {
                0: [],
                1: [],
                2: [],
                3: [],
                4: []
            },
            assignments: {
                0: [],
                1: [],
                2: [],
                3: [],
                4: []
            },
            queried: false,
            db_assignments: [[],[],[],[]],
            db_classinfo: [],
            full: true
        }; 
    }
      
    //renders the assignments/meetings that show on the calendar based on filters
    renderSquare(i) {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      var meetings = []
      var render_assign = []
        if(this.state.full) {
            return Square(days[i], this.state.dates[i], this.state.meetings[i], this.state.assignments[i]);
        }
        console.log(this.state.meetings)
        if (this.state.elements["Assignments"] === true) {
            render_assign = this.state.assignments[i]
        }
        if (this.state.elements["Lectures"] === true) {
            for(var k = 0; k < this.state.meetings[i].length; k++) {
                if(this.state.meetings[i][k].includes('Lecture')) {
                    meetings.push(this.state.meetings[i][k]);
                }
            }
        }
        if (this.state.elements["Discussions"] === true) {
            for(var k = 0; k < this.state.meetings[i].length; k++) {
                if(this.state.meetings[i][k].includes('Discussion')) {
                    meetings.push(this.state.meetings[i][k]);
                }
            }
        }
        if (this.state.elements["Office Hours"] === true) {
            for(var k = 0; k < this.state.meetings[i].length; k++) {
                if(this.state.meetings[i][k].includes('Office Hour')) {
                    meetings.push(this.state.meetings[i][k]);
                }
            }
        }
        
        return Square(days[i], this.state.dates[i], meetings, render_assign);
        /*
      if(this.state.elements["Assignments"] === true && this.state.elements["Meetings"] === true) {
          return Square(days[i], this.state.dates[i], this.state.meetings[i], this.state.assignments[i]);
      }
      else if (this.state.elements["Assignments"] === true && this.state.elements["Meetings"] === false) {
          return Square(days[i], this.state.dates[i], [], this.state.assignments[i]);
      }
      else if (this.state.elements["Assignments"] === false && this.state.elements["Meetings"] === true) {
          return Square(days[i], this.state.dates[i], this.state.meetings[i], []);
      }
      else {
          return Square(days[i], this.state.dates[i], [], []);
      } */
    }
    
    //update what items are filtered
    filter(element) {
        var isFull = false
        if (element === "All") {
            var changeElement = {
                "Assignments": true,
                "Office Hours" : true,
                "Discussions" : true,
                "Lectures" : true,
            }
            for(let e in this.state.elements) {
                document.getElementById(e).style.background = "rgb(69,182,254)";
                document.getElementById(e).style.color = "rgb(255,255,255)";
            }
            
            isFull = true
        } else {
            var changeElement = this.state.elements
            changeElement[element] = !this.state.elements[element]
            
            var background = document.getElementById(element).style.backgroundColor;
            if (background == "rgb(255, 255, 255)") {
                    document.getElementById(element).style.background = "rgb(69,182,254)";
                document.getElementById(element).style.color = "rgb(255,255,255)";
            } else {
                    document.getElementById(element).style.background = "rgb(255,255,255)";
                document.getElementById(element).style.color = "rgb(69,182,254)";
            }

        }
        
        this.setState({
            elements: changeElement, 
            currentDate: this.state.currentDate, 
            dates: this.state.dates,
            meetings: this.state.meetings,
            assignments: this.state.assignments,
            full : isFull
        })
    }
      
    //update which week is rendered
    updateWeek(count)
    {
        var m_assign = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        }
        var fin_date = this.state.dates
        var fin_day = this.state.currentDate
        if(count === 1)
        {
            var weekday_up = this.state.currentDate.getDay();
            fin_day = new Date(this.state.currentDate.getTime());
            fin_day.setDate(this.state.currentDate.getDate()+7);
            fin_date = getDates(weekday_up, fin_day);
        }
        else if (count === -1)
        {
            var weekday = this.state.currentDate.getDay();
            fin_day = new Date(this.state.currentDate.getTime());
            fin_day.setDate(this.state.currentDate.getDate()-7);
            fin_date = getDates(weekday, fin_day);
        }
        
        this.setState({
         elements: this.state.elements,
         currentDate: fin_day,
         dates: fin_date,
        meetings: this.state.meetings,
        assignments: m_assign
        })
        this.find_assignments()
    }
        
    //update assignments based on week
    find_assignments() {
        var db_assign = this.state.db_assignments
        var m_assignments = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: []
        }
            
        for(var j = 0; j < db_assign[0].length; j++) {
            var assign = "- " + db_assign[0][j] + " " + db_assign[1][j] + " Due"
            var assign_date = db_assign[2][j].substring(0, 10);
                
            for(var k = 0; k < this.state.dates.length; k++) {
                if (assign_date === this.state.dates[k]) {
                    m_assignments[k].push(assign)
                }
            }
        }
        this.state = ({
        elements: this.state.elements,
        currentDate: this.state.currentDate,
        dates: this.state.dates,
        meetings: this.state.meetings,
        assignments: m_assignments,
        db_assignments: this.state.db_assignments
        })
    }
    
    //fetch meetings from database
    access_db = () => {
        fetch(`/calendar`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log("accesed db for calendar")
                const matches = data.response;
                console.log("matching objects: " , matches);
                let m_meet = getAllMeets(matches)
                this.setState({
                    meetings : m_meet,
                    queried : true,
                    db_classinfo : matches
                })
            })
            
        }
    
    //fetch assignments from database
    access_assign = () => {
        fetch(`/cal`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const matches = data.response; // array of all the assignments
                let temp = [];
                temp.push(matches[0])
                temp.push(matches[1])
                temp.push(matches[2])
                temp.push(matches[3])
                console.log(temp)
                this.setState({
                    //queried: true,
                    db_assignments: temp
                })
            })
    }

    render() {
      const title = 'Calendar';
      if (!this.state.queried){
        this.access_db();
        this.access_assign();
          
      }
        this.find_assignments();
        
        
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
              <button id="Assignments" className="buttons" onClick={() => this.filter("Assignments")}><span>Assignments</span></button>
              <button id="Lectures" className="buttons" onClick={() => this.filter("Lectures")}><span>Lectures</span></button>
              <button id="Discussions" className="buttons" onClick={() => this.filter("Discussions")}><span>Discussions</span></button>
              <button id="Office Hours" className="buttons" onClick={() => this.filter("Office Hours")}><span>Office Hours</span></button>
              <button id="All" className="all-button" onClick={() => this.filter("All")}><span>Show All</span></button>
          </div>
      </div>
      );
    }
  }

//converts variables of date type to string
function datesToString(date)
{
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    return date; 
}
            
//get dates for a specific week
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

//get meetings for every class
function getAllMeets(classes) {
        var m_meetings = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        }
        for(var k = 0; k < classes.length; k++) {
            m_meetings = getMeetings(classes[k], m_meetings);
        }
        return m_meetings
}

//get meetings for one class, helper function for getAllMeets
function getMeetings(course, m_meetings)
{
    console.log(course)
    const week_to_num = {"m": 0, "t":1, "w":2, "tr":3, "f":4}
    
    console.log(course.class_name)
    //add lectures
    for(var k = 0; k < course.lecture_dates.length; k++) {
        var lec = "- " + course.class_name + " Lecture @" + course.lecture_dates[k].time[0]
        var week_count = week_to_num[course.lecture_dates[k].day]
        m_meetings[week_count].push(lec);
    }
    //add discussions
    for(var k = 0; k < course.discussions.length; k++) {
        var discussion = "- " + course.class_name + " " + course.discussions[k].section + " Discussion @" + course.discussions[k].time[0]
        var week_count = week_to_num[course.discussions[k].day]
        m_meetings[week_count].push(discussion);
    }
    //add office hours
    for(var k = 0; k < course.office_hours.length; k++) {
        //get last name only
        let name = course.office_hours[k].person.split(',')
        let captialize = name[0][0] + name[0].substring(1, name[0].length).toLowerCase()
        var o_h = "- Office Hours with " + captialize + " @" +  course.office_hours[k].time[0]
        var week_count = week_to_num[course.office_hours[k].day]
        m_meetings[week_count].push(o_h);
    }
    return m_meetings
}
