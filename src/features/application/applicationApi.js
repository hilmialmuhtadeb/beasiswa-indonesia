import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../util/firebase"

async function addApplication(user, scholarship) {
  try {
    const userPayload = {
      email: user.email,
      name: user.name
    }
    const payload = {
      user: userPayload,
      scholarship
    }
    const docRef = await addDoc(collection(db, "application"), payload);
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export {
  addApplication
}