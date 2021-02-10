import React,{useState, useEffect} from 'react';
import {fireStoreOrderRef} from '../../firebase/firebase';
import addFireStore from '../../hooks/addFireStore';

const UploadForm = ({setActionDone, imageDocs, imageOrder, setImageDocs, setImageOrder}) => {

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    e.stopPropagation();

    const filesToUpload = e.target.files; //object. not array!
    const allowedType = ['image/svg', 'image/png', 'image/jpg', 'image/jpeg'];
    let storageImages = []; // reference for existing file names 
    let promises = [];
    let newImageDocs = [];
    let newOrderIds = [];
    imageDocs.forEach((doc) => {
      storageImages.push(doc.name);
    });
  
    for (const file in filesToUpload) {
      // Error handling. duplicate name and unacceptable file types.
      if (filesToUpload[file].type) { // I gotta fix why this forloop fires 3 times and last 2 are undefined..
        if (storageImages.includes(filesToUpload[file].name)){
          setError('Duplicate file name. Please Change your file name.');
        } 
        if (!allowedType.includes(filesToUpload[file].type)) {
          setError('Unacceptable file type. Only svg, png, jpg and jpeg are allowed.');
          
        }
        if (
          !storageImages.includes(filesToUpload[file].name) &&
          allowedType.includes(filesToUpload[file].type)
        ) {
          promises.push(addFireStore(filesToUpload[file]));
          setError(false)
        }
      }
      

    }

    Promise.all(promises)
      .then((result) => {
        // result is array of objects {id,url,name...}
        if (imageOrder.length > 0) {
          // copy prev images and order and add here to update.
          newImageDocs = [...imageDocs];
          newOrderIds = [...imageOrder];
        }
        for (const addFile in result) {
          newOrderIds.push(result[addFile].id);
          newImageDocs.push(result[addFile]);
        }
        setImageOrder(newOrderIds);
        setImageDocs(newImageDocs);
        fireStoreOrderRef.doc('order').update({orderIds: newOrderIds});
      })
      .then(() => {
        setActionDone(true);
      })
      .catch((err) => {
        console.log('upload fail', err);
      });
  };

  return (
    <form className="add-file-form">
      <input type="file" onChange={(e)=>handleChange(e)} multiple />

      <div className="output">
        {error && <div className="fileError">{ error }</div>}
        {/* {files && <div className="fileSelected">{ files.name }</div>} */}
      </div>
    </form>
  );
};

export default UploadForm;
