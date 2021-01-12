import { storageRef, fireStoreRef, timeStamp } from '../firebase/firebase';

const addFireStore = (imageData) => {

    const delay = () => {
        setTimeout((resolve) => {
            resolve
        }, 400);
    }

    storageRef.child(imageData.name).put(imageData).on('state_changed', (snap)=>{
        // let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
    }, (err) =>{
        console.log('Storage upload fail', err)
    }, async ()=>{
        const url = await storageRef.child(imageData.name).getDownloadURL();
        const reference = fireStoreRef.doc();
        const refId = reference.id
        delay()
        reference.set({url, createdAt: timeStamp(), name: imageData.name, type: imageData.type, id: refId })
    })
}

export default addFireStore;