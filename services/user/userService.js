const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('711389757233-2qma15neni4dcdu3mlkdt8crlgr0foup.apps.googleusercontent.com');
exports.validateUser = async function(req, res) {
  let response = false;
  const authHeader = req.headers['authorization'];
  const token = getToken(authHeader);
  try {
    if (token) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '711389757233-2qma15neni4dcdu3mlkdt8crlgr0foup.apps.googleusercontent.com'
      })
      response = ticket.getPayload();
    }
    else {
      throw new Error('token invalid');
    }
  } catch (error) {
    res.status(401).send({
      'error': '',
      'message': 'Access denied'
    });
    console.log('[response error]'+ error.message);
  }

  return response;
}

getToken = function(authHeader) {
  let token = atob(authHeader.split(' ')[1]);
  if(token)
  if (token.split('.').length !== 3) {
    return false;
  }
  return token;
}