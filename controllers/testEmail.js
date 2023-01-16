const { response } = require("express");
const nodemailer = require('nodemailer');

const postTestEmail = async (req, res = response) => {
  const {fullname, email, subject, message} = req.body;

  const transporter = nodemailer.createTransport({
    host: 'mail.miguel-garcia.site',
    port: 465,
    auth: {
        user: process.env.NODEMAILER_API_USER,
        pass: process.env.NODEMAILER_API_PASS
    }
});

  const emailMsg = {
    to: "miguelgarciaparedes22@gmail.com",
    from: "info@miguel-garcia.site",
    subject: subject,
    //text: "Contact form from miguel-garcia.site",
    html: "Hi <b>" +
    fullname +
    "</b>, with email "+ email +", has sent you a message: <b>" + message +
    ".<br/> Reminder: please answer to the customer."
  };

  transporter.sendMail(emailMsg, function(error, success){
    if (error) {
      console.error(error);
          res.status(500).json({
            ok: false,
            msg: "Error"
          });
    } else {
        console.log('Nodemailer Email sent: ' + success.response);
        res.json({
          ok: true,
          msg: "Mail has been sent"
        });
    }
  });


  // await sendgridMail
  //   .send(msg)
  //   .then((response) => {
  //     console.log(response[0].statusCode);
  //     console.log(response[0].headers);
  //     res.json({
  //       ok: true,
  //       msg: "Mail has been sent"
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.status(500).json({
  //       ok: false,
  //       msg: "Error"
  //     });
  //   });

};

module.exports = { postTestEmail };
