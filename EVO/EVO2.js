var EVO = {
	"stage": 2,
	"two": {
		"celladhesion": -1,
		"motility": 0,
		"balance": 0,
		"nerve": 0,
		"vascular": 0,
		"muscle": 0,
		"respiratory": 0,
		"digestive": 0,
		"excretion": 0,
		"sight": 0,
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
	"colony": 0,
	"cellL": 0,
	"cellT": 0,
	"sex": 'off',
	"communication": null,
	"quorum": null,
	"biofilm": null,
	"EPS": 0,
	"organization": null,
	"osmoregulation": -1,
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
	"symmetry": null,
	"dependency": null,
	"combat": {
		"cbtMax": 0,
		"cbtevo": [],
		"mhp": 0,
		"hp": 0,
		"msp": 0,
		"sp": 0,
		"exp": 0,
		"scar": 0,
		"offG": 0,
		"offense": 0,
		"defG": 0,
		"defense": 0,
		"spdG": 0,
		"speed": 0,
		"splG": 0,
		"special": 0,
		"rtrt": 0,
		"won": 0,
		"lost": 0,
	},
};

var fun = {
	"stage": 'two',
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
		"metabolism": function(){return (1+(EVO.one.metabolism/100))*(1+(EVO.one.mitochondria/100))*(1+(creations()/100));},
		"balance": function(){return (1-(EVO.two.balance/100));},
		"nerve": function(){return (1+(EVO.two.nerve/100));},
		"vascular": function(){return (1-(EVO.two.vascular/100));},
		"muscle": function(){return (1+(EVO.two.muscle/100));},
		"respiratory": function(){return (1+(EVO.two.respiratory/100));},
		"digestive": function(){return (1+(EVO.two.digestive/100));},
		"excretion": function(){return (1+(EVO.two.excretion/100));},
		"sight": function(){return (1+(EVO.two.sight/100));},
		"EPS": function(){return (1-(EVO.phd/100));},
	},
	"cytoplasm": function(x){return (100-(EVO.one.cytoplasm*((REC.cytoplasm+10)/1000)))*x/100;},
	"failtimer": 0,
	"movement": 'motility',
	"move": 0,
	"moveCost": function(){
		let mem = 1;
		if (EVO.one.membraneScore == 3){mem = 1.5;}
		return Math.floor((2000-EVO.two.motility-(fun.add.muscle()*10))*(1-(EVO.one.flagellum/(EVO.stage*1000)))*(1+(EVO.size.game/100))*mem);
	},
};

