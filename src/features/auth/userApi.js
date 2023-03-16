import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage, uploadToStorage } from "../../util/firebase";

async function addUser(user) {
  try {
    const payload = {
      user_id: user.uid,
      email: user.email,
      name: user.displayName,
    }
    const docRef = await addDoc(collection(db, "user"), payload);
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function updateUserProfile(user) {
  const { avatar, resume } = user
  const userDoc = await getUserByEmail(user.email)
  const date = new Date().getTime().toString()
  
  if (avatar.name) {
    updateUserStorage({
      type: "avatar",
      file: avatar,
      path: `user/avatar/${date}-${avatar.name}`,
      user
    })
  }

  if (resume.name) {
    updateUserStorage({
      type: "resume",
      file: resume,
      path: `user/resume/${date}-${resume.name}`,
      user
    })
  }

  const userRef = doc(db, "user", userDoc.id);
  await updateDoc(userRef, user)
  return user
}

async function getUserByEmail(email) {
  let user = null
  await getDocs(query(collection(db, "user"), where("email", "==", email)))
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        user = doc
      })
    })
  return user
}

async function updateUserStorage({ type, file, path, user }) {
  const fileRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(fileRef, file);
  uploadTask.on("state_changed",
    null,
    null,
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        updateUserField(user, type, url)
      });
    }
  );
}

async function updateUserField(user, field, value) {
  const userDoc = await getUserByEmail(user.email)
  const userRef = doc(db, "user", userDoc.id);
  const payload = {
    [field]: value
  }
  await updateDoc(userRef, payload)
}

export {
  addUser,
  updateUserProfile,
  getUserByEmail
}