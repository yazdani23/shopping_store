const sgMail = require("@sendgrid/mail");


module.exports.sendForgetPasswordLink = (code, email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const link = "http://localhost:3000/resetPassword?code=" + code;
  const msg = {
    to: email,
    from: process.env.SENDGRID_ORIGIN_EMAIL || "amir.akhoundi@gmail.com",
    subject: "Request forgot password ",
    html: `<h1> Click the link below to recover your password </h1><a href="${link}"> Behold </a>`,
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("email sent");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.sendContactAdmin = (email) => {
  sgMail.setApiKey(
    process.env.SENDGRID_API_KEY || "SG.9IMRVrHwQdmjSEkaUcNtWA."
  );
  const link = "http://localhost:3000/admin-panel/contactList";
  const msg = {
    to: process.env.ADMIN_EMAIL_ADDRESS || "amir.akhoundi@gmail.com",
    from: email ,
    subject: "new contact form filled",
    html: `<h1> Click on the link below to view the list of items </h1><a href="${link}"> Behold </a>`,
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("email sent");
    })
    .catch((err) => {
      console.log(err);
    });
};
