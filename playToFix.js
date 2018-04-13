const winston = require('winston');
const File = require('./File.js').File;
const transfer = require('./transferScenario.js');
const lib = require('wat_scenario');
const puppeteer = require('puppeteer');
var childProcess = require('child_process');

const CandidateScenario = require('./CandidateScenario.js').CandidateScenario;
const FixScenario = require('./FixScenario.js').FixScenario;

//to get new test script from the transfered scenarios
const scriptPath = './output/scenario-nightmare-test.js';

const cadidatePath = './output/result.json';
const resultPath = './output/result1.json';

playToFix();

async function playToFix(){

	// var scenarioStr = await runScriptPromise(scriptPath);
	var scenarioStr = await transfer.transfer();
	var scenario = new lib.Scenario(JSON.parse(scenarioStr));
	var page = await createPage();

	try{
		let baseResult = await scenario.run(page);		
		if (baseResult.success) {
			await winston.info('scenario run success!');
			await page.close();
		} else if(baseResult.success == false){			
		    await winston.info(`run the original test script, result is:`);
		    await console.log(baseResult);
		    await page.close();
		    let crawlerScenario = await makeCrawlScenario(scenario,baseResult);
		    await winston.info(`prepare the crawlScenario is : ${crawlerScenario}`);

		    let iRunnedActions = baseResult.runnedActions;
		    candidateScenario = new CandidateScenario(crawlerScenario);
		    await candidateScenario.detectCandidateAction(iRunnedActions);
		    ca = candidateScenario.getCandidateActions();
		    await winston.info(`length of candidate actions is ${ca.length}`);
		    await console.log(ca);

		    // var writeCa = new File(cadidatePath);
		    // await console.log(iRunnedActions);
		    // await writeCa.writeJson(ca[iRunnedActions]);
		    
		    let bScenario = await makeBaseScenario(scenario,baseResult);
		    		    
		    await winston.info(`the bScenario actions length is ${bScenario.actions.length}`)
		    let fixScenario = new FixScenario(bScenario, ca, iRunnedActions);
		    await fixScenario.runWithNoise();

		    page.close();

		    
		    
		}
	}catch(e){
		console.log(e);
	}

}


async function createPage() {
	let browser;
	let page;

	browser = await puppeteer.launch({headless: false, args:['--no-sandbox']});
	page = await browser.newPage();
	return page;
}

async function makeCrawlScenario(scenario,result){
	let crawlScenario = new lib.Scenario();
	for (let i = 0; i <= result.runnedActions; i++) {
		await crawlScenario.actions.push(scenario.actions[i]);
	}
	return crawlScenario;
}

async function makeBaseScenario(scenario,result){
	let bScenario = new lib.Scenario();
	for (let i = 0; i <= result.runnedActions+2; i++) {
		await bScenario.actions.push(scenario.actions[i]);
	}
	return bScenario;
}

async function runScriptPromise(scriptPath) {
	let promise = new Promise(function(resolve,reject){
		var process = childProcess.fork(scriptPath);
		process.on('error', function (err) {
			reject(err);
		});
		process.on('message', (data) => {
			resolve(data);
		});
		process.on('exit', function (code) {
			var err = code === 0 ? null : new Error('exit code ' + code);
			reject(err);
		});
	});

	promise.then( (data) => {		
		if(data!=null){
			// console.log(data);
			return Promise.resolve(data);
		}		
	})
	.catch((err)=>{
		if(err)		{
			console.log('there is err: ' + err);
			throw err;
		}else{
			console.log('finished running script without datas fedback');
		}
	})
	return promise;
}

