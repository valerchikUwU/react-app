import { useState, useEffect } from 'react';


function useNetwork() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleNetworkStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleNetworkStatusChange);
    window.addEventListener('offline', handleNetworkStatusChange);

    return () => {
      window.removeEventListener('online', handleNetworkStatusChange);
      window.removeEventListener('offline', handleNetworkStatusChange);
    };
  }, []);

  return isOnline;
}

export default useNetwork;
