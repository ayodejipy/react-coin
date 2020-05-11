import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from "../common/Loading";
import "./Search.css";
import { API_URL } from "../config";
import { handleResponse } from "../../helper";


class Search extends Component {
    state = {
        searchResults: [],
        searchQuery: '',
        loading: false,
    }

    handleInputChange = (e) => {
        const searchQuery = e.target.value;

        this.setState({ searchQuery });

        // If input value is nothing/not present, don't sent any request to the server
        if(!searchQuery) {
            return '';
        }

        this.setState({ loading: true })

        // fetch query to get a specific currency
        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then((result) => {
            this.setState({ 
                searchResults: result,
                loading: false,
            });
        });
    }

    handleRedirect = (currencyId) => {
        this.setState({
            searchQuery: '',
            searchResults: [],
        });

        this.props.history.push(`/currency/${currencyId}`);
    }

    renderSearchResults = () =>  {
        const { searchResults, searchQuery, loading } = this.state;


        if(!searchQuery) {
            return '';
        }

        if(searchResults.length > 0) {
            return(
                <div className="Search-result-container">
                    {searchResults.map( result => (
                        <div
                            key={result.id}
                            className="Search-result"
                            onClick={() => this.handleRedirect(result.id)}>

                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            )
        }

        if(!loading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No result found.
                    </div>
                </div>
            )
        }
    }

    
    render() {

        const { loading, searchQuery } = this.state;

        
        return (
            <div className="Search">
                <span className="Search-icon"></span>

                <input
                    className="Search-input"
                    type="text"
                    placeholder="Currency name"
                    onChange={this.handleInputChange}
                    value={searchQuery}
                />

                { loading && 
                    <div className="Search-loading">
                        <Loading width='12px' height='12px' />
                    </div> }

                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search);
