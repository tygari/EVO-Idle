var EVO = {
	"stage": 3,
	"three": {
		"peristalsis": 0,
		"diet": null,
		"balance": 0,
		"nerve": 0,
		"vascular": 0,
		"muscle": 0,
		"respiratory": 0,
		"digestive": 0,
		"excretion": 0,
		"sight": 0,
		"skeleton": null,
		"boost": null,
	},
	"current": 50,
	"currentDamage": 0,
	"ph": 70,
	"osmisisLearn": 0,
	"salinity": 35,
	"salinityCurse": 0,
	"area": {
		"predator": 0,
		"grazer": 0,
		"field": 0,
	},
	"sex": 'off',
	"peristalsisSwitch": 'off',
	"peristalsisLearn": 0,
	"specialzedEvo": 1,
	"combat": {},
};

var fun = {
	"stage": 'three',
	"add":{
		"balance": function(){return EVO.two.balance+EVO.three.balance;},
		"nerve": function(){return EVO.two.nerve+EVO.three.nerve;},
		"vascular": function(){return EVO.two.vascular+EVO.three.vascular;},
		"muscle": function(){return EVO.two.muscle+EVO.three.muscle;},
		"respiratory": function(){return EVO.two.respiratory+EVO.three.respiratory;},
		"digestive": function(){return EVO.two.digestive+EVO.three.digestive;},
		"excretion": function(){return EVO.two.excretion+EVO.three.excretion;},
		"sight": function(){return EVO.two.sight+EVO.three.sight;},
	},
	"mul":{
		"metabolism": function(){return (1+(EVO.one.metabolism/100))*(1+(EVO.one.mitochondria/100));},
		"balance": function(){return (1-(EVO.two.balance/100))*(1-(EVO.three.balance/100));},
		"nerve": function(){return (1+(EVO.two.nerve/100))*(1+(EVO.three.nerve/100));},
		"vascular": function(){return (1-(EVO.two.vascular/100))*(1-(EVO.three.vascular/100));},
		"muscle": function(){return (1+(EVO.two.muscle/100))*(1+(EVO.three.muscle/100));},
		"respiratory": function(){return (1+(EVO.two.respiratory/100))*(1+(EVO.three.respiratory/100));},
		"digestive": function(){return (1+(EVO.two.digestive/100))*(1+(EVO.three.digestive/100));},
		"excretion": function(){return (1+(EVO.two.excretion/100))*(1+(EVO.three.excretion/100));},
		"sight": function(){return (1+(EVO.two.sight/100))*(1+(EVO.three.sight/100));},
		"EPS": function(){return (1-(EVO.phd/100));},
	},
	"cytoplasm": function(x){return (100-(EVO.one.cytoplasm*((REC.cytoplasm+10)/1000)))*x/100;},
	"failtimer": 0,
	"movement": 'peristalsis',
	"move": 0,
	"moveCost": function(){
		var mem = 1;
		if (EVO.one.membraneScore == 3){mem = 1.5;}
		return Math.floor((4000-EVO.peristalsis-(fun.add.muscle()*10))*(1-(EVO.one.flagellum/(EVO.stage*1000)))*(1-(EVO.two.motility/(EVO.stage*1000)))*(1+(EVO.size.game/100))*mem);
	},
	"hunt": 0,
};

