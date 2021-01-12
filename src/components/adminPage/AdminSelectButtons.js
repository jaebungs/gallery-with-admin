import React, { useEffect, useState } from 'react';
import { fireStoreRef, storage } from '../../firebase/firebase';

const AdminSelectButtons = ({}) => {

    return (
        <div className="checkbox-control-container">
            <button onClick={handleSelectAll}>Select All</button>
            <button onClick={handleSelectNone}>Select None</button>
            <button onClick={handleMultipleDelete}>Delete</button>
        </div>
    )
}

export default AdminSelectButtons;