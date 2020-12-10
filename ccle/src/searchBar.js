import React from 'react';
//import ReactDOM from 'react-dom';
import './searchBar.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useRouteMatch, useNavigate, useParams, useLocation} from "react-router-dom"; 
//import assignments from '../models/assignments';



export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [
        ],
            searchValue: "",
            sortOption: "Sort by:",
            loading: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value,
        })
        if(!this.state.loading) {
            fetch(`/search?q=${e.target.value}&sort=${this.state.sortOption}`)
            .then(res => {
                this.setState({
                    loading: true
                })
                return res.json()
            })
            .then(data => {
                const matches = data.response;
                const listMatch = (matches).map(function(match, index){
                    //return <li key={index}><a href=>{match}</a></li>
                    return(
                        <div key = {index}>
                        <Link to={{
                            pathname: match
                        }}>
                            {match}
                        </Link>
                        </div>
                    )
                });
                return listMatch
            })
            .then(final => {
                this.setState({
                    assignments: this.state.searchValue ? final : null,
                    loading: false
                })
            })
        }
    }

    handleClick = (e) => {
        console.log(e.target.value);
        this.setState({
            sortOption: e.target.value
        })
    }
     
    render() {
        return (
            <div className="search-box">
            <div className="search-title">{"Search for Assignments"}</div>
                <div className = "searchbar">
                    <p1>Search by Assignment Name:</p1>
                            {/* <label htmlFor="search"> Search by Assignment Name: </label> */}
                            <input type="text" value = {this.state.searchValue} onChange = {this.handleChange} placeholder="Search" />
                            <div class ="text3">
                            <p3 style= {{fontSize:'14px', fontFamily: 'Titillium Web'}}>You can sort by grade weightage or nearest deadlines</p3>
                            </div>
                            <select onChange={this.handleClick} placeholder="Sort by">
                                <option>Sort by:</option>
                                <option>Grade Weightage</option>
                                <option>Due Date</option>
                            </select>
                            <ul id="special">
                                {this.state.assignments}
                            </ul>
                </div>
                </div>
        )
    }
}