function start(){
	/*Save File load*/
	if (localStorage.getItem('REC') !== null){REC = JSON.parse(localStorage.getItem('REC'));}
	if (localStorage.getItem('EVO') !== null){EVO = JSON.parse(localStorage.getItem('EVO'));}
	else if (localStorage.getItem('EVOE') !== null){
		var localSave = JSON.parse(localStorage.getItem('EVOE'));
		EVO.version = localSave.version;
		EVO.one = localSave.one;
		EVO.two = localSave.two;
		EVO.sun = localSave.sun;
		EVO.size = localSave.size;
		EVO.food = localSave.food;
		EVO.mineral = localSave.mineral;
		EVO.protein = localSave.protein;
		EVO.evo = localSave.evo;
		EVO.combat = localSave.combat;
		EVO.combat.hlth = 100;
		EVO.combat.stmn = 100;
		EVO.specialized = localSave.specialized;
		EVO.balanceSwitch = localSave.balanceSwitch;
		EVO.nerveSwitch = localSave.nerveSwitch;
		EVO.vascularSwitch = localSave.vascularSwitch;
		EVO.muscleSwitch = localSave.muscleSwitch;
		EVO.respiratorySwitch = localSave.respiratorySwitch;
		EVO.digestiveSwitch = localSave.digestiveSwitch;
		EVO.excretionSwitch = localSave.excretionSwitch;
		EVO.sightSwitch = localSave.sightSwitch;
		EVO.symmetry = localSave.symmetry;
		EVO.EPS = localSave.EPS;
		EVO.phd = localSave.phd;
		EVO.osmoregulation = localSave.osmoregulation;
		EVO.date = localSave.date;
		localStorage.setItem('EVO', JSON.stringify(EVO));
		localStorage.removeItem('EVOE');
	}
	/*HTML Alterations*/
	let html = function(x){document.getElementById(x).insertAdjacentHTML('afterbegin','<div class="button butcol growoff" id="'+x+'" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="buy(this.id)"><c></c><b onmouseenter="tip(this.parentNode.id,11)" onmouseleave="tip(this.parentNode.id)" onclick="buy(this.parentNode.id,11); event.stopPropagation()"></b></div>');}
	html('stagebox');
	html('gamebox');
	html('loot');
	copy('devone','metabolize');
	document.getElementById('metabolize').firstChild.id = EVO.one.metabolismType;
	copy('stage','mineral');
	document.getElementById('mineral').removeAttribute("onclick");
	if (EVO.one.ribosome > 0){
		copy('loot','protein');
		document.getElementById('protein').removeAttribute("onclick");
	} else {
		document.getElementsByTagName('label')[0].style.visibility = 'hidden';
		document.getElementsByTagName('label')[1].style.visibility = 'hidden';
	}
	copy('stage','evolution','beforebegin');
	copy('evolution','combat','beforebegin');
	copy('struc',EVO.symmetry);
	copy('struc','biofilm');
	copy('stage','EPS');
	document.getElementById('combat').classList.replace('growoff','purple');
	document.getElementById('retreat').style.display = 'initial';
	document.getElementById('boost').style.display = 'none';
	document.getElementById('health').style.display = 'none';
	document.getElementById('stamina').style.display = 'none';
	specialized();
	evos();
	/*Initialize Program*/
	let offline = Date.now() - EVO.date;
	if (offline > 8.64e+7){offline = 8.64e+7;}
	speedup(offline);
	EVO.date = Date.now();
	save(Date.now());
	if (document.getElementById("basic")){document.getElementById("basic").id = EVO.one.metabolismType;}
	foods.update();
	updateMineral();
	css('current',(EVO.current/10));
	css('ph',(EVO.ph/10));
	css('salinity',EVO.salinity);
	css('protein',EVO.protein.whole);
	css('EPS',EVO.EPS);
	css('rtrt',EVO.combat.rtrt);
	bgcolor();
	if (EVO.three.diet !== null){
		huntAuto();
		hunt();
	}
	setTimeout(environment,60000);
	setTimeout(autoClick,1000);
	css('protein',EVO.protein.whole);
	setTimeout(protein,60000);
	setTimeout(ribosome,3600000);
	if (EVO.one.metabolismType == 'photo'){setTimeout(photosynth, 1000);}
	
	//setTimeout(events, 300000);
	setTimeout(swirly,30,2,2,Math.floor(Math.random()*window.innerWidth)-50,Math.floor(Math.random()*window.innerHeight)-50,0);
}

