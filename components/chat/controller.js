const store = require('./store');

function createdChat(data) {
  if(!data.users || !Array.isArray(data.users)) {
    return Promise.reject('Ivalid Users');
  }

  const newChat = {
    users: data.users
}

  return store.add(newChat);
}

function getChat(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

module.exports = {
  createdChat,
  getChat
}