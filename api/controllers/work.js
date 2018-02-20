const mongoose = require('mongoose');

module.exports.getWork = (req, res) => {
    const work = mongoose.model('work');
    work.find().then(items => {
        res.status(200).json({slides:items});
    });
};

module.exports.createWork = (req, res) => {

    console.log("here");
    console.log(req.body);
    console.log(req.file);
    //создаем новую запись блога и передаем в нее поля из формы
    const Model = mongoose.model('work');

    let item = new Model({
        title: req.body.title,
        tech: req.body.tech,
        link:req.body.link,
        file: req.file
    });
    //сохраняем запись в базе
    item
        .save()
        .then(item => {
            return res.status(201).send( 'Запись успешно добавлена' );
        })
        .catch(err => {
            res.status(400).send(
                `При добавление записи произошла ошибка:  + ${err.message}`
            );
        });
};