function start(){
	/*Save File load*/
	if (localStorage.getItem('REC') !== null){REC = JSON.parse(localStorage.getItem('REC'));}
	if (localStorage.getItem('EVO') !== null){EVO = JSON.parse(localStorage.getItem('EVO'));}
	else if (localStorage.getItem('EVOE') !== null){
		let localSave = JSON.parse(localStorage.getItem('EVOE'));
		EVO.version = localSave.version;
		EVO.one = localSave.one;
		EVO.sun = localSave.sun;
		EVO.food = localSave.food;
		EVO.size = localSave.size;
		EVO.nutrient = localSave.nutrient;
		EVO.protein = localSave.protein;
		EVO.evo = localSave.evo;
		EVO.date = localSave.date;
		localStorage.setItem('EVO', JSON.stringify(EVO));
		localStorage.removeItem('EVOE');
	}
	/*HTML Alterations*/
	let html = function(x){document.getElementById(x+'box').insertAdjacentHTML('afterbegin','<div class="button butcol growoff" id="'+x+'" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="buy(this.id)"><c></c><b onmouseenter="tip(this.parentNode.id,11)" onmouseleave="tip(this.parentNode.id)" onclick="buy(this.parentNode.id,11); event.stopPropagation()"></b></div>');}
	html('stage');
	html('game');
	html('loot');
	copy('devone','metabolize');
	document.getElementById('metabolize').firstChild.id = EVO.one.metabolismType;
	copy('stage','nutrient');
	document.getElementById('nutrient').removeAttribute("onclick");
	if (EVO.one.ribosome > 0){
		copy('loot','protein');
		document.getElementById('protein').removeAttribute("onclick");
	} else {
		document.getElementsByTagName('label')[0].style.visibility = 'hidden';
		document.getElementsByTagName('label')[1].style.visibility = 'hidden';
	}
	copy('stage','colony');
	copy('stage','evolution','beforebegin');
	copy('evolution','combat','beforebegin');
	document.getElementById('combat').classList.replace('growoff','purple');
	document.getElementById('boost').style.display = 'none';
	document.getElementById('stat').style.display = 'none';
	document.getElementById('health').style.display = 'none';
	document.getElementById('stamina').style.display = 'none';
	document.getElementById('retreat').style.display = 'none';
	css('foodtype','Nutrient');
	if (EVO.specialized > 1){specialized();}
	evos();
	/*Initialize Program*/
	xbuy.cell = 1.1-(EVO.one.mitosis/10000);
	let offline = Date.now() - EVO.date;
	if (offline > 8.64e+7){offline = 8.64e+7;}
	speedup(offline);
	EVO.date = Date.now();
	save(Date.now());
	foods.update();
	updateNutrient();
	css('current',(EVO.current/10));
	css('ph',(EVO.ph/10));
	css('salinity',EVO.salinity);
	bgcolor();
	setTimeout(environment,60000);
	setTimeout(autoClick,1000);
	css('protein',EVO.protein.whole);
	setTimeout(protein,60000);
	setTimeout(ribosome,3600000);
	if (EVO.one.metabolismType == 'photo'){setTimeout(photosynth, 1000);}
	setTimeout(cellTimer,Math.ceil(600000*((100-(EVO.two.balance/2))/100)));
	setTimeout(events,300000);
	setTimeout(swirly,30,2,2,Math.floor(Math.random()*window.innerWidth)-50,Math.floor(Math.random()*window.innerHeight)-50,0);
	css('gift',400);
}

function speedup(x){
	let speedUp = [0, 0, 0, 0, 0, 0];
	while (x > speedUp[0]){
		let type = foods.check();
		if (speedUp[0] >= speedUp[1] + ((1000*foods[type].timer+EVO.salinityCurse)*fun.mul.vascular()+1)){
			autoClick('start');
			speedUp[1] = speedUp[0];
		}
		if (EVO.one.metabolismType == 'photo' && speedUp[0] >= speedUp[2] + ((1000+EVO.salinityCurse)*fun.mul.vascular()+1)){
			photosynth('start');
			speedUp[2] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[3] + 3600000){
			move('start');
			speedUp[3] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[4] + 60000){
			environment('start');
			speedUp[4] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[5] + Math.ceil(600000*((100-(EVO.two.balance/2))/100))){
			cellTimer('start');
			speedUp[5] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[6] + 60000){
			protein('start');
			speedUp[6] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[7] + 3600000){
			ribosome('start');
			speedUp[7] = speedUp[0];
		}
		speedUp[0]++;
	}
}

