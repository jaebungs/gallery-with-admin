import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import WorkGrid from './WorkGrid';
import LoginModal from './LoginModal';
import Modal from './Modal';
import { useAuth } from '../hooks/auth';
import AdminHeader from './adminPage/AdminHeader';

const HomePage = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [adminModal, setAdminModal] = useState(null);

    const { isLoggedIn } = useAuth();

    return (
        <div>
            {isLoggedIn ? <AdminHeader /> : <Header /> }
            <WorkGrid setSelectedImg={setSelectedImg} />
            {
                selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            }
            <footer>
                <div onClick={()=>{setAdminModal(true)}}>Admin</div>
                {
                   adminModal&& <LoginModal setAdminModal={setAdminModal} />
                }
            </footer>
        </div>
    )
}

export default HomePage;