import {storageRef, fireStoreRef, timeStamp} from '../firebase/firebase';

const addFireStore = (imageData) => {
  const reference = fireStoreRef.doc();
  const id = reference.id;
  const name = imageData.name;
  const type = imageData.type;
  let width;
  let height;
  // Get original width and height of file.
  let img = new Image();
  let fr = new FileReader();

  fr.onload = async function () {
    if (fr !== null) {
      img.src = fr.result;
    }
  };
  fr.readAsDataURL(imageData);

  img.onload = function () {
    width = img.width;
    height = img.height;
  };

  return new Promise((resolve) => {
    storageRef
      .child(imageData.name)
      .put(imageData)
      .on(
        'state_changed',
        (snap) => {},
        (err) => {
          console.log('Storage upload fail', err);
        },
        async () => {
          const url = await storageRef.child(imageData.name).getDownloadURL();

          reference.set({url, createdAt: timeStamp(), name, type, id, width, height});

          resolve({url, id, name, type, createdAt: timeStamp(), width, height});
        }
      );
  });
};

export default addFireStore;
