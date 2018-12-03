import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchPhone } from '../actions/index';

class Search extends Component {
    state = {
        value: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.searchPhone(this.state.value);
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <div className="search">
                <h3 className="lead">Quick search</h3>
                <div className="input-group">
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleChange}
                            type="text"
                            className="form-control" />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToprops = {
    searchPhone
}

export default connect(null, mapDispatchToprops)(Search);