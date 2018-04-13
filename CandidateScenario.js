const winston = require('winston');
const wat_scenario = require('wat_scenario');
const puppeteer = require('puppeteer');

const PROBA_CHANGER = 1;

class CandidateScenario{
	constructor(baseScenario){
		this.baseScenario = baseScenario;
	}

	async detectCandidateAction(iRunnedActions) {
		let page = await this.createPage();
		this.candidateActions = [];
		
		// console.log(this.baseScenario.actions.length);
		// console.log(this.baseScenario.actions[iRunnedActions]);
		for (let i=0 ; i < this.baseScenario.actions.length ; i++) {
			// this.candidateActions[i] = [];
			await this.baseScenario.actions[i].run(page);
			await page.addScriptTag({path:'./optimal-select.js'});
			if (i === iRunnedActions) {
				let candidateSelector = await page.evaluate(scanCandidateAction);
				candidateSelector.forEach(selector => {
					this.candidateActions.push({
						action : new wat_scenario.ClickAction(selector)
					});
				});
			}			
		}
		page.close();
	}

	getCandidateActions() {
		return this.candidateActions;
	}

	async initBrowser() {
		if (! this.browser) this.browser =  await puppeteer.launch({headless: false, args:['--no-sandbox']});
	}

	async createPage() {
		await this.initBrowser();
		let page = await this.browser.newPage();
		return page;
	}
}

function scanCandidateAction() {
	let actions = [];
	let computeCSSSelector = window['OptimalSelect'].select;
	let aElements = document.querySelectorAll('a');
	for (let i=0 ; i < aElements.length ; i++) {
		if (! isMailTo(aElements[i])) actions.push(computeCSSSelector(aElements[i]));
	}
	return actions;

	function isMailTo(element) {
		let href = element.href;
		return href && (href.toLowerCase().indexOf('mailto') > -1)		
	}
}

module.exports.CandidateScenario = CandidateScenario;