import React, { useEffect, useState } from 'react';
import { fireStoreRef, storage } from '../../firebase/firebase';

const AdminSelectButtons = ({tractChecked, setTrackChecked, handleMultipleDelete}) => {
    let trackCheckedObj = {};
    
    const handleSelectAll = () => {
        trackCheckedObj = {...tractChecked}
        for (const item in trackCheckedObj){
            trackCheckedObj[item].checked = true
        }
        setTrackChecked(trackCheckedObj)
    }

    const handleSelectNone =() => {
        trackCheckedObj = {...tractChecked}
        for (const item in trackCheckedObj){
            trackCheckedObj[item].checked = false
        }
        setTrackChecked(trackCheckedObj)
    }

    return (
        <div className="checkbox-control-container">
            <button onClick={handleSelectAll}>Select All</button>
            <button onClick={handleSelectNone}>Select None</button>
            <button onClick={handleMultipleDelete}>Delete</button>
        </div>
    )
}

export default AdminSelectButtons;