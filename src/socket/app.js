import sio from 'socket.io';

let _io;

export const connectSocketIo = server => {
  _io = sio(server, {
    origins: ["127.0.0.1:*"]
  });
};

export default () => _io;
