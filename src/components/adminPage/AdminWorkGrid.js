import React, { useState, useEffect, useRef } from 'react';
import {fireStoreOrderRef} from '../../firebase/firebase';
import AdminCard from './AdminCard';

const AdminWorkGrid = ({imageOrder, imageDocs, setImageOrder}) => {
    
    const [orderedDocs, setOrderedDocs] = useState([]); //array with objects of files
    const [tractChecked, setTrackChecked] = useState({}); //Track checkbox object with true/false
    const [deleteDone, setDeleteDone] = useState(false)
    const [dragging, setDragging]=useState(false);
    const [isDragable, setIsDragable] = useState(true);

    let trackCheckedObj = {}

    // When handleDelte in AdminCard is activate, render new cards.
    useEffect(()=>{
        fireStoreOrderRef.doc('order').get().then((document)=>{
            if (document.data().orderIds){
                setImageOrder([...document.data().orderIds])
            }
        })

        setDeleteDone(false)
    },  [deleteDone, imageOrder])

    // create [name]: [checked] object to track what is checked
    useEffect(() => {
        let tempOrderedDocs = [];

        imageOrder.forEach((id)=>{
            imageDocs && imageDocs.map((doc)=>{
                if (doc.id === id) {
                    tempOrderedDocs.push(doc)
                    trackCheckedObj[doc.name] = false
                }
            })
        })
        setTrackChecked(trackCheckedObj)
        setOrderedDocs([...tempOrderedDocs])
    }, [imageDocs, imageOrder])

    return (
        <div id="overview-page">
            <div className="admin-cards-container">
                {
                    orderedDocs && orderedDocs.map((doc, index) => {
                        return (
                            <div key={index}>
                                <AdminCard
                                    tractChecked={tractChecked}
                                    setTrackChecked={setTrackChecked}
                                    index={index} {...doc}
                                    setOrderedDocs={setOrderedDocs}
                                    setDeleteDone={setDeleteDone}
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