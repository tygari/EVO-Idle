var EVO = {
	"version": 0,
	"stage": 2,
	"date": Date.now(),
	"one": {},
	"two": {
		"celladhesion": -1,
		"balance": 0,
		"nerve": 0,
		"vascular": 0,
		"muscle": 0,
		"respiratory": 0,
		"digestive": 0,
		"excretion": 0,
		"sight": 0,
	},
	"sun":{},
	"size": {
		"max": 0,
		"stage": 0,
	},
	"current": 50,
	"currentDamage": 0,
	"adhesionLearn": 0,
	"ph": 70,
	"phd": 0,
	"salinity": 35,
	"salinityCurse": 0,
	"osmisisLearn": 0,
	"toxin": 0,
	"food": 0,
	"nutrient": 0,
	"evolution": 0,
	"evolved": 0,
	"bonus": 0,
	"evolutionSwitch": 'off',
	"cellB": 0,
	"cellL": 0,
	"cellT": 0,
	"sex": 0,
	"communication": null,
	"quorum": null,
	"biofilm": null,
	"eps": 0,
	"organization": null,
	"osmoregulation": -1,
	"motility": 0,
	"motilitySwitch": 'off',
	"motilityLearn": 0,
	"specialization": null,
	"specialized": 1,
	"balanceSwitch": 'off',
	"nerveSwitch": 'off',
	"vascularSwitch": 'off',
	"muscleSwitch": 'off',
	"respiratorySwitch": 'off',
	"digestiveSwitch": 'off',
	"excretionSwitch": 'off',
	"sightSwitch": 'off',
	"circular": null,
	"radial": null,
	"dependency": null,
	"combat": {
		"cbtMax": 0,
		"cbtevo": [],
		"mhp": 0,
		"hp": 10,
		"msp": 0,
		"sp": 10,
		"exp": 0,
		"scar": 0,
		"offG": 0,
		"off": 0,
		"defG": 0,
		"def": 0,
		"spdG": 0,
		"spd": 0,
		"splG": 0,
		"spl": 0,
		"run": 0,
		"won": 0,
		"lost": 0,
	},
};

var fun = {
	"add":{
		"balance": function(){return EVO.two.balance;},
		"nerve": function(){return EVO.two.nerve;},
		"vascular": function(){return EVO.two.vascular;},
		"muscle": function(){return EVO.two.muscle;},
		"respiratory": function(){return EVO.two.respiratory;},
		"digestive": function(){return EVO.two.digestive;},
		"excretion": function(){return EVO.two.excretion;},
		"sight": function(){return EVO.two.sight;},
	},
	"mul":{
		"metabolism": function(){return (1+(EVO.one.metabolism/100))*(1+(EVO.one.mitochondria/100));},
		"balance": function(){return (1-(EVO.two.balance/100));},
		"nerve": function(){return (1+(EVO.two.nerve/100));},
		"vascular": function(){return (1+(EVO.two.vascular/100));},
		"muscle": function(){return (1+(EVO.two.muscle/100));},
		"respiratory": function(){return (1+(EVO.two.respiratory/100));},
		"digestive": function(){return (1+(EVO.two.digestive/100));},
		"excretion": function(){return (1+(EVO.two.excretion/100));},
		"sight": function(){return (1+(EVO.two.sight/100));},
		"eps": function(){return (1-(EVO.phd/100));},
	},
	"food":{
		"max": function(){return ((REC.food.max+EVO.size.max)*10)+100;},
		"min": function(){return (REC.food.min*10)+(EVO.size.max*5);},
	},
	"failtimer": function(){setTimeout(eventEnd, (Math.floor((Math.random()*240000)+1)));},
	"move": function(){setTimeout(move, 3600000);},
};

