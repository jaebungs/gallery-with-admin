import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useAuth } from '../hooks/auth';

const LoginModal = ({setAdminModal}) => {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { startLogin } = useAuth();

    const history = useHistory();

    const handleCloseClicked = () => {
        setAdminModal(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await startLogin(email, password)
            .then((user) => {
                console.log(user)
                setAdminModal(null);
                history.push("/admin");
            })
            .catch((error) => {
                console.log('error', error)
                setAdminModal(null);
            });
    };

    return (
        <div className="backdrop">
            <div className="login-modal-container">
                <h3>Admin Login</h3>

                <form onSubmit={handleSubmit}>
                    <label>  
                        <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} required/>
                    </label>
                    <label>
                        <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} required/>
                    </label>
                    <button className="primary">Sign In</button>
                    <button className="danger" onClick={handleCloseClicked}>Cancel</button>
                </form>

            </div>
        </div>
    )
};

export default LoginModal;