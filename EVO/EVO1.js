var EVO = {
	"version": 1,
	"stage": 1,
	"date": Date.now(),
	"one": {
		"metabolismType": 'basic',
		"metabolism": -1,
		"mitochondria": -1,
		"cilia": 0,
		"flagellum": 0,
		"cytoplasm": -1,
	},
	"sunSwitch": 'on',
	"sun": 0,
	"food": 10000,
	"atp": 0,
	"evolution": 0,
	"evolved": 0,
	"bonus": 0,
	"evolutionSwitch": 'off',
	"membraneScore": 0,
	"mitosis": 0,
	"mitosisSwitch": 'off',
	"mitosisLimit": 5,
	"mitosisChance": 0,
	"mitosisLearn": 0,
	"cytoskeleton": null,
	"nucleus": null,
	"ciliaSwitch": 'off',
	"flagellumSwitch": 'off',
	"photosynthesis": 0,
	"rnaSwitch": 'off',
	"rnaB": 0,
	"rnaS": 0,
	"dnaSwitch": 'off',
	"dnaB": 0,
	"dnaS": 0,
	"size": {
		"max": 0,
		"stage": 0,
	},
};

var fun = {
	"metabolism": function(){return (1+(EVO.one.metabolism/100))*(1+(EVO.one.mitochondria/100));},
	"cytoplasm": function(){return 100-(EVO.one.cytoplasm*((REC.cytoplasm+10)/1000));},
	"food":{
		"max": function(){return ((REC.food.max+EVO.size.max)*10)+100;},
		"min": function(){return (REC.food.min*10)+(EVO.size.max*5);},
	},
	"virus": [1 ,0, 0, 0],
	"failtimer": function(){setTimeout(eventEnd, (Math.floor((Math.random()*240000)+1)));},
	"move": function(){setTimeout(move, 3600000);},
};
	
function start(){
	if (localStorage.getItem("REC") !== null){REC = JSON.parse(localStorage.getItem("REC"));}
	if (localStorage.getItem("EVO") !== null){EVO = JSON.parse(localStorage.getItem("EVO"));}
	evos();
	var offline = Date.now() - EVO.date;
	var speedUp = [0, 0, 0, 0];
	while (offline > speedUp[0]){
		if (speedUp[0] >= speedUp[1] + (1001-EVO.one.cytoplasm)) {
			if (EVO.ciliaSwitch == 'on') {autoClick();}
			if (EVO.one.metabolismType == 'Photophosphorylation') {photosynth();}
			speedUp[1] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[2] + 60000){
			sun();
			speedUp[2] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[3] + 3600000){
			move('start');
			speedUp[3] = speedUp[0];
		}
		speedUp[0] += 1;
	}
	EVO.date = Date.now();
	save(Date.now());
	updateFood();
	updateATP();
	doc('evolutionCost',evolutionMath());
	setTimeout(environment, 60000);
	if (EVO.ciliaSwitch == 'on') {setTimeout(timer, 1001-EVO.one.cytoplasm);}
	else {setTimeout(timer, 6000);}
	setTimeout(events, 300000);
	setTimeout(swirly, 30, 'on', 'on', Math.floor(Math.random()*window.innerWidth)-50, Math.floor(Math.random()*window.innerHeight)-50, 0);
}

function events(){
	var swch = 'off';
	doc('eventHTML','<div style="color:white; border-style: hidden; left: 200px; height: 50px; text-align:center"><p><span id="event1HTML"></span><br><span id="event2HTML"></span></p></div>');
	var random = Math.floor((Math.random() * 100)+1)
	if (0 < random && 10 >= random){
		swch = 'on';
		doc('event1HTML','You met a friendly cell.  Would you like to share genes?');
		doc('event2HTML','<p title="Horizontal Gene Transfer is the two single cell creatures meeting together and sharing genes." onclick="horizontal()"><b style="color:purple">HGT</b></p>');
		fun.failtimer();
	}
	if (10 < random && 20 >= random && EVO.rnaSwitch == 'on'){
		swch = 'on';
		fun.virus[0] = 2;
		doc('event1HTML','You met a virus.  It has infected you.');
		doc('event2HTML','<p title="Click to fight the virus." onclick="antivirusM()"><b style="color:purple">Fight Virus</b></p>');
		fun.virus[1] = Math.floor((Math.random() * (EVO.rnaB-EVO.rnaS) * 100)+1);
		antivirusA();
	}
	if (20 < random && 30 >= random){
		swch = 'on';
		doc('event1HTML','The area has had an influx of food.');
		EVO.food += Math.floor((Math.random()*5000* (1+(EVO.one.flagellum/100)))+1);
		setTimeout(eventEnd, 60000);
	}
	if (swch == 'off') {doc('eventHTML',''); setTimeout(events, 300000);}
}

