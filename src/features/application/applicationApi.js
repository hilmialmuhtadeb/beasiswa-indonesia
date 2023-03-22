import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getUserFromDecodeToken } from "../../util/auth";
import { db } from "../../util/firebase"
import { getUserByEmail } from "../auth/userApi";
import { getScholarshipBySlug } from "../scholarship/scholarshipApi";

async function addApplication(email, slug) {
  const userDoc = await getUserByEmail(email)
  const scholarshipDoc = await getScholarshipBySlug(slug)

  try {
    const payload = {
      user: userDoc.data(),
      scholarship: scholarshipDoc.data(),
      status: "Dalam antrian review",
      statusCode: 1,
      isFinal: false,
    }
    const docRef = await addDoc(collection(db, "application"), payload);
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getAllApplications() {
  const applications = []
  await getDocs(collection(db, "application"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc, idx) => {
        applications.push({
          ...doc.data(),
          id: doc.id,
        })
      })
    })
  return applications
}

async function getApplicationById(id) {
  return await getDoc(doc(db, "application", id))
    .then(doc => {
      return doc.data()
    })
}

async function rejectApplication(id) {
  await updateDoc(doc(db, "application", id), {
    status: "Ditolak",
    statusCode: 0,
    isFinal: true
  })
}

async function proceedApplication(id, payload) {
  await updateDoc(doc(db, "application", id), payload)
}

async function isAuthUserApplied(slug) {
  const authUser = getUserFromDecodeToken()
  const applicationsRef = await getDocs(query(collection(db, "application"), where("user.email", "==", authUser.email)))
  const applications = applicationsRef.docs.map(doc => doc.data())
  return applications.some(app => app.scholarship.slug === slug)
}

export {
  addApplication,
  isAuthUserApplied,
  getAllApplications,
  getApplicationById,
  rejectApplication,
  proceedApplication,
}