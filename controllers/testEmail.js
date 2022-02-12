const { response } = require("express");
const sendgridMail = require("@sendgrid/mail");
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

const postTestEmail = async (req, res = response) => {
  const {fullname, email, subject, message} = req.body;

  const msg = {
    to: "miguelgarciaparedes22@gmail.com",
    from: "info@stdicompany.com",
    subject: subject,
    //text: "Contact form from miguel-garcia.site",
    html: "Hi <b>" +
    fullname +
    "</b>, with email "+ email +", has sent you a message: <b>" + message +
    ".<br/> Reminder: please answer to the customer."
  }

  await sendgridMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
      res.json({
        ok: true,
        msg: "Mail has been sent"
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "Error"
      });
    });

};

module.exports = { postTestEmail };