function speedup(x){
	var offline = Date.now() - EVO.date;
	var speedUp = [0, 0, 0, 0, 0, 0, 0];
	if (EVO.three.diet !== null){
		var kill = 0;
		if (EVO.three.boost == 'terri'){kill = EVO.def*6000;}
		kill = 600000+kill-(EVO.area.predator*60000);
		var graze = 0;
		if (EVO.three.boost == 'terri'){graze = EVO.def*6000;}
		graze = 600000+graze-(EVO.area.grazer*6000);
	}
	while (offline >= speedUp[0]){
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
		if (EVO.three.diet !== null){
			if (speedUp[0] >= speedUp[4] + kill){
				huntAuto('kill');
				speedUp[4] = speedUp[0];
			}
			if (speedUp[0] >= speedUp[5] + graze){
				huntAuto('graze');
				speedUp[5] = speedUp[0];
			}
			if (EVO.three.diet == 'carn'){var hnt = EVO.area.grazer*1000;}
			if (EVO.three.diet == 'herb'){var hnt = EVO.area.field*100;}
			if (speedUp[0] >= speedUp[6] + 150000-hnt){
				if (EVO.three.diet == 'carn' && (fun.add.balance()+fun.add.nerve()+fun.add.vascular()+fun.add.muscle()+fun.add.respiratory()+fun.add.digestive()+fun.add.excretion()+fun.add.sight())/8 > Math.random() * EVO.stage * 100){
					if (EVO.area.grazer > 0){
						EVO.area.grazer -= 1;
						EVO.food = Math.floor((Math.random()*((foods.max()-foods.min())*100)*fun.mul.muscle())+(foods.min()*10)*fun.mul.sight());
					}
				}
				if (EVO.three.diet == 'herb'){
					if (EVO.area.field > 0){
						EVO.area.field -= 1;
						EVO.food = Math.floor((Math.random()*((foods.max()-foods.min())*10)*fun.mul.muscle())+(foods.min()*10)*fun.mul.sight());
					}
				}
				speedUp[6] = speedUp[0];
			}
		}
		if (speedUp[0] >= speedUp[7] + 60000){
			environment('start');
			speedUp[7] = speedUp[0];
		}
		speedUp[0]++;
	}
}

function events(){
	var swch = 'off';
	doc('eventHTML','<div id="event"><p><span id="event1HTML"></span><br><span id="event2HTML"></span></p></div>');
	var random = Math.floor((Math.random() * 100)+1)
}

function environment(x){
	currentMath();
	phMath();
	salinityMath();
	sun();
	phDmg();
	if (x !== 'start'){setTimeout(environment, 60000);}
}

function move(x){
	if (EVO.mineral >= fun.moveCost()){
		EVO.mineral -= fun.moveCost();
		if (EVO.three.diet == null){
			EVO.food = Math.floor((Math.random()*((foods.max()-foods.min())*foods.mod())
				*fun.mul.muscle())+(foods.min()*foods.mod())*fun.mul.sight());
		}
		EVO.current = Math.floor(Math.random()*100)+1;
		currentMath();
		EVO.ph = Math.floor(Math.random()*140);
		phMath();
		EVO.salinity = Math.floor(Math.random()*11)+30;
		salinityMath();
		if (EVO.peristalsisSwitch == 'on'){movement();}
		if (EVO.three.diet !== null){
			huntAuto('move');
			if (x !== 'start'){
				huntAuto();
				clearTimeout(fun.hunt);
				hunt();
			}
		}
		if (x !== 'start'){
			updateMineral();
			var y = 0;
			if (EVO.three.boost == 'roam'){y = EVO.spd*30000;}
			clearTimeout(fun.move);
			fun.move = setTimeout(move,3600000-y);
		}
	}
}