function horizontal(){
	clearTimeout(fun.failtimer());
	if ((15-(EVO.membraneScore*5))+((EVO.rnaB-EVO.rnaS)/100) > Math.floor((Math.random() * 100)+1)) {EVO.bonus += 1;}
	eventEnd();
}
	
function antivirusM(){
	fun.virus[2] += 100;
	if (fun.virus[2] >= fun.virus[3]){
		fun.virus[2] = 0;
		fun.virus[3] += 100;
	}
	fun.virus[1] -= fun.virus[3];
}

function antivirusA(){
	fun.virus[1] -= 1;
	if (fun.virus[1] > 0){setTimeout(antivirusA, 1000);}
	else {
		fun.virus[0] = 1;
		eventEnd();
	}
}

function eventEnd(){
	doc('eventHTML','');
	setTimeout(events, (Math.floor((Math.random() * 240000)+1)));
}

function environment(){
	sun();
	setTimeout(environment, 60000);
}

function updateFood(){
	if (EVO.food > 10000){doc('food','Bountiful');}
	else if (EVO.food > 7500){doc('food','Abundant');}
	else if (EVO.food > 5000){doc('food','Plentiful');}
	else if (EVO.food > 2500){doc('food','Sparse');}
	else if (EVO.food > 0){doc('food','Scarce');}
	else {doc('food','None');}
}

function move(x){
	var moveCost = (1000 - EVO.one.flagellum)*(1+(EVO.size.max/100));
	if (EVO.atp >= moveCost){
		EVO.atp -= moveCost;
		EVO.food = Math.floor((Math.random()*((fun.food.max()-fun.food.min())*100)*(1+(EVO.one.flagellum/1000)))+(fun.food.min()*100));
		if (x !== 'start'){
			updateATP();
			clearTimeout(fun.move());
			fun.move();
		}
	}
}

function updateATP(){
	doc('atp',Math.floor(EVO.atp));
	color('evolution');
	color('move');
	if (EVO.mitosisSwitch == 'on'){color('mitosis');}
	if (EVO.one.cytoplasm > -1){color('cytoplasm');}
	if (EVO.ciliaSwitch == 'on') {color('cilia');}
	if (EVO.flagellumSwitch == 'on') {color('flagellum');}
	if (EVO.rnaSwitch == 'on') {color('rna');}
}

function manualClick(){
	if (EVO.food > 0){
		var click = 1;
		if (EVO.one.metabolismType == 'Aerobic Respiration'){click *= fun.metabolism();}
		EVO.atp += click / fun.virus[0];
		EVO.food -= 1;
		updateFood();
		updateATP();
	}
}

function autoClick(){
	var feed = EVO.one.cilia;
	if (feed < 1){feed = 1;}
	if (EVO.food >= feed){
		if (EVO.one.metabolismType == 'Aerobic Respiration'){feed *= fun.metabolism();}
		EVO.atp += feed / fun.virus[0];
		EVO.food -= feed;
		updateFood();
		updateATP();
	} else {
		EVO.atp += EVO.food / fun.virus[0];
		EVO.food -= EVO.food;
		updateFood();
		updateATP();
	}
}

function timer(){
	var time;
	if (EVO.ciliaSwitch == 'on' && EVO.one.cilia > 0){time = 1001-EVO.one.cytoplasm;}
	else {time = 6000-(EVO.membraneScore*2000);}
	autoClick();
	if (EVO.one.metabolismType == 'Photophosphorylation'){photosynth();}
	setTimeout(timer, time);
}

