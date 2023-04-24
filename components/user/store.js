const Model = require('./model');

function addUser(user) {
  const newUser = new Model(user);
  return newUser.save();
}

async function getUser(filter) {
  const filters = {};
  if(filter && filter.email) {
    filters.email = {
      $regex: filter.email,
      $options: 'i'
    }
  }

  if(filter && filter.excluid_user) {
    filters._id = {
      $nin: [filter.excluid_user]
    }
  }
  return await Model.find(filters).limit(10);
}

async function updateUser(id, name) {
  const findUser = await Model.findById(id);
  findUser.name = name;
  return await findUser.save();
}

async function deleteUser(id) {
  const findUser = await Model.findById(id);
  return await findUser.delete();
}


module.exports = {
  add: addUser,
  list: getUser,
  update: updateUser,
  delete: deleteUser,
}