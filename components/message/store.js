const Model = require('./model');


function addMessage(message) {
  const myMessage = new Model.model(message);
  myMessage.save();
}

async function getMessage(filterChat) {
  return new Promise((resolve, reject) => {
    const filters = {};
    if(filterChat) {
      filters.chat =  Model.ObjectId(filterChat);
    }

    Model.model.aggregate([
      { $match: filters },
      { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'userLoad' } },
      { $unwind: '$userLoad'},
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, messages: { $push: "$$ROOT" } } },
      { $sort: { "_id": 1 } }
    ])
    .exec((error, populated) => {
      if(error) {
        reject(error)
      }
      resolve(populated);
    })
  });

}

async function updateText(id, message) {
  const findMessage = await Model.model.findById(id);
  findMessage.message = message;
  return await findMessage.save();
}

async function deleteMessage(id) {
  const findMessage = await Model.model.findById(id);
  return await findMessage.delete();
}

module.exports = {
  add: addMessage,
  list: getMessage,
  update: updateText,
  delete: deleteMessage
}