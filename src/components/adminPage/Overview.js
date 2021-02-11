import React, {useState, useEffect} from 'react';
import { fireStoreRef, fireStoreOrderRef } from '../../firebase/firebase';
import AdminWorkGrid from './AdminWorkGrid';
import UploadForm from './UploadForm';

const Overview = () => {

    const [imageDocs, setImageDocs] = useState([]);
    const [imageOrder, setImageOrder] = useState([]);
    const [actionDone, setActionDone] = useState(false); // Controls fireStore order upload

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
    
    return (
        <div className="flex-column">
            <UploadForm
                imageDocs={imageDocs}
                imageOrder={imageOrder}

                setImageDocs={setImageDocs}
                setImageOrder={setImageOrder}
                setActionDone={setActionDone}
            />
            <AdminWorkGrid 
                imageDocs={imageDocs} 
                imageOrder={imageOrder}
                
                setImageDocs={setImageDocs}
                setImageOrder={setImageOrder}
            />
        </div>
    )
}

export default Overview;