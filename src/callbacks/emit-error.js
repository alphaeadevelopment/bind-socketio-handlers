import toSocket from './to-socket';

export default socket => (e = {}, parameters = {}) => {
  if (e.trace) console.error(e.trace);
  if (e.stack) console.error(e.stack);
  return toSocket(socket)('applicationError', { message: e.message, parameters });
};
