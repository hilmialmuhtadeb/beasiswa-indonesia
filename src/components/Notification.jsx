import React, { useEffect, useState } from 'react'
import { onMessageListener } from '../features/messaging/push-notification';
import { Toaster, toast } from 'react-hot-toast';

const Notification = () => {
  const [notification, setNotification] = useState({title: '', body: ''});
  const notify = () =>  toast(<ToastDisplay/>); 
  function ToastDisplay() {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title ){
    notify()
    }
  }, [notification])

  onMessageListener()
    .then((payload) => {
      setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
    })
    .catch((err) => console.log('failed: ', err));

  return (
    <Toaster />
  )
}

export default Notification