const http = require('request');

const apiOptions = {
    server: "http://5.23.49.51:80"
};

module.exports.getBlog= (req, res, next)  => {
    const pathAPI = '/api/blog';
    const requestOptions = {
        url: apiOptions.server + pathAPI,
        method: 'GET'
    };
    let sendObj = {
        title: 'My Blog'
    };
    http(requestOptions, function (error, response, body) {

        res.render('pages/blog', Object.assign(sendObj, JSON.parse(body)));
    })

};