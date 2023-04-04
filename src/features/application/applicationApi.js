import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getUserFromDecodeToken, transformEmailToUsername } from "../../util/auth";
import { db } from "../../util/firebase"
import { getUserByEmail } from "../auth/userApi";
import { getScholarshipBySlug, pushNotification } from "../scholarship/scholarshipApi";

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
      createdAt: new Date().toString(),
    }
    await addDoc(collection(db, "application"), payload);
    return payload
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

async function getUserApplications() {
  const authUser = getUserFromDecodeToken()
  const applicationsRef = await getDocs(query(collection(db, "application"), where("user.email", "==", authUser.email)))
  const applications = applicationsRef.docs.map(doc => doc.data())
  return applications
}

async function getApplicationById(id) {
  return await getDoc(doc(db, "application", id))
    .then(doc => {
      return doc.data()
    })
}

async function rejectApplication(id, options) {
  const { email } = options
  const topic = transformEmailToUsername(email)
  await updateDoc(doc(db, "application", id), {
    status: "Ditolak",
    statusCode: 0,
    isFinal: true
  })
  pushNotification({
    title: 'Status Pengaajuan Anda Diperbarui, Silahkan Cek!',
    body: 'klik untuk melihat status pengajuan anda',
    link: 'https://beasiswa-indonesia.netlify.app/applications',
    imageUrl: null,
    topic
  })
}

async function proceedApplication(id, payload, options) {
  const { email } = options
  const topic = transformEmailToUsername(email)
  await updateDoc(doc(db, "application", id), payload)
  pushNotification({
    title: 'Status Pengaajuan Anda Diperbarui, Silahkan Cek!',
    body: 'klik untuk melihat status pengajuan',
    link: 'https://beasiswa-indonesia.netlify.app/applications',
    imageUrl: null,
    topic
  })
}

async function isAuthUserApplied(slug) {
  const authUser = getUserFromDecodeToken()
  const applicationsRef = await getDocs(query(collection(db, "application"), where("user.email", "==", authUser.email)))
  const applications = applicationsRef.docs.map(doc => doc.data())
  return applications.some(app => app.scholarship.slug === slug)
}

async function isAuthUserEligible() {
  const authUser = getUserFromDecodeToken()
  const user = await getUserByEmail(authUser.email)
  if (user.data().resume) {
    return true
  }
  return false
}

export {
  addApplication,
  isAuthUserApplied,
  getAllApplications,
  getApplicationById,
  rejectApplication,
  proceedApplication,
  getUserApplications,
  isAuthUserEligible
}