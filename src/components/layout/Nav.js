import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div className="nav">
            <nav className="nav__links">
                <Link to="/drawings">Public Repos</Link>
                <Link to="/drawings/create">New Repo</Link>
            </nav>
        </div>
    );
};

export default Nav;
