import { useEffect, useState } from 'react';
import { fireStore, fireStoreRef, fireStoreOrderRef } from '../firebase/firebase';

const useOrderFireStore = () => {

    const [orderDocs, setOrderDocs] = useState([]);
    const [orderIds, setOrderIds] = useState([]);

    let document = [];
    let orderIdsArray = [];

    useEffect(()=>{
        // get orderIds array from firebase
        fireStoreOrderRef.doc('order').get()
        .then((doc)=>{
            if (doc.data().orderIds) {
                orderIdsArray = [...doc.data().orderIds] //array of strings
                setOrderIds([orderIdsArray])
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
            setOrderDocs(document)
        })
        .catch((err)=>{console.log('failed to get ordered images',err)})


    }, [])

    return { orderDocs };

}

export default useOrderFireStore;