function huntAuto(x){//FIX
	let random = function(){return Math.floor(Math.random()*100)+1;}
	if (x == 'move'){
		EVO.area.predator = Math.floor(Math.random()*10)+1;
		EVO.area.grazer = Math.floor(Math.random()*(100-(EVO.area.predator*5))+(EVO.area.predator*5)+1);
		EVO.area.field = Math.floor(Math.random()*(1000-(EVO.area.grazer*5))+(EVO.area.grazer*5)+1);
	}
	if (x == 'kill'){pred();}
	if (x == 'graze'){graze();}
	if (x == undefined){
		var a = 0;
		if (EVO.three.boost == 'terri'){a = EVO.def*6000;}
		setTimeout(pred,600000+a-(EVO.area.predator*60000));
		setTimeout(graze,600000+a-(EVO.area.grazer*6000));
	}
	function pred(){
		if (EVO.area.predator + (EVO.area.grazer*4) > Math.floor(Math.random()*100)+1){
			let fight = random();
			if (EVO.area.grazer < 1){EVO.area.predator -= 1;}
			if (fight > 90 && EVO.area.predator > 0){EVO.area.predator -= 1;}
			if (fight < 61 && EVO.area.grazer > 0){EVO.area.grazer -= 1;}
			if ((EVO.area.predator+1)*10 < EVO.area.grazer){EVO.area.predator += 1;}
		}
		if (x == undefined){
			foods.update();
			setTimeout(pred,600000+a-(EVO.area.predator*60000));
		}
	}
	function graze(){
		if (((EVO.area.predator*4) + Math.floor(EVO.area.grazer/4)) > Math.floor(Math.random()*100)+1){
			let fight = random();
			if (EVO.area.field < 1){EVO.area.grazer -= 1;}
			if (fight > 95 && EVO.area.predator > 0){EVO.area.predator -=1;}
			if (fight < 31 && EVO.area.grazer > 0){EVO.area.grazer -= 1;}
			if (EVO.area.field > 0){EVO.area.field -= 1;}
			if ((EVO.area.grazer+1)*10 < EVO.area.field){EVO.area.grazer += 1;}
		}
		if (x == undefined){
			foods.update();
			setTimeout(graze,600000+a-(EVO.area.grazer*6000));
		}
	}
}

function hunt(){//FIX
	if (cost.fight == 'off'){
		if (EVO.food < 1 && EVO.three.diet !== null && EVO.combat.hp >= Math.floor(EVO.combat.hlth*EVO.combat.mhp/100) && EVO.combat.sp >= Math.floor(EVO.combat.spcl*EVO.combat.msp/100)){
			doc('eventHTML','<div id="event"><p><span id="event1HTML"></span><br><span id="event2HTML"></span></p></div>');
			let res = 4000-EVO.peristalsis-(fun.add.muscle*10);
			let run = function (){EVO.mineral -= res; updateMineral();}
			let fight = Math.floor(Math.random()*100)+1;
			let camo = 1;
			if (EVO.three.boost == 'camo'){camo = EVO.off;}
			if (EVO.three.diet == 'carn'){
				if (EVO.area.predator > fight && EVO.area.predator > 0){
					doc('event1HTML','You meet an aggressive predatore.  You are being attacked.');
					run;
					cbt(res,Math.floor(Math.random()*3)+3);
				}
				else if (EVO.area.predator+(EVO.area.grazer*4)+camo > fight && EVO.area.grazer > 0){
					doc('event1HTML','You meet a unattentive grazer.  You are attacking.');
					run;
					cbt(res,Math.floor(Math.random()*3));
				}
			}
			if (EVO.three.diet == 'herb'){
				if (EVO.area.predator*4-camo > fight && EVO.area.predator > 0){
					doc('event1HTML','You meet an aggressive predatore.  You are being attacked.');
					run;
					cbt(res,Math.floor(Math.random()*3)+3);
				}
				else if (EVO.area.predator*4+(EVO.area.grazer/4)-camo > fight && EVO.area.grazer > 0){
					doc('event1HTML','You meet a terri grazer.  You are being attacked.');
					run;
					cbt(res,Math.floor(Math.random()*3));
				}
				if (EVO.area.field > 0){
					EVO.area.field -= 1;
					EVO.food = Math.floor((Math.random()*((foods.max()-foods.min())*10)*fun.mul.muscle())+(foods.min()*10)*fun.mul.sight());
				}
			}
		}
		if (cost.fight == 'off'){rehunt();}
		if (cost.fight == 'off'){doc('eventHTML','');}
	}
	if (cost.fight == 'on'){setTimeout(busy,1000);}
	function busy(){
		if (cost.fight == 'on'){setTimeout(busy,1000);}
		else {rehunt();}
	}
	function rehunt(){
		if (EVO.three.diet == 'carn'){var x = EVO.area.grazer*1000;}
		if (EVO.three.diet == 'herb'){var x = EVO.area.field*100;}
		fun.hunt = setTimeout(hunt, 150000-x);
	}
}

