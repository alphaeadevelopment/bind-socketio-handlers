import defaultCallbacks from './callbacks';

const callHandler = (io, socket, callbacks) => (event, handler) => {
  const fn = handler.call(null, callbacks, io, socket);
  return (payload) => {
    try {
      const rv = fn.call(null, payload);
      if (rv instanceof Promise && callbacks && callbacks.onError) {
        rv.catch(callbacks.onError);
      }
    }
    catch (e) {
      if (callbacks && callbacks.onError) callbacks.onError(e);
    }
  };
};

const bindHandler = (event, handler, socket, doCall) => {
  socket.on(event, doCall(event, handler));
};

const bindHandlers = (events, handlers, socket, doCall) => {
  if (events.length === 0) return;
  const event = events.slice(0, 1);
  bindHandler(event, handlers[event], socket, doCall);
  bindHandlers(events.slice(1), handlers, socket, doCall);
};

exports.default = (io, socket, handlers, callbacks) => {
  const mergedCallbacks = Object.assign({}, defaultCallbacks, callbacks);
  const doCall = callHandler(io, socket, mergedCallbacks);

  bindHandlers(Object.keys(handlers), handlers, socket, doCall);
};
