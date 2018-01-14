module.exports.getIndex= (req, res, next)  => {
    res.render('pages/index', {
        title: 'Express',
        msg: req.query.msg
    });
};