function start(){
	if (localStorage.getItem("REC") !== null){REC = JSON.parse(localStorage.getItem("REC"));}
	if (localStorage.getItem("EVO") !== null){
		var savecheck = JSON.parse(localStorage.getItem("EVO"));
		if (savecheck.stage == 2){
			EVO = JSON.parse(localStorage.getItem("EVO"));
		}
	}
	if (localStorage.getItem("EVOE") !== null){
		var checksave = JSON.parse(localStorage.getItem("EVOE"));
		if (checksave.stage == 2){
			EVO.one = checksave.one;
			EVO.sun = checksave.sun;
			EVO.food = checksave.food;
			EVO.size.max = checksave.size;
			EVO.nutrient = checksave.nutrient;
			EVO.evolution = checksave.evolution;
			EVO.evolved = checksave.evolved;
			EVO.bonus = checksave.bonus;
			EVO.motility = EVO.one.flagellum;
			EVO.date = Date.now();
			localStorage.setItem("EVO", JSON.stringify(EVO));
			localStorage.removeItem("EVOE");
		}
	}
	evos();
	if (EVO.specialized > 1){specialized();}
	var offline = Date.now() - EVO.date;
	var speedUp = [0, 0, 0, 0, 0];
	while (offline >= speedUp[0]){
		if (speedUp[0] >= speedUp[1] + (1001-(EVO.two.vascular*10)+EVO.salinityCurse)){
			autoClick();
			if (EVO.metabolismType == 'Photophosphorylation') {photosynth();}
			speedUp[1] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[2] + 3600000){
			move('start');
			speedUp[2] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[3] + 60000){
			environment('start');
			speedUp[3] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[4] + Math.ceil(1800000*((100-(EVO.two.balance/2))/100))){
			cellTimer(start);
			speedUp[4] = speedUp[0];
		}
		speedUp[0] += 1;
	}
	EVO.date = Date.now();
	save(Date.now());
	doc('metabolismType',EVO.one.metabolismType);
	updateFood();
	updateNutrient();
	doc('evolutionCost',evolutionMath());
	doc('moveHTML',2000-EVO.motility-EVO.two.muscle*10);
	doc('current',(EVO.current/10));
	doc('ph',(EVO.ph/10));
	doc('salinity',EVO.salinity);
	light();
	setTimeout(environment, 60000);
	setTimeout(timer, 1000);
	setTimeout(cellTimer, 1800000);
	setTimeout(events, 300000);
	setTimeout(swirly, 30, 'on', 'on', Math.floor(Math.random()*window.innerWidth)-50, Math.floor(Math.random()*window.innerHeight)-50, 0);
}

function events(){
	var swch = 'off';
	doc('eventHTML','<div style="color:white; border-style: hidden; text-align:center"><p><span id="event1HTML"></span><br><span id="event2HTML"></span></p></div>');
	var random = Math.floor((Math.random() * 100)+1)
	if (0 < random && 10 >= random && EVO.specialized > 1 && EVO.cellB-EVO.cellL+EVO.cellT > 10 && EVO.nutrient >= 2000-EVO.motility-(EVO.two.muscle*10) && cost.fight == 'off'){
		swch = 'on';
		var res = 2000 - EVO.motility - (EVO.two.muscle*10);
		EVO.nutrient -= res;
		updateNutrient();
		doc('event1HTML','An aggressive colony of cells has entered your area.  They are attacking you.');
		cost.fight = 'on';
		cbt(res,'event',Math.floor(Math.random()*3));
	}
	if (10 < random && 20 >= random){
		swch = 'on';
		doc('event1HTML','The area has had an influx of food.');
		EVO.food += Math.floor((Math.random()*5000)+1);
		setTimeout(eventEnd, 60000);
	}
	if (swch == 'off') {doc('eventHTML',''); setTimeout(events, 300000);}
}

function eventEnd(){
	doc('eventHTML','');
	setTimeout(events, (Math.floor((Math.random() * 240000)+1)));
}

function environment(x){
	currentMath();
	phMath();
	salinityMath();
	sun();
	phDmg();
	if (EVO.cellB-EVO.cellL > 0){cellAdhesion();}
	if (EVO.cellB-EVO.cellL > 0){toxinMath();}
	if (x !== 'start'){setTimeout(environment, 60000);}
}

function currentMath(){
	var currents = Math.floor(Math.random()*3);
	if (currents == 0 && EVO.current < 100){EVO.current += 1;}
	if (currents == 1 && EVO.current > 0){EVO.current -= 1;}
	doc('current',(EVO.current/10));
}

function phMath(){
	var ph = Math.floor(Math.random()*3);
	if (ph == 0 && EVO.ph < 140){EVO.ph += 1;}
	if (ph == 1 && EVO.ph > 0){EVO.ph -= 1;}
	doc('ph',(EVO.ph/10));
}

function salinityMath(){
	var salinity = Math.floor(Math.random()*3);
	if (salinity == 0 && EVO.salinity < 40){EVO.salinity += 1;}
	if (salinity == 1 && EVO.salinity > 30){EVO.salinity -= 1;}
	doc('salinity',EVO.salinity);
	salinityDebuff();
}

function toxinMath(){
	EVO.toxin += ((EVO.cellB-EVO.cellL+EVO.cellT)/10)*(1+((EVO.two.digestive-EVO.two.excretion)/100));
	if (EVO.toxin > (EVO.cellB-EVO.cellL+EVO.cellT)){
		EVO.toxin = 0;
		EVO.cellL += 1;
		cellUpdate();
	}
}

function updateFood(){
	if (EVO.food > 20000){doc('food','Bountiful');}
	else if (EVO.food > 15000){doc('food','Abundant');}
	else if (EVO.food > 10000){doc('food','Plentiful');}
	else if (EVO.food > 5000){doc('food','Sparse');}
	else if (EVO.food > 0){doc('food','Scarce');}
	else {doc('food','None');}
}

