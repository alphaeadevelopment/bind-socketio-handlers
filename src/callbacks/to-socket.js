

export default socket => (type, payload) => new Promise((res, rej) => {
  try {
    console.log('send %s to socket with payload %o', type, payload);
    socket.emit(type, payload);
    res();
  }
  catch (e) {
    rej(e);
  }
});
