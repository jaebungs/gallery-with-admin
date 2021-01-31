import {storageRef, fireStoreRef, fireStoreOrderRef} from '../firebase/firebase';

const deleteFireStore = (id, name, imageOrder) => {
  storageRef.child(name).delete(); //Delete image file in Storage
  fireStoreRef.doc(id).delete(); //Delete image file in Cloud

  let newOrderIds = [...imageOrder];
  let index = newOrderIds.indexOf(id);
  newOrderIds.splice(index, 1);

  fireStoreOrderRef.doc('order').update({orderIds: [...newOrderIds]});
};

export default deleteFireStore;
