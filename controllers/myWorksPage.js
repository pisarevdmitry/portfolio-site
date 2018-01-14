const nodemailer = require('nodemailer');
const config = require('../config/config.json');
const http = require('request');
module.exports.getWorks= (req, res, next)  => {

    const apiOptions = {
        server: "http://5.23.49.51:80"
    };
    const pathAPI = '/api/work';
        const requestOptions = {
            url: apiOptions.server + pathAPI,
            method: 'GET'
        };
        let sendObj = {
            title: 'Works'
        };
        http(requestOptions, function (error, response, body) {
            res.render('pages/my-works', Object.assign(sendObj, JSON.parse(body)));
        })



};
module.exports.sendEmail  = (req, res, next)  => {
       if (!req.body.name || !req.body.email || !req.body.text) {
        //если что-либо не указано - сообщаем об этом
        return res.send('Все поля нужно заполнить!');
    }
const transporter = nodemailer.createTransport(config.mail.smtp);
const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: req
        .body
        .text
        .trim()
        .slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
};
transporter.sendMail(mailOptions, function (error, info) {

    if (error) {
        return res.send('При отправке письма произошла ошибка: ' + error.message);
    }
    res.send('Письмо успешно отправлено');
});
};