function photosynth(){
	EVO.photosynthesis += (1+(EVO.sun/100)) * fun.metabolism();
	while (EVO.photosynthesis >= 100){
		EVO.photosynthesis -= 100;
		EVO.atp += 1 / fun.virus[0];
	}
	doc('photosynthesis',Math.floor(EVO.photosynthesis)+'%');
	updateATP();
}

function evolutionMath(){return Math.floor(10*Math.pow(1.5,EVO.evolution));}

function buyEvolution(){
	if(EVO.atp >= evolutionMath()){
		EVO.atp -= evolutionMath();
		EVO.evolution += 1;
		updateEvolution();
		updateATP();
	}
	doc('evolutionCost',evolutionMath());
}

var cost = {
	"doublebubble": 1,
	"phospholipid": 2,
	"cellwall": 10,
	"mitosis": 4,
	"cytoplasm": 1,
	"cytoskeleton": 2,
	"nucleus": 10,
	"cilfla": 3,
	"rna": 4,
	"dna": 15,
	"metabolism": 5,
	"mitochondria": 20,
	"multicell": 5,
}

function updateEvolution(){
	var creation = EVO.evolution - EVO.evolved + EVO.bonus + REC.bonus;
	doc('evolution',creation);
	var membraneCode = '';
	var mitosisCode = '';
	var cytoplasmCode = '';
	var cytoskeletonCode = '';
	var nucleusCode = '';
	var ciliaCode = '';
	var flagellumCode = '';
	var aerobicrespirationCode = '';
	var photophosphorylationCode = '';
	var mitochondriaCode = '';
	var naCode = '';
	var multicelluarCode = '';
	var sizeCode = '';
	if (EVO.membraneScore == 0 && creation >= cost.doublebubble){
		EVO.evolutionSwitch = 'on';
		membraneCode = '<p title="Your first evolution.  Double wall bubbles were the first evolution of cells." onclick="evos(\'membrane\')"><b style="color:blue">Double Bubble</b></p>';
	}
	if (EVO.membraneScore == 1 && creation >= cost.phospholipid){
		EVO.evolutionSwitch = 'on';
		membraneCode = '<p title="Phospholipid membranes are aligned amphipathic molecule chains.  All modern cells carry this pivitol characteristic." onclick="evos(\'membrane\')"><b style="color:blue">Phospholipid</b></p>';
	}
	if (EVO.membraneScore == 2 && EVO.cytoskeleton == 'cytoskeleton' && creation >= cost.cellwall){
		EVO.evolutionSwitch = 'on';
		membraneCode = '<p title="Cell Wall is a thick hard shell around a cells Phospholipid membrane.  It greatly enahnces a cells durability but drasticly reduces a cells mobility."  onclick="evos(\'membrane\')"><b style="color:blue">Cell Wall</b></p>';
	}
	if (EVO.rnaSwitch == 'on' && EVO.membraneScore >= 2 && EVO.mitosisSwitch == 'off' && creation >= cost.mitosis){
		EVO.evolutionSwitch = 'on';
		mitosisCode = '<p title="Your cell has evolved basic reproduction." onclick="evos(\'reproduce\')"><b style="color:blue">Mitosis</b></p>';
	}
	if (EVO.membraneScore > 0 && EVO.one.cytoplasm == -1 && creation >= cost.cytoplasm){
		EVO.evolutionSwitch = 'on';
		cytoplasmCode = '<p title="Cytoplasm is the liquid inside cells which all organelles float." onclick="evos(\'cytoplasm\')"><b style="color:blue">Cytoplasm</b></p>';
	}		
	if (EVO.membraneScore >= 2 && EVO.cytoskeleton === null && creation >= cost.cytoskeleton){
		EVO.evolutionSwitch = 'on';
		cytoskeletonCode = '<p title="The innernal and external structure of a cell is skeletally held together via microfilaments, intermediate filaments, and microtubules." onclick="evos(\'cytoskeleton\')"><b style="color:blue">Cytoskeleton</b></p>';
	}
	if (EVO.one.metabolism >= 0 && EVO.cytoskeleton == 'cytoskeleton' && EVO.nucleus === null && creation >= cost.nucleus){
		EVO.evolutionSwitch = 'on';
		nucleusCode = '<p title="Evolve a unified cell core." onclick="evos(\'nucleus\')"><b style="color:blue">Nucleus</b></p>';
	}
	if (EVO.cytoskeleton == 'cytoskeleton' && EVO.ciliaSwitch == 'off' && creation >= cost.cilfla){
		EVO.evolutionSwitch = 'on';
		ciliaCode = '<p title="Cilia are used to gather food for the cell." onclick="evos(\'cilia\')"><b style="color:blue">Cilia</b></p>';
	}
	if (EVO.cytoskeleton == 'cytoskeleton' && EVO.flagellumSwitch == 'off' && creation >= cost.cilfla){
		EVO.evolutionSwitch = 'on';
		flagellumCode = '<p title="A Flagellum is used to move the cell around as it hunts for food." onclick="evos(\'flagellum\')"><b style="color:blue">Flagellum</b></p>';
	}
	if (EVO.rnaSwitch == 'on' && EVO.one.metabolism == -1 && creation >= cost.metabolism){
		EVO.evolutionSwitch = 'on';
		aerobicrespirationCode = '<p title="Evolve a Aerobic Respiration metabolism to improve ATP creation." onclick="evos(\'aero\')"><b style="color:blue">Aerobic Respiration</b></p>';
	}
	if (EVO.rnaSwitch == 'on' && EVO.one.metabolism == -1 && creation >= cost.metabolism){
		EVO.evolutionSwitch = 'on';
		photophosphorylationCode = '<p title="Evolve a Photophosphorylation metabolism to improve ATP creation." onclick="evos(\'photo\')"><b style="color:blue">Photophosphorylation</b></p>';
	}
	if (EVO.dnaSwitch == 'on' && EVO.one.mitochondria == -1 && creation >= cost.mitochondria){
		EVO.evolutionSwitch = 'on';
		mitochondriaCode = '<p title="Evolve a centralized metabolic core." onclick="evos(\'mito\')"><b style="color:blue">Mitochondria</b></p>';
	}
	if (EVO.rnaSwitch == 'off' && creation >= cost.rna){
		EVO.evolutionSwitch = 'on';
		naCode = '<p title="Ribonucleic Acid, One of the grand building blocks of all life." onclick="evos(\'rna\')"><b style="color:blue">RNA</b></p>';
	}
	if (EVO.dnaSwitch == 'off' && EVO.nucleus == 'nucleus' && creation >= cost.dna){
		EVO.evolutionSwitch = 'on';
		naCode = '<p title="Deoxyribonucleic Acid, One of the grand building blocks of all life." onclick="evos(\'dna\')"><b style="color:blue">DNA</b></p>';
	}
	if (EVO.stage > EVO.size.stage && EVO.one.metabolism >= 0 && creation >= EVO.size.max+1){
		EVO.evolutionSwitch = 'on';
		sizeCode = '<p title="Growing larger has many effects." onclick="evos(\'size\')"><b style="color:blue">Size ' + (EVO.size.max+1) + '</b></p>';
	}
	if (EVO.one.metabolism >= 0 && EVO.mitosisSwitch == 'on' && creation >= cost.multicell && (EVO.atp/2 + (EVO.rnaB-EVO.rnaS)*100 + (EVO.dnaB-EVO.dnaS)*10000) > 2000){
		EVO.evolutionSwitch = 'on';
		multicelluarCode = '<p title="MultiCelluar Evolution" onclick="multicelluar()"><b style="color:blue">MultiCelluar</b></p>';
	}
	var evolutionCode = '<p style="color:gold" title="Choose your evolution carefully."><b>Evolutions</b></p>';
	if (EVO.evolutionSwitch == 'off') {doc("evolutionUpgrade",'');}
	if (EVO.evolutionSwitch == 'on') {doc("evolutionUpgrade",evolutionCode + membraneCode + cytoplasmCode + cytoskeletonCode + ciliaCode + flagellumCode + mitosisCode + aerobicrespirationCode + photophosphorylationCode + nucleusCode + mitochondriaCode + naCode + multicelluarCode + sizeCode);}
}

