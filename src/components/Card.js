import React from 'react';

const Card = ({setSelectedImg, index, url, id, name }) => {

    return (
        <div className="product-container" onClick={()=>setSelectedImg(url)}>
            <img src={url} alt='product image' id={id} className="product-image" />
            {/* <p>Product: {name}</p> */}
        </div>
    )
}

export default Card;