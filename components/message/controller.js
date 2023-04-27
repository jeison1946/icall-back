const store = require('./store');
const socket = require('../../socket').socket;

function addMessage(chat, user ,message, file) {
  return new Promise((resolve, reject) => {
    if(!chat || !user || !message) {
      console.error('[messageControlle] No hay usuario o mnesaje');
      return reject('los datos son incorrectos');
    }

    let fileUrl = '';
    if (file) {
      fileUrl = 'http://localhost:3000/app/files/' + file.filename
    }

    let fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl
    }
    
    store.add(fullMessage);
    socket.io.emit('message', fullMessage);
    resolve(fullMessage);
  });
}

function getMessage(filterChat) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterChat));
  });
}

function updateMessage(id, message)  {
  return new Promise(async (resolve, reject) => {
    if(!id || !message) {
      return reject('Invalid data'); 
    }

    const result = await store.update(id, message);
    resolve(result)
  });
}

function deleteMessage(id)  {
  return new Promise(async (resolve, reject) => {
    if(!id) {
      return reject('Invalid data'); 
    }

    const result = await store.delete(id);
    resolve(result)
  });
}

module.exports = {
  addMessage,
  getMessage,
  updateMessage,
  deleteMessage
}