function updateMineral(){
	foods.update();
	css('mineral',Math.floor(EVO.mineral));
	color('evolution');
	color('EPS');
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
	let feed = (EVO.one.cilia/EVO.stage+fun.add.digestive())*fun.mul.digestive()*foods[type].multi*fun.mul.EPS();
	if (feed < 1){feed = 1;}
	EVO.food -= feed;
	if (EVO.one.metabolismType == 'aerob'){feed *= fun.mul.metabolism()*fun.mul.respiratory();}
	if (EVO.three.boost == 'hyper' && EVO.hp < EVO.mhp){feed *= (1+(EVO.spl/100));}
	EVO.mineral += feed;
	if (food < 0){EVO.food = 0;}
	if (x !== 'start'){
		foods.update();
		updateMineral();
		setTimeout(autoClick, ((1000*foods[type].timer+EVO.salinityCurse)*fun.mul.vascular()+1));
	}
}

function photosynth(x){
	let z = (1+(EVO.sun.position/100))*(1+(EVO.size.game/100))*fun.mul.metabolism()*fun.mul.respiratory()*fun.mul.EPS();
	if (EVO.three.boost == 'hyper' && EVO.hp < EVO.mhp){z *= (1+(EVO.spl/100));}
	EVO.nutrient += z;
	if (x !== 'start'){
		css('photosynthesis',Math.round(z));
		updateMineral();
		setTimeout(photosynth, ((1000+EVO.salinityCurse)*fun.mul.vascular()+1));
	}
}

