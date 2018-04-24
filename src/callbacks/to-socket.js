

export default socket => (type, payload) => new Promise((res, rej) => {
  try {
    socket.emit(type, payload);
    res();
  }
  catch (e) {
    rej(e);
  }
});
