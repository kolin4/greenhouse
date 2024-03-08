import { socket } from './socket-io';
import { useState, useEffect } from 'react';
import { CurrentStatus } from './CurrentStatus';

export const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    return () => {
      socket.off('connect', () => setIsConnected(false));
      socket.off('disconnect', () => setIsConnected(false));
    };
  }, []);

  return (
    <div className="App">
      <CurrentStatus isConnected={isConnected} />
    </div>
  );
};

export default App;
