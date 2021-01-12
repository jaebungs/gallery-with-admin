import React, {useState, useEffect} from 'react';
import { fireStoreRef, fireStoreOrderRef } from '../../firebase/firebase';
import useOrderFireStore from '../../hooks/useOrderFireStore';
import AdminWorkGrid from './AdminWorkGrid';
import UploadForm from './UploadForm';

const Overview = () => {

    const [imageDocs, setImageDocs] = useState([]);
    const [imageOrder, setImageOrder] = useState([]);
    const [actionDone, setActionDone] = useState(false);
    // const {  orderDocs, orderIds } = useOrderFireStore();

    useEffect(()=>{
        // after uploadForm, update product order
        // Watned addFireStore to do heavy works, but it slows down.
        let allIds = [];
        let allDocs = [];
        fireStoreRef.get().then((documents)=>{
            documents.forEach((doc)=>{
                allIds.push(doc.id)
                allDocs.push(doc.data())
            })
            setImageDocs([...allDocs])
        }).then(()=>{
            fireStoreOrderRef.doc('order').get().then((document)=>{
                if (document.data().orderIds){
                    const newOrderIds = [...document.data().orderIds]
                    allIds.forEach((id)=>{
                        if(!newOrderIds.includes(id)){
                            newOrderIds.push(id)
                        }
                    })
                    fireStoreOrderRef.doc('order').update({orderIds: [...newOrderIds]})
                    setImageOrder([...newOrderIds])

                } else {
                    fireStoreOrderRef.doc('order').update({orderIds: []});
                }
            }).then(()=>{
                setActionDone(false)
            })
        })
    }, [actionDone])

    return (
        <div>
            <UploadForm 
                setActionDone={setActionDone}
            />
            <AdminWorkGrid 
                imageDocs={imageDocs} 
                setImageDocs={setImageDocs}
                imageOrder={imageOrder}
                setImageOrder={setImageOrder}
                setActionDone={setActionDone}
            />
        </div>
    )
}

export default Overview;