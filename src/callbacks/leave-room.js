
export default socket => roomName => new Promise((res, rej) => {
  try {
    socket.leave(roomName);
    res();
  }
  catch (e) {
    rej(e);
  }
});