function move(x){
	var moveCost = (2000 - EVO.motility - (EVO.two.muscle*10))*(1+(EVO.size.max/100));
	if (EVO.nutrient >= moveCost){
		EVO.nutrient -= moveCost;
		EVO.food = Math.floor(((Math.random()*((fun.food.max()-fun.food.min())*200)*fun.mul.muscle())+(fun.food.min()*200))*fun.mul.sight());
		EVO.current = Math.floor(Math.random()*100)+1;
		currentMath();
		EVO.ph = Math.floor(Math.random()*140);
		phMath();
		EVO.salinity = Math.floor(Math.random()*11)+30;
		salinityMath();
		if (EVO.motilitySwitch == 'on'){swarmingMotility();}
		if (x !== 'start'){
			updateNutrient();
			clearTimeout(fun.move());
			fun.move();
		}
	}
}

function updateNutrient(){
	doc('nutrient',Math.floor(EVO.nutrient));
	color('cell');
	color('evolution');
	color('move');
	if (EVO.biofilm == 'Biofilm'){color('eps');}
	if (EVO.balanceSwitch == 'on'){color('balance');}
	if (EVO.nerveSwitch == 'on'){color('nerve');}
	if (EVO.vascularSwitch == 'on'){color('vascular');}
	if (EVO.muscleSwitch == 'on'){color('muscle');}
	if (EVO.respiratorySwitch == 'on'){color('respiratory');}
	if (EVO.digestiveSwitch == 'on'){color('digestive');}
	if (EVO.excretionSwitch == 'on'){color('excretion');}
	if (EVO.sightSwitch == 'on'){color('sight');}
}

function autoClick(){
	var feed = Math.floor(EVO.one.cilia/2) + EVO.cellB-EVO.cellL + EVO.two.digestive;
	if (EVO.food >= feed){
		EVO.food -= feed;
		if (EVO.metabolismType == 'Aerobic Respiration'){feed *= fun.mul.metabolism() * fun.mul.respiratory() * fun.mul.eps();}
		EVO.nutrient += feed;
		updateFood();
		updateNutrient();
	} else {
		EVO.nutrient += EVO.food;
		EVO.food -= EVO.food;
		updateFood();
		updateNutrient();
	}
}

function timer(){
	autoClick();
	if (EVO.metabolismType == 'Photophosphorylation'){photosynth();}
	setTimeout(timer, (1001-(EVO.two.vascular*10)+EVO.salinityCurse));
}

function photosynth(){
	EVO.sun.photosynthesis += (1+(EVO.sun/100)) * fun.mul.metabolism() * fun.mul.respiratory() * fun.mul.eps();
	while (EVO.sun.photosynthesis >= 100){
		EVO.sun.photosynthesis -= 100;
		EVO.nutrient += 1;
	}
	doc('photosynthesis',Math.floor(EVO.sun.photosynthesis)+'%');
	updateNutrient();
}

function cellMath(x){
	if (x == undefined){x = 1;}
	var cnt = 0;
	for (var i = 0; i < x; i++){cnt += Math.floor(10*Math.pow(1.1,EVO.cellB+i));}
	return cnt;
}

function cellTimer(x){
	if (EVO.cellB > 0 && EVO.cellL > 0 && EVO.cellB >= EVO.cellL){EVO.cellB -=1; EVO.cellL -=1;}
	if (x !== 'start'){setTimeout(cellTimer, Math.ceil(1800000*((100-(EVO.two.balance/2))/100)));}
}

function buyCell(x){
	if (x == undefined){x = 1;}
	if (EVO.nutrient >= cellMath(x)){
		EVO.nutrient -= cellMath(x);
		EVO.cellB += x;
		updateNutrient();
		cellUpdate();
		updateEvolution();
	}
	if (EVO.quorum == 'sensing'){doc('cellCost',cellMath());}
}

function cellUpdate(){if (EVO.quorum == 'sensing'){doc('cell',EVO.cellB-EVO.cellL);}}

function evolutionMath(){return Math.floor(10*Math.pow(1.5-(EVO.sex/10),EVO.evolution));}

function buyEvolution(){
	if(EVO.nutrient >= evolutionMath()){
		EVO.nutrient -= evolutionMath();
		EVO.evolution += 1;
		updateEvolution();
		updateNutrient();
		if (EVO.specialized > 1){evolutionCombat();}
	}
	doc('evolutionCost',evolutionMath());
}

var cost = {
	"sex": 1,
	"celladhesion": 1,
	"communication": 2,
	"quorum": 2,
	"eps": 2,
	"osmoregulation": 2,
	"organization": 3,
	"motility": 3,
	"specialization": 4,
	"specialized": 5,
	"worm": 20,
	"fight": 'off',
}

