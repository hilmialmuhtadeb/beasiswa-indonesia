import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../util/firebase"

async function pushNotification({ title, imageUrl, slug }) {
  await axios.post('https://beasiswa-indonesia-server.vercel.app/send', {
    title,
    body: 'Beasiswa baru telah ditambahkan, klik untuk melihat.',
    link: `http://localhost:3000/scholarships/${slug}`,
    imageUrl
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

async function addScholarship(scholarship) {
  const slug = scholarship.title.toLowerCase().replace(/ /g, "-")
  try {
    const payload = {
      ...scholarship,
      slug
    }
    const docRef = await addDoc(collection(db, "scholarship"), payload);
    pushNotification({
      title: scholarship.title,
      slug,
      imageUrl: null
    })
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
  const slug = scholarship.title.toLowerCase().replace(/ /g, "-")
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
          imagePath: `scholarship/${date}-${image.name}`,
          slug
        }
        const docRef = await addDoc(collection(db, "scholarship"), payload);
        pushNotification({
          title: scholarship.title,
          imageUrl: downloadURL,
          slug
        })
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
        scholarship = doc
      })
    })
  return scholarship
}

async function deleteScholasrhip(slug) {
  const scholarshipDoc = await getScholarshipBySlug(slug)
  const scholarship = scholarshipDoc.data()
  if (scholarshipDoc) {
    await deleteDoc(doc(db, "scholarship", scholarshipDoc.id))
    await deleteObject(ref(storage, scholarship.imagePath))
  }
}

export {
  getAllScholarships,
  getScholarshipBySlug,
  addScholarship,
  addScholarshipWithImage,
  deleteScholasrhip,
}