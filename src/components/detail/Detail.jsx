import React, { Component } from "react";
import Loading from "../common/Loading";
import { API_URL } from "../config";
import { handleResponse, renderChangePercent } from "../../helper";
import "./Detail.css";

class Detail extends Component {
    state = {
        currency: {},
        loading: false,
        error: null,
    };

    componentDidMount() {
        // console.log('Component Mounted', this.props)

        const currencyID = this.props.match.params.id;

        this.fetchCurrency(currencyID);
        
    }

    componentWillReceiveProps(nextProps) {
        // console.log('Component Updated', nextProps)

        if(this.props.location.pathname !== nextProps.location.pathname) {
            // Get new currency from url
            const newCurrencyID = nextProps.match.params.id;

            this.fetchCurrency(newCurrencyID);
        }
    }


    fetchCurrency(currencyID) {
        this.setState({ loading: true });

        fetch(`${API_URL}/cryptocurrencies/${currencyID}`)
        .then(handleResponse)
        .then((currency) => {
            this.setState({
                loading: false,
                currency: currency,
                error: null
            });


        })
        .catch((error) => {
            this.setState({
                loading: false,
                error: error.errorMessage,
            })

            // console.log("error:", error)
        })
    }


    render() {
        const { loading, error, currency } = this.state;

        // render component only if loading state is set to true
        if(loading) {
            return <div className="loading-container"> <Loading /> </div>
        }

        // render error if there's error while fetching data
        if(error) {
            return <div className="error">{error}</div>
        }

        return (
            <div className="Detail">
                <h1 className="Detail-heading">
                    {currency.name} {(currency.symbol)}
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        Price <span className="Detail-value">$ {currency.price} </span>
                    </div>
                    <div className="Detail-item">
                        Rank <span className="Detail-value"> {currency.rank} </span>
                    </div>
                    <div className="Detail-item">
                        24H Change <span className="Detail-value"> {renderChangePercent(currency.percentChange24h)} </span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Market Cap</span>
                        <span className="Detail-dollar">$</span>
                        {currency.marketCap}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">24H Volume</span>
                        <span className="Detail-dollar">$</span>
                        {currency.volume24h}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Total Supply</span>
                        {currency.totalSupply}
                    </div>
                </div>
            </div>
        )
    }
};


export default Detail;