function events(){
	let swch = 'off';
	doc('eventHTML','<div id="event"><p><span id="event1HTML"></span><br><span id="event2HTML"></span></p></div>');
	let random = Math.floor((Math.random() * 100)+1);
	if (0 < random && 10 >= random && EVO.specialized > 1 && EVO.colony-EVO.cellL+EVO.cellT > 10 && EVO.nutrient >= 2000-EVO.two.motility-(EVO.two.muscle*10) && cost.fight == 'off'){
		swch = 'on';
		let res = fun.moveCost();
		EVO.nutrient -= res;
		updateNutrient();
		doc('event1HTML','An aggressive colony of cells has entered your area.  They are attacking you.');
		cbt(res,Math.floor(Math.random()*3));
		setTimeout(busy,1000);
		function busy(){
			if (cost.fight == 'on'){setTimeout(busy,1000);}
			else {setTimeout(eventEnd, 60000);}
		}
	}
	else if (10 < random && 20 >= random){
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
	if (EVO.colony-EVO.cellL > EVO.two.celladhesion && EVO.colony-EVO.cellL > 0){cellAdhesion();}
	if (EVO.colony-EVO.cellL+EVO.cellT > EVO.one.cytoplasm/10 && EVO.colony-EVO.cellL > 0){toxinMath();}
	if (x !== 'start'){setTimeout(environment, 60000);}
}

function toxinMath(){
	EVO.toxin += ((EVO.colony-EVO.cellL+EVO.cellT)/10)*(1+((EVO.two.digestive-(EVO.two.excretion+EVO.one.cytoplasm/10))/100));
	if (EVO.toxin > (EVO.colony-EVO.cellL+EVO.cellT)){
		EVO.toxin = 0;
		EVO.cellL++;
		colony();
	}
}

function move(x){
	if (EVO.nutrient >= fun.moveCost()){
		EVO.nutrient -= fun.moveCost();
		EVO.food = Math.floor(((Math.random()*((foods.max()-foods.min())*foods.mod())
			*fun.mul.muscle())+(foods.min()*foods.mod()))*fun.mul.sight());
		EVO.current = Math.floor(Math.random()*100)+1;
		currentMath();
		EVO.ph = Math.floor(Math.random()*140);
		phMath();
		EVO.salinity = Math.floor(Math.random()*11)+30;
		salinityMath();
		if (EVO.motilitySwitch == 'on'){movement();}
		if (x !== 'start'){
			updateNutrient();
			clearTimeout(fun.move);
			fun.move = setTimeout(move, 3600000);
		}
	}
}

function updateNutrient(){
	foods.update();
	css('nutrient',Math.floor(EVO.nutrient));
	color('colony');
	color('evolution');
	if (EVO.biofilm == 'biofilm'){color('EPS');}
	let clr = function(x){if (EVO[x+'Switch'] == 'on'){color(x);}}
	clr('balance');
	clr('nerve');
	clr('vascular');
	clr('muscle');
	clr('respiratory');
	clr('digestive');
	clr('excretion');
	clr('sight');
}

function autoClick(x){
	let type = foods.check();
	let feed = (EVO.one.cilia/EVO.stage+(EVO.colony-EVO.cellL)+EVO.two.digestive)*foods[type].multi*fun.mul.EPS();
	if (feed < 1){feed = 1;}
	EVO.food -= feed;
	if (EVO.one.metabolismType == 'aerob'){feed *= fun.mul.metabolism()*fun.mul.respiratory();}
	EVO.nutrient += feed;
	if (EVO.food < 0){EVO.food = 0;}
	if (x !== 'start'){
		foods.update();
		updateNutrient();
		setTimeout(autoClick, ((1000*foods[type].timer+EVO.salinityCurse)*fun.mul.vascular()+1));
	}
}

function photosynth(x){
	let z = (1+(EVO.sun.position/100))*(1+(EVO.size.game/100))*fun.mul.metabolism()*fun.mul.respiratory()*fun.mul.EPS();
	EVO.nutrient += z;
	if (x !== 'start'){
		css('photosynthesis',Math.round(z));
		updateNutrient();
		setTimeout(photosynth, ((1000+EVO.salinityCurse)*fun.mul.vascular()+1));
	}
}

function cellTimer(x){
	if (EVO.colony > 0 && EVO.cellL > 0 && EVO.colony >= EVO.cellL){EVO.colony--; EVO.cellL--;}
	if (x !== 'start'){setTimeout(cellTimer, Math.ceil(600000*((100-(EVO.two.balance/2))/100)));}
}

var cost = {
	"sex": 1,
	"celladhesion": 1,
	"communication": 2,
	"quorum": 2,
	"biofilm": 2,
	"osmoregulation": 2,
	"organization": 3,
	"motility": 3,
	"specialization": 4,
	"specialized": 5,
	"worm": 20,
	"size": function(){return EVO.size.game+1;},
	"fight": 'off',
}

function updateEvolution(){
	let stage = document.getElementById('stagenavevo');
	let game = document.getElementById('gamenavevo');
	stage.classList.replace('taboff','gold');
	game.classList.replace('taboff','gold');
	let creation = creations();
	css('evolution',creation);
	let code = {
		"sex": '',
		"celladhesion": '',
		"communication": '',
		"quorum": '',
		"biofilm": '',
		"organization": '',
		"osmoregulation": '',
		"motility": '',
		"specialization": '',
		"balance": '',
		"nerve": '',
		"vascular": '',
		"muscle": '',
		"respiratory": '',
		"digestive": '',
		"excretion": '',
		"sight": '',
		"symmetry": '',
		"dependency": '',
		"size": '',
		"worm": '',
		"evolution": '<p class="evolutions gold"></p>',
	}
	let cell = EVO.colony-EVO.cellL;
	let cells = 30 + (EVO.specialized * 10);
	let special = EVO.specialized * cost.specialized;
	let evo = function(x){
		if (EVO[x+'Switch'] == 'off' || x.match(/^(circular|dependency|radial)$/)){
			let z = x;
			if (x.match(/^(circular|radial)$/)){z = 'symmetry';}
			if (x == 'dependency'){z = 'dependency';}
			code[z] = '<p id='+x+' onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="specialized(this.id)"></p>';
		}
	}
	function specializationSwitch(){
		evo('balance');
		evo('nerve');
		evo('vascular');
		evo('muscle');
		evo('respiratory');
		evo('digestive');
		evo('excretion');
		evo('sight');
	}
	let evos = function(x){code[x] = '<p id="'+x+'" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="evos(this.id)"></p>'};
	if (EVO.sex == 'off' && cell >= 1 && creation >= cost.sex){
		evos('sex');
	}
	if (EVO.two.celladhesion == -1 && cell >= 1 && creation >= cost.celladhesion){
		evos('celladhesion');
	}
	if (EVO.two.celladhesion >= 0 && cell >= 10 && EVO.communication == null && creation >= cost.communication){
		evos('communication');
	}
	if (cell >= 40 && EVO.communication == 'communication' && EVO.quorum == null && creation >= cost.quorum){
		evos('quorum');
	}
	if (cell >= 20 && EVO.communication == 'communication' && EVO.biofilm == null && creation >= cost.biofilm){
		evos('biofilm');
	}
	if (cell >= 20 && EVO.communication == 'communication' && EVO.organization == null && creation >= cost.organization){
		evos('organization');
	}
	if (cell >= 20 && EVO.communication == 'communication' && EVO.osmoregulation == -1 && creation >= cost.osmoregulation){
		evos('osmoregulation');
	}
	if (cell >= 20 && EVO.communication == 'communication' && EVO.motilitySwitch == 'off' && creation >= cost.motility){
		evos('motility');
	}
	if (cell >= 30 && EVO.organization == 'organization' && EVO.specialization == null && creation >= cost.specialization){
		evos('specialization');
	}
	if (cell >= cells && (EVO.specialized == 1 || EVO.specialized == 2) && creation >= special && EVO.specialization == 'specialization'){specializationSwitch();}
	if (cell >= cells && (EVO.specialized == 3 || EVO.specialized == 4) && creation >= special && EVO.symmetry == 'circular'){specializationSwitch();}
	if (cell >= cells && (EVO.specialized == 5 || EVO.specialized == 6) && creation >= special && EVO.dependency == 'dependency'){specializationSwitch();}
	if (cell >= cells && (EVO.specialized == 7 || EVO.specialized == 8) && creation >= special && EVO.symmetry == 'radial'){specializationSwitch();}
	if (EVO.cellT >= cells && EVO.specialized == 3 && creation >= special && EVO.symmetry == null){
		evo('circular');
	}
	if (EVO.cellT >= cells && EVO.specialized == 5 && creation >= special && EVO.symmetry == 'circular' && EVO.dependency == null){
		evo('dependency');
	}
	if (EVO.cellT >= cells && EVO.specialized == 7 && creation >= special && EVO.dependency == 'dependency'){
		evo('radial');
	}
	if (EVO.stage > EVO.size.stage && EVO.cellT+cell >= 100*(EVO.size.stage+1) && creation >= cost.size()){
		css('size1',cost.size());
		evos('size');
	}
	if (EVO.dependency == 'dependency' && EVO.quorum == 'quorum' && EVO.biofilm == 'biofilm' && EVO.osmoregulation > -1 && EVO.motilitySwitch == 'on' && creation >= cost.worm){
		evos('worm');
	}
	let codes = code.evolution + code.sex + code.communication + code.quorum + code.biofilm + code.organization + code.osmoregulation + code.motility + code.specialization + code.symmetry + code.dependency + code.worm;
	doc('stageUpgrade',codes);
	if (codes == code.evolution){stage.classList.replace('gold','taboff');}
	codes = code.evolution + code.celladhesion + code.balance + code.nerve + code.vascular + code.muscle + code.respiratory + code.digestive + code.excretion + code.sight + code.size;
	doc('gameUpgrade',codes);
	if (codes == code.evolution){game.classList.replace('gold','taboff');}
}

function evos(x){
	if (x !== undefined){document.getElementById(x).removeAttribute('id');}
	let a;
	let b = 'struc';
	let c = 'stage';
	let d = 'game';
	let e = 'Switch';
	let g = 'on';
	let check = function(){return EVO[a] == a && !document.getElementById(a);}
	let evo = function(){EVO.evo.evolved += cost[x];}
	a = 'sex';
	if (x == a){
		EVO[x] = g;
		evo();
		EVO.evo.cost = (EVO.evo.cost-0.05).toFixed(2);
	}
	if (EVO[a] == 1 && !document.getElementById(a)){
		copy(b,a);
	}
	a = 'celladhesion';
	if (x == a){
		EVO.two[x] = 0;
		evo();
	}
	if (EVO.two[a] > -1 && !document.getElementById(a)){
		copy(b,a);
		css(a,EVO.two[a]);
	}
	a = 'communication';
	if (x == a){
		EVO[x] = x;
		evo();
	}
	if (check()){
		copy(b,a);
	}
	a = 'organization';
	if (x == a){
		EVO[x] = x;
		evo();
	}
	if (check()){
		copy(b,a);
	}
	a = 'quorum';
	if (x == a){
		EVO[x] = x;
		evo();
	}
	if (check()){
		copy(b,a);
	}
	a = 'biofilm';
	if (x == a){
		EVO[x] = x;
		evo();
	}
	if (check()){
		copy(b,a);
		copy(c,'EPS');
		css('EPS',EVO.EPS);
	}
	a = 'osmoregulation';
	if (x == a){
		EVO[x] = 0;
		evo();
	}
	if (EVO[a] > -1 && !document.getElementById(a)){
		css(a,EVO[a]);
		copy(b,a);
	}
	a = 'motility';
	if (x == a){
		EVO[x+e] = g;
		evo();
	}
	if (EVO[a+e] == g && !document.getElementById(a)){
		css(a,EVO.two[a]);
		copy(b,a);
	}
	a = 'specialization';
	if (x == a){
		EVO[x] = x;
		evo();
	}
	if (check()){
		copy(b,a);
	}
	a = 'size';
	if (x == a){
		EVO[x][d]++;
		EVO[x][c]++;
		EVO.evo.evolved += EVO[x][d];
	}
	if (EVO[a][d] > 0){
		document.getElementById('boost').style.display = 'initial';
		if (!document.getElementById(a)){copy('bstevo',a);}
		css(a,EVO[a][d]);
	}
	updateNutrient();
	colony();
	updateEvolution();
	if (x == 'worm'){worm();}
}

function specialized(x){
	if (x !== undefined){document.getElementById(x).removeAttribute('id');}
	if (x !== undefined){
		EVO.evo.evolved += (EVO.specialized * cost.specialized);
		if (!x.match(/^(circular|dependency|radial)$/)){EVO.specialized++;}
	}
	let spec = function(z){
		if (x == z){EVO[x+'Switch'] = 'on';}
		if (EVO[z+'Switch'] == 'on'){
			if (!document.getElementById(z)){copy('game',z);}
			css(z,EVO.two[z]);
		}
	}
	spec('balance');
	spec('nerve');
	spec('vascular');
	spec('muscle');
	spec('respiratory');
	spec('digestive');
	spec('excretion');
	spec('sight');
	let a = 'symmetry';
	let b = 'struc';
	let h = 'circular';
	let i = 'radial';
	if (x == h){EVO[a] = x;}
	if (EVO[a] == h && !document.getElementById(h)){copy(b,h);}
	if (x == i){EVO[a] = x;}
	if (EVO[a] == i && !document.getElementById(i)){
		if (document.getElementById(h)){document.getElementById(h).id = i;}
		else {copy(b,i);}
	}
	a = 'dependency';
	if (x == a){EVO[x] = x;}
	if (EVO[a] == a && !document.getElementById(a)){copy(b,a);}
	document.getElementById('stat').style.display = 'initial';
	document.getElementById('retreat').style.display = 'initial';
	css('rtrt',EVO.combat.rtrt);
	if (x !== undefined){
		updateNutrient();
		updateEvolution();
	}
	evolutionCombat();
	stat();
}

function cellAdhesion(){
	let a = 'celladhesion';
	let b = 'currentDamage';
	let c = 'adhesionLearn';
	if (Math.floor(Math.random()*100)+1 > EVO.two[a]){
		EVO[b] += EVO.current;
		if (EVO[b] >= 100){
			EVO[b] = 0;
			EVO.cellL++;
			colony();
			if (EVO.two[a] >= 0){
				EVO[c] += fun.mul.nerve();
				if (EVO[c] > EVO.two[a]){
					EVO[c] -= (EVO.two[a] + 1);
					EVO.two[a]++;	
					css(a,EVO.two[a]);
				}
			}
		}
	}
}

function math(x,y,z){
	let evo;
	if (x == 'evolution'){evo = EVO.evo[x];}
	else if (x.match(/^(colony|EPS)$/)){evo = EVO[x];}
	else {
		let a = function(c){return EVO.two[c]*(100-REC[c].cost/2)/100;}
		let b = {
			"balance": a('balance'),
			"nerve":  a('nerve'),
			"vascular":  a('vascular'),
			"muscle":  a('muscle'),
			"respiratory":  a('respiratory'),
			"digestive":  a('digestive'),
			"excretion":  a('excretion'),
			"sight":  a('sight'),
		};
		if (x !== undefined){b[x] = EVO.two[x]*(100-REC[x].cost)/100;}
		evo = b.balance + b.nerve + b.vascular + b.muscle + b.respiratory + b.digestive + b.excretion + b.sight;
	}
	if (z == undefined){z = 1;}
	let cnt = 0;
	for (let i = 0; i < z; i++){
		let math = 10*Math.pow(y,evo+i);
		if (x !== 'evolution'){math = fun.cytoplasm(math);}
		math = Math.floor(math);
		cnt += math;
	}
	return cnt;
}

var xbuy = {
	"cell": 1.1,
	"specialize": 2,
	"EPS": 1.01,
};

function buy(x,y){
	if (x == 'evolution'){
		if(EVO.nutrient >= math(x,EVO.evo.cost)){
			EVO.nutrient -= math(x,EVO.evo.cost);
			EVO.evo[x]++;
			evolutionCombat();
		}
	}
	else if (x.match(/^(colony|EPS)$/)){
		if (y > 1){
			if (x == 'colony'){y = 10-((EVO[x]-EVO.cellL)%10);}
			else {y = 10-(EVO[x]%10);}
		}
		else {y = 1;}
		let z;
		if (x == 'colony'){z = xbuy.cell;}
		if (x == 'EPS'){z = xbuy.EPS;}
		if (EVO.nutrient >= math(x,z,y)){
			EVO.nutrient -= math(x,z,y);
			EVO[x] += y;
			if (x == 'EPS'){css(x,EVO[x]);}
		}
	}
	else if (x.match(/^(offense|defense|speed|special)$/)){cbtupg(x);}
	else {
		if(EVO.nutrient >= math(x,xbuy.specialize) && EVO.colony-EVO.cellL > EVO.two[x] && EVO.two[x] < REC[x].max+100){
			EVO.nutrient -= math(x,xbuy.specialize);
			EVO.two[x]++;
			EVO.cellL += EVO.two[x];
			EVO.cellT += EVO.two[x];
			css(x,EVO.two[x]);
			stat();
			if (x == 'sight'){bgcolor();}
		}
	}
	updateNutrient();
	if (x.match(/^(colony|evolution)$/)){updateEvolution();}
	if (!x.match(/^(EPS|evolution)$/)){colony();}
	tip(x,y);
}

function colony(){
	if (EVO.quorum == 'quorum'){css('colony',EVO.colony-EVO.cellL);}
	updateEvolution();
}

function worm(){
	EVO.evo.evolved += cost.worm;
	var evolve = {
		"version": EVO.version,
		"stage": 3,
		"date": Date.now(),
		"evo": EVO.evo,
		"one": EVO.one,
		"two": EVO.two,
		"sun": EVO.sun,
		"size": {
			"game": EVO.size.game,
			"stage": 0,
		},
		"food": EVO.food/2,
		"mineral": EVO.nutrient/2,
		"protein": EVO.protein,
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
		"symmetry": EVO.symmetry,
		"EPS": EVO.EPS,
		"phd": EVO.phd,
		"osmoregulation": EVO.osmoregulation,
	};
	localStorage.setItem("EVOE", JSON.stringify(evolve));
	clearTimeout(save);
	localStorage.removeItem("EVO");
	window.location.assign("EVO.html");
}

function color(x){
	let color = document.getElementById(x);
	let off = color.classList.replace('growon','growoff');
	let mod = 10;
	if (x == 'colony' && EVO.nutrient >= math(x,xbuy.cell)){
		off;
		if (EVO.quorum == 'quorum'){mod = 10-((EVO.colony-EVO.cellL)%10);}
		if (EVO.nutrient >= math(x,xbuy.cell,mod) && mod > 1){css(x+'-x','x'+mod);}
		else {css(x+'-x','');}
	}
	else if (x == 'EPS' && EVO.nutrient >= math(x,xbuy.EPS)){
		off;
		mod = 10-(EVO.EPS%10);
		if (EVO.nutrient >= math(x,xbuy.EPS,mod) && mod > 1){css(x+'-x','x'+mod);}
		else {css(x+'-x','');}
	}
	else if (x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/) && EVO.nutrient >= math(x,xbuy.specialize) && EVO.colony-EVO.cellL > EVO.two[x]){off;}
	else if (x == 'evolution' && EVO.nutrient >= math(x,EVO.evo.cost)){off;}
	else {
		color.classList.replace('growoff','growon');
		if (x.match(/^(colony|EPS)$/)){css(x+'-x','');}
	}
}

function tip(x,y){
	let cost = function(z){css('cost-'+x,z);}
	if (x == 'swirl'){cost(fun.moveCost());}
	else if (x == 'evolution'){cost(math(x,EVO.evo.cost));}
	else if (x == 'colony'){
		if (y == 11){y = 10-((EVO.colony-EVO.cellL)%10);}
		cost(math(x,xbuy.cell,y));
	}
	else if (x == 'EPS'){
		if (y == 11){y = 10-(EVO.EPS%10);}
		cost(math(x,xbuy.EPS,y));
	}
	else if (x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/)){cost(math(x,xbuy.specialize));}
	let z = document.getElementById('tip');
	z.classList.replace(z.className,x);
	cssHTML('mouse','initial');
}

function tap(x){
	let z = document.getElementById('tip');
	z.classList.replace(z.className,'empty');
	cssHTML('mouse','none');
}