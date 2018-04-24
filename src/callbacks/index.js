import emitError from './emit-error';
import toRoom from './to-room';
import toSocket from './to-socket';
import joinRoom from './join-room';
import leaveRoom from './leave-room';

export default (io, socket) => {
  const onError = emitError(socket);
  return ({
    toRoom: toRoom(io, socket),
    toSocket: toSocket(socket),
    onError,
    emitError: onError,
    joinRoom: joinRoom(socket),
    leaveRoom: leaveRoom(socket),
  });
};
