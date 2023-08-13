
const express = require('express');
const request = require("request");
const router = express.Router();
const config = require("../config");

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

router.use(express.urlencoded({
    extended: true
}));


url_base = 'https://openapivts.koreainvestment.com:29443'
path = '/oauth2/tokenP'

let accessToken = localStorage.getItem("accessToken") || null;

router.get('/', function(req, res, next) {
    res.sendfile("./views/index.html");
});

router.get('/access', function(req, res, next) {
    const request = require('request');
    const headerOpt = {"content-type": "application/json",};
    const options = {
        uri: url_base+path,
        method: 'POST',
        headers : headerOpt,
        body: {
            'grant_type' : "client_credentials",
            'appkey': config.app_key,
            'appsecret' : config.app_secret
        },
        json:true
    }

    if(typeof accessToken === 'undefined' || accessToken === null) {
        request.post(options, function (error, response, body) {
            localStorage.setItem("accessToken", body.access_token);
            res.send(response);
        });
    }else {
        res.send('already exsit');
    }
});

router.get('/stock', function(req, res, next) {
    const request = require('request');
    let stock = 'J';
    let ETF = 'ETF';
    let ETN = 'ETN';
    let stockNum = '005930';
    let path = '/uapi/domestic-stock/v1/quotations/inquire-price?FID_COND_MRKT_DIV_CODE=' + stock + '&FID_INPUT_ISCD=' +stockNum;
    const headerOpt = {
        "content-type": "application/json",
        "authorization": "Bearer " + accessToken,
        "appkey": config.app_key,
        "appsecret": config.app_secret,
        "tr_id": 'FHKST01010100'

    };
    const options = {
        uri: url_base+path,
        method: 'POST',
        headers : headerOpt,
        json:true
    }

    request.post(options, function (error, response, body) {
        res.send(response);
    });

});

module.exports = router;
