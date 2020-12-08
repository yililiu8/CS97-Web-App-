import React from 'react';
import ReactDOM from 'react-dom';
import './assignments.css';
import Logo from "./books.png"

import {BrowserRouter as Router, Route, Switch, Link, Redirect, useRouteMatch, useNavigate, useParams, useLocation} from "react-router-dom"; 
const axios = require('axios');

export class UpcomingAssignments extends React.Component {
    constructor(props){
        super(props);
        // need to have it access the database
        this.state={
            queried: false,
            assignments: [[],[],[],[]]
        };
    }

    // attempting to access database to return summaries
    display = () => {
        fetch(`/summary`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const matches = data.response; // array of all the assignments
                const num_assign = 4; // number of assignments
                const num_attr = 4; // number of attributes per assignment
                var assign1, assign2, assign3, assign4 = [];
                for (let i = 0; i < num_assign; i++){
                    let temp = [];
                    for (let j = 0; j < num_attr; j++){
                        if (j==2)
                            temp.push(matches[j][i].slice(0,10));
                        else
                            temp.push(matches[j][i]);
                    }
                    // let title = temp[0] + " - " + temp[1];
                    // temp[1] = title;
                    // temp = temp.slice(1,4);
                    console.log(temp);
                    // console.log(title);
                    switch(i){
                        case 0:
                            assign1 = temp;
                            break;
                        case 1:
                            assign2 = temp;
                            break;
                        case 2:
                            assign3 = temp;
                            break;
                        case 3:
                            assign4 = temp;
                            break;
                        default:
                            continue;
                    }
                }
                this.setState({
                    queried: true,
                    assignments: [assign1,assign2,assign3,assign4]  
                    // returns the four classes that appear at the top of the assignment list
                    // not sorted yet for time dependency         
                })
            })
        }
    
    renderButton(group, title){
        //const navigate = useNavigate(); 
        return (
            <div key = {title}>
             <Link to={{
                pathname: title
            }}>
                {group + " - " + title}
            </Link>
            </div>
        ); 
    }

    render() {
      // ony call query the database once when the website launches
      if (!this.state.queried)
        this.display(); 
        console.log(this.state.assignments[1]);
      return (
        <div className="assignment-box">
             <div className="assignment-title">{"Upcoming Assignments"}</div>
            <div className="assignments">
                <ul>
                    <p>{this.renderButton(this.state.assignments[0][0], this.state.assignments[0][1])}</p>
                        <ul>
                            <li>{this.state.assignments[0][2]}</li>
                            <li>{this.state.assignments[0][3]}</li>
                        </ul>
                    <p>{this.renderButton(this.state.assignments[1][0], this.state.assignments[1][1])}</p>
                        <ul>
                            <li>{this.state.assignments[1][2]}</li>
                            <li>{this.state.assignments[1][3]}</li>
                        </ul>
                    <p>{this.renderButton(this.state.assignments[2][0], this.state.assignments[2][1])}</p>
                        <ul>
                            <li>{this.state.assignments[2][2]}</li>
                            <li>{this.state.assignments[2][3]}</li>
                        </ul>
                    <p>{this.renderButton(this.state.assignments[3][0], this.state.assignments[3][1])}</p>
                        <ul>
                            <li>{this.state.assignments[3][2]}</li>
                            <li>{this.state.assignments[3][3]}</li>
                        </ul>
                </ul>
                <img className="photo" src={Logo} />
            </div>
        </div>
        );
    }
}

function Redirect_Button(props) {
    return (
        <button className="redirect" onClick={props.onClick}> 
            {props.text}
        </button>
    );
}

function Pass() {
    let location = useLocation(); 
    return (
        <h3 className="assignment-name">{location.state}</h3>
    ); 
}


// returns name of the selected assignment
export function Test({name}){ 
    let { id } = useParams();  
    return (
        <Description
            name = { id }
        />
    ); 
}

export class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.name,
            description : "", // not sure if this is necessary, since it was alsready shown on home page
            class: "",
            deadline: "",
            information: "", // complete assignment specification
            discussion: []
        }
    }
    display = () => {
        fetch(`/description?q=${this.state.title}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const matches = data.response[0];
                console.log("matching objects: " , matches);
                this.setState({
                    description: matches.description,
                    class: matches.class,
                    information: matches.information,
                    deadline: matches.deadline,
                    discussion: matches.discussion
                })
            })
        }
    render() {
        if (!this.state.description)
            this.display();
            var unparsedDiscussion = discussionExtract(this.state.discussion);
        return (
            <div>
                <div className= "header">
                    <div className= "logo">
                        <Link to="/home">NEW CCLE</Link>
                    </div>
                    <div className="calendar-nav">
                        <Link to="/login">Log Out</Link>
                    </div>
                </div>
            <div className="my-assignment">
                <ul>
                    <p className="assignment-name">{this.state.class + " - " +this.state.title}</p>
                    <ul>
                        <li>{"Due Date : " + this.state.deadline.slice(0,10)}</li>
                        <li>{"Assignment Specification"}</li>
                        <li>{this.state.information}</li>
                    </ul>
                </ul>
            </div>
            </div>
            );
    }     
}

function discussionExtract(discussion) {
    var questions = []
    var responses = []
    for (var i=0; i < discussion.length; i++) {
        questions.push(discussion[i].question)
        responses.push(discussion[i].responses)
    }
    console.log("extracting questions and responses:")
    console.log(questions)
    console.log(responses)
    return [questions, responses]
}

