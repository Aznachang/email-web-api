/** NEED THIS TO SEND EMAILS **/
const nodemailer = require('nodemailer');

// this method is called as 'callback' func. from 'routes > emailRoutes.js'
exports.add = (req, res) => {
  // Email From variables - from user input (views > 'email.handlebars')
  const receiver = `${req.body.to}`;
  const subject = `${req.body.subject}`;
  const emailMsg = `<p>${req.body.body}</p>`;

  nodemailer.createTestAccount((err, account) => {
    // create a default SMTP transport so emails can be sent
    let transporter = nodemailer.createTransport({
      name: 'HelloWorld',
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass  // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    /** Email Data to Process **/
    let emailSentData = {
      from: receiver,
      to: receiver,
      subject: subject,
      text: 'testing...',
      html: emailMsg
    };

    // send mail with defined email data - 'emailSentData' above
    transporter.sendMail(emailSentData, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`Sent Email Data: ${JSON.stringify(emailSentData)}`);
      // res.render('email', { msg: `Your email has been sent!` })
      res.json(emailSentData);
    });
  });
}
