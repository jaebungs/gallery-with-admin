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
        <header className="header-container">
            <div className="navigation-container">
                <h1 className="company-title">Common Goods Studio</h1>
                <NavLink
                    exact
                    to='/'
                    activeClassName="is-active"
                    className='anchor'
                >
                    Home
                </NavLink>
                <NavLink
                    exact
                    to='/admin'
                    activeClassName="is-active"
                    className='anchor'
                >
                    Admin
                </NavLink>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </header>
    )
}

export default AdminHeader;