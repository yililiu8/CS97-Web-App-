import React from 'react';
import ReactDOM from 'react-dom';
import Form from "react-bootstrap/Form";
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
                const order = data.order;
                const num_assign = 4; // number of assignments shown
                const num_attr = 4; // number of attributes per assignment
                var assign1, assign2, assign3, assign4 = [];
                for (let i = 0; i < num_assign; i++){
                    let ordered = order[i]
                    let temp = [];
                    for (let j = 0; j < num_attr; j++){
                        if (j==2)
                            temp.push(matches[j][ordered].slice(0,10));
                        else
                            temp.push(matches[j][ordered]);
                    }
                    console.log(temp);
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

const disc = [{
    question: {text: "question1", date: "date1"},
    responses: [{text: "reply1", date: "replydate1"},
                {text: "reply2", date: "replydate2"},
                {text: "reply3", date: "replydate3"}]
    },
    {
    question: {text: "question2", date: "date2"},
    responses: [{text: "reply1", date: "replydate1"},
                {text: "reply2", date: "replydate2"}]
    },
    {
        question: {text: "question3", date: "date3"},
        responses: [{text: "reply1", date: "replydate1"},
                    {text: "reply2", date: "replydate2"},
                    {text: "reply3", date: "replydate3"},
                    {text: "reply4", date: "replydate4"}]
    },
    {
        question: {text: "question4", date: "date4"},
        responses: []
    },
]


export class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.name,
            description : "", // not sure if this is necessary, since it was alsready shown on home page
            class: "",
            deadline: "",
            information: "", // complete assignment specification
            discussion: [],
            submit_question: "", //question being sumbited
            submit_reply: ["", "", "", "", ""], //reply being submitted
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
                var textField_replies = []
                
                //this is needed in order to the text fields to work properly
                for(var k = 0; k < matches.discussion.length; k++){
                    textField_replies.push("")
                }
                
                this.setState({
                    description: matches.description,
                    class: matches.class,
                    information: matches.information,
                    deadline: matches.deadline,
                    discussion: matches.discussion,
                    submit_reply: textField_replies //uncomment this later
                })
            })
        }
    
    handleChangeForm = (e) => {
      this.setState({
        submit_question: e.target.value
      })
    }
    
    handleChangeReply(e, i)  {
        var rep = this.state.submit_reply
        rep[i] = e.target.value
      this.setState({
        submit_reply: rep
      })
    }
    
    renderQuestion(i){
        if(this.state.discussion.length > i) {
            let render_question = this.state.discussion[i]

             if (render_question.question.text == "")
                 return
            let title = render_question.question.text + ", posted on: " + render_question.question.date
            let replies = []
                //let reply_dates = []
            for(var k = 0; k < render_question.responses.length; k++) {
                let comment = render_question.responses[k].text + " - " + render_question.responses[k].date
                replies.push(comment)
                    //reply_dates.push(render_question.responses[k].date)
            }
            return this.Question(i, title, replies);
        }
        
    }
    
    //this is where you would upload the question to the db/update it to the page for a reply (you can access variables here as shown below)
    //each index corresponds to the index of the question in the array
    validateSubmitSpecific(e, i) {
        //the alert isn't necessarily need, just here for you to check it actually submits
        let message = "congrats on successfully replying to a question"
        //alert(message);
        
        
        var today = new Date();
        let m_disc = this.state.discussion
        m_disc[i].responses.push({text: this.state.submit_reply[i], date: dateToString(today)})
        for (var j=0; j < m_disc.length; j++) {
            m_disc[j].assignment = this.state.title
        }
        //empty text field
        var reply_string_vals = this.state.submit_reply
        reply_string_vals[i] = ""
        
        this.setState({
          discussion: m_disc,
          submit_reply: reply_string_vals
        })
        let discAndIndex = {
            m_disc: m_disc,
            index: i
        }
        fetch('/uploadquestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(discAndIndex),
        })
        .then(function (response) {
            if (response.ok) {
                return response.json;
            }
            return Promise.reject(response);
        })
        .then(data => {
            console.log("DATA SENT CLIENT SIDE: ", data);
        })
        .catch(error => {
            console.error("ERROR CLIENT SIDE: ", error);
        })
        //you might need to use this below if you use the database but not 100% sure
        //window.location.reload()
    }
    
    //this is where you would upload the question to the db/update it to the page
    validateSubmit(e) {
        //the alert isn't necessarily need, just here for you to check it actually submits
        let ques = "congrats on successfully sumbitting your question."
        //alert(ques);
        //you would need to add it to the database rather than an array but this is roughly how to submit a question:
        var today = new Date();
        let m_disc = this.state.discussion
        var reply_strings = this.state.submit_reply
        reply_strings.push("")
        //This is what I send to the backend eventually
        m_disc.push({
                question: {text: this.state.submit_question, date: dateToString(today)},
                responses: [],
                assignment: this.state.title
                //submit_reply: reply_strings
        })
        // Some random tests
        console.log("This is the question: ",this.state.submit_question)
        console.log("This is the assignment title: ", this.state.title);
        
        //empty text field
        var question_string_val = this.state.submit_question
        question_string_val = ""
        // var sendToBackend = {
        //     question: {
        //         text: m_disc.question.text,
        //         date: m_disc.question.date,
        //     },
        //     responses: m_disc.responses,
        //     assignment: this.state.title,
        // }
        
        this.setState({
          discussion: m_disc,
            submit_question: question_string_val
        })
        let discAndIndex = {
            m_disc: m_disc,
            index: 0
        }
        // Post request is done here
        fetch('/uploadquestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(discAndIndex),
        })
        .then(function (response) {
            if (response.ok) {
                return response.json;
            }
            return Promise.reject(response);
        })
        .then(data => {
            console.log("DATA SENT CLIENT SIDE: ", data);
        })
        .catch(error => {
            console.error("ERROR CLIENT SIDE: ", error);
        })
        //you might need to use this below if you use the database but not 100% sure
        //window.location.reload()
    }
    
    
    handleFormSubmit(event) {
      event.preventDefault();
    }
    
    render() {
        let num_questions = this.state.discussion.length
        if (!this.state.description)
            this.display();
            var unparsedDiscussion = discussionExtract(this.state.discussion);
        return (
            <div>
                <div className= "header">
                    <div className= "logo">
                <Link to="/home" style={{ textDecoration: 'none' }}>
                            <span className="ookla">Ookla </span>
                            <span className="manager">Manager</span>
                        </Link>
                    </div>
                    <div className="calendar-nav">
                        <Link to="/login" className="calendar-nav">Log Out</Link>
                    </div>
                </div>
            <div className="my-assignment">
                <ul>
                    <p className="assignment-name">{this.state.class + " - " +this.state.title}</p>
                    <ul>
                        <li>{"Due Date : " + this.state.deadline.slice(0,10)}</li>
                        <li className="assign-spec">{"Assignment Specification"}</li>
                        <li className="assign-info">{this.state.information}</li>
                    </ul>
                    <div>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group size="lg" controlId="submit">
                      <br />
                    <Form.Control
                      autoFocusls
                     type="text"
                        placeholder="Submit a question"
                      className="question-form"
                      value={this.state.submit_question}
                      onChange ={this.handleChangeForm}
                    />
                <button className="submit-button" onClick={e => this.validateSubmit(e)}> Submit</button>
                  </Form.Group>
                    </Form>
                </div>
                <div className="post-label">Discussion Posts:</div>
                    {[...Array(num_questions)].map((x, i) =>
                    <div> {this.renderQuestion(i)} </div>
                )}
                </ul>
            </div>
            </div>
            );
    }
    
    //this is the layout for every specific question
    Question(i, title, replies) {
        let num_replies = replies.length
        return (<div className="questions">
                <p className="form-question">{"• " +title}</p>
                <ul>
                    {[...Array(num_replies)].map((x, k) =>
                        <li className="form-reply"> {replies[k]} </li>)}
                    <li>
                        <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group size="lg" controlId="submit">
                        <Form.Control
                            autoFocusls
                            type="text"
                            placeholder="Submit a reply"
                            className="specific-question-form"
                            value={this.state.submit_reply[i]}
                            onChange ={e => this.handleChangeReply(e, i)}
                            />
                        <button className="specific-submit-button" onClick={e =>         this.validateSubmitSpecific(e, i)}> Submit</button>
                        </Form.Group>
                    </Form>
                    </li>
                </ul>
                </div>);
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
                                                 
//converts variables of date type to string
function dateToString(date)
{
    var datetime = String(date.getMonth()+1).padStart(2, '0') + "/"
                    + String(date.getDate()).padStart(2, '0') + "/"
                    + date.getFullYear() + " @ "
                    + String(date.getHours()).padStart(2, '0') + ":"
                    + String(date.getMinutes()).padStart(2, '0') + ":"
                    + String(date.getSeconds()).padStart(2, '0');
    return datetime;
}
