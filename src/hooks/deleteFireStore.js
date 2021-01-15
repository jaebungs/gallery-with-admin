import { storageRef, fireStoreRef, fireStoreOrderRef } from '../firebase/firebase';

const deleteFireStore =  (id, name) => {
    storageRef.child(name).delete(); //Delete image file in Storage
    fireStoreRef.doc(id).delete(); //Delete image file in Cloud

    // Get orderIds first, then delete by id, lastly update.
    // Could send imageOrder instead of sending request.
    fireStoreOrderRef.doc('order').get().then((order)=>{
        let newOrderIds = [...order.data().orderIds];
        let index = newOrderIds.indexOf(id);

        newOrderIds.splice(index, 1);

        fireStoreOrderRef.doc('order').update({orderIds: [...newOrderIds]})
    })
}

export default deleteFireStore;