const File = require('./File.js').File;
var sleep = require('sleep');
var childProcess = require('child_process');


// const fileName = './input_script/code_pieces_script.js';
// const fileName = './input_script/jainil__js_nightmare_index.js';

// const fileName = './input_script/003camping-nightmare-test.js';
// const fileName = './input_script/004nightmare-practice-sample.js';
// const fileName = './input_script/006apples-oranges-test.js';
// const fileName = './input_script/007fouletoutous_index.js';
const fileName = './input_script/010jpchip_baby-connect-nightmare_src_bottle.js';
// const fileName = './input_script/011TonPC64_nightmare-post-fb_index.js';
// const fileName = './input_script/012HansUXdev_twitter-scripting_tweet.js';
// const fileName = './input_script/013CarolynSM_social-overlap-backend_nightmare.js';
// const fileName = './input_script/014plaidscott_test-nightmarejs_server.js';
// const fileName = './input_script/017leanhforevo_apptestorder6_app.js';
// const fileName = './input_script/020sdr2017_critterIdentifier_test.js';
// const fileName = './input_script/022Deliaz_so_visitor_index.js';
// const fileName = './input_script/024ATouhou_FB-Create_create.js';
// const fileName = './input_script/026RachetRalph_FOODIE_test.js';


const scriptPath = './output/scenario-nightmare-test.js';
const output = new File('./output/scenario-nightmare-test.js');

var Nightmare = require("nightmare");
var nightmare = new Nightmare({show:true});
const lib = require('wat_scenario');

// transfer();

async function transfer(){

	var fread = new File(fileName);

	var wholeText = await fread.read();	

	var read = await fread.readLine();	

	var datas = await changeScript(read,wholeText);

	var writeContent = await appendOneStr(datas);

	await output.write(writeContent);

	var scenarioStr = await runScriptPromise(scriptPath);
	
	return scenarioStr;

}

async function changeScript(read,wholeText){
	let scenario = new lib.Scenario();
	let stop = 0;
	let data = [];
	data.push('var Nightmare = require("nightmare");' + '\nvar lib = require("wat_scenario");\nvar scenario = new lib.Scenario();');

	for (var i = 0; i < read.length ; i++) {
		if(read[i].replace(/^\s*|\s*$/g, '').search(/\/\//i)==0){
			read[i] = '';			
		}else if (read[i].indexOf('.goto')!= -1){
			let tempStr = read[i].split('.goto');
			data.push('scenario.addAction(new lib.GotoAction' + tempStr[1] +');');
		} else if (read[i].indexOf('.click(')!= -1){
			let tempStr = read[i].split('.click(');
			data.push('scenario.addAction(new lib.ClickAction('+ tempStr[1] +');');			
		} else if (read[i].indexOf('.type(')!= -1){
			let tempStr = read[i].split('.type(');
			data.push('scenario.addAction(new lib.TypeAction('+ tempStr[1] +');');			
		} else if (read[i].indexOf('.insert(')!= -1){
			let tempStr = read[i].split('.insert(');
			data.push('scenario.addAction(new lib.TypeAction('+ tempStr[1] +');');			
		} else if (read[i].indexOf('.select(')!= -1){
			let tempStr = read[i].split('.select(');
			data.push('scenario.addAction(new lib.SelectAction('+ tempStr[1] +');');			
		} else if (read[i].indexOf('.back(')!= -1){
			data.push('scenario.addAction(new lib.BackAction());');
		}
	}

	data.push('process.send(scenario);');

	return data;
}


async function appendOneStr(datas){
	var tempStr = "";
	for (let i = 0; i < datas.length; i++) {
		tempStr = await tempStr + datas[i] + "\n";
	}
	return tempStr;
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

module.exports.transfer = transfer;