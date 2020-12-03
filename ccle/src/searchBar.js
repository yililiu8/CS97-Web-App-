import React from 'react';
//import ReactDOM from 'react-dom';
import './searchBar.css';
const axios = require('axios');

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [
        ],
            searchValue: "",
            sortOption: "Sort",
        }
    }

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value,
        })
        if(!this.state.loading) {
            fetch(`/search?q=${e.target.value}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const matches = data.response;
                const listMatch = (matches).map(function(match, index){
                    return <li key={index}><a href="/dummy">{match}</a></li>
                });
                this.setState({
                    assignments: this.state.searchValue ? listMatch : null,
                    //searchValue: e.target.value,
                })
                console.log("Matches: ", this.state.assignments);
            })
        }
    }

    handleClick = (e) => {
        console.log(e.target.value);
    }
     
    render() {
        return (
                <div className = "searchbar">
                            <label htmlFor="search"> Search by Assignment Name: </label>
                            <input type="text" value = {this.state.searchValue} onChange = {this.handleChange} placeholder="Search" />
                            <select onChange={this.handleClick} placeholder="Sort by">
                                <option>Sort by: </option>
                                <option>Grade Weightage</option>
                                <option>Alphabetical Order</option>
                                <option>Due Date</option>
                            </select>
                            <ul id="special">
                                {this.state.assignments}
                            </ul>
                </div>
        )
    }
}
