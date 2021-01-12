import React from 'react';
import { storageRef } from '../../firebase/firebase';
import addFireStore from '../../hooks/addFireStore';

const UploadForm = ({setActionDone}) => {

    const handleChange = (e) => {
        const filesToUpload = e.target.files; //object. not array!
        const allowedType = ['image/svg', 'image/png','image/jpg', 'image/jpeg']

        let storageImages= [];
        let promises = [];

        // get all image names(strings) in Storage.
        storageRef.listAll().then((result)=> {
            result.items.forEach((item) => {
                storageImages.push(item.name)
            })
        }).then(()=>{
            for (const file in filesToUpload){
                if (storageImages.includes(filesToUpload[file].name) === false && allowedType.includes(filesToUpload[file].type)){
                    promises.push(addFireStore(filesToUpload[file]));
                    storageImages.push(filesToUpload[file].name)
                }
            }
        }).then(()=>{
            Promise.all(promises).then(()=>{
                console.log('upload complete')
            }).catch((err)=>{
                console.log('upload fail', err)
            })
        }).then(()=>{
            setActionDone(true);
        })
        .catch((err)=>{
            console.log('upload fail', err)
        })
        
    }


    return (
        <form >
            <input type="file" onChange={handleChange} multiple />
            
            <div className="output">
                {/* {error && <div className="fileError">{ error }</div>}
                {files && <div className="fileSelected">{ files.name }</div>} */}
            </div>

        </form>
    )
}

export default UploadForm;