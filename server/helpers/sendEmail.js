require('dotenv').config()
const nodemailer = require("nodemailer");

function sendEmail(data) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email_nodemailer,
      pass: process.env.password_nodemailer
    }
  });

  const mailOptions = {
    from: "xxx@gmail.com",
    to: data.email,
    subject: `My New Article Available ${data.articleTitle} `,
    html:
      ` Hi guys, I just post a new article. Please check out my new article ${data.articleLink}
      Regards,
      ${data.articleAuthor}
      `
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('success')
    }
  });
}

module.exports = sendEmail