import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { compose } from 'redux'
import classNames from 'classnames';
import * as R from 'ramda';

import {
    getCategories,
    getActiveCategoryId
} from '../selectors/selectors';

const Categories = ({ categories, activeCategoryId }) => {
    const getActiveState = R.propEq('id', activeCategoryId);
    const getActiveMain = R.isNil(activeCategoryId);
    const linkClass = classNames({
        'list-group-item': true,
        'active': getActiveMain
    })
    return (
        <div className="jumbotron">
            <h3>Categories</h3>
            <div className="list">
                <Link to="/"
                    className={linkClass}
                >
                    All
                </Link>
                {categories.map((category, index) => {
                    const linkClass = classNames({
                        'list-group-item': true,
                        'active': getActiveState(category)
                    })
                    return (
                        <Link to={`/categories/${category.id}`}
                            className={linkClass}
                            key={index}>
                            {category.name}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    categories: getCategories(state),
    activeCategoryId: getActiveCategoryId(ownProps)
})

export default compose(
    withRouter,
    connect(mapStateToProps, null)
)(Categories)