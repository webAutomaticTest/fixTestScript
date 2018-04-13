var Nightmare = require("nightmare");
var Promise = require("promise");

/**
 * @param {string} email
 * @param {string} password
 * @param {string} kidId (eg. 'kid123456')
 * @param {string} type
 * @param {number} quantity (in ounces)
 * @returns {promise}
 * @todo split out login and kid select logic
 */
module.exports = function (email, password, kidId, type, quantity) {
	return new Promise(function (fulfill, reject){

		var typeSelector = null;
		switch(type) {
		case "milk":
			typeSelector = "#bibMilk";
			break;
		case "formula":
			typeSelector = "#bibFormula";
			break;
		default:
			reject("Unknown type");
			return;
		}

		var babyConnect = new Nightmare()
			.goto("https://www.baby-connect.com/login")
			.wait("#email")
			.type("#email", "925772927@qq.com")
			.wait(100)
			.type("#pass", "123456")
			.wait(100)
			.click("#save")
			.wait(5000)
			.click("#" + "kid6704816061153280" + " > a")
			.wait(500)
			.click("a[href='javascript:showBibDlg()']")
			.wait(500)
			.click("#bibMilk")
			.wait(100)
			.type(".ui-autocomplete-input", false)
			.wait(100)
			.type(".ui-autocomplete-input", "10")
			.wait(100)
			.click(".defaultDlgButton")
			.wait(500)
			.end()
			.then(function() {
				fulfill();
			})
			//catch errors if they happen
			.catch(function(error){
				reject(error);
			});
	});
};