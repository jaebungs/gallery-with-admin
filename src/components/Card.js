import React from 'react';

const Card = ({setSelectedImg, index, url, id, height, width }) => {
    
    // calculate height and give className that is close to it's ratio.
     // height is determinded by its width.
     const heightCalculator = (height) => {
        let resizeWidth = width / 280
        let resize = Math.round( ((parseInt(height)) / resizeWidth) / 9 );
        // To give some different heights. In case there are all same width of pictures.
        if (index % 3 === 0) {
            resize -= 5
        } else if (index % 4 === 0) {
            resize -= 1
        }else if (index % 2 === 0) {
            resize -= 3
        }
        return resize;
    };

    const styleSpan = {
        gridRowEnd: "span "+ heightCalculator(height)
    }

    return (
        <div className='card-container' style={styleSpan} data-index={index} onClick={()=>setSelectedImg(url)}>
            <img src={url} alt='product image' loading='lazy' id={id} className={`card-image`}/>
        </div>
    )
}

export default Card;