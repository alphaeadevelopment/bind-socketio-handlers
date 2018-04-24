

export default socket => roomName => new Promise((res, rej) => {
  try {
    socket.join(roomName);
    res();
  }
  catch (e) {
    rej(e);
  }
});
