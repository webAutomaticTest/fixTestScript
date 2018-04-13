const Nightmare = require('nightmare');
const Mailgun = require('mailgun-js');

const confFile = require('./conf.json');

const nightmare = Nightmare({show: false});

let mailgun = null;
if (confFile.mailgun_api_key && confFile.mailgun_domain) {
    mailgun = Mailgun({
        apiKey: confFile.mailgun_api_key,
        domain: confFile.mailgun_domain
    });
}


const LOGIN_PAGE = 'https://stackoverflow.com/users/login';

function processResult(text) {
    if (mailgun) {
        mailgun
            .messages()
            .send({
                from: 'SO Visitor <no-reply@mailgun.org>',
                to: confFile.email,
                subject: `Stackoverflow visiting report (${text})`,
                text: `Hi man. Thats your stat for now: ${text}`
            }, (error, body) => {
                if (error) {
                    throw error;
                }
            });
    }
}

function processError(errText) {
    if (mailgun) {
        mailgun
            .messages()
            .send({
                from: 'SO Visitor <no-reply@mailgun.org>',
                to: confFile.email,
                subject: `Stackoverflow visiting report (Error)`,
                text: `Something went wrong: ${errText}`
            }, (error, body) => {
                if (error) {
                    throw error;
                }
            });
    }
}

nightmare
    .goto('https://stackoverflow.com/users/login')
    .wait('#login-form')
    .type('#email', '888ch666@163.com')
    .type('#password', 'ZXCVBNM<>?123')
    .click('#submit-button')
    .wait('a.my-profile')
    .click('a.my-profile')
    .wait('#top-cards')
    .evaluate(() => {
        const el = document.querySelector('#top-cards span.-count');
        return el ? el.innerText : 'null';
    })
    .end()
    .then(progressText => {
        processResult(progressText);
    })
    .catch(function (error) {
        processError(error);
    });