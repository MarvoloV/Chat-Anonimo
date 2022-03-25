import { useState, useEffect } from 'react';

const useBroadcastChannel = (channel) => {
  const [broadcast, setBroadcast] = useState(null);

  useEffect(() => {
    const bc = new BroadcastChannel(channel);
    setBroadcast(bc);

    return () => {
      bc.close();
    };
  }, [channel]);

  return broadcast;
};
export default useBroadcastChannel;
