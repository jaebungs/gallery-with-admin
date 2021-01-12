import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {

    return(
        <header>
            <h1>CommonGoods Gallery</h1>
            <NavLink
                exact
                to='/'
                activeClassName="is-active"
                className='nav'
            >
                Home
            </NavLink>
            <NavLink
                to='/admin'
                activeClassName="is-active"
                className='admin-nav'
            >
                Admin
            </NavLink>
        </header>
    )
}

export default Header;