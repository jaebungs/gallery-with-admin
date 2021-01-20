import React, {useEffect} from 'react';
import useOrderFireStore from '../hooks/useOrderFireStore';
import Card from './Card';

const WorkGrid = ({ setSelectedImg }) => {

    const { orderDocs } = useOrderFireStore();

    return (
        <main className="main-container">
            {orderDocs && orderDocs.map((doc, index) => {
                return <Card key={index} setSelectedImg={setSelectedImg} {...doc} />
                })
            }
        </main>
    )
}

export default WorkGrid;