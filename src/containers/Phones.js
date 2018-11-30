import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as R from 'ramda';

import { fetchPhones, loadMorePhones, addPhoneToBasket } from '../actions';
import { getPhones } from '../selectors/selectors';

class Phones extends Component {
    componentWillMount() {
        this.props.fetchPhones()
    }

    render() {
        const { phones, loadMorePhones, addPhoneToBasket } = this.props;

        return (
            <div>
                <div className="row">
                    {phones.map((phone, index) => {
                        const shortDescription = `${R.take(60, phone.description)}...`
                        return (
                            <div key={phone.id} className="col-md-4">
                                <div className="thumbnail">
                                    <img src={phone.image} alt={phone.name} />
                                </div>
                                <h2>{phone.name}</h2>
                                <p>{shortDescription}</p>
                                <p>{phone.price}</p>
                                <h4>
                                    <Link to={`/phones/${phone.id}`} >
                                        {phone.name}
                                    </Link>
                                </h4>
                                <button className="btn btn-primary" onClick={() => addPhoneToBasket(phone.id)} >
                                    Buy now!
                                </button>
                                <Link
                                    to={`/phones/${phone.id}`}
                                    className="btn btn-default">
                                    More
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-primary"
                                onClick={loadMorePhones}>
                            Load more
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    phones: getPhones(state)
})

const mapDispatchToProps = {
    fetchPhones,
    loadMorePhones,
    addPhoneToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Phones);