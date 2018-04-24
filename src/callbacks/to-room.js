

export default (io, socket) => roomName => (type, payload = {}, sendToSelf = false) => new Promise((res, rej) => {
  try {
    if (sendToSelf) io.to(roomName).emit(type, payload);
    else socket.broadcast.to(roomName).emit(type, payload);
    res();
  }
  catch (e) {
    rej(e);
  }
});
