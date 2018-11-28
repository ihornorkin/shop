import React from 'react';

const Layout = ({children}) => {
    return (
        <div className='view-container'>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                    
                    </div>
                    <div className="col-md-9">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Layout;