var cost = {
	"sex": 2,
	"peristalsis": 3,
	"specialized": 5,
	"diet": 10,
	"skeleton": 10,
	"boost": 20,
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
		"balance": '',
		"nerve": '',
		"vascular": '',
		"muscle": '',
		"respiratory": '',
		"digestive": '',
		"excretion": '',
		"sight": '',
		"symmetry": '',
		"peristalsis": '',
		"diet": '',
		"skeleton": '',
		"size": '',
		"boost": '',
		"evolution": '<p class="evotitle"><b>Evolutions</b></p>',
	}
	let special = (EVO.specialzedEvo+1)*cost.specialized;
	let specialize = EVO.specialzedEvo + EVO.specialized;
	let evo = function(x){
		if (EVO[x+'Switch'] == 'off' || x.match(/^(radial|bilateral)$/)){
			let z = x;
			if (x.match(/^(radial|bilateral)$/)){z = 'symmetry';}
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
	let evos = function(x){return '<p id="'+x+'" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="evos(this.id)"></p>'};
	if (EVO.sex == 'off' && creation >= cost.sex){
		code.sex = evos('sex');
	}
	if ((specialize == 6 || specialize == 7) && creation >= special && EVO.symmetry == 'circular'){specializationSwitch();}
	if ((specialize == 8 || specialize == 9) && creation >= special && EVO.symmetry == 'radial'){specializationSwitch();}
	if (specialize == 8 && creation >= special && EVO.symmetry == 'circular'){
		evo('radial');
	}
	if (specialize == 10 && creation >= special && EVO.symmetry == 'radial'){
		evo('bilateral');
	}
	if (EVO.symmetry == 'radial' && creation >= cost.peristalsis && EVO.peristalsisSwitch == 'off'){
		code.peristalsis = evos('peristalsis');
	}
	if (EVO.symmetry == 'bilateral' && creation >= cost.diet && EVO.three.diet == null){
		code.diet = evos('carn')+evos('herb');
	}
	if (EVO.three.diet !== null && creation >= cost.skeleton && EVO.three.skeleton == null){
		code.skeleton = evos('endo')+evos('exo');
	}
	let a = 0;
	if (EVO.three.skeleton == 'endo'){a = 1;}
	if (EVO.stage + a > EVO.size.stage && EVO.three.diet !== null && creation >= cost.size()){
		css('size1',cost.size());
		code.size = evos('size');
	}
	if (creation >= cost.boost && EVO.three.diet !== null && EVO.three.boost == null){
		code.boost = evos('camo')+evos('terri')+evos('roam')+evos('hyper');
	}
	let codes = code.evolution + code.sex + code.symmetry + code.peristalsis;
	doc('stageUpgrade',codes);
	if (codes == code.evolution){stage.classList.replace('gold','taboff');}
	codes = code.evolution + code.balance + code.nerve + code.vascular + code.muscle + code.respiratory + code.digestive + code.excretion + code.sight + code.diet + code.skeleton + code.boost + code.size;
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
	a = 'peristalsis';
	if (x == a){
		EVO[x+e] = g;
		evo();
	}
	if (EVO[a+e] == g && !document.getElementById(a)){
		css(a,EVO.two[a]);
		copy(b,a);
	}
	if (x !== undefined && x.match(/^(carn|herb)$/)){
		EVO.three.diet = x;
		EVO.evo.evolved += cost.diet;
		huntAuto('move');
		huntAuto();
		hunt();
	}
	if (EVO.three.diet == 'carn' && !document.getElementById('meat')){
		document.getElementById('mineral').id = 'meat';
	}
	if (EVO.three.diet == 'herb' && !document.getElementById('plant')){
		document.getElementById('mineral').id = 'plant';
	}
	if (EVO.three.diet !== null && !document.getElementById(EVO.three.diet)){
		copy('devone','diet');
		document.getElementById('diet').firstChild.id = EVO.three.diet;
		document.getElementById('health').style.display = 'initial';
		css('hlth',EVO.combat.hlth);
		document.getElementById('stamina').style.display = 'initial';
		css('stmn',EVO.combat.stmn);
	}
	if (x !== undefined && x.match(/^(endo|exo)$/)){
		EVO.three.skeleton = x;
		EVO.evo.evolved += cost.skeleton;
	}
	if (EVO.three.skeleton !== null && !document.getElementById(EVO.three.skeleton)){
		copy('devone','skeleton');
		document.getElementById('skeleton').firstChild.id = EVO.three.skeleton;
	}
	if (x !== undefined && x.match(/^(camo|terri|roam|hyper)$/)){
		EVO.three.boost = x;
		EVO.evo.evolved += cost.boost;
	}
	if (EVO.three.boost !== null && !document.getElementById(EVO.three.boost)){
		document.getElementById('boost').style.display = 'initial';
		copy('bstevo',EVO.three.boost);
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
	updateMineral();
	updateEvolution();
	//if (x == 'fish'){fish();}
}

function specialized(x){
	if (x !== undefined){document.getElementById(x).removeAttribute('id');}
	if (x !== undefined){
		EVO.evo.evolved += (EVO.specialzedEvo * cost.specialized);
		if (!x.match(/^(radial|bilateral)$/)){EVO.specialzedEvo++;}
	}
	let spec = function(z){
		if (x == z){EVO[x+'Switch'] = 'on';}
		if (EVO[z+'Switch'] == 'on'){
			if (!document.getElementById(z)){copy('game',z);}
			css(z,EVO.three[z]);
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
	let h = 'radial';
	let i = 'bilateral';
	if (x == h){EVO[a] = x;}
	if (EVO[a] == h && !document.getElementById(h)){document.getElementById('circular').id = h;}
	if (x == i){EVO[a] = x;}
	if (EVO[a] == i && !document.getElementById(i)){document.getElementById(h).id = i;}
	if (x !== undefined){
		updateMineral();
		updateEvolution();
	}
	evolutionCombat();
	stat();
}

function math(x,y,z){
	let evo;
	if (x == 'evolution'){evo = EVO.evo[x];}
	else if (x == 'EPS'){evo = EVO[x];}
	else {
		let a = function(c){return EVO.three[c]*(100-REC[c].cost/2)/100;}
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
		if (x !== undefined){b[x] = EVO.three[x]*(100-REC[x].cost)/100;}
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
	"specialize": 2,
	"EPS": 1.01,
};

function buy(x,y){
	if (x == 'evolution'){
		if(EVO.mineral >= math(x,EVO.evo.cost)){
			EVO.mineral -= math(x,EVO.evo.cost);
			EVO.evo[x]++;
			evolutionCombat();
		}
	}
	else if (x == 'EPS'){
		if (y > 1){
			y = 10-(EVO[x]%10);
		}
		else {y = 1;}
		if (EVO.mineral >= math(x,xbuy.EPS,y)){
			EVO.mineral -= math(x,xbuy.EPS,y);
			EVO[x] += y;
			css(x,EVO[x]);
		}
	}
	else if (x.match(/^(offense|defense|speed|special)$/)){cbtupg(x);}
	else {
		if(EVO.mineral >= math(x,xbuy.specialize) && EVO.three[x] < REC[x].max+100){
			EVO.mineral -= math(x,xbuy.specialize);
			EVO.three[x]++;
			EVO.cellL += EVO.three[x];
			EVO.cellT += EVO.three[x];
			css(x,EVO.three[x]);
			stat();
			if (x == 'sight'){bgcolor();}
		}
	}
	updateMineral();
	if (x == 'evolution'){updateEvolution();}
	tip(x,y);
}

function color(x){
	let color = document.getElementById(x);
	let off = color.classList.replace('growon','growoff');
	let mod;
	if (x == 'EPS' && EVO.mineral >= math(x,xbuy.EPS)){
		off;
		mod = 10-(EVO.EPS%10);
		if (EVO.mineral >= math(x,xbuy.EPS,mod) && mod > 1){css(x+'-x','x'+mod);}
		else {css(x+'-x','');}
	}
	else if (x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/) && EVO.mineral >= math(x,xbuy.specialize)){off;}
	else if (x == 'evolution' && EVO.mineral >= math(x,EVO.evo.cost)){off;}
	else {
		color.classList.replace('growoff','growon');
		if (x.match(/^(EPS)$/)){css(x+'-x','');}
	}
}

function tip(x,y){
	if (x == 'swirl'){css('cost-'+x,fun.moveCost());}
	else if (x == 'evolution'){css('cost-'+x,math(x,EVO.evo.cost));}
	else if (x == 'EPS'){
		if (y == 11){y = 10-(EVO.EPS%10);}
		css('cost-'+x,math(x,xbuy.EPS,y));
	}
	else if (x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/)){css('cost-'+x,math(x,xbuy.specialize));}
	let z = document.getElementById('tip');
	z.classList.replace(z.className,x);
	cssHTML('mouse','initial');
}

function tap(x){
	let z = document.getElementById('tip');
	z.classList.replace(z.className,'empty');
	cssHTML('mouse','none');
}