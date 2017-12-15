const express = require('express');
const app = express();

module.exports = app => {
  const email = require('../controllers/email.js');

  /**** EMAIL ROUTES ****/
  app.route('/emails')
    .post(email.add);
};
