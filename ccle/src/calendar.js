import React from 'react';
import ReactDOM from 'react-dom';
import './calendar.css';
const axios = require('axios');

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
                  <div className="Cal-events">
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
            
    const cs97_assignments = [
    {
        title : "Emacs Editing and Shell Scripting",
        course : "CS97", //had to change this from class to course
        grade : 3.5,
        deadline : "2020-10-12",
        description : "Fake description"
    },
    {
        title : "Python Scripting",
        course : "CS97",
        grade : 3.5,
        deadline : "2020-10-23",
        description : "Fake description"
    },
    {
        title : "Chorus Lapilli",
        course : "CS97",
        grade : 5,
        deadline : "2020-11-01",
        description : "Fake description"
    },
    {
        title : "Git Organization",
        course : "CS97",
        grade : 3.5,
        deadline : "2020-11-16",
        description : "Fake description"
    },
    {
        title : "Low Level Programming in C",
        course : "CS97",
        grade : 4,
        deadline : "2020-11-23",
        description : "Fake description"
    },
    {
        title : "Git Repository Organization",
        course : "CS97",
        grade : 4,
        deadline : "2020-12-07",
        description : "Fake description"
    },
    {
        title : "Final Project Report",
        course : "CS97",
        grade : 3.5,
        deadline : "2020-12-08",
        description : "Fake description"
    },
    ]
            
    const cs97 = {
        class_name : "CS97",
        professor : "EGGERT, PAUL R.",
        discussions : [
        {
            section : "1C",
            ta : "SINGHAL, AKSHAY",
            day : "f",
            time : ["12:00am", "2:00pm"]
        },
        {
            section : "1B",
            ta : "XIE, HOWARD",
            day : "f",
            time : ["10:00am", "12:00am"]
        }
        ],
        office_hours : [
        {
            person : "SINGHAL, AKSHAY",
            day : "m",
            time : ["9:30am", "11:30am"]
        },
        {
            person : "XIE, HOWARD",
            day : "t",
            time : ["1:00pm", "2:00pm"]
        },
        {
            person : "XIE, HOWARD",
            day : "tr",
            time : ["2:00pm", "3:00pm"]
        },
        {
            person : "EGGERT, PAUL R.",
            day : "w",
            time : ["9:30am", "10:30am"]
        },
                        {
            person : "EGGERT, PAUL R.",
            day : "m",
            time : ["2:00pm", "3:00pm"]
        }
                        ],
        lecture_dates : [
        {
            day : "t",
            time : ["4:00pm", "6:00pm"]
        },
        {
            day : "tr",
            time : ["4:00pm", "6:00pm"]
        }
        ]
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
        
        
        //get all meetings
        var m_meets = getMeetings(cs97)
        
        var m_assignments = {
            0: [],
            1: [],
            2: [],
            3: ["- Midterm 1"],
            4: []
        }
        
        for(var j = 0; j < cs97_assignments.length; j++) {
            var assign = "- " + cs97.class_name + " " + cs97_assignments[j].title + " Due"
            for(var k = 0; k < date.length; k++) {
                if (cs97_assignments[j].deadline === date[k]) {
                    m_assignments[k].push(assign)
                }
            }
        }
        
        this.state = {
            elements: {
                "Assignments": true, 
                "Meetings": true
            },
            currentDate: today, 
            dates: date,
            meetings: m_meets,
            assignments: m_assignments
        }; 
    }
      
    renderSquare(i) {
        //test data 
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      
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
            dates: this.state.dates,
            meetings: this.state.meetings,
            assignments: this.state.assignments
        })
    }
      
    updateWeek(count)
    {
        var m_assign = {
            0: [],
            1: [],
            2: [],
            3: ["- Midterm 1"],
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
        for(var j = 0; j < cs97_assignments.length; j++) {
            var assign = "- " + cs97.class_name + " " + cs97_assignments[j].title + " Due"
            for(var k = 0; k < 5; k++) {
                if (cs97_assignments[j].deadline === fin_date[k]) {
                    m_assign[k].push(assign)
                }
            }
        }
        
        this.setState({
         elements: this.state.elements,
         currentDate: fin_day,
         dates: fin_date,
        meetings: this.state.meetings,
        assignments: m_assign
        })
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
    date = yyyy + '-' + mm + '-' + dd;
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

function getMeetings(course)
{
    const week_to_num = {"m": 0, "t":1, "w":2, "tr":3, "f":4}
    var m_meetings = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: []
    }
    
    //add lectures
    for(var k = 0; k < course.lecture_dates.length; k++) {
        var lec = "- " + course.class_name + " Lecture @" + course.lecture_dates[k].time[0]
        var week_count = week_to_num[course.lecture_dates[k].day]
        m_meetings[week_count].push(lec);
    }
    //add discussions
    for(var k = 0; k < course.discussions.length; k++) {
        var discussion = "- " + course.discussions[k].section + " Discussion @" + course.discussions[k].time[0]
        var week_count = week_to_num[course.discussions[k].day]
        m_meetings[week_count].push(discussion);
    }
    //add office hours
    for(var k = 0; k < course.office_hours.length; k++) {
        var o_h = "- Office Hours with " + course.office_hours[k].person.toLowerCase() + " @" +  course.office_hours[k].time[0]
        var week_count = week_to_num[course.office_hours[k].day]
        m_meetings[week_count].push(o_h);
    }
    return m_meetings
}
