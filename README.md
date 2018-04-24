# bind-socketio-handlers

## Overview
On each client connection to a socket.io server, this library binds events received on the client socket to handler functions.

It also provides convenient helper methods to those helper functions.

## Usage

```javascript
// handlers.js
export const sayHello = (callbacks, io, socket) => // handle event
```

```javascript
// express.js
import express from 'express';
import socketIo from 'socket.io';
import bindSocketIoHandlers from 'bind-socketio-handlers';
import * as handlers from './handlers';

const onClientConnect = io => socket => {
  bindSocketIoHandlers(io, socket, handlers);
};

const app = express();
const io = socketIo(app);
io.on('connection', onClientConnect(io));
```

## Callbacks

The `callbacks` object passed to each handler contains some helper functions:

```javascript
{
  toSocket(event, payload),
  toRoom(roomName)(event, payload),
  joinRoom(roomName),
  leaveRoom(roomName),
  emitError(e, parameters),
  onError(e, parameters), // alias for emitError
}
```

All default callback functions return a promise that resolve to undefined.

You can extend or over-write these callbacks by passing an object of named callback functions to `bindSocketIoHandlers`:

```javascript
  const myCallbacks = (socket) => ({
    sayHiBack: () => socket.emit('Hi, back.'),
  });
  bindSocketIoHandlers(io, socket, handlers, myCallbacks(socket));
```

These methods will then be accessible along with the default callbacks in your handler function:

```javascript
// handlers.js
export const sayHello = ({ sayHi }) => sayHi();
```

## Error handling
If your handler returns a promise that rejects, or if it throws an error, the client socket will be sent an event of type `'applicationError'`, with the error message as a payload:

```javascript
// handlers.js
export const sayHello = ({ sayHi }) => Promise.reject(new Error('not today, thanks'));
```
will result in:
```javascript
socket.emit('applicationError', { message: 'not today, thanks' });
```