function updateEvolution(){
	var creation = EVO.evolution - EVO.evolved + EVO.bonus + REC.bonus;
	doc('evolution',creation);
	var sexCode = '';
	var celladhesionCode = '';
	var communicationCode = '';
	var quorumCode = '';
	var epsCode = '';
	var organizationCode = '';
	var osmoregulationCode = '';
	var motilityCode = '';
	var specializationCode = '';
	var balanceCode = '';
	var nerveCode = '';
	var vascularCode = '';
	var muscleCode = '';
	var respiratoryCode = '';
	var digestiveCode = '';
	var excretionCode = '';
	var sightCode = '';
	var symmetryCode = '';
	var dependencyCode = '';
	var sizeCode = '';
	var wormCode = '';
	var cell = EVO.cellB-EVO.cellL;
	var cells = 30 + (EVO.specialized * 10);
	var special = EVO.specialized * cost.specialized;
	function specializationSwitch(){
		function evo(y,z){return '<p onclick="specialized(' + y + ')"><b style="color:blue">' + z + '</b></p>';}
		if (EVO.balanceSwitch == 'off'){EVO.evolutionSwitch = 'on'; balanceCode = evo("'balance'","Statocyst");}
		if (EVO.nerveSwitch == 'off'){EVO.evolutionSwitch = 'on'; nerveCode = evo("'nerve'","Nerve");}
		if (EVO.vascularSwitch == 'off'){EVO.evolutionSwitch = 'on'; vascularCode = evo("'vascular'","Vascular");}
		if (EVO.muscleSwitch == 'off'){EVO.evolutionSwitch = 'on'; muscleCode = evo("'muscle'","Muscle");}
		if (EVO.respiratorySwitch == 'off'){EVO.evolutionSwitch = 'on'; respiratoryCode = evo("'respiratory'","Respiratory");}
		if (EVO.digestiveSwitch == 'off'){EVO.evolutionSwitch = 'on'; digestiveCode = evo("'digestive'","Digestive");}
		if (EVO.excretionSwitch == 'off'){EVO.evolutionSwitch = 'on'; excretionCode = evo("'excretion'","Excretion");}
		if (EVO.sightSwitch == 'off'){EVO.evolutionSwitch = 'on'; sightCode = evo("'sight'","Light Sense");}
	}
	if (EVO.sex == 0 && EVO.cellB-EVO.cellL >= 1 && creation >= cost.sex){
		EVO.evolutionSwitch = 'on';
		sexCode = '<p title="Your cells evolve sexual reproduction." onclick="evos(\'reproduce\')"><b style="color:blue">Sexual Reproduction</b></p>';
	}
	if (EVO.two.celladhesion == -1 && EVO.cellB-EVO.cellL >= 1 && creation >= cost.celladhesion){
		EVO.evolutionSwitch = 'on';
		celladhesionCode = '<p title="Cellular adhesion is your cell\'s ability to stick to other cells." onclick="evos(\'celladhesion\')"><b style="color:blue">Cell Adhesion</b></p>';
	}
	if (EVO.two.celladhesion >= 0 && EVO.cellB-EVO.cellL >= 10 && EVO.communication == null && creation >= cost.communication){
		EVO.evolutionSwitch = 'on';
		communicationCode = '<p title="Your cells evolve Cellular Communication." onclick="evos(\'communication\')"><b style="color:blue">Cellular Communication</b></p>';	
	}
	if (EVO.cellB-EVO.cellL >= 40 && EVO.communication == 'communication' && EVO.quorum == null && creation >= cost.quorum){
		EVO.evolutionSwitch = 'on';
		quorumCode = '<p title="Your cells evolve the ability to sense and calculate their own numbers." onclick="evos(\'quorum\')"><b style="color:blue">Quorum Sensing</b></p>';	
	}
	if (EVO.cellB-EVO.cellL >= 20 && EVO.communication == 'communication' && EVO.biofilm == null && creation >= cost.eps){
		EVO.evolutionSwitch = 'on';
		epsCode = '<p title="Your cells evolve Extracellular Polymeric Substances creatng a protective Biofilm around itself." onclick="evos(\'eps\')"><b style="color:blue">Biofilm</b></p>';	
	}
	if (EVO.cellB-EVO.cellL >= 20 && EVO.communication == 'communication' && EVO.organization == null && creation >= cost.organization){
		EVO.evolutionSwitch = 'on';
		organizationCode = '<p title="Your cells evolve Self Organization." onclick="evos(\'organization\')"><b style="color:blue">Self Organization</b></p>';	
	}
	if (EVO.cellB-EVO.cellL >= 20 && EVO.communication == 'communication' && EVO.osmoregulation == -1 && creation >= cost.osmoregulation){
		EVO.evolutionSwitch = 'on';
		osmoregulationCode = '<p title="Your cells evolves Osmoregulation." onclick="evos(\'osmoregulation\')"><b style="color:blue">Osmoregulation</b></p>';	
	}
	if (EVO.cellB-EVO.cellL >= 20 && EVO.communication == 'communication' && EVO.motilitySwitch == 'off' && creation >= cost.motility){
		EVO.evolutionSwitch = 'on';
		motilityCode = '<p title="Your cells evolve Swarming Motility." onclick="evos(\'motility\')"><b style="color:blue">Swarming Motility</b></p>';	
	}
	if (EVO.cellB-EVO.cellL >= 30 && EVO.organization == 'organization' && EVO.specialization == null && creation >= cost.specialization){
		EVO.evolutionSwitch = 'on';
		specializationCode = '<p title="Your cells evolve Specialization." onclick="evos(\'specialization\')"><b style="color:blue">Cellular Specialization</b></p>';	
	}
	if (cell >= cells && EVO.specialized < 3 && creation >= special && EVO.specialization == 'specialization'){specializationSwitch();}
	if (cell >= cells && EVO.specialized < 6 && creation >= special && EVO.circular == 'circular'){specializationSwitch();}
	if (cell >= cells && EVO.specialized < 9 && creation >= special && EVO.dependency == 'dependency'){specializationSwitch();}
	if (cell >= cells && EVO.specialized < 12 && creation >= special && EVO.radial == 'radial'){specializationSwitch();}
	if (EVO.cellB-EVO.cellL >= (30 + (EVO.specialized * 10)) && EVO.specialized == 3 && creation >= (EVO.specialized * cost.specialized)){
		EVO.evolutionSwitch = 'on';
		symmetryCode = '<p title="Your cells and newly developed systems find efficency in organization and evolve into circular symetry." onclick="specialized(\'circular\')"><b style="color:blue">Circular Symetry</b></p>';
	}
	if (EVO.cellB-EVO.cellL >= (30 + (EVO.specialized * 10)) && EVO.specialized == 6 && creation >= (EVO.specialized * cost.specialized)){
		EVO.evolutionSwitch = 'on';
		dependencyCode = '<p title="Some of your cells and newly developed systems have speclized to the degree that they can no longer survive on thier own becoming dependant upon each other." onclick="specialized(\'dependency\')"><b style="color:blue">Dependency</b></p>';
	}
	if (EVO.cellB-EVO.cellL >= (30 + (EVO.specialized * 10)) && EVO.specialized == 9 && creation >= (EVO.specialized * cost.specialized)){
		EVO.evolutionSwitch = 'on';
		symmetryCode = '<p title="Your cells and newly developed systems find efficency in organization and evolve into radial symetry." onclick="specialized(\'radial\')"><b style="color:blue">Radial Symetry</b></p>';
	}
	if (EVO.stage > EVO.size.stage && EVO.cellT+cell >= 100*(EVO.size.stage+1) && creation >= EVO.size.max+1){
		EVO.evolutionSwitch = 'on';
		sizeCode = '<p title="Growing larger has many effects." onclick="evos(\'size\')"><b style="color:blue">Size ' + (EVO.size.max+1) + '</b></p>';
	}
	if (EVO.dependency == 'dependency' && EVO.quorum == 'sensing' && EVO.biofilm == 'Biofilm' && EVO.osmoregulation > -1 && EVO.motilitySwitch == 'on' && creation >= cost.worm){
		EVO.evolutionSwitch = 'on';
		wormCode = '<p title="Worm Evolution" onclick="worm()"><b style="color:blue">Worm</b></p>';
	}
	var evolutionCode = '<p style="color:gold"><b>Evolutions</b></p>';
	if (EVO.evolutionSwitch == 'off'){doc('evolutionUpgrade','');}
	if (EVO.evolutionSwitch == 'on'){doc('evolutionUpgrade',evolutionCode + sexCode + celladhesionCode + communicationCode + quorumCode + epsCode + organizationCode + osmoregulationCode + motilityCode + specializationCode + balanceCode + nerveCode + vascularCode + muscleCode + respiratoryCode + digestiveCode + excretionCode + sightCode + symmetryCode + dependencyCode + sizeCode + wormCode);}
}

