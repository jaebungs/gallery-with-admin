import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import WorkGrid from './WorkGrid';
import LoginModal from './LoginModal';
import Modal from './Modal';

const HomePage = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [adminModal, setAdminModal] = useState(null);


    return (
        <div>
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