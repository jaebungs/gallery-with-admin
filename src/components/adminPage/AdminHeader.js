import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

const AdminHeader = () => {

    const history = useHistory();
    const { startLogout } = useAuth();

    const handleLogout = () => {
        startLogout().then(()=>{
            history.push('/')
        })
        console.log('logout pressed')
    }
    
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
                exact
                to='/admin'
                activeClassName="is-active"
                className='nav'
            >
                Admin
            </NavLink>
            <button onClick={handleLogout}>Logout</button>
        </header>
    )
}

export default AdminHeader;