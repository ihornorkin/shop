import React from 'react';
import BasketCart from './BasketCart';

const Sidebar = (({ props }) => {
    return (
        <div className="Sidebar">
            <BasketCart />
        </div>
    )
}) 

export default Sidebar;