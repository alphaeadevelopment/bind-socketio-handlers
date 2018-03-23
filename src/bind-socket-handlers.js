const forOwn = require('lodash/forOwn');

modules.exports = (io, socket, handlers) => {
  forOwn(handlers, (handler, event) => {
    socket.on(event, handler(io, socket));
  });
};
