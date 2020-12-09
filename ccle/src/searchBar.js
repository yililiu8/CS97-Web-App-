import React from 'react';
//import ReactDOM from 'react-dom';
import './searchBar.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useRouteMatch, useNavigate, useParams, useLocation} from "react-router-dom"; 
import Logo from "./design.jpg"

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [
        ],
            searchValue: "",
            sortOption: "Sort by:",
        }
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

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value,
        })
        if(!this.state.loading) {
            fetch(`/search?q=${e.target.value}&sort=${this.state.sortOption}`)
            .then(res => {
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
                this.setState({
                    assignments: this.state.searchValue ? listMatch : null,
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
                <div className = "searchbar">
                            <label htmlFor="search"> Search by Assignment Name: </label>
                            <input type="text" value = {this.state.searchValue} onChange = {this.handleChange} placeholder="Search" />
                            <div class ="text3">
                            <ul><p3> {("You can sort all the assignments by date or category weight")}</p3></ul>
                            </div>
                            <select onChange={this.handleClick} placeholder="Sort by">
                                <option>Sort by:</option>
                                <option>Grade Weightage</option>
                                {/* <option>Alphabetical Order</option> */}
                                <option>Due Date</option>
                            </select>
                            <ul id="special">
                                {this.state.assignments}
                            </ul>
                </div>
        )
    }
}
