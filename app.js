const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const phantom = require('phantom');

var config = require('./config').config;


var barData,
    barName;

// support static resource
app.use(express.static('public'));
app.use(express.static('images'));
// check whether the request has the permission
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    var clientIp = getClientIp(req);
    if(config.whiteIps.find(item => clientIp.indexOf(item) != -1)) {
        next();
    } else {
        res.status(config.httpCode.noPermission.code).send(config.httpCode.noPermission.message);
    }
});
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

app.use(express.static('views'));


app.post('/bar.html', bodyParser.urlencoded({extended: true}), function (req, res) {
    if(!req.body) {
        res.status(config.httpCode.warnRequestBody.code).send(config.httpCode.warnRequestBody.message);
    } else {
        barData = req.body.data;
        barName = req.body.name;
        if(!barData) {
            res.status(config.httpCode.warnDataProperty.code).send(config.httpCode.warnDataProperty.message);
        } else if(!barName) {
            res.status(config.httpCode.warnNameProperty.code).send(config.httpCode.warnNameProperty.message);
        } else {
            res.status(config.httpCode.success.code).send(config.httpCode.success.message +  ' and visit the url: ' + '/' + barName + ' after 3s.');
            var sitePage;
            phantom.create().then(function (ph) {
                ph.createPage().then(function (page) {
                    sitePage = page;
                    page.invokeAsyncMethod('open', 'http://localhost:7000/bar.html')
                        .then(status => {
                            if(status == 'success') {
                                setTimeout(function () {
                                    page.render('./images/' + barName);
                                    console.log('render images ' + barName + ' successfully!');
                                    ph.exit();
                                }, 2000);
                            } else {
                                console.error(status);
                                ph.exit();
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            ph.exit();
                        });
                });
            });
        }
    }
});
app.get('/getBarData', function (req, res) {
    res.send(barData);
    barData = '';
});

// error middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(config.httpCode.error.code).send(config.httpCode.error.message);
});

var server = app.listen(7000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});