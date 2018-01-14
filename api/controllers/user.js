const mongoose = require('mongoose');
module.exports.Auth = function (req, res) {

    if (!req.body.name || !req.body.password) {
        //если не указан логин или пароль - сообщаем об этом
        return res.status(301).json({status: 'err', message: 'Все поля обязательны к заполнению!'});

    }
    else if (req.body.chekbox !== "1"){
        return res.status(301).json({status: 'err', message: 'Вы не человек!'});

    }
    else if(req.body.radio !== '1') {
        return res.status(301).json({status: 'err', message: 'Вы робот!'});

    }

    //получаем модель пользователя и шифруем введенный пароль
    const Model = mongoose.model('user');

    //пытаемся найти пользователя с указанным логином
    Model
        .findOne({login: req.body.name})
        .then(user => {
            //если такой пользователь не найден или пароль не верен - сообщаем об этом
            if (!user) {

                return res.status(301).json({status: 'err', message: 'Не верный login'});

            }
            if (!user.validPassword(req.body.password)) {
                return res.status(301).json({status: 'err', message: 'Пароль введен неверно!'});

            } else {
                res.status(200).json({status: 'ok', message: 'Авторизация успешна!'});
            }
        }).catch(e => {
        res.status(301).send(
             `Произошла ошибка:${e.message}`
        );
    });
}