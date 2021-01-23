import React, { useState, useEffect } from 'react';

const Card = ({setSelectedImg, index, url, id, height, width, name }) => {
    
    const [resizeheight, setResizeheight] = useState(null);

    useEffect(()=>{
        setResizeheight(heightCalculator(height));
    }, [])

    const heightCalculator = (height) => {
        let resize = Math.round(parseInt(height) / 290);

        return `span${resize}`
    };

    return (
        <div className={`card-container ${resizeheight}`} data-index={index} onClick={()=>setSelectedImg(url)}>
            <img src={url} alt='product image' id={id} className={`card-image`}/>
        </div>
    )
}

export default Card;