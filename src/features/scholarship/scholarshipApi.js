import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../util/firebase"

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

export {
  getAllScholarships,
  getScholarshipBySlug,
  addScholarship
}