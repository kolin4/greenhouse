import { socket } from './socket-io';
import { useState, useEffect } from 'react';

export const CurrentStatus = ({ isConnected }) => {
  const [currentData, setCurrentData] = useState({
    temperature: 0,
    humidity: 0,
  });

  useEffect(() => {
    socket.on('data', (data) => {
      console.log('DATA', data);
      setCurrentData(data);
    });

    return () => socket.off('data');
  });

  return (
    <header className="App-header">
      <h5>Status: {isConnected ? 'connected' : 'disconnected'}</h5>
      <h5>Temperature: {currentData.temperature}C</h5>
      <h5>Humidity: {currentData.humidity}%</h5>
    </header>
  );
};