function evos(x){
	if (x == 'membrane'){
		if (EVO.membraneScore == 0){EVO.evolved += cost.doublebubble;}
		if (EVO.membraneScore == 1){EVO.evolved += cost.phospholipid;}
		if (EVO.membraneScore == 2){EVO.evolved += cost.cellwall;}
		EVO.membraneScore += 1;
	}
	if (EVO.membraneScore == 1){doc('membrane','Double Bubble');}
	if (EVO.membraneScore == 2){doc('membrane','Phospholipid');}
	if (EVO.membraneScore == 3){doc('membrane','Cell Wall');}
	if (x == 'reproduce'){
		EVO.mitosisSwitch = 'on';
		EVO.evolved += cost.mitosis;
	}
	if (EVO.mitosisSwitch == 'on'){
		doc('mitosisHTML','Mitosis');
		doc('reproduceHTML','<div onmouseover="tip(\'mitosisTip\')" onmouseout="tap(\'mitosisTip\')" onclick="buyMitosis()"><p><b id="mitosisButton">Perform Mitosis</b><br>Mitosis Chance: ~<span id="mitosis"></span>%<br>Mitosis Cost: <span id="mitosisCost"></span></p></div><span id="mitosisTip"></span>');
		doc('mitosis',EVO.mitosisChance);
		doc('mitosisCost',mitosisMath());
	}
	if (x == 'cytoplasm'){
		EVO.one.cytoplasm = 0;
		EVO.evolved += cost.cytoplasm;
	}
	if (EVO.one.cytoplasm > -1){
		doc('cytoplasmHTML','<div onmouseover="tip(\'cytoplasmTip\')" onmouseout="tap(\'cytoplasmTip\')" onclick="buyCytoplasm()"><p><b id="cytoplasmButton">Buy Cytoplasm</b><br>Cytoplasm: <span id="cytoplasm"></span> micro liters<br>Cytoplasm Cost: <span id="cytoplasmCost"></span></p></div><span id="cytoplasmTip"></span>');
		doc('cytoplasm',EVO.one.cytoplasm);
		doc('cytoplasmCost',cytoplasmMath());
		}
	if (x == 'cytoskeleton'){
		EVO.cytoskeleton = 'cytoskeleton';
		EVO.evolved += cost.cytoskeleton;
	}
	if (EVO.cytoskeleton == 'cytoskeleton'){doc('cytoskeletonHTML','Cytoskeleton');}
	if (x == 'nucleus'){
		EVO.nucleus = 'nucleus';
		EVO.evolved += cost.nucleus;
	}
	if (EVO.nucleus == 'nucleus'){doc('nucleusHTML','Nucleus');}
	if (x == 'cilia'){
		EVO.ciliaSwitch = 'on';
		EVO.evolved += cost.cilfla;
	}
	if (EVO.ciliaSwitch == 'on'){
		doc('ciliaHTML','<div onmouseover="tip(\'ciliaTip\')" onmouseout="tap(\'ciliaTip\')" onclick="cilfla(\'cilia\')"><p><b id="ciliaButton">Grow Cilia</b><br>Cilia: <span id="cilia"></span></p></div><span id="ciliaTip"></span>');
		doc('cilia',EVO.one.cilia);
	}
	if (x == 'flagellum'){
		EVO.flagellumSwitch = 'on';
		EVO.evolved += cost.cilfla;
	}
	if (EVO.flagellumSwitch == 'on'){
		doc('flagellumHTML','<div onmouseover="tip(\'flagellumTip\')" onmouseout="tap(\'flagellumTip\')" onclick="cilfla(\'flagellum\')"><p"><b id="flagellumButton">Grow Flagellum</b><br>Flagellum: <span id="flagellum"></span></p></div><span id="flagellumTip"></span>');
		doc('flagellum',EVO.one.flagellum);
	}
	doc('moveHTML',1000-EVO.one.flagellum);
	if (EVO.ciliaSwitch == 'on' || EVO.flagellumSwitch == 'on'){
		doc('cilflaHTML','<p>Cost: <span id="cilflaCost"></span></p>');
		doc('cilflaCost',cilflaMath());
	}
	if (x == 'rna'){
		EVO.rnaSwitch = 'on';
		EVO.evolved += cost.rna;
	}
	if (EVO.rnaSwitch == 'on'){
		doc('rnaHTML','<div onmouseover="tip(\'rnaTip\')" onmouseout="tap(\'rnaTip\')" onclick="buyRNA()"><p><b id="rnaButton">Make RNA</b><br>RNA: <span id="rna"></span><br>RNA Cost: <span id="rnaCost"></span></p></div><span id="rnaTip"></span>');
		doc('rnaCost',naMath('rnaB'));
	}
	if (x == 'dna'){
		EVO.dnaSwitch = 'on';
		EVO.evolved += cost.dna;
	}
	if (EVO.dnaSwitch == 'on'){
		doc('dnaHTML','<div onmouseover="tip(\'dnaTip\')" onmouseout="tap(\'dnaTip\')" onclick="buyDNA()"><p><b id="dnaButton">Make DNA</b><br>DNA: <span id="dna"></span><br>DNA Cost: <span id="dnaCost"></span></p></div><span id="dnaTip"></span>');
		doc('dnaCost',naMath('dnaB'));
	}
	if (x == 'aero'){
		EVO.one.metabolismType = 'Aerobic Respiration';
		EVO.one.metabolism= 0;
		EVO.evolved += cost.metabolism;
	}
	if (x == 'photo') {
		EVO.one.metabolismType = 'Photophosphorylation';
		EVO.one.metabolism = 0;
		EVO.evolved += cost.metabolism;
	}
	if (EVO.one.metabolism > -1){doc('metabolismType',EVO.one.metabolismType);
		doc('metabolismHTML','<div onmouseover="tip(\'metabolismTip\')" onmouseout="tap(\'metabolismTip\')" onclick="buyMetabolism()"><p><b id="metabolismButton">Improve Metabolism</b><br>Metabolism: +<span id="metabolism"></span>%<br>Metabolism Cost: <span id="metabolismCost"></span></p></div><span id="metabolismTip"></span>');
		doc('metabolism',EVO.one.metabolism);
		doc('metabolismCost',metabolismMath('metabolism'));
	}
	if (x == 'mito'){
		EVO.one.mitochondria = 0;
		EVO.evolved += cost.mitochondria;
	}
	if (EVO.one.mitochondria > -1){
		doc('mitochondriaHTML','<div onmouseover="tip(\'mitochondriaTip\')" onmouseout="tap(\'mitochondriaTip\')" onclick="buyMitochondria()"><p><b id="mitochondriaButton">Improve Mitochondria</b><br>Mitochondria: +<span id="mitochondria"></span>%<br>Mitochondria Cost: <span id="mitochondriaCost"></span></p></div><span id="mitochondriaTip"></span>');
		doc('mitochondria',EVO.one.mitochondria);
		doc('mitochondriaCost',metabolismMath('mitochondria'));
	}
	if (x == 'size'){
		EVO.size.max += 1;
		EVO.size.stage += 1;
		EVO.evolved += EVO.size.max;
	}
	if (EVO.size.max > 0){
		doc('boostHTML','<p>Boosted Evolutions<br><br>' + 'Size: ' + EVO.size.max + '</p>');
	}
	EVO.evolutionSwitch = 'off';
	updateATP();
	if (EVO.rnaSwitch == 'on'){updateRNA();}
	if (EVO.dnaSwitch == 'on'){updateDNA();}
	updateEvolution();
}

