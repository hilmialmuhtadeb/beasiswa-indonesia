import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../util/firebase"
import { toast } from "react-hot-toast";

async function pushNotification(options) {
  axios.post('https://beasiswa-indonesia-server.vercel.app/send', options, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status === 200) {
      toast('Notifikasi berhasil dikirim', {
        icon: '👍',
      })
    }
  }).catch(err => {
    toast('Notifikasi gagal dikirim', {
      icon: '👎',
    })
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
      title: 'Beasiswa baru tersedia, cek sekarang!',
      body: scholarship.title,
      link: `https://beasiswa-indonesia.netlify.app/scholarships/${slug}`,
      imageUrl: null,
      topic: 'beasiswa-indonesia'
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
          title: 'Beasiswa baru tersedia, cek sekarang!',
          body: scholarship.title,
          link: `https://beasiswa-indonesia.netlify.app/scholarships/${slug}`,
          imageUrl: downloadURL,
          topic: 'beasiswa-indonesia'
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
  pushNotification
}