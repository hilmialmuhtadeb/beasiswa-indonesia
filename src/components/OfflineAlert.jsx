import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const OfflineAlert = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    function handleOfflineStatus() {
      setIsOffline(!navigator.onLine);
    }

    window.addEventListener('offline', handleOfflineStatus);
    window.addEventListener('online', handleOfflineStatus);

    return () => {
      window.removeEventListener('offline', handleOfflineStatus);
      window.removeEventListener('online', handleOfflineStatus);
    };
  }, []);

  if (isOffline) {
    return (
      <div className='bg-red-600 text-center text-white p-2'>
        You're currently offline. Please check your internet connection!
      </div>
    );
  }

  return null;
}

export default OfflineAlert