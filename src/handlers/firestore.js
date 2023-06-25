import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";

const Firebase = {
  readDocs: (...args) => {
    const [collectionName] = args;
    let docs = [];
    const ref = collection(db, collectionName || "stocks");
    return new Promise(async (resolve) => {
      try {
        const docsSnapshot = await getDocs(ref);
        docsSnapshot.forEach((doc) => {
          const d = { ...doc.data(), id: doc.id };
          docs.push(d);
        });
        resolve(docs);
      } catch (error) {
        console.log(error);
      }
    });
  },

  readDoc: (...args) => {
    const [id] = args;
    const ref = doc(db, "stocks", id);

    return new Promise(async (resolve) => {
      try {
        const docsSnapshot = await getDoc(ref);
        if (docsSnapshot.exists()) {
          const item = docsSnapshot.data();
          resolve({ ...item, id });
        } else {
          console.log("Falid");
        }
      } catch (error) {
        console.log(error);
      }
    });
  },

  updateDoc: (...args) => {
    const [inputs, id] = args;
    const ref = doc(db, "stocks", id);

    return new Promise(async (resolve) => {
      try {
        await updateDoc(ref, {
          title: inputs.title,
          path: inputs.path,
          body: inputs.body,
          user: inputs.user,
          createdAt: inputs.createdAt,
          updatedAt: serverTimestamp(),
        });
        resolve("The doc updated successfully");
      } catch (error) {
        console.log(error);
      }
    });
  },

  writeDoc: (...args) => {
    const [inputs, collectionName] = args;

    return new Promise(async (resolve) => {
      const mathRandom = Math.floor(Math.random() * 1000000);
      try {
        const docRef = doc(db, collectionName || "stocks", `${mathRandom}`);
        await setDoc(docRef, {
          title: inputs.title,
          path: inputs.path,
          body: inputs.body,
          user: inputs.user,
          createdAt: serverTimestamp(),
        });
        resolve("New doc uploaded successfully");
      } catch (error) {
        console.log(error);
      }
    });
  },
};

export default Firebase;
