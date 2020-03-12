import sio from 'socket.io';

let _io;

export const connectSocketIo = server => {
  _io = sio(server, {});
};

export default () => _io;
