const express = require('express');
const response =  require('../../network/response');
const user = require('../../services/user/userService')
const router = express.Router();
const controller = require('./controller');

router.post('/', function(req, res) {
  controller.createdChat(req.body)
    .then((fullChat) => {
      response.success(req, res, fullChat, 201);
    })
    .catch(e => {
      response.error(req, res, 'Información invalida', 400, 'Error en el controlador de chat')
    })
});

router.get('/', function(req, res) {
  user.validateUser(req, res).then((status) => {
    if (status) {
      const filterUser = req.query.user || null;
    controller.getChat(filterUser)
      .then((chatList) => {
        response.success(req, res, chatList);
      })
      .catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
      });
    }
  });
  /* if(user.validateUser(req, res) instanceof Promise) {
    const filterUser = req.query.user || null;
    controller.getChat(filterUser)
      .then((chatList) => {
        response.success(req, res, chatList);
      })
      .catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
      });
    } */
});

module.exports = router;