import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../util/firebase"

async function addScholarship(scholarship) {
  try {
    const payload = {
      ...scholarship,
      slug: scholarship.title.toLowerCase().replace(/ /g, "-"),
    }
    const docRef = await addDoc(collection(db, "scholarship"), payload);
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function addScholarshipWithImage(scholarship) {
  const { image } = scholarship
  const date = new Date().getTime().toString()
  const storageRef = ref(storage, `scholarship/${date}-${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        const payload = {
          ...scholarship,
          image: downloadURL,
          slug: scholarship.title.toLowerCase().replace(/ /g, "-"),
        }
        const docRef = await addDoc(collection(db, "scholarship"), payload);
        return docRef
      });
    }
  );
}

async function getAllScholarships() {
  const scholarships = []
  await getDocs(collection(db, "scholarship"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        scholarships.push(doc.data())
      })
    })
  return scholarships
}

async function getScholarshipBySlug(slug) {
  let scholarship = null
  await getDocs(query(collection(db, "scholarship"), where("slug", "==", slug)))
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        scholarship = doc.data()
      })
    })
  return scholarship
}

export {
  getAllScholarships,
  getScholarshipBySlug,
  addScholarship,
  addScholarshipWithImage,
}