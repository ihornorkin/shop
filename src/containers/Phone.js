import React, { Component } from 'react';
import { fetchPhoneById } from '../actions/index';
import { connect } from 'react-redux';

class Phone extends Component {
    componentDidMount() {
        this.props.fetchPhoneById(this.props.params.id)
    }

    render() {
        return (
            <div>
                phone
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchPhoneById
}

export default connect(null, mapDispatchToProps)(Phone);