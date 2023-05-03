const store = require('./store');
const validator = require('validator');

function addUser(data, imageFile) {
  const validate = validateModel(data);
  if(validate.status) {
    return Promise.reject(validate.message);
  }

  let fileUrl = '';
  if (imageFile) {
    fileUrl = 'http://localhost:3000/app/files/' + imageFile.filename
  }
  else {
    return Promise.reject('Ivalid field imageFile');
  }

  const user = {
    name: data.name,
    email: data.email,
    imageFile: fileUrl,
    info: data.info ? data.info : 'Estoy usando iCall'
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

function validateModel(data) {
  var error = {
    status: false,
    message: ''
  };
  const fields = [
    {
      field: 'name',
      type: 'string'
    },
    {
      field: 'email',
      type: 'email'
    },
  ];

  try {
    fields.forEach((item) => {
      if(!data[item.field]) {
        throw new Error('Ivalid field ' + item.field)
      }
      switch (item.type) {
        case 'email':
          if(!validator.isEmail(data.email)) {
            throw new Error('Error de formato email invalido')
          }
        break;
      }
    });
  } catch (e) {
    error = {
      status: true,
      message: e.message
    };
  }
  return error
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser
}