import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getTotalBasketPrice,
    getBasketPhonesWithCount
} from '../selectors/selectors';
import * as R from 'ramda';
import {
    removePhoneFromBasket,
    basketCheckout,
    cleanBasket
} from '../actions/index';
import { Link } from 'react-router';

class Basket extends Component {
    isBasketEmpty = () => {
        const { phones } = this.props;
        return R.isEmpty(phones);
    }

    renderContent = () => {
        const { phones, totalPrice, removePhoneFromBasket } = this.props;
        return (
            <div>
                {
                    this.isBasketEmpty() ? <div>No phones in shop</div> :
                        <div className="goods">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-condensed cf">
                                    <tbody>
                                        {phones.map((phone, index) => {
                                            return (<tr key={index} className="item-checkout">
                                                <td>
                                                    <img className="thumbnail" src={phone.image} alt={phone.name} />
                                                </td>
                                                <td>{phone.name}</td>
                                                <td>{phone.price}</td>
                                                <td>{phone.count}</td>
                                                <td>
                                                    <button className="btn" onClick={() => removePhoneFromBasket(phone.id)} >Delete</button>
                                                </td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }
                {
                    !this.isBasketEmpty() ?
                        <div>
                            <p><strong>Total:</strong></p>
                            <p>${totalPrice}</p>
                        </div>
                        : null
                }
            </div>
        )
    }

    renderSidebar = () => {
        const { phones, basketCheckout, cleanBasket } = this.props;

        return (
            <div>
                <Link className="btn btn-info" to='/'>
                    <span>Continue shopping</span>
                </Link>
                {
                    R.not(this.isBasketEmpty()) &&
                    <div>
                        <button onClick={cleanBasket}
                            className="btn btn-danger"
                        >
                            Clean all
                        </button>
                        <button onClick={() => basketCheckout(phones)}
                            className="btn btn-success"
                        >
                            CheckOut
                        </button>
                    </div>
                }
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        {this.renderContent()}
                    </div>
                    <div className="col-md-3 btn btn-block">
                        {this.renderSidebar()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    phones: getBasketPhonesWithCount(state),
    totalPrice: getTotalBasketPrice(state)
})

const mapDispatchToProps = ({
    removePhoneFromBasket,
    basketCheckout,
    cleanBasket
})

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
