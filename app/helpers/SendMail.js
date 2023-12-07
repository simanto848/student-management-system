const nodemailer = require("nodemailer")

const mail = async function (email){
    const transporter  = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const message = {
        from: process.env.MAIL_FROM, // Sender address
        to: email,         // List of recipients
        subject: 'Activate Account', // Subject line
        html: `<i>To activate your account please enter this code: <a href="http://localhost:${process.env.PORT}/user/login}">Log into yout account</a></i>` // Plain text body
    };

    await transporter.sendMail(message, function (err, info){
        if (err) {
            console.log("Failed")
        } else {
            return email
        }
    })
}

module.exports = mail