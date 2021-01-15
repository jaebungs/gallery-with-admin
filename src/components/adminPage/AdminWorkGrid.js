import React, { useState, useEffect, useRef } from 'react';
import {fireStore, fireStoreRef, fireStoreOrderRef} from '../../firebase/firebase';
import deleteFireStore from '../../hooks/deleteFireStore';
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

    useEffect(() => {
        imageOrder.forEach((id)=>{
            imageDocs && imageDocs.map((doc)=>{
                if (doc.id === id) {
                    trackCheckedObj[doc.name] = {id, name: doc.name, checked: false }
                }
            })
        })
        setTrackChecked(trackCheckedObj)

    }, [imageOrder, imageDocs])

    const handleMultipleDelete =() => {
        // find checked element in tractChecked hook and erase.
        let promises = [];
        let newImageDocs = [...imageDocs];
        let newImageOrder = [...imageOrder];

        for(const checked in tractChecked) {
            let name = checked;
            let id = tractChecked[checked].id;

            if (tractChecked[checked].checked) {
                let docIndex = newImageDocs.findIndex((doc)=>doc.id === id);
                let orderIndex = newImageDocs.findIndex((doc)=>doc.id === id);

                promises.push(deleteFireStore(id, name, newImageOrder))
                newImageDocs.splice(docIndex, 1);
                newImageOrder.splice(orderIndex, 1)
            }
        }
        Promise.all(promises).then(()=>{
            setImageDocs(newImageDocs)
            setImageOrder(newImageOrder)
        })
        
    }

    return (
        <div id="overview-page">
            <div className="admin-cards-container">
                <AdminSelectButtons 
                    tractChecked={tractChecked}
                    setTrackChecked={setTrackChecked}
                    handleMultipleDelete={handleMultipleDelete}
                />
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
                                    imageOrder={imageOrder}
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