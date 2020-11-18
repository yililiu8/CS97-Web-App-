import React from 'react';
import ReactDOM from 'react-dom';
import './assignments.css';

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
        return (
            <Assignment 
                text={txt}
                onClick={()=>this.onClick(txt)}
            />
        )
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
                    <p>{this.renderButton("Assignment 1")}</p>
                        <ul>
                            <li>{"due date 11/7"}</li>
                            <li>{"at 7:00pm PST"}</li>
                        </ul>
                    <p>{this.renderButton("Assignment 2")}</p>
                        <ul>
                            <li>{"due date 11/8"}</li>
                            <li>{"at 8:00pm PST"}</li>
                        </ul>
                </ul>
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
            <button className="redirect" onClick={this.props.onClick}>
                {this.props.text}
            
            </button>
            );
    }
}

function Redirect(props) {
    return (
        <button className="redirect" onClick={props.onClick}> 
            {props.text}
        </button>
    );
}
