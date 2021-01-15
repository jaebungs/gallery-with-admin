import React, { useState, useEffect, useRef } from 'react';
import {fireStore, fireStoreRef, fireStoreOrderRef} from '../../firebase/firebase';
import AdminSelectButtons from './AdminSelectButtons';
import AdminCard from './AdminCard';

const AdminWorkGrid = ({imageOrder, imageDocs, setImageDocs, setImageOrder}) => {
    
    const [orderedDocs, setOrderedDocs] = useState([]); //array with objects of files
    const [docOrderIds, setDocOrderIds] = useState([]); //array with order ids.
    const [tractChecked, setTrackChecked] = useState({}); //Track checkbox object with true/false
    const [deleteDone, setDeleteDone] = useState(false)
    const [dragging, setDragging]=useState(false);
    const [isDragable, setIsDragable] = useState(true);

    let trackCheckedObj = {}

    // create [name]: [checked] object to track what is checked
    useEffect(() => {
        imageOrder.forEach((id)=>{
            imageDocs && imageDocs.map((doc)=>{
                if (doc.id === id) {
                    trackCheckedObj[doc.name] = false
                }
            })
        })
        setTrackChecked(trackCheckedObj)

    }, [])

    return (
        <div id="overview-page">
            <div className="admin-cards-container">
                {/* <AdminSelectButtons 
                    tractChecked={tractChecked}
                    setTrackChecked={setTrackChecked}
                /> */}
                {
                    imageDocs && imageDocs.map((doc, index) => {
                        return (
                            <div key={index}>
                                <AdminCard
                                    tractChecked={tractChecked}
                                    setTrackChecked={setTrackChecked}
                                    index={index} 
                                    {...doc}
                                    setDeleteDone={setDeleteDone}
                                    setImageDocs={setImageDocs}
                                    setImageOrder={setImageOrder}
                                />
                            </div>
                            )
                    })
                }
            </div>
        </div>
    )
}

export default AdminWorkGrid;