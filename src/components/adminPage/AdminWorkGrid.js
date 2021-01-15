import React, { useState, useEffect, useRef } from 'react';
import {fireStore, fireStoreRef, fireStoreOrderRef} from '../../firebase/firebase';
import useOrderFireStore from '../../hooks/useOrderFireStore';
import AdminSelectButtons from './AdminSelectButtons';
import AdminCard from './AdminCard';
// What next? need re-render after delete is pressed. delete and adding function to firebase is working.
const AdminWorkGrid = ({imageOrder, imageDocs, setImageOrder, setActionDone}) => {

    const {orderDocs, orderIds} = useOrderFireStore();
    
    const [orderedDocs, setOrderedDocs] = useState([]); //array with objects of files
    const [docOrderIds, setDocOrderIds] = useState([]); //array with order ids.
    const [tractChecked, setTrackChecked] = useState({}); //Track checkbox object with true/false
    const [deleteDone, setDeleteDone] = useState(false)
    const [dragging, setDragging]=useState(false);
    const [isDragable, setIsDragable] = useState(true);

    let trackCheckedObj = {}

    useEffect(()=>{
        let document = [];
        let orderIdsArray = [];

        fireStoreOrderRef.doc('order').get()
        .then((doc)=>{
            if (doc.data().orderIds) {
                orderIdsArray = [...doc.data().orderIds] //array of strings
                setDocOrderIds(orderIdsArray)
            }
        }).then(()=>{
            let orderPromises = [];
            // Promise all to get objects contain image data according to the order.
            orderIdsArray.forEach((imageId) => {
                orderPromises.push(fireStoreRef.doc(imageId).get())
            });

            return Promise.all(orderPromises)
        })
        .then((result) => {
            result.forEach((res) => {
                // each object contains image data.
                document.push({...res.data(), id: res.id})
            })
            setOrderedDocs([...document])
            setDeleteDone(false)
        })
        .catch((err)=>{console.log('failed to get ordered images',err)})
        console.log('fire when deleted')
        
    }, [deleteDone])

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
                <AdminSelectButtons 
                    tractChecked={tractChecked}
                    setTrackChecked={setTrackChecked}
                />
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
                                    setImageOrder={setImageOrder}
                                
                                    setActionDone={setActionDone}
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