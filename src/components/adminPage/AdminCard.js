import React from 'react';
import deleteFireStore from '../../hooks/deleteFireStore';

const AdminCard = ({index, url, name, id, tractChecked, setTrackChecked, setDeleteDone}) => {

    const handleCheckboxOnChange = (e) => {
        const name = e.target.value;

        if (e.target.checked) {
            setTrackChecked({
                ...tractChecked,
               [name] : true
            })
        } else if (!e.target.checked) {
            setTrackChecked({
                ...tractChecked,
               [name] : false
            })
        }
    }
    async function handleDelete(e) {
        const id = e.target.id;
        const name = e.target.value;

        deleteFireStore(id, name);
        await setDeleteDone(true);
    }

    return (
        <div className="admin-card" >
            
            <label className="check-box">
                {/* Checkbox was giving changing an uncontrolled input error due to undefined checked value */}
                <input type="checkbox" value={name} 
                checked={tractChecked[name] ? tractChecked[name] : false} 
                onChange={handleCheckboxOnChange}
            />
            </label>
            <p className="text">
                {index + 1}
            </p>
            <img src={url} alt='product image' className="admin-product-image" />
            <p className="text">
                Product: {name}
            </p>
            <button id={id} value={name} onClick={handleDelete}>Delete</button>
            
        </div>
    )
}

export default AdminCard;