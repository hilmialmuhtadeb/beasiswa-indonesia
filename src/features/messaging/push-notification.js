import axios from "axios";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../util/firebase";

function requestPermission() {
  Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      console.log('masuk granted');
      const messaging = getMessaging()
      const token = await getToken(messaging, {
        vapidKey: 'BDcy6eVBfpMiNQ0FKHi4vpUCHHrPo7R6aEp_EEFw_aMiOJuDjVZst5B5pnE-poqsPhe4BnmBeK1ivqXfsw93DUI'
      })
      console.log(token);
      await axios.post('https://beasiswa-indonesia-server.vercel.app/subscribe', {
        token
      })
      console.log('subscribing to push notifications');
      return token;
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

function onMessageListener () {
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  })
};

export {
  requestPermission,
  onMessageListener
}