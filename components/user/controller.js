const store = require('./store');
const validator = require('validator');

function addUser(data) {
  if(!data.name) {
    return Promise.reject('Ivalid field name');
  }

  if(!data.email || !validator.isEmail(data.email)) {
    return Promise.reject('Ivalid field email');
  }

  const user = {
    name: data.name,
    email: data.email
  }
  return store.add(user);
}

function getUser(filter) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filter));
  });
}

function updateUser(id, data)  {
  return new Promise(async (resolve, reject) => {
    if(!id || !data.name) {
      return reject('Invalid data'); 
    }

    const result = await store.update(id, data.name);
    resolve(result)
  });
}

function deleteUser(id)  {
  return new Promise(async (resolve, reject) => {
    if(!id) {
      return reject('Invalid data'); 
    }

    const result = await store.delete(id);
    resolve(result)
  });
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser
}