function mitosisMath(){return Math.floor(fun.cytoplasm()*(10*Math.pow(1.1,EVO.mitosis))/100);}

function buyMitosis(){
	if(EVO.atp >= mitosisMath()){
		EVO.atp -= mitosisMath();
		EVO.mitosis += 1;
		updateATP();
		evoChance();
	}
	doc('mitosisCost',mitosisMath());
}

function evoChance(){
	if ((Math.floor(Math.random()*100)+1) > EVO.mitosisChance){
		EVO.mitosisLearn += 1;
		if (EVO.mitosisLearn > EVO.mitosisChance){
			EVO.mitosisLearn -= (EVO.mitosisChance + 1);
			EVO.mitosisChance += 1; 
		}
	} else {
		EVO.bonus += 1;
		EVO.mitosisLimit -= 1;
		if (EVO.mitosisLimit < 1){EVO.mitosisChance -= 1;}
		updateEvolution();
	}
	doc('mitosis',EVO.mitosisChance);
}

function cytoplasmMath(){return Math.floor(10*Math.pow(1.1,EVO.one.cytoplasm));}

function buyCytoplasm(){
	if(EVO.atp >= cytoplasmMath() && EVO.one.cytoplasm < 1000){
		EVO.atp -= cytoplasmMath();
		EVO.one.cytoplasm += 1;
		doc('cytoplasm',EVO.one.cytoplasm);
		updateATP();
	}
	doc('cytoplasmCost',cytoplasmMath());
	if (EVO.mitosisSwitch == 'on'){doc('mitosisCost',mitosisMath());}
	if (EVO.ciliaSwitch == 'on' || EVO.flagellumSwitch == 'on'){doc('cilflaCost',cilflaMath());}
	if (EVO.one.metabolism > -1){doc('metabolismCost',metabolismMath('metabolism'));}
	if (EVO.one.mitochondria > -1){doc('mitochondriaCost',metabolismMath('mitochondria'));}
	if (EVO.rnaSwitch == 'on'){doc('rnaCost',naMath('rnaB'));}
	if (EVO.dnaSwitch == 'on'){doc('dnaCost',naMath('dnaB'));}
}

