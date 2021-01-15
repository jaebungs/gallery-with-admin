import React, {useState, useEffect} from 'react';
import { fireStoreRef, fireStoreOrderRef } from '../../firebase/firebase';
import AdminWorkGrid from './AdminWorkGrid';
import UploadForm from './UploadForm';

const Overview = () => {

    const [imageDocs, setImageDocs] = useState([]);
    const [imageOrder, setImageOrder] = useState([]);
    const [actionDone, setActionDone] = useState(false);


    useEffect(()=>{
        let document = []
        let orderIdsArray = []
        fireStoreOrderRef.doc('order').get()
        .then((doc)=>{
            if (doc.data().orderIds && doc.data().orderIds.length > 0) {
                orderIdsArray = [...doc.data().orderIds] //array of strings
                setImageOrder(orderIdsArray)
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
            if (result){
                result.forEach((res) => {
                    // each object contains image data.
                    document.push({...res.data(), id: res.id})
                })
                setImageDocs([...document])
            }
        })
        .catch((err)=>{console.log('failed to get ordered images',err)})

    }, [actionDone])
    
    // useEffect(()=>{
    //     // after uploadForm, update product order
    //     // Watned addFireStore to do heavy works, but it slows down.
    //     let allIds = [];
    //     let allDocs = [];
    //     fireStoreRef.get().then((documents)=>{
    //         documents.forEach((doc)=>{
    //             allIds.push(doc.id)
    //             allDocs.push(doc.data())
    //         })
    //         setImageDocs([...allDocs])
    //     }).then(()=>{
    //         fireStoreOrderRef.doc('order').get().then((document)=>{
    //             if (document.data().orderIds){
    //                 let newOrderIds = [...document.data().orderIds]
    //                 allIds.forEach((id)=>{
    //                     if(!newOrderIds.includes(id)){
    //                         newOrderIds.push(id)
    //                     }
    //                 })
    //                 fireStoreOrderRef.doc('order').update({orderIds: [...newOrderIds]})
    //                 setImageOrder([...newOrderIds])

    //             } else {
    //                 fireStoreOrderRef.doc('order').update({orderIds: []});
    //             }
    //         }).then(()=>{
    //             setActionDone(false)
    //             console.log('Overview effect')
    //         })
    //     })

    // }, [actionDone])

    return (
        <div>
            <UploadForm
                imageDocs={imageDocs}
                imageOrder={imageOrder}

                setActionDone={setActionDone}
                setImageDocs={setImageDocs}
                setImageOrder={setImageOrder}
            />
            {/* <AdminWorkGrid 
                imageDocs={imageDocs} 
                setImageDocs={setImageDocs}
                imageOrder={imageOrder}
                setImageOrder={setImageOrder}
                setActionDone={setActionDone}
            /> */}
        </div>
    )
}

export default Overview;