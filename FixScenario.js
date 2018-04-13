const winston = require('winston');
const wat_scenario = require('wat_scenario');
const puppeteer = require('puppeteer');

const PROBA_CHANGER = 1;


class FixScenario{
	constructor(baseScenario, candidateActions, index, assertFunction){
		this.baseScenario = baseScenario;
		this.candidateActions = candidateActions;
		this.iBaseScenario = index;
		this.assertFunction = assertFunction;
	}

	async runWithNoise() {
		winston.info('begin runWithNoise');		
		let page = await this.createPage();
		await page.authenticate({username:"anonymous",password:"anonymous"});

		this.browser.on('targetcreated', (ev) => {
			console.log(`target created : ${ev.type()} , ${ev.url()}, ${ev.page()}`);
			winston.info(`target created : ${ev.type()} , ${ev.url()}, ${ev.page()}`);
			ev.page().then ( page => page.close());
		});

		let tempRunScenario = this.baseScenario;

		for (let i = 0 ; i < this.candidateActions.length ; i++) {
			await winston.info(`it will change the ${this.iBaseScenario+1} action of base Scenario using this action:`)
			await console.log(this.candidateActions[i].action);
			tempRunScenario.actions[this.iBaseScenario+1] = await this.candidateActions[i].action;			
			// await console.log('tempRunScenario is ');
			// await console.log(tempRunScenario.actions);
			// await console.log('=================================');
			let scenario = new wat_scenario.Scenario(tempRunScenario.actions);
			await winston.info(`it will run this following scenario:`);
			await console.log(scenario);
			try {
				let runResult = await scenario.run(page);
				if (runResult.success) {
					await winston.info('new fixed scenario run success!!!!!  The fix scenario is:');
					await console.log(scenario);
					await page.close();
				} else {
					winston.info('runResult is false:');
					console.log(runResult);
					winston.info('FixScenario cannot run !');
				}

			} catch (ex) {
				winston.info(ex);
				winston.info('FixScenario cannot run !');
			}
			await page.waitFor(1000);			
		}
		
		page.close();
		this.browser.removeAllListeners('targetcreated');
	}


	async initBrowser() {
		if (!this.browser) this.browser =  await puppeteer.launch({headless: false, args:['--no-sandbox']});
	}

	async createPage() {
		await this.initBrowser();
		let page = await this.browser.newPage();
		return page;
	}		

	getCandidateActions() {
		return this.candidateActions;
	}

}


module.exports.FixScenario = FixScenario;