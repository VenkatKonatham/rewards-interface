import React from 'react';
import PropTypes from 'prop-types';


function Layout (props) {
    return (<div className="container">
        {props.children}
    </div>)
}

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default Layout;