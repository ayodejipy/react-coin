import React, { Component } from 'react';
import { handleResponse } from "../../helper";
import { API_URL } from "../config";
import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";

class List extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        }

    }

    componentDidMount() {
        this.fetchCurrencies();   
    }

    fetchCurrencies() {

        this.setState({ loading: true });

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            const {currencies, totalPages } = data;

            this.setState({
                currencies,
                totalPages,
                loading: false
            })
            // console.log('Success', data)
        })
        .catch((error) => {
            this.setState({
                error: error.errorMessage,
                loading: false
            })
        });
    }

    handlePagination = (direction) => {
        let currentPage = this.state.page;

        /**
         * if direction clicked = next, add one to currentPage
         * else substract one from currentPage
         *  */ 
        currentPage = direction === 'next' ? currentPage + 1 : currentPage - 1;

        // Call fetchCurrencies in callback to update the first page
        this.setState({ page: currentPage }, () => this.fetchCurrencies());
    }


    render() {
        const { error, currencies, page, totalPages  } = this.state;
        // console.log(this.state)

        // Render if loading state is set to true
        if(this.state.loading) {
            return <div className="loading-container"> <Loading /> </div>
        }

        //output error only if there was an error fetching api data
        if(error) {
            return <div className="error">{error}</div>
        }
        return (
            <div>
                <Table 
                    currencies={currencies}
                    renderChangePercent={this.renderChangePercent}
                />

                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    handlePagination={this.handlePagination}
                />
            </div>
            
        );
    }
}

export default List;