import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { auth } from '../firebase/firebase';
import { startLogin } from '../hooks/auth';

const LoginModal = ({setAdminModal}) => {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();

    const handleClicked = () => {
        setAdminModal(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(user)
            console.log(user.token, user.cookies)
            return history.push("/admin");
        })
        .catch((error) => {
            console.log('error', error)
        });
        startLogin(email, password)
    };

    return (
        <div className="backdrop">
            <h3>Admin Login</h3>
            <div onClick={handleClicked}>X</div>
           <form onSubmit={handleSubmit}>
               <label>  
                    <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} required/>
               </label>
               <label>  
                    <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} required/>
               </label>
               <button>Sign In</button>
           </form>
           <button onClick={handleClicked}>Cancel</button>
        </div>
    )
};

export default LoginModal;