function cilflaMath() {return Math.floor(fun.cytoplasm()*(10*Math.pow(1.1,(EVO.one.cilia + EVO.one.flagellum)))/100);}

function cilfla(x){
	if (EVO.atp >= cilflaMath() && EVO.one[x] < 1000){
		EVO.atp -= cilflaMath();
		EVO.one[x] += 1;
		doc(x,EVO.one[x]);
		updateATP();
	}
	doc('cilflaCost',cilflaMath());
	doc('moveHTML',1000-EVO.one.flagellum);
}

function metabolismMath(x){return Math.floor(fun.cytoplasm()*(10*Math.pow(2,EVO[x]))/100);}

function buyMetabolism(){
	if(EVO.rnaB-EVO.rnaS >= metabolismMath('metabolism')){
		EVO.rnaS += metabolismMath('metabolism');
		EVO.one.metabolism += 1;
		updateRNA();
		doc('metabolism',EVO.one.metabolism);
	}
	doc('metabolismCost',metabolismMath('metabolism'));
}

function buyMitochondria(){
	if(EVO.dnaB-EVO.dnaS >= metabolismMath('mitochondria')){
		EVO.dnaS += metabolismMath('mitochondria');
		EVO.one.mitochondria += 1;
		updateDNA();
		doc('mitochondria',EVO.one.mitochondria);
	}
	doc('mitochondriaCost',metabolismMath('mitochondria'));
}

