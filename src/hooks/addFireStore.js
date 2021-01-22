import { storageRef, fireStoreRef, fireStoreOrderRef, timeStamp } from '../firebase/firebase';

const addFireStore = (imageData) => {
    const reference = fireStoreRef.doc();
    const id = reference.id
    const name = imageData.name;
    const type = imageData.type;

    return new Promise ((resolve) => {
        storageRef.child(imageData.name).put(imageData).on('state_changed', (snap)=>{
        }, (err) =>{
            console.log('Storage upload fail', err)
        }, async ()=>{
            const url = await storageRef.child(imageData.name).getDownloadURL();
    
            reference.set({ url, createdAt: timeStamp(), name, type, id })
    
            resolve({ url, id, name, type, createdAt: timeStamp() })
        })    
    })
}

export default addFireStore;