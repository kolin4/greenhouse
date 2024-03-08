import { io } from 'socket.io-client';
const serverPort = ':8000';

export const socket = io(serverPort);