function evos(x){
	if (x == 'reproduce'){
		EVO.sex = 1;
		EVO.evolved += cost.sex;
	}
	if (EVO.sex == 1){
		doc('sexHTML','Sexual Reproduction');
		doc('evolutionCost',evolutionMath());
	}
	if (x == 'celladhesion'){
		EVO.two.celladhesion = 0;
		EVO.evolved += cost.celladhesion;
	}
	if (EVO.two.celladhesion > -1){doc('celladhesionHTML','Cellular Adhesion: <span id="celladhesion"></span>%'); doc('celladhesion',EVO.two.celladhesion);}
	if (x == 'communication'){
		EVO.communication = 'communication';
		EVO.evolved += cost.communication;
	}
	if (EVO.communication == 'communication'){doc('communicationHTML','Cellular Communication');}
	if (x == 'quorum'){
		EVO.quorum = 'sensing';
		EVO.evolved += cost.quorum;
	}
	if (EVO.quorum == 'sensing'){
		doc('quorumHTML','Quorum Sensing');
		doc('sensingHTML','<br>Cell: <span id="cell"></span><br>Cell Cost: <span id="cellCost"></span>');
		doc('cellCost',cellMath());
	}
	if (x == 'eps'){
		EVO.biofilm = 'Biofilm';
		EVO.evolved += cost.eps;
	}
	if (EVO.biofilm == 'Biofilm'){
		doc('biofilmHTML','Biofilm');
		doc('epsHTML','<div onmouseover="tip(\'epsTip\')" onmouseout="tap(\'epsTip\')" onclick="eps()"><p><b id="epsButton">Make EPS</b><span id="eps10"></span><br>EPS: <span id="eps"></span><br>EPS Cost: <span id="epsCost"></span></p></div><span id="epsTip"></span>');
		doc('eps',EVO.eps);
		doc('epsCost',epsMath());
	}
	if (x == 'organization'){
		EVO.organization = 'organization';
		EVO.evolved += cost.organization;
	}
	if (EVO.organization == 'organization'){doc('organizationHTML','Cellular Organization');}
	if (x == 'osmoregulation'){
		EVO.osmoregulation = 0;
		EVO.evolved += cost.osmoregulation;
	}
	if (EVO.osmoregulation > -1){doc('osmoregulationHTML','Osmoregulation: <span id="osmoregulation"></span>'); doc('osmoregulation',EVO.osmoregulation);}
	if (x == 'motility'){
		EVO.motilitySwitch = 'on';
		EVO.evolved += cost.motility;
	}
	if (EVO.motilitySwitch == 'on'){doc('motilityHTML','Swarming Motility: <span id="motility"></span>'); doc('motility',EVO.motility);}
	if (x == 'specialization'){
		EVO.specialization = 'specialization';
		EVO.evolved += cost.specialization;
	}
	if (EVO.specialization == 'specialization'){doc('specializationHTML','Cellular Specialization');}
	if (x == 'size'){
		EVO.size.max += 1;
		EVO.size.stage += 1;
		EVO.evolved += EVO.size.max;
	}
	if (EVO.size.max > 0){
		doc('boostHTML','<p>Boosted Evolutions<br><br>' + 'Size: ' + EVO.size.max + '</p>');
	}
	EVO.evolutionSwitch = 'off';
	updateNutrient();
	cellUpdate();
	updateEvolution();
}

