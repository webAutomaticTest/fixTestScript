var Nightmare = require('nightmare');
var vo = require('vo');

vo(function* () {
  var nightmare = Nightmare({ show: true });
  var link = yield nightmare
    .goto('http://www.facebook.com/login.php')
    .type('input#email', '888ch666@163.com')
    .type('input#pass', '!QAZ@WSX')
    .click('#loginbutton input')
    .wait(1000)
    .goto('https://www.facebook.com/me')
    .wait('a._5qtm._5qtn.fbReactComposerAttachmentSelector_STATUS')
    .click('a._5qtm._5qtn.fbReactComposerAttachmentSelector_STATUS')
    .wait('div._45m_._2vxa')
    .type('div._45m_._2vxa', 'Post With Nightmare @ฉัตรชัย ประเสริฐดี')
    .wait('div._5rpu')
    .wait('button._1mf7._4jy0._4jy3._4jy1._51sy.selected._42ft')
    .click('button._1mf7._4jy0._4jy3._4jy1._51sy.selected._42ft')
    .wait(1000)
    .click('#pageLoginAnchor')
    .wait('a[data-gt=\'{"ref":"async_menu","logout_menu_click":"menu_logout"}\']')
    .click('a[data-gt=\'{"ref":"async_menu","logout_menu_click":"menu_logout"}\']')
    .wait(1000)

  yield nightmare.end();
  return link;
})(function (err, result) {
  if (err) return console.log(err);
  console.log(result);
});