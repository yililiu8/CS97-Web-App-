import React from 'react';
import ReactDOM from 'react-dom';
import './assignments.css';
import Logo from "./books.png"

import {BrowserRouter as Router, Route, Switch, Link, Redirect, useRouteMatch, useNavigate, useParams, useLocation} from "react-router-dom"; 
const axios = require('axios');

export class UpcomingAssignments extends React.Component {
    constructor(props){
        super(props);
        this.state={
            assignment_list: ["Class 1", "Class 2"], // Create a function that can retrieve
            button_status: [false, false], // necessary number of classes and names
            class_index : { // also create dictionary to be used
                "Assignment 1" : 0,
                "Assignment 2" : 1
                }
            };
    }
    

    renderButton(txt){
        //const navigate = useNavigate(); 
        return (
            <div key = {txt}>
             <Link to={{
                pathname: txt
            }}>
                {txt}
            </Link>
            
            </div>
        ); 
    }
    onClick(txt){
        const map_index=this.state.class_index[txt];
        const a = this.state.button_status.slice();
        a[map_index] = !a[map_index];
        this.setState({
            button_status: a,
        });
        console.log(a);
    }
    render() {
      return (
        <div className="assignment-box">
             <div className="assignment-title">{"Upcoming Assignments"}</div>
            <div className="assignments">
            	<ul>
                    <p>{this.renderButton("Assignment 1: Shell Scripting")}</p>
                        <ul>
                            <li>{"Due November 7th @ 11:00pm"}</li>
                            <li>{"Worth 15% of Lab grade"}</li>
                        </ul>
                    <p>{this.renderButton("Assignment 2: Emacs")}</p>
                        <ul>
                            <li>{"Due November 12th @ 7:00pm"}</li>
                            <li>{"10% of homework grade"}</li>
                        </ul>
                </ul>
                <img className="photo" src={Logo} />
            </div>
        </div>
        );
    }
}

class Assignment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clicked: false,
        };
    }
    render () {
        return (             
            <button className="redirect" id = "myButton" onClick={this.props.onClick}>
                {this.props.text}
            </button>
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
        description : ""
    }
}
display = () => {
    fetch(`/description?q="a"`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            const matches = data.response[0];
            // const listMatch = (matches).map(function(match, index){
            //     return <li key={index}></li>
            // });
            console.log("matching objects: " , matches.description);
            this.setState({
                description: matches.grade
            })
            // use matches[0].description to access the description from database
        })
    }
render() {
    if (!this.state.description)
        this.display();
    return (
        <div className="my-assignment">
            <h3 className="assignment-name">{this.state.title}</h3>
            <h3>{this.state.description}</h3>
        </div>
        );
}     
}


