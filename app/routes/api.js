var express = require('express');
var md5 = require('md5');
var router = express.Router();
var user = require('../module/user');
var today = require('../module/today');
var body = require('../module/body');
var health = require('../module/health');
var step = require('../module/step');
var task = require('../module/task');
var sleep = require('../module/sleep');
var edweight = require('../module/edweight');
var analysis = require('../module/analysis');

/*get */

router.get('/today/getDate', function(req, res, next) {
    var thisDate = today.getDate();
    res.json({
        data: thisDate
    });
});

router.get('/today/getWeek', function(req, res, next) {
    var thisWeek = today.getWeek();
    res.json({
        data: thisWeek
    });
});

router.get('/today/getLogion', function(req, res, next) {
    today.getLogion(function(err, results) {
        if (err) throw err;
        res.json({
            data: results
        });
    });
});

router.get('/user', function(req, res, next) {
    var user = {
        username: req.session.username,
        userId: req.session.userId
    };
    res.json({
        data: user
    });
});

router.get('/health/getScore', function(req, res, next) {
    health.getScore(req.query.userId, function(err, result) {
        if (err) throw err;
        res.json({
            data: result
        });
    });

});

router.get('/step/getTodayStep', function(req, res, next) {
    step.getTodayStep(req.query.userId, function(err, results) {
        if (err) throw err;
        res.json({
            data: results
        });
    });
});

router.get('/step/getWeekStep', function(req, res, next) {
    step.getWeekStep(req.query.userId, function(err, results) {
        if (err) throw err;
        res.json({
            data: results
        });
    });
});

router.get('/task/getTask', function(req, res, next) {
    if (req.query.userId == null) {
        res.json({
            data: null
        });
    } else {
        task.getTask(req.query.userId, function(err, results) {
            if (err) throw err;
            res.json({
                data: results
            });
        });
    }
});

router.get('/sleep/getSleep', function(req, res, next) {
    sleep.getSleep(req.query.userId, function(err, results) {
        if (err) throw err;
        res.json({
            data: results
        });
    });
});

router.get('/sleep/getWeekSleep', function(req, res, next) {
    sleep.getWeekSleep(req.query.userId, function(err, results) {
        if (err) throw err;
        res.json({
            data: results
        });
    });
});

router.get('/edweight/getTodayWeight', function(req, res, next) {
    edweight.getTodayWeight(req.query.userId, function(err, results) {
        if (err) throw err;
        res.json({
            data: results
        });
    });
});

router.get('/edweight/getWeekWeight', function(req, res, next) {
    edweight.getWeekWeight(req.query.userId, function(err, results) {
        if (err) throw err;
        res.json({
            data: results
        });
    });
});

router.get('/body/getBody', function(req, res, next) {
    body.getBody(req.query.userId, function(err, results) {
        if (err) throw err;
        res.json({
            data: results
        });
    });
});

/*post */

router.post('/login', function(req, res, next) {
    var username = req.body.username,
        password = md5(req.body.password);
    user.login(username, password, function(err, result) {
        if (err) throw err;
        if (result.flag == 1) {
            req.session.username = req.body.username;
            req.session.loginFlag = true;
            req.session.userId = result.userId;
            res.redirect('/personalhealth/home');
        } else {
            res.redirect('/personalhealth/login');
        }
    });
});

//注册暂时不能直接跳转到主页，没做返回值id，没存取userId
router.post('/register', function(req, res, next) {
    var username = req.body.username;
    var password = md5(req.body.password);
    user.register(username, password, function(err, result) {
        if (err) throw err;
        if (result == 1) {
            res.redirect('/personalhealth/login');
        } else {
            res.redirect('/personalhealth/register');
        }
    });
});

router.post('/body/setBody', function(req, res, next) {
    body.setBody(req.body.userId, req.body.name, req.body.height, req.body.weight, req.body.age, req.body.sex, function(err, result) {
        if (err) throw err;
        res.json({
            flag: result
        });
    });
});

router.post('/analysis/creat', function(req, res, next) {
    var result = analysis.basicAs(req.body.sex, req.body.weight, req.body.height);
    var score = analysis.basicToScore(result);
    health.setScore(score, req.body.userId, function(err, flag) {
        if (err) throw err;
        res.json({
            flag: flag
        });
    });
});

router.post('/analysis/scoreToMsg', function(req, res, next) {
    var result = analysis.scoreToMsg(req.body.score);
    res.json({
        data: result
    });
});

router.post('/edweight/setTodayWeight', function(req, res, next) {
    edweight.setTodayWeight(req.body.userId, req.body.weight, function(err, result) {
        res.json({
            flag: result
        });
    });
});

router.post('/step/setStep', function(req, res, next) {
    step.setStep(req.body.userId, req.body.step, function(err, result) {
        res.json({
            flag: result
        });
    });
});

router.post('/login_out', function(req, res, next) {
    req.session.loginFlag = false;
    req.session.userId = null;
    req.session.username = null;
    res.json({
        flag: 1
    });
});

module.exports = router;
