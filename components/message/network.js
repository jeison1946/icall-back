const express = require('express');
const multer = require('multer');
const response =  require('../../network/response');
const router = express.Router();
const controller = require('./controller');

const upload = multer({
  dest: 'public/files/'
});


router.get('/', function(req, res) {
  const filterChat = req.query.chat || null;
  controller.getMessage(filterChat)
    .then((messageList) => {
      response.success(req, res, messageList);
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    })
});

router.post('/', upload.single('file'), function(req, res) {
  controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch(e => {
      response.error(req, res, 'Información invalida', 400, 'Error en el controlador de mensaje')
    })
});

router.patch('/:id', function (req, res) {
  controller.updateMessage(req.params.id, req.body.message)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    });
});

router.delete('/:id', function (req, res) {
  controller.deleteMessage(req.params.id)
    .then((result) => {
      response.success(req, res, `Se ha eliminado con exito el usuario ${req.params.id}`, 200);
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    });
});

module.exports = router;