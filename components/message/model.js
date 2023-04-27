const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
  chat: {
    type: Schema.ObjectId,
    ref: 'Chat',
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    require: true
  },
  date: Date,
  file: String
});

function ObjectId(id) {
  return mongoose.Types.ObjectId(id);
}

const model = mongoose.model('Message', mySchema);
module.exports = {model, ObjectId};