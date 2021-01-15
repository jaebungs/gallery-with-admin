import React, { useEffect, useState } from 'react';
import { fireStoreRef, storage } from '../../firebase/firebase';

const AdminSelectButtons = ({tractChecked, setTrackChecked}) => {
    let trackCheckedObj = {};
    
    const handleSelectAll = () => {
        trackCheckedObj = {...tractChecked}
        for (const item in trackCheckedObj){
            trackCheckedObj[item] = true
        }
        setTrackChecked(trackCheckedObj)
    }

    const handleSelectNone =() => {
        trackCheckedObj = {...tractChecked}
        for (const item in trackCheckedObj){
            trackCheckedObj[item] = false
        }
        setTrackChecked(trackCheckedObj)
    }

    const handleMultipleDelete =() => {

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