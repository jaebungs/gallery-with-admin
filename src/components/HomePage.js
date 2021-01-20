import React, { useState, useEffect } from 'react';
import Header from './Header';
import WorkGrid from './WorkGrid';
import LoginModal from './LoginModal';
import Modal from './Modal';
import { useAuth } from '../hooks/auth';
import AdminHeader from './adminPage/AdminHeader';

const HomePage = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [adminModal, setAdminModal] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    const { isLoggedIn } = useAuth();

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () =>  window.removeEventListener('scroll', handleScroll);
    }, [])

    const year = new Date().getFullYear();

    const handleScroll = () => {
        setScrollPosition(window.pageYOffset)
    }

    const toTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    return (
        <div>
            <span id="top"></span>
            {isLoggedIn ? <AdminHeader /> : <Header /> }
            <WorkGrid setSelectedImg={setSelectedImg} />
            {
                selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            }
            {
                scrollPosition > 200 && <a href="#top" onClick={toTop}><i className="fas fa-arrow-circle-up top-arrow"></i></a>
            }
            <footer className="footer-container">
                <p>© {year}, Common Goods Studio</p>
                <div className="link-container">
                    <a href="https://www.facebook.com/CommonGoods.Studio"><i className="fab fa-facebook-square media-icon"></i></a>
                    <a href="https://www.instagram.com/commongoodsstudio/"><i className="fab fa-instagram-square media-icon"></i></a>
                    <a href="https://www.youtube.com/channel/UCSOorftvUBrI1Ax9hzsmrxA"><i className="fab fa-youtube media-icon"></i></a>
                </div>
                <p className="cursor" onClick={()=>{setAdminModal(true)}}>Admin</p>
                {
                   adminModal && <LoginModal setAdminModal={setAdminModal} />
                }
            </footer>
        </div>
    )
}

export default HomePage;