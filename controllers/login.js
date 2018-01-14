const http = require('request');
const apiOptions = {
    server: "http://5.23.49.51:80"
};
module.exports.authorization = function (req, res) {
        //требуем наличия логина и пароля в теле запроса
    if (!req.body.name || !req.body.password) {
        //если не указан логин или пароль - сообщаем об этом
        return res.redirect("/?msg=Все поля обязательны к заполнению!");
    }


    const pathApi = '/api/auth';
    const requestOptions = {
        url: apiOptions.server + pathApi,
        method: "POST",
        json: {
            name: req.body.name,
            password: req.body.password,
            chekbox:req.body.chekbox,
            radio:req.body.radio
        }
    };
    http(requestOptions, function (error, response, body) {
        if (body.status === 'err') {
           return res.redirect(`/?msg=${body.message}`);
        }
        // если найден, то делаем пометку об этом в сессии пользователя, который сделал
        req.session.isAdmin = true;
        res.redirect('/adminPanel');
    });
};