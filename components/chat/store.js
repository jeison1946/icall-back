const Model = require('./model');

function createdChat(chats){
  const newUser = new Model(chats);
  return newUser.save();
}

 function getChat(filterUser) {
  return new Promise((resolve, reject) => {
    const filters = {};
    if(filterUser) {
      filters.users = filterUser;
    }
    Model.find(filters)
      .populate('users')
      .exec((error, populated) => {
        if(error) {
          reject(error)
        }
        resolve(populated);
      })
  });
}

module.exports = {
  add: createdChat,
  list: getChat
}