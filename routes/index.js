var express = require('express');
var router = express.Router();

const ctrlLogin = require('../controllers/login');
const ctrHome = require("../controllers/homepage");
const ctrAbout = require("../controllers/aboutpage");
const ctrWorks = require("../controllers/myWorksPage");
const ctrBlog = require("../controllers/blogPage");
/* GET home page. */
router.post('/login', ctrlLogin.authorization);
router.get('/', ctrHome.getIndex);
router.get('/about', ctrAbout.getAbout);
router.get('/my-works', ctrWorks.getWorks);
router.post('/contacts', ctrWorks.sendEmail);
router.get('/blog', ctrBlog.getBlog);

module.exports = router;
