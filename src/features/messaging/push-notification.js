import axios from "axios";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { db, messaging } from "../../util/firebase";
import { getUserFromDecodeToken, transformEmailToUsername } from "../../util/auth";
import { toast } from "react-hot-toast";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

async function requestPermission() {
  Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      const messaging = getMessaging()
      const { email = '' } = getUserFromDecodeToken()
      const token = await getToken(messaging, {
        vapidKey: 'BDcy6eVBfpMiNQ0FKHi4vpUCHHrPo7R6aEp_EEFw_aMiOJuDjVZst5B5pnE-poqsPhe4BnmBeK1ivqXfsw93DUI'
      })
      await axios.post('https://beasiswa-indonesia-server.vercel.app/subscribe', { 
        token,
        topic: 'beasiswa-indonesia'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (email) {
        const topic = transformEmailToUsername(email)
        await axios.post('https://beasiswa-indonesia-server.vercel.app/subscribe', { 
          token,
          topic
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      toast.success('Anda akan menerima notifikasi.')
      console.log(token);
      return token;
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

async function unsubscribe() {
  const messaging = getMessaging()
  const token = await getToken(messaging, {
    vapidKey: 'BDcy6eVBfpMiNQ0FKHi4vpUCHHrPo7R6aEp_EEFw_aMiOJuDjVZst5B5pnE-poqsPhe4BnmBeK1ivqXfsw93DUI'
  })
  
  const { email = '' } = getUserFromDecodeToken()
  const username = transformEmailToUsername(email)
  const tokens = await getAllDeviceTokenFromUser(username)

  axios.post('https://beasiswa-indonesia-server.vercel.app/unsubscribe', { 
    token: tokens || token,
    topic: 'beasiswa-indonesia'
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (email) {
    await axios.post('https://beasiswa-indonesia-server.vercel.app/unsubscribe', { 
      token: tokens || token,
      topic: username
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  toast.success('Berhasil berhenti menerima notifikasi.')

  if (tokens.length > -`0`) {
    tokens.forEach(t => {
      deleteTokenFromDb(t)
    })
  }
}

async function deleteTokenFromDb(token) {
  const querySnapshot = await getDocs(query(collection(db, "subscription"), where("token", "==", token)))
  querySnapshot.forEach(async (document) => {
    await deleteDoc(doc(db, "subscription", document.id))
  })
}

async function isThisDeviceSubscibed() {
  const messaging = getMessaging()
  const token = await getToken(messaging, {
    vapidKey: 'BDcy6eVBfpMiNQ0FKHi4vpUCHHrPo7R6aEp_EEFw_aMiOJuDjVZst5B5pnE-poqsPhe4BnmBeK1ivqXfsw93DUI'
  })
  const querySnapshot = await getDocs(query(collection(db, "subscription"), where("token", "==", token)))
  return querySnapshot.docs.length > 0
}

async function getAllDeviceTokenFromUser(username) {
  const querySnapshot = await getDocs(query(collection(db, "subscription"), where("topic", "==", username)))
  return querySnapshot.docs.map(doc => doc.data().token)
}

function onMessageListener () {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("[onMessage] received new push notif:  ", payload)
      resolve(payload);
    });
  })
};

export {
  requestPermission,
  unsubscribe,
  isThisDeviceSubscibed,
  onMessageListener
}