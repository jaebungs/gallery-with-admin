import React, { useState, useEffect, useRef } from 'react';
import {fireStore, fireStoreRef, fireStoreOrderRef} from '../../firebase/firebase';
import deleteFireStore from '../../hooks/deleteFireStore';
import AdminSelectButtons from './AdminSelectButtons';
import AdminCard from './AdminCard';

const AdminWorkGrid = ({imageOrder, imageDocs, setImageDocs, setImageOrder}) => {
    
    const [tractChecked, setTrackChecked] = useState({}); //Track checkbox object with true/false
    const [dragging, setDragging]=useState(false);
    const [isDragable, setIsDragable] = useState(true);

    const dragItem = useRef();
    const dragNode = useRef();

    let trackCheckedObj = {}

    // create trackChecked obj that has name:{id, name, checked}
    useEffect(() => {
        imageOrder.forEach((id)=>{
            imageDocs && imageDocs.map((doc)=>{
                if (doc.id === id) {
                    trackCheckedObj[doc.name] = {id, name: doc.name, checked: false }
                }
            })
        })
        setTrackChecked(trackCheckedObj)
    }, [imageDocs])

    // find checked element in tractChecked hook and erase.
    const handleMultipleDelete =() => {
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

    // drag functions
    const handleDragStart = (e, index) => {
        dragItem.current = index
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', handleDragEnd)
        console.log('drag start')
        setDragging(true)
    }
    
    const handleDragEnd = () => {
        dragItem.current = null;
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragNode.current = null;
        fireStoreOrderRef.doc('order').update({orderIds: [...imageOrder]})
        console.log(imageOrder)
        setDragging(false)
    }

    const handleDragEnter = (e, index) => {
        const currentItem = dragItem.current
        if (dragNode.current !== e.target){
            setImageOrder((prev)=>{
                let newOrder = [...prev];
                newOrder.splice(index, 0, newOrder.splice(currentItem, 1)[0])
                dragItem.current = index
                return newOrder
            })
            setImageDocs((prev)=>{
                let newOrderDocs = [...prev];
                newOrderDocs.splice(index, 0, newOrderDocs.splice(currentItem, 1)[0])
                dragItem.current = index
                return newOrderDocs
            })
        }
    }

    // Dragging element styling.
    const setDragStyle = (index) => {
        if (index === dragItem.current){
            return "current-drag"
        }
        return "adminCard-drag-container"
    }

    return (
        <div id="overview-page">
            <AdminSelectButtons 
                tractChecked={tractChecked}
                setTrackChecked={setTrackChecked}
                handleMultipleDelete={handleMultipleDelete}
            />
            <div className="admin-cards-container">
                
                {
                    imageDocs && imageDocs.map((doc, index) => {
                        return (
                            <div 
                                key={index}
                                draggable={isDragable ?  "true" : "false" }
                                onDragStart={(e)=>handleDragStart(e, index)}
                                onDragEnter={(e)=>handleDragEnter(e, index)}
                                className={dragging ? setDragStyle(index) : "adminCard-drag-container"}
                            >
                                <AdminCard
                                    tractChecked={tractChecked}
                                    setTrackChecked={setTrackChecked}
                                    setImageDocs={setImageDocs}
                                    imageOrder={imageOrder}
                                    setImageOrder={setImageOrder}
                                    setIsDragable={setIsDragable}
                                    index={index} 
                                    {...doc}
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