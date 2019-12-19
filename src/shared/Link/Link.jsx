import React, { Fragment } from 'react';
import './Link.css';
import { Link as ReactRouterDomLink } from 'react-router-dom';

function Link({ children, to }) {
  return <Fragment >
        <ReactRouterDomLink className="listItem" to={to}>{children}</ReactRouterDomLink>
    </Fragment>
};

export default Link;