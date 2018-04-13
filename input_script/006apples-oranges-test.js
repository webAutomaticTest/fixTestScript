var Nightmare = require('nightmare');
var should = require("chai").should();
var expect = require('chai').expect;

describe('test create a debate button', function (){
	this.timeout(30000);
	var nightmare = Nightmare ({ show: true });
	it("should allow me to create a debate and visit it", function(done) {
		nightmare
			.goto ("https://apples-oranges.herokuapp.com/")
			.click('.createDebate')
			.wait(".debateSubmit")
			.type("input[name='topic']", "Robots Vs. Aliens")
			.type("input[name='sideA']", "Robots")
			.type("input[name='sideB']", "Aliens")
			.click('.debateSubmit')
			.wait(2000)
			.wait('.createDebate')
			.click('.indexDebate')
			.click('html > body > div.indexDebate.grow:nth-child(14) > a:nth-child(1) > h4:nth-child(1)')
			.wait(".determinate")
			.evaluate(function() {
				return document.getElementsByTagName("h1")[0].innerHTML
				})
			.end()
			.then(function (title) {
				console.log(title)
				title.should.equal("Test Vs. Example");
				done();
			})
			.catch(function (error) {
				console.error('Error:', error);
			});
	})

})