function naMath(x){return Math.floor(fun.cytoplasm()*(10*Math.pow(1.01,EVO[x]))/100);}

function buyRNA(){
	if(EVO.atp >= naMath('rnaB')){
		EVO.atp -= naMath('rnaB');
		EVO.rnaB += 1;
		updateATP();
		updateRNA();
	}
	doc('rnaCost',naMath('rnaB'));
}

function updateRNA(){
	doc('rna',EVO.rnaB-EVO.rnaS);
	if (EVO.one.metabolism >= 0){color('metabolism');}
	if (EVO.dnaSwitch == 'on') {color('dna');}
}

function buyDNA(){
	if(EVO.rnaB-EVO.rnaS >= naMath('dnaB')){
		EVO.rnaS += naMath('dnaB');
		EVO.dnaB += 1;
		updateRNA();
		updateDNA();
	}
	doc('dnaCost',naMath('dnaB'));
}

function updateDNA(){
	doc('dna',EVO.dnaB-EVO.dnaS);
	if (EVO.one.mitochondria >= 0){color('mitochondria');}
}

function color(x){
	var color = document.getElementById(x + 'Button');
	if (x == 'evolution' && EVO.atp >= evolutionMath()){color.style.color = 'red';}
	else if (x == 'move' && EVO.atp >= 1000 - EVO.one.flagellum){color.style.color = 'red';}
	else if (x == 'mitosis' && EVO.atp >= mitosisMath()){color.style.color = 'red';}
	else if (x == 'cytoplasm' && EVO.atp >= cytoplasmMath()) {color.style.color = 'red';}
	else if (x.match(/^(cilia|flagellum)$/) && EVO.atp >= cilflaMath()){color.style.color = 'red';}
	else if (x == 'rna' && EVO.atp >= naMath('rnaB')){color.style.color = 'red';}
	else if (x == 'dna' && EVO.rnaB-EVO.rnaS >= naMath('dnaB')){color.style.color = 'red';}
	else if (x == 'metabolism' && EVO.rnaB-EVO.rnaS >= metabolismMath('metabolism')){color.style.color = 'red';}
	else if (x == 'mitochondria' && EVO.dnaB-EVO.dnaS >= metabolismMath('mitochondria')){color.style.color = 'red';}
	else {color.style.color = 'green';}
}

