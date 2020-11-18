import React from 'react';
import ReactDOM from 'react-dom';
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
            "Lisp"
        ],
            searchValue: ""
        }
    }

    getAssignments = (e) => {
        console.log("Onchange says hi!", e.target.value)
        this.setState({
            searchValue: e.target.value,
        })
    }

    render() {
        //const temp_assignments = this.state.assignments;
        const filtered = (this.state.assignments).filter((assign) => {
            return assign.toLowerCase().includes(
                this.state.searchValue.toLowerCase()
                );
        })

        const listMatch = filtered.map((match, index) => 
            <li key = {index}>{match}</li>
        );
        // const filtered = temp_assignments.filter(assign => {
        //     return assign.toLowerCase().includes(this.state.inputValue.toLowerCase())
        // })

        // const filtered = (this.state.assignments).includes(this.state.searchValue)
        // console.log(filtered);
        console.log(listMatch);
        return (
            <AList 
            inputValue = {this.state.searchValue} 
            assignments = {this.state.assignments}
            getAssignments = {this.getAssignments}
            result = {listMatch}
            />
        )
    }
}

const AList = (props) => {
    return(
        <div className = "searchbar">
            <label htmlFor="search">Search by Assignment Name: </label>
            <input type="text" value = {props.inputValue} onChange = {props.getAssignments}
            placeholder="Search..." />
                {props.inputValue && 
                <div className = "smaller">
                    Matches : 
                    <ul>
                        {props.result}
                    </ul>
                </div>
                }
        </div>
    )
}
