import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  
class Textbox extends React.Component {
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
    render (){
        return (
        <div className="txt-box">
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
                            {'STATE OF THE BUTTON'}
                            <div>{this.state.clicked ? "CLICKED" : "NOT CLICKED"}</div>
                        </div>
                </ul>
            </div>
        </div>
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

ReactDOM.render(
    <Textbox />,
    document.getElementById('root')
);
