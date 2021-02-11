import React from 'react';
import deleteFireStore from '../../hooks/deleteFireStore';

const AdminCard = ({
    index, url, name, id, tractChecked, setTrackChecked, 
    setImageDocs, imageOrder, setImageOrder, setIsDragable
    }) => {

    const handleCheckboxOnChange = (e) => {
        const name = e.target.value;

        if (e.target.checked) {
            setTrackChecked((prev)=>{
                let newTrackChecked = {...prev}
                newTrackChecked[name].checked = true
               return newTrackChecked
            })
        } else if (!e.target.checked) {
            setTrackChecked((prev)=>{
                let newTrackChecked = {...prev}
                console.log(newTrackChecked)
                newTrackChecked[name].checked = false
               return newTrackChecked
            })
        }
    }
    
    const handleDelete = (e) => {
        const id = e.target.id;
        const name = e.target.value;

        deleteFireStore(id, name, imageOrder);
        setImageDocs((prev) => {
            const index = prev.findIndex((doc)=> doc.id === id)
            prev.splice(index, 1)

            return [...prev]
        })
        
        setImageOrder((prev)=>{
            const index = prev.findIndex((str)=> str === id)
            prev.splice(index, 1)

            return [...prev]
        })
    }

    return (
        <div className="admin-grid-container" >
            
            <label className="check-box">
                {/* Checkbox was giving changing an uncontrolled input error due to undefined checked value */}
                <input type="checkbox" value={name} 
                checked={tractChecked[name] ? tractChecked[name].checked : false} 
                onChange={handleCheckboxOnChange}
            />
            </label>
            <p className="text"
            >
                {index + 1}
            </p>
            <img 
                src={url} 
                alt='product image' 
                className="admin-product-image cursor"
                onMouseEnter={()=>setIsDragable(true)}
                onMouseLeave={()=>setIsDragable(false)}
                onTouchStart={()=>setIsDragable(true)}
                onTouchEnd={()=>setIsDragable(false)}

            />
            <p 
                className="text cursor"
                onMouseEnter={()=>setIsDragable(true)}
                onMouseLeave={()=>setIsDragable(false)}
                onTouchStart={()=>setIsDragable(true)}
                onTouchEnd={()=>setIsDragable(false)}
            >
                {name}
            </p>
            <button className="delete-btn" id={id} value={name} onClick={handleDelete}>Delete</button>
            
        </div>
    )
}

export default AdminCard;