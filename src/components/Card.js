import React, { useState, useEffect } from 'react';

const Card = ({setSelectedImg, index, url, id, height, width, name }) => {
    
    const [resizeheight, setResizeheight] = useState(null);

    useEffect(()=>{
        setResizeheight(heightCalculator(height));
    }, [])

    // calculate height and give className that is close to it's ratio.
    const heightCalculator = (height) => {
        let resizeWidth = width / 290
        let resize = Math.round( (parseInt(height) / resizeWidth) / 11 );
        return resize;
    };

    const styleSpan = {
        gridRowEnd: "span "+resizeheight
    }

    return (
        <div className={`card-container ${resizeheight}`} style={styleSpan} data-index={index} onClick={()=>setSelectedImg(url)}>
            <img src={url} alt='product image' id={id} className={`card-image`}/>
        </div>
    )
}

export default Card;