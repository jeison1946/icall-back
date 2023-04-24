const { populate } = require('./model');
const Model = require('./model');

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessage(filterChat) {
  return new Promise((resolve, reject) => {
    const filters = {};
    if(filterChat) {
      filters.chat = filterChat;
    }
    Model.find(filters)
      .populate('user')
      .exec((error, populated) => {
        if(error) {
          reject(error)
        }
        resolve(populated);
      })
  });

}

async function updateText(id, message) {
  const findMessage = await Model.findById(id);
  findMessage.message = message;
  return await findMessage.save();
}

async function deleteMessage(id) {
  const findMessage = await Model.findById(id);
  return await findMessage.delete();
}

module.exports = {
  add: addMessage,
  list: getMessage,
  update: updateText,
  delete: deleteMessage
}