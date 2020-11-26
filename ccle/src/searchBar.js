import React from 'react';
//import ReactDOM from 'react-dom';
import './searchBar.css';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [
            "Git", 
            "Python Scripting", 
            "Shell", 
            "Emacs Editing", 
            "Lisp",
            "C Programmings",
            "Repository Organization"
        ],
            searchValue: ""
        }
    }

    getAssignments = (e) => {
        this.setState({
            searchValue: e.target.value,
        })
    }
     
    render() {
        const filtered = (this.state.assignments).filter((assign) => {
            return assign.toLowerCase().includes(
                this.state.searchValue.toLowerCase()
                );
        })

        fetch(`/hello?q=${this.state.searchValue}`)
        .then(res => {
            console.log("RESPONSE", res);
            return res.json()
        })
        .then(data => {
            console.log("DATA PARSED!!!!", data)
        })
        .catch(e => {
            console.log("ERROR!", e);
        })

        var listMatch = filtered.map((match, index) => {
            return (this.state.searchValue) ? <li key={index}><a href="/dummy">{match}</a></li> : null;
        });

        
        return (
                <div className = "searchbar">
                            <label htmlFor="search"> Search by Assignment Name: </label>
                            <input type="text" value = {this.state.searchValue} onChange = {this.getAssignments} placeholder="Search" />
                            <ul id="special">
                                {listMatch}
                                
                            </ul>
                </div>
        )
    }
}
