import React, { Component } from 'react';
import { fetchPhoneById, addPhoneToBasket } from '../actions/index';
import { connect } from 'react-redux';
import { getPhoneById } from '../selectors/selectors';
import * as R from 'ramda';
import BasketCart from '../components/BasketCart';
import { Link } from 'react-router';

class Phone extends Component {
    componentDidMount() {
        this.props.fetchPhoneById(this.props.params.id)
    }

    renderFiled() {
        const { phone } = this.props;
        const columnFields = R.compose(
            R.toPairs,
            R.pick([
                'cpu',
                'camera',
                'size',
                'weight',
                'display',
                'battery',
                'memory'
            ])
        )(phone)

        const info = columnFields.map(([key, value]) => {
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            )
        });

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info}
                    </tbody>
                </table>
            </div>
        )
    }

    renderContent() {
        const { phone } = this.props;
        return (
            <div>
                <div className="thumbnail">
                    <img className="img-thumbnail" src={phone.image} alt={phone.name} />
                </div>
                <div>
                    <h2>{phone.name}</h2>
                    <p>{phone.description}</p>
                    <p>Size: {phone.size}</p>
                    <p>Price: {phone.price}$</p>
                    {this.renderFiled()}
                </div>
            </div>
        )
    }

    renderSidebar() {
        const { phone, addPhoneToBasket } = this.props;

        return (
            <div>
                <p className="lead text-center">Quick shop</p>
                <BasketCart />
                <div className="form-group">
                    <h1>{phone.name}</h1>
                    <h2>${phone.price}</h2>
                </div>
                <Link to='/' className="btn btn-info btn-block">Back to main</Link>
                <button type="button"
                    className="btn btn-success btn-block"
                    onClick={() => addPhoneToBasket(phone.id)} >add to cart</button>
            </div>
        )
    }

    render() {
        const { phone } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        {phone ? this.renderContent() : null}
                    </div>
                    <div className="col-md-4">
                        {phone ? this.renderSidebar() : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    phone: getPhoneById(state, state.phonePage.id)
})

const mapDispatchToProps = {
    fetchPhoneById,
    addPhoneToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone);