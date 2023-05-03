const express = require('express');
const response =  require('../../network/response');
const multer = require('multer');
const router = express.Router();
const controller = require('./controller');

const upload = multer({
  dest: 'public/files/'
});

router.get('/', function(req, res) {
  const filter = req.query || null;
  controller.getUser(filter)
    .then((userList) => {
      response.success(req, res, userList);
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    })
});

router.post('/', upload.single('imageFile'), function(req, res) {
  controller.addUser(req.body, req.file)
    .then((fullUser) => {
      response.success(req, res, fullUser, 201);
    })
    .catch(e => {
      response.error(req, res, 'Información invalida', 400, e)
    })
});

router.patch('/:id', function (req, res) {
  controller.updateUser(req.params.id, req.body)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    });
});

router.delete('/:id', function (req, res) {
  controller.deleteUser(req.params.id)
    .then((result) => {
      response.success(req, res, `Se ha eliminado con exito el usuario ${req.params.id}`, 200);
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    });
});

module.exports = router;