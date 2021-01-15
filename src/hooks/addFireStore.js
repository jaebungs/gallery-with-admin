import { storageRef, fireStoreRef, fireStoreOrderRef, timeStamp } from '../firebase/firebase';

const addFireStore = (imageData) => {
    const reference = fireStoreRef.doc();
    const id = reference.id
    const name = imageData.name;
    const type = imageData.type;

    // ahhhh sigh finally return with url value!
    return new Promise ((resolve) => {
        storageRef.child(imageData.name).put(imageData).on('state_changed', (snap)=>{
            // let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        }, (err) =>{
            console.log('Storage upload fail', err)
        }, async ()=>{
            const url = await storageRef.child(imageData.name).getDownloadURL();
    
            reference.set({ url, createdAt: timeStamp(), name, type, id })
    
            resolve({ url, id, name, type })
        })    
    })
}

export default addFireStore;