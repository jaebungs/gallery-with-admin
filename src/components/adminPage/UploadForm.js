import React from 'react';
import { storageRef, fireStoreOrderRef } from '../../firebase/firebase';
import addFireStore from '../../hooks/addFireStore';

const UploadForm = ({setActionDone, imageDocs, imageOrder, setImageDocs , setImageOrder}) => {

    const handleChange = (e) => {
        const filesToUpload = e.target.files; //object. not array!
        const allowedType = ['image/svg', 'image/png','image/jpg', 'image/jpeg']

        let storageImages= [];
        let promises = [];
        let newImageDocs = [];
        let newOrderIds = [];

        imageDocs.forEach((doc)=>{
            storageImages.push(doc.name)
        })

        for (const file in filesToUpload){
            if (!storageImages.includes(filesToUpload[file].name) && allowedType.includes(filesToUpload[file].type)){
                promises.push(addFireStore(filesToUpload[file]));
                storageImages.push(filesToUpload[file].name)
            }
        }

        Promise.all(promises).then((result)=>{
            // result is array of objects {id,url,name etc}
            if (imageOrder.length > 0) {
                newImageDocs = [...imageDocs]
                newOrderIds = [...imageOrder];
            }
            for (const addFile in result) {
                newOrderIds.push(result[addFile].id)
                newImageDocs.push(result[addFile])
            }
            setImageOrder(newOrderIds)
            setImageDocs(newImageDocs)
            fireStoreOrderRef.doc('order').update({orderIds: newOrderIds})
        }).then(()=>{
            setActionDone(true);
        })
        .catch((err)=>{
            console.log('upload fail', err)
        })

    }


    return (
        <form className="add-file-form">
            <input type="file" onChange={handleChange} multiple />
            
            <div className="output">
                {/* {error && <div className="fileError">{ error }</div>}
                {files && <div className="fileSelected">{ files.name }</div>} */}
            </div>

        </form>
    )
}

export default UploadForm;