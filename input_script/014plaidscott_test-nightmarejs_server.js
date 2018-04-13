
var Nightmare = require('nightmare');
require('nightmare-upload')(Nightmare);

var userInfo = require('./secret');

var nightmare = Nightmare({show: true});


nightmare
    .goto('https://www.ksl.com/public/member/signin?login_forward=%2Fclassifieds%2Fsell')
    .type('#memberemail', 'plaidscott@gmail.com')
    .type('#memberpassword', 'milamber08')
    .click('.continue')
    .wait(2000)
    .select('#category-input', 'Electronics')
    .select('#subCategory-input', 'Cell Phones Verizon')
    .insert('#title-input', 'Verizon Basic Phone, no contract')
    .insert('#price-input', '45.00')
    .select('#marketType-input', 'Sale')
    // .insert('#city-input', 'Salt Lake City')
    .select('#state-input', 'UT')
    .insert('#description-input', 'Awesome working phones, perfect for the thrifty and budget conscious call 801-857-7898, ask for Scott')
    .select('#sellerType-input', 'Private')
    // .insert('#name-input', 'Scott Schermerhorn')
    // .insert('#primaryPhone-input', '801-857-7898')
    .check('#acceptText-input')
    // .click('div#photoUploadContainer > div.uploader:nth-child(2) > div.upload-drop-area:nth-child(1) > span.add-photo-button.upload-button-hover.upload-button-focus:nth-child(2) > input:nth-child(3)')
    .wait(5000)
    .check('#acceptTermsConditions-input')
    .wait(5000)
    .click('.continue-button')
    .wait(5000)
    // .click('.post-listing-button')
    // .wait(5000)
    .evaluate(() => {
        return document.title;
    })
    .end()
    .then(function(title) {
        console.log('title', title);
    })
    .catch(function(err) {
        console.log('err', err);
    });