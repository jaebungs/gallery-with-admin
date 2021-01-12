import React from 'react';

const Modal = ({ selectedImg, setSelectedImg }) => {
    
    const handleClicked = (e) => {
        setSelectedImg(null);
    };

    return (
        <div className="backdrop" onClick={handleClicked}>
            <img src={selectedImg} alt="enlarged picture" />
        </div>
    )
}

export default Modal;