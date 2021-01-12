import { useState, useEffect } from 'react';
import { fireStore } from '../firebase/firebase';

const useFireStore = (collection) => {
    const [docs, setDocs] = useState([]);
    const [orderId, setOrderId] = useState();
    
    useEffect(()=>{
        const unsub = fireStore.collection(collection)
            // .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let document = [];
                let currentOrder = null;
                snap.forEach(doc => {
                    if(doc.id !== 'orderId'){
                        // doc is object
                        document.push({ ...doc.data(), id: doc.id });
                    } else if(doc.id === 'orderId'){
                        currentOrder= [...doc.data().order]
                    }
                });
                setDocs(document);
                setOrderId(currentOrder);
            });

        // unsubscribe when realtime is not needed (clean up function)
        return () => unsub();

    }, [collection])

    return { docs, orderId };
}

export default useFireStore;