function multicelluar(){
	EVO.evolved += cost.multicell;
	var evolve = {
		"stage": 2,
		"date": Date.now(),
		"one": {
			"cilia": EVO.one.cilia,
			"metabolism": EVO.one.metabolism,
			"mitochondria": EVO.one.mitochondria,
		},
		"metabolismType": EVO.one.metabolismType,
		"photosynthesis": EVO.photosynthesis,
		"sunSwitch": EVO.sunSwitch,
		"sun": EVO.sun,
		"food": EVO.food/2,
		"nutrient": EVO.atp/2 + (EVO.rnaB-EVO.rnaS)*100 + (EVO.dnaB-EVO.dnaS)*10000,
		"evolution": EVO.evolution,
		"evolved": EVO.evolved,
		"bonus": EVO.bonus,
	}
	if (evolve.mitochondria < 0){evolve.mitochondria = 0;}
	localStorage.setItem("EVOE", JSON.stringify(evolve));
	clearTimeout(save);
	localStorage.removeItem("EVO");
	window.location.assign("EVO2.html");
}

function tip(x){
	if (x == 'grow'){doc(x,'<p>Click to grow your Cell.<br>Adenosine Triphosphate is how your cell grows.</p>');}
	if (x == 'mitosisTip'){doc(x,'<p>Click to under go mitosis and reproduce a copy of your cell.<br>Each upgrade rolls a random chance to gain a Evolution Point.</p>');}
	if (x == 'cytoplasmTip'){doc(x, '<p>Click to add Cytoplasm to your cell.<br>Cilia processes food faster.<br>All upgrade costs are reduced by a small amount</p>');}
	if (x == 'ciliaTip'){doc(x, '<p>Click to grow more Cilia for your cell.<br>Cilia gathers food for your metabolism to convert to ATP.</p>');}
	if (x == 'flagellumTip'){doc(x, '<p>Click to grow a stronger Flagellum for your cell.<br>Flagellum reduces the cost of movement for your cell and makes it easier to find more food.</p>');}
	if (x == 'rnaTip'){doc(x, '<p>Click to make RNA for your cell.<br>RNA is required in advanced growth and evolution.<br>RNA requires ATP to create.</p>');}
	if (x == 'dnaTip'){doc(x, '<p>Click to make DNA for your cell.<br>DNA is required in advanced growth and evolution.<br>DNA requires RNA to create.</p>');}
	if (x == 'metabolismTip'){doc(x, '<p>Click to improve your cell\'s metabolism.<br>Your cells Metabolism costs RNA to improve.</p>');}
	if (x == 'mitochondriaTip'){doc(x, 'Click to improve your cell\'s mitochondria.<br>Mitochondria costs DNA to improve.<br>Mitochondria further enhances your metabolism.</p>');}
	if (x == 'evoTip') {doc(x,'<p>Click for a chance to gain evolution points to evolve your cell.<br>Evolution points are used to purchase evolutions.</p>');}
}

function tap(x){doc(x,'');}