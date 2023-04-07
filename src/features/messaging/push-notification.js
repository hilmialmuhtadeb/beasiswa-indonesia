import axios from "axios";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../util/firebase";
import { getUserFromDecodeToken, transformEmailToUsername } from "../../util/auth";
import { toast } from "react-hot-toast";

function requestPermission() {
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
  onMessageListener
}