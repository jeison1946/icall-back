const statusMessage = {
  200: 'Done',
  201: 'Created',
  400: 'Invalid format',
  500: 'Internal error'
}

exports.success = function (req, res, message, status) {
  let statusCode = status;
  let statusMessage = message;
  if (!status) {
    statusCode = 200;
  }
  if (!message) {
    statusMessage = statusMessage[statusCode];
  }
  res.status(statusCode).send({
    'error': '',
    'message': message
  });
}

exports.error =  function (req, res, message, status, details) {
  let statusCode = status;
  let statusMessage = message;
  if (!status) {
    statusCode = 500;
  }
  if (!message) {
    statusMessage = statusMessage[statusCode];
  }
  console.log('[response error] '+ details);
  res.status(statusCode).send({
    'error': message,
    'message': ''
  });
}