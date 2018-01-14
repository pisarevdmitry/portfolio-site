const http = require('request');


const apiOptions = {
    server: "http://5.23.49.51:80"
};

module.exports.getAbout= (req, res, next)  => {
    const pathAPI = '/api/skills';
    const requestOptions = {
        url: apiOptions.server + pathAPI,
        method: 'GET'
    };
    let sendObj = {
        title: 'Work'
    };
    http(requestOptions, function (error, response, body) {
       res.render('pages/about', Object.assign(sendObj, JSON.parse(body)));
    })

};