function specialized(x){
	if (x !== undefined){
		EVO.evolved += (EVO.specialized * cost.specialized);
		EVO.specialized += 1;
		EVO.evolutionSwitch = 'off';
	}
	function spl(a,b,c){
		doc(a + 'HTML','<div onmouseover="mouseOn(\'' + b +'\',\'' + a + '\')" onmouseout="mouseOff(\'' + b + '\')" onclick="specialize(\'' + a + '\')"><p><b id=\'' + a + "Button" + '\'>' + c + '</b><br>' + c + ': <span id=\'' + a + '\'></span></p></div><span id=\'' + b + '\'></span>');
		doc(a,EVO.two[a]);
	}
	if (x == 'balance'){EVO.balanceSwitch = 'on';}
	if (EVO.balanceSwitch == 'on'){spl('balance','balTip','Statocyst');}
	if (x == 'nerve'){EVO.nerveSwitch = 'on';}
	if (EVO.nerveSwitch == 'on'){spl('nerve','nerTip','Nerve');}
	if (x == 'vascular'){EVO.vascularSwitch = 'on';}
	if (EVO.vascularSwitch == 'on'){spl('vascular','vasTip','Vascular');}
	if (x == 'muscle'){EVO.muscleSwitch = 'on';}
	if (EVO.muscleSwitch == 'on'){spl('muscle','musTip','Muscle');}
	if (x == 'respiratory'){EVO.respiratorySwitch = 'on';}
	if (EVO.respiratorySwitch == 'on'){spl('respiratory','resTip','Respiratory');}
	if (x == 'digestive'){EVO.digestiveSwitch = 'on';}
	if (EVO.digestiveSwitch == 'on'){spl('digestive','digTip','Digestive');}
	if (x == 'excretion'){EVO.excretionSwitch = 'on';}
	if (EVO.excretionSwitch == 'on'){spl('excretion','excTip','Excretion');}
	if (x == 'sight'){EVO.sightSwitch = 'on';}
	if (EVO.sightSwitch == 'on'){spl('sight','sigTip','Light Sense');}
	if (x == 'circular'){EVO.circular = x; x = undefined;}
	if (EVO.circular == 'circular'){doc('symetryHTML','Circular Symetry');}
	if (x == 'radial'){EVO.radial = x; x = undefined;}
	if (EVO.radial == 'radial'){doc('symetryHTML','Radial Symetry');}
	if (x == 'dependency'){EVO.dependency = x; x = undefined;}
	if (EVO.dependency == 'dependency'){doc('dependencyHTML','Dependency');}
	doc('moveHTML',2000-EVO.motility-EVO.two.muscle*10);
	doc('specializeHTML','<p>Specilization Cost: <span id="specializeCost"></span></p>');
	doc('stat','<div style="color:white; border-style: hidden; text-align:center"><p>Off: <span id="off"></span> &nbsp; &nbsp; Def: <span id="def"></span> &nbsp; &nbsp; Spd: <span id="spd"></span> &nbsp; &nbsp; Spl: <span id="spl"></span><br>Health: <span id="hp">0</span> / <span id="mhp"></span> &nbsp; &nbsp; &nbsp; Stats &nbsp; &nbsp; &nbsp; Stamina: <span id="sp">0</span> / <span id="msp"></span><br>Str: <span id="str"></span> &nbsp; &nbsp; Dex: <span id="dex"></span> &nbsp; &nbsp; Con: <span id="con"></span> &nbsp; &nbsp; Agl: <span id="agl"></span></p></div>');
	doc('retreat','Retreat: <span onclick="run(\'+\')"> << </span><span id="run"></span><span onclick="run(\'-\')">% >> </span>');
	doc('run',EVO.combat.run);
	specializeNext(x);
	updateNutrient();
	updateEvolution();
	evolutionCombat();
	stat();
}

function mouseOn(x,y){
	tip(x);
	specializeNext(y);
}

function mouseOff(x){
	tap(x);
	specializeNext();
}

function cellAdhesion(){
	if (Math.floor(Math.random()*100)+1 > EVO.two.celladhesion){
		EVO.currentDamage += EVO.current;
		if (EVO.currentDamage >= 100){
			EVO.currentDamage = 0;
			EVO.cellL += 1;
			cellUpdate();
			if (EVO.two.celladhesion >= 0){
				EVO.adhesionLearn += fun.mul.nerve();
				if (EVO.adhesionLearn > EVO.two.celladhesion){
					EVO.adhesionLearn -= (EVO.two.celladhesion + 1);
					EVO.two.celladhesion += 1;	
					doc('celladhesion',EVO.two.celladhesion);
				}
			}
		}
	}
}

function epsMath(x){
	if (x == undefined){x = 1;}
	var cnt = 0;
	for (var i = 0; i < x; i++){cnt += Math.floor(10*Math.pow(1.01,EVO.eps+i));}
	return cnt;
}

function eps(x){
	if (x == undefined){x = 1;}
	if(EVO.nutrient >= epsMath(x)){
		EVO.nutrient -= epsMath(x);
		EVO.eps += x;
		doc('eps',EVO.eps);
		updateNutrient();
	}
	doc('epsCost',epsMath());
}

function phDmg(){
	var phd = 0;
	if (EVO.ph < 71){phd = 70 - EVO.ph;}
	if (EVO.ph > 70){phd = EVO.ph - 70;}
	EVO.eps -= Math.floor(phd/10);
	if (EVO.eps < 0){
		EVO.phd = Math.abs(phd);
		EVO.eps = 0;
	}
	EVO.combat.hp -= EVO.phd;
	if(EVO.combat.hp < 0){EVO.combat.hp = 0;}
}

function salinityDebuff(){
	if (Math.floor(Math.random()*100)+1 > EVO.osmoregulation){
		EVO.salinityCurse = ((Math.abs(EVO.salinity-35))*200)-EVO.osmoregulation;
		if (EVO.osmoregulation >= 0){
			EVO.osmisisLearn += fun.mul.nerve();
			if (EVO.osmisisLearn > EVO.osmoregulation){
				EVO.osmisisLearn -= (EVO.osmoregulation + 1);
				EVO.osmoregulation += 1;	
				doc('osmoregulation',EVO.osmoregulation);
			}
		}
	} else {EVO.salinityCurse = 0;}
}

function swarmingMotility(){
	EVO.motilityLearn += fun.mul.nerve();
	if (EVO.motilityLearn > EVO.motility && EVO.motility < 1000){
		EVO.motilityLearn -= (EVO.motility + 1);
		EVO.motility += 1;
		doc('motility',EVO.motility);
		doc('moveHTML',2000-EVO.motility-EVO.two.muscle*10);
	}
}

function specializeMath(x){
	var y = function(a){return EVO.two[a]*(100-REC[a].cost/2)/100;}
	var z = {
		"balance": y('balance'),
		"nerve":  y('nerve'),
		"vascular":  y('vascular'),
		"muscle":  y('muscle'),
		"respiratory":  y('respiratory'),
		"digestive":  y('digestive'),
		"excretion":  y('excretion'),
		"sight":  y('sight'),
	};
	if (x !== undefined){z[x] = EVO.two[x]*(100-REC[x].cost)/100;}
	return Math.floor(10*Math.pow(2,z.balance + z.nerve + z.vascular + z.muscle + z.respiratory + z.digestive + z.excretion + z.sight));
}

function specializeNext(x){doc('specializeCost',specializeMath(x));}

function specialize(x){
	if(EVO.nutrient >= specializeMath(x) && EVO.cellB-EVO.cellL > EVO.two[x] && EVO.two[x] < REC[x].max+100){
		EVO.nutrient -= specializeMath(x);
		EVO.two[x] += 1;
		EVO.cellL += EVO.two[x];
		EVO.cellT += EVO.two[x];
		doc(x,EVO.two[x]);
		updateNutrient();
		cellUpdate();
		specializeNext(x);
		stat();
		if (x == 'muscle'){doc('moveHTML',2000-EVO.motility-EVO.two.muscle*10);}
		if (x == 'sight') {light();}
	}
}

function light(){
	y = EVO.two.sight;
	if (EVO.sun.position < y){y = EVO.sun.position;}
	document.getElementById("stage").style.backgroundColor = 'rgb(' + [y,y,y].join(',') + ')';
}

function color(x){
	var color = document.getElementById(x + 'Button');
	var mod = 10;
	if (x == 'cell' && EVO.nutrient >= cellMath()){
		color.style.color = 'red';
		var y = '';
		if (EVO.quorum == 'sensing'){
			mod = 10-((EVO.cellB-EVO.cellL)%10);
			y = ' onmouseover="doc(\'cellCost\',cellMath('+mod+'))" onmouseout="doc(\'cellCost\',cellMath())" ';
		}
		if (EVO.nutrient >= cellMath(mod) && mod > 1){doc('cell10','<b style="color:violet"' + y + 'onclick="buyCell('+mod+'); event.stopPropagation()">  X'+mod+'  </b>');}
		else {doc('cell10','');}
	}
	else if (x == 'eps' && EVO.nutrient >= epsMath()){
		color.style.color = 'red';
		mod = 10-(EVO.eps%10);
		if (EVO.nutrient >= epsMath(mod) && mod > 1){doc('eps10','<b style="color:violet" onmouseover="doc(\'epsCost\',epsMath('+mod+'))" onmouseout="doc(\'epsCost\',epsMath())" onclick="eps('+mod+'); event.stopPropagation()">  X'+mod+'  </b>');}
		else {doc('eps10','');}
	}
	else if (x == 'evolution' && EVO.nutrient >= evolutionMath()){color.style.color = 'red';}
	else if (x == 'move' && EVO.nutrient >= 2000 - EVO.motility - (EVO.two.muscle*10)){color.style.color = 'red';}
	else if (x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/) && EVO.nutrient >= specializeMath(x) && EVO.cellB-EVO.cellL > EVO.two[x]){color.style.color = 'red';}
	else {color.style.color = 'green';}
}

function worm(){
	EVO.evolved += cost.worm;
	var evolve = {
		"stage": 3,
		"date": Date.now(),
		"one": EVO.one,
		"two": EVO.two,
		"sun": EVO.sun,
		"size": EVO.size.max,
		"food": EVO.food/2,
		"mineral": EVO.nutrient/2,
		"evolution": EVO.evolution,
		"evolved": EVO.evolved,
		"bonus": EVO.bonus,
		"combat": EVO.combat,
		"specialized": EVO.specialized,
		"balanceSwitch": EVO.balanceSwitch,
		"nerveSwitch": EVO.nerveSwitch,
		"vascularSwitch": EVO.vascularSwitch,
		"muscleSwitch": EVO.muscleSwitch,
		"respiratorySwitch": EVO.respiratorySwitch,
		"digestiveSwitch": EVO.digestiveSwitch,
		"excretionSwitch": EVO.excretionSwitch,
		"sightSwitch": EVO.sightSwitch,
		"radial": EVO.radial,
		"eps": EVO.eps,
		"phd": EVO.phd,
		"osmoregulation": EVO.osmoregulation,
	};
	localStorage.setItem("EVOE", JSON.stringify(evolve));
	clearTimeout(save);
	localStorage.removeItem("EVO");
	window.location.assign("EVO3.html");
}

function tip(x){
	if (x == 'cellTip'){doc(x,'<p>Click to mitosis a cell and try to adhere to it.<br>It will help you gather nutrients</p>');}
	if (x == 'epsTip'){doc(x,'<p>Click to make Extracellular Polymeric Substances to protect from the pH of the water.</p>');}
	if (x == 'evoTip'){doc(x,'<p>Click for a chance to gain evolution points to evolve your cell.<br>Evolution points are used to purchase evolutions.</p>');}
	if (x == 'balTip'){doc(x,'Click to improve Statocyst quality.<br>Statocyst is your cells evolution of balance.');}
	if (x == 'nerTip'){doc(x,'Click to improve Nerve quality.<br>Nerves improve your cells ability to learn.');}
	if (x == 'vasTip'){doc(x,'Click to improve Vascular quality.<br>Vascular improves your cells ability to act.');}
	if (x == 'musTip'){doc(x,'Click to improve Muscle quality.<br>Muscle improves your cells ability to move.');}
	if (x == 'resTip'){doc(x,'Click to improve Respiratory quality.<br>Respiratory improves your cells metabolism.');}
	if (x == 'digTip'){doc(x,'Click to improve Digestive quality.<br>Digestion improves the quanity of food your cells eat.');}
	if (x == 'excTip'){doc(x,'Click to improve Excretion quality.<br>Excretion improves your cells ability to expell toxins and waste.');}
	if (x == 'sigTip'){doc(x,'Click to improve Light Sense quality.<br>Light Sense improves your cells ability to find food.');}
}

function tap(x){doc(x,'');}