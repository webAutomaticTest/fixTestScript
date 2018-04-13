// https://github.com/segmentio/nightmare#api
const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: true,
  // pollInterval: 5000, //in ms
  waitTimeout: 10000 // in ms
})

nightmare
  .goto('http://foule-toutous.firebaseapp.com')
  .wait('h1.App-title')
  .wait('.toutou')
  .click('.toutou')
  .wait('.Fiche')
  .click('#back')
  .wait('h1.App-title')
  .wait('#search')
  .click('#search')
  .evaluate(() => document.querySelector('input.recherche').style.display === 'block')
  .wait(3000)
  .type('input.recherche', 'qqqqqqq')
  .wait(3000)
  .wait('.nouveau')
  .wait(3000)
  .click('#search')
  .wait(3000).evaluate(() => document.querySelector('input.recherche').style.display === 'block')
  .wait(3000)
  .type('input.recherche', false)
  .wait(3000)
  .type('input.recherche', 'jujube')
  .wait(3000)
  .wait('.toutou')
  .wait(3000)
  .click('.toutou')
  .wait('.Fiche')
  .evaluate(() => document.querySelector('input#nom').value)
  .end()
  .then(value => {
    expect(value).to.equal('Jujube')
    done()
  })
  .catch(error => {
    console.error('Search failed:', error)
  })
