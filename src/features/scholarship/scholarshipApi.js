import { collection, getDocs } from "firebase/firestore";
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

export {
  getAllScholarships,
}