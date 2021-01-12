import React, { useState } from 'react';
import WorkGrid from './WorkGrid';
import Modal from './Modal';

const HomePage = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div>
            <WorkGrid setSelectedImg={setSelectedImg} />
            {
                selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            }
            
        </div>
    )
}

export default HomePage;