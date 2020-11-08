import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  
class Textbox extends React.Component {
    render (){
        return (
        <div className="txt-box">
            <div>{"RandomTest"}</div>
            <div className="assignments">
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
        </div>
        );
    }
}

ReactDOM.render(
    <Textbox />,
    document.getElementById('root')
);
