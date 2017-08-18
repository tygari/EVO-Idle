var EVO = {
	"version": 0,
	"stage": 3,
	"date": Date.now(),
	"one": {
		"metabolismType": 'basic',
		"metabolism": 0,
		"mitochondria": 0,
		"cilia": 0,
		"cytoplasm": 0,
	},
	"two": {
		"adhesionLearn": 0,
		"osmisisLearn": 0,
		"balance": 0,
		"nerve": 0,
		"vascular": 0,
		"muscle": 0,
		"respiratory": 0,
		"digestive": 0,
		"excretion": 0,
		"sight": 0,
	},
	"three": {
		"diet": null,
		"balance": 0,
		"nerve": 0,
		"vascular": 0,
		"muscle": 0,
		"respiratory": 0,
		"digestive": 0,
		"excretion": 0,
		"sight": 0,
		"boost": null,
	},
	"photosynthesis": 0,
	"current": 50,
	"currentDamage": 0,
	"pH": 70,
	"salinity": 35,
	"salinityCurse": 0,
	"sunSwitch": 'on',
	"sun": 0,
	"food": 0,
	"mineral": 0,
	"predator": 0,
	"grazer": 0,
	"field": 0,
	"evolution": 0,
	"evolved": 0,
	"bonus": 0,
	"sex": 0,
	"peristalsisSwitch": 'off',
	"peristalsis": 0,
	"peristalsisLearn": 0,
	"evolutionSwitch": 'off',
	"specialized": 1,
	"specialzedEvo": 0,
	"balanceSwitch": 'off',
	"nerveSwitch": 'off',
	"vascularSwitch": 'off',
	"muscleSwitch": 'off',
	"respiratorySwitch": 'off',
	"digestiveSwitch": 'off',
	"excretionSwitch": 'off',
	"sightSwitch": 'off',
	"radial": null,
	"bilateral": null,
	"size": {
		"max": 0,
		"stage": 0,
	},
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
	"hlth": 100,
	"spcl": 100,
	"run": 0,
	"won": 0,
	"lost": 0,
};

var fun = {
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
		"vascular": function(){return (1+(EVO.two.vascular/100))*(1+(EVO.three.vascular/100));},
		"muscle": function(){return (1+(EVO.two.muscle/100))*(1+(EVO.three.muscle/100));},
		"respiratory": function(){return (1+(EVO.two.respiratory/100))*(1+(EVO.three.respiratory/100));},
		"digestive": function(){return (1+(EVO.two.digestive/100))*(1+(EVO.three.digestive/100));},
		"excretion": function(){return (1+(EVO.two.excretion/100))*(1+(EVO.three.excretion/100));},
		"sight": function(){return (1+(EVO.two.sight/100))*(1+(EVO.three.sight/100));},
	},
	"food":{
		"max": function(){return ((REC.food.max+EVO.size.max)*10)+100;},
		"min": function(){return (REC.food.min*10)+(EVO.size.max*5);},
	},
	"failtimer": function(){setTimeout(eventEnd, (Math.floor((Math.random()*240000)+1)));},
	"move": function(y){setTimeout(move, 3600000-y);},
	"hunt": function(x){setTimeout(hunt, 150000-x);},
};

function start(){
	if (localStorage.getItem("REC") !== null){REC = JSON.parse(localStorage.getItem("REC"));}
	if (localStorage.getItem("EVO") !== null){
		var savecheck = JSON.parse(localStorage.getItem("EVO"));
		if (savecheck.stage == 3){
			EVO = JSON.parse(localStorage.getItem("EVO"));
		}
	}
	if (localStorage.getItem("EVOE") !== null){
		var checksave = JSON.parse(localStorage.getItem("EVOE"));
		if (checksave.stage == 3){
			EVO.metabolismType = checksave.metabolismType;
			EVO.one = checksave.one;
			EVO.two = checksave.two;
			EVO.photosynthesis = checksave.photosynthesis;
			EVO.sunSwitch = checksave.sunSwitch;
			EVO.sun = checksave.sun;
			EVO.food = checksave.food;
			EVO.mineral = checksave.mineral;
			EVO.evolution = checksave.evolution;
			EVO.evolved = checksave.evolved;
			EVO.bonus = checksave.bonus;
			EVO.date = Date.now();
			localStorage.setItem("EVO", JSON.stringify(EVO));
			localStorage.removeItem("EVOE");
		}
	}
	EVO = {
		"version": 0,
		"stage": 3,
		"date": Date.now(),
		"one": {
			"metabolismType": 'Aerobic Respiration',
			"metabolism": 10,
			"mitochondria": 0,
			"cilia": 1000,
			"cytoplasm": 0,
		},
		"two": {
			"adhesionLearn": 0,
			"osmisisLearn": 0,
			"balance": 0,
			"nerve": 0,
			"vascular": 0,
			"muscle": 10,
			"respiratory": 0,
			"digestive": 0,
			"excretion": 0,
			"sight": 0,
		},
		"three": {
			"diet": null,
			"balance": 0,
			"nerve": 0,
			"vascular": 0,
			"muscle": 0,
			"respiratory": 0,
			"digestive": 0,
			"excretion": 0,
			"sight": 0,
			"boost": null,
		},
		"photosynthesis": 0,
		"current": 50,
		"currentDamage": 0,
		"pH": 70,
		"salinity": 35,
		"salinityCurse": 0,
		"sunSwitch": 'on',
		"sun": 0,
		"food": 10000,
		"mineral": 100000,
		"predator": 0,
		"grazer": 0,
		"field": 0,
		"evolution": 0,
		"evolved": 0,
		"bonus": 1000,
		"sex": 0,
		"peristalsisSwitch": 'off',
		"peristalsis": 0,
		"peristalsisLearn": 0,
		"evolutionSwitch": 'off',
		"specialized": 1,
		"specialzedEvo": 4,
		"balanceSwitch": 'off',
		"nerveSwitch": 'on',
		"vascularSwitch": 'on',
		"muscleSwitch": 'off',
		"respiratorySwitch": 'on',
		"digestiveSwitch": 'off',
		"excretionSwitch": 'off',
		"sightSwitch": 'on',
		"radial": null,
		"bilateral": null,
		"size": {
			"max": 0,
			"stage": 0,
		},
		"cbtMax": 1,
		"cbtevo": [],
		"mhp": 0,
		"hp": 10,
		"msp": 0,
		"sp": 10,
		"exp": 1000000,
		"scar": 0,
		"offG": 1,
		"off": 0,
		"defG": 0,
		"def": 0,
		"spdG": 0,
		"spd": 0,
		"splG": 0,
		"spl": 0,
		"hlth": 100,
		"spcl": 100,
		"run": 20,
		"won": 0,
		"lost": 0,
	};
	evos();
	specialized();
	var offline = Date.now() - EVO.date;
	var speedUp = [0, 0, 0, 0];
	while (offline >= speedUp[0]){
		if (speedUp[0] >= speedUp[1] + (2001-((fun.add.vascular()*10)+EVO.salinityCurse)){
			autoClick();
			if (EVO.metabolismType == 'Photophosphorylation') {photosynth();}
			speedUp[1] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[2] + 3600000){
			move('start');
			speedUp[2] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[3] + 60000){
			currentMath();
			phMath();
			salinityMath();
			sun();
			speedUp[3] = speedUp[0];
		}
		speedUp[0] += 1;
	}
	EVO.date = Date.now();
	//save(Date.now());
	doc('metabolismType',EVO.one.metabolismType);
	updateFood();
	updateMineral();
	if (EVO.three.diet !== null){huntAuto('start');}
	doc('evolutionCost',evolutionMath());
	doc('moveHTML',4000-EVO.peristalsis-(fun.add.muscle()*10));
	doc('current',(EVO.current/10));
	doc('pH',(EVO.pH/10));
	doc('salinity',EVO.salinity);
	light();
	setTimeout(environment, 60000);
	setTimeout(timer, 1000);
	// setTimeout(events, 300000);
	setTimeout(swirly, 30, 'on', 'on', Math.floor(Math.random()*window.innerWidth)-50, Math.floor(Math.random()*window.innerHeight)-50, 0);
}

function events(){
	var swch = 'off';
	doc('eventHTML','<div style="color:white; border-style: hidden; text-align:center"><p><span id="event1HTML"></span><br><span id="event2HTML"></span></p></div>');
	var random = Math.floor((Math.random() * 100)+1)
	if (0 < random && 10 >= random && EVO.mineral >= 2000-EVO.motility-(fun.add.muscle()*10)){
		swch = 'on';
		var res = 2000 - EVO.motility - (fun.add.muscle()*10);
		EVO.mineral -= res;
		updateMineral();
		doc('event1HTML','An aggressive colony of cells has entered your area.  They are attacking you.');
		cbt(res);
	}
}

function environment(){
	currentMath();
	phMath();
	salinityMath();
	sun();
	setTimeout(environment, 60000);
}

function currentMath(){
	var currents = Math.floor(Math.random()*3);
	if (currents == 0 && EVO.current < 100){EVO.current += 1;}
	if (currents == 1 && EVO.current > 0){EVO.current -= 1;}
	doc('current',(EVO.current/10));
}

function phMath(){
	var ph = Math.floor(Math.random()*3);
	if (ph == 0 && EVO.pH < 140){EVO.pH += 1;}
	if (ph == 1 && EVO.pH > 0){EVO.pH -= 1;}
	doc('pH',(EVO.pH/10));
}

function salinityMath(){
	var salinitys = Math.floor(Math.random()*3);
	if (salinitys == 0 && EVO.salinity < 40){EVO.salinity += 1;}
	if (salinitys == 1 && EVO.salinity > 30){EVO.salinity -= 1;}
	doc('salinity',EVO.salinity);
	salinityDebuff();
}

function updateFood(){
	if (EVO.three.diet == 'Carnivore'){
		if (EVO.grazer > 100){doc('food','Bountiful');}
		else if (EVO.grazer > 75){doc('food','Abundant');}
		else if (EVO.grazer > 50){doc('food','Plentiful');}
		else if (EVO.grazer > 25){doc('food','Sparse');}
		else if (EVO.grazer > 0){doc('food','Scarce');}
		else {doc('food','None');}
	} else if (EVO.three.diet == 'Herbivore'){
		if (EVO.field > 1000){doc('food','Bountiful');}
		else if (EVO.field > 750){doc('food','Abundant');}
		else if (EVO.field > 500){doc('food','Plentiful');}
		else if (EVO.field > 250){doc('food','Sparse');}
		else if (EVO.field > 0){doc('food','Scarce');}
		else {doc('food','None');}
	} else {
		if (EVO.food > 40000){doc('food','Bountiful');}
		else if (EVO.food > 30000){doc('food','Abundant');}
		else if (EVO.food > 20000){doc('food','Plentiful');}
		else if (EVO.food > 10000){doc('food','Sparse');}
		else if (EVO.food > 0){doc('food','Scarce');}
		else {doc('food','None');}
	}
}

function move(x){
	var moveCost = (4000-EVO.peristalsis-(fun.add.muscle()*10))*(1+(EVO.size.max/100));
	if (EVO.mineral >= moveCost){
		EVO.mineral -= moveCost;
		if (EVO.three.diet == null){EVO.food = Math.floor((Math.random()*((fun.food.max()-fun.food.min())*300)*fun.mul.muscle())+(fun.food.min()*300)*fun.mul.sight());}
		if (x !== 'start'){
			updateMineral();
			EVO.current = Math.floor(Math.random()*100)+1;
			currentMath();
			EVO.pH = Math.floor(Math.random()*140);
			phMath();
			EVO.salinity = Math.floor(Math.random()*11)+30;
			salinityMath();
			if (EVO.peristalsisSwitch == 'on'){peristalsis();}
			var y = 0;
			if (EVO.three.boost == 'Roaming'){y = EVO.spd*30000;}
			clearTimeout(fun.move(y));
			fun.move(y);
			if (EVO.three.diet !== null){
				huntAuto();
				clearTimeout(fun.hunt());
				fun.hunt();
			}
		}
	}
}

function huntAuto(x){
	if (x !== 'start'){
		EVO.predator = Math.floor(Math.random()*10)+1;
		EVO.grazer = Math.floor(Math.random()*(100-(EVO.predator*5))+(EVO.predator*5)+1);
		EVO.field = Math.floor(Math.random()*(1000-(EVO.grazer*5))+(EVO.grazer*5)+1);
	}
	var a = 0;
	if (EVO.three.boost == 'Territorial'){a = EVO.def*6000;}
	setTimeout(pred,600000+a-(EVO.predator*60000));
	setTimeout(graze,600000+a-(EVO.grazer*6000));
	function pred(){
		if (EVO.predator + (EVO.grazer*4) > Math.floor(Math.random()*100)+1){
			var fight = Math.floor(Math.random()*100)+1;
			if (EVO.grazer < 1){EVO.predator -= 1;}
			if (fight > 90 && EVO.predator > 0){EVO.predator -= 1;}
			if (fight < 61 && EVO.grazer > 0){EVO.grazer -= 1;}
			if ((EVO.predator+1)*10 < EVO.grazer){EVO.predator += 1;}
		}
		updateFood();
		setTimeout(pred,600000+a-(EVO.predator*60000));
	}
	function graze(){
		if (((EVO.predator*4) + Math.floor(EVO.grazer/4)) > Math.floor(Math.random()*100)+1){
			var fight = Math.floor(Math.random()*100)+1;
			if (EVO.field < 1){EVO.grazer -= 1;}
			if (fight > 95 && EVO.predator > 0){EVO.predator -=1;}
			if (fight < 31 && EVO.grazer > 0){EVO.grazer -= 1;}
			if (EVO.field > 0){EVO.field -= 1;}
			if ((EVO.grazer+1)*10 < EVO.field){EVO.grazer += 1;}
		}
		updateFood();
		setTimeout(graze,600000+a-(EVO.grazer*6000));
	}
}

function hunt(){
	if (cost.fight == 'off'){
		if (EVO.food < 1 && EVO.three.diet !== null && EVO.hp >= Math.floor(EVO.hlth*EVO.mhp/100) && EVO.sp >= Math.floor(EVO.spcl*EVO.msp/100)){
			doc('eventHTML','<div style="color:white; border-style: hidden; text-align:center"><p><span id="event1HTML"></span><br><span id="event2HTML"></span></p></div>');
			var res = 4000-EVO.peristalsis-((EVO.two.muscle+EVO.three.muscle)*10);
			var run = function (){EVO.mineral -= res; updateMineral();}
			var fight = Math.floor(Math.random()*100)+1;
			var a = 1;
			if (EVO.three.boost == 'Camoflauge'){a = EVO.off;}
			if (EVO.three.diet == 'Carnivore'){
				if (EVO.predator > fight && EVO.predator > 0){
					doc('event1HTML','You meet an aggressive predatore.  You are being attacked.');
					run;
					cbt(res,0,'hunt');
				}
				else if (EVO.predator+(EVO.grazer*4)+a > fight && EVO.grazer > 0){
					doc('event1HTML','You meet a unattentive grazer.  You are attacking.');
					run;
					cbt(res,Math.floor(Math.random()*10)*-1,'hunt');
				}
			}
			if (EVO.three.diet == 'Herbivore'){
				if (EVO.predator*4-a > fight && EVO.predator > 0){
					doc('event1HTML','You meet an aggressive predatore.  You are being attacked.');
					run;
					cbt(res,Math.floor(Math.random()*10),'hunt');
				}
				else if (EVO.predator*4+(EVO.grazer/4)-a > fight && EVO.grazer > 0){
					doc('event1HTML','You meet a territorial grazer.  You are being attacked.');
					run;
					cbt(res,0,'hunt');
				}
				if (EVO.field > 0){
					EVO.field -= 1;
					EVO.food = Math.floor((Math.random()*((fun.food.max()-fun.food.min())*10)*fun.mul.muscle())+(fun.food.min()*10)*fun.mul.sight());
				}
			}
		}
		if (cost.fight == 'off'){
			if (EVO.three.diet == 'Carnivore'){var x = EVO.grazer*1000;}
			if (EVO.three.diet == 'Herbivore'){var x = EVO.field*100;}
			fun.hunt(x);
		}
	}
	if (cost.fight == 'off'){doc('eventHTML','');}
}

function updateMineral(){
	doc('mineral',Math.floor(EVO.mineral));
	color('evolution');
	color('move');
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
	var feed = Math.floor((EVO.one.cilia/4 + fun.add.digestive()) * fun.mul.digestive());
	if (EVO.food >= feed){
		EVO.food -= feed;
		var a = 0;
		if (EVO.three.boost == 'Hyper Metabolic' && EVO.hp < EVO.mhp){a = EVO.spl;}
		if (EVO.metabolismType == 'Aerobic Respiration'){feed *= fun.mul.metabolism() * fun.mul.respiratory() * (1+(a/100));}
		EVO.mineral += feed;
		updateFood();
		updateMineral();
	} else {
		EVO.mineral += EVO.food;
		EVO.food -= EVO.food;
		updateFood();
		updateMineral();
	}
}

function timer(){
	autoClick();
	if (EVO.metabolismType == 'Photophosphorylation'){photosynth();}
	setTimeout(timer, (2001-(fun.add.vascular()*10)+EVO.salinityCurse));
}

function photosynth(){
	var a = 0;
	if (EVO.three.boost == 'Hyper Metabolic' && EVO.hp < EVO.mhp){a = EVO.spl;}
	EVO.photosynthesis += (1+(EVO.sun/100)) * fun.mul.metabolism() * fun.mul.respiratory() * (1+(a/100));
	while (EVO.photosynthesis >= 100){
		EVO.photosynthesis -= 100;
		EVO.mineral += 1;
	}
	doc('photosynthesis',Math.floor(EVO.photosynthesis)+'%');
	updateMineral();
}

function evolutionMath(){return Math.floor(10*Math.pow(1.4-(EVO.sex/10),EVO.evolution));}

function buyEvolution(){
	if(EVO.mineral >= evolutionMath()){
		EVO.mineral -= evolutionMath();
		EVO.evolution += 1;
		updateEvolution();
		updateMineral();
		evolutionCombat();
	}
	doc('evolutionCost',evolutionMath());
}

var cost = {
	"sex": 1,
	"specialized": 5,
	"peristalsis": 4,
	"diet": 10,
	"boost": 30,
	"fight": 'off',
}

function updateEvolution(){
	var creation = EVO.evolution - EVO.evolved + EVO.bonus + REC.bonus;
	doc('evolution',creation);
	var sexCode = '';
	var balanceCode = '';
	var nerveCode = '';
	var vascularCode = '';
	var muscleCode = '';
	var respiratoryCode = '';
	var digestiveCode = '';
	var excretionCode = '';
	var sightCode = '';
	var symmetryCode = '';
	var peristalsisCode = '';
	var carnCode = '';
	var herbCode = '';
	var sizeCode = '';
	var camoCode = '';
	var terriCode = '';
	var roamCode = '';
	var metaCode = '';
	var special = EVO.specialized * cost.specialized;
	function evo(y,z){return '<p onclick="specialized(' + y + ')"><b style="color:blue">' + z + '</b></p>';}
	function specializationSwitch(){
		if (EVO.balanceSwitch == 'off'){EVO.evolutionSwitch = 'on'; balanceCode = evo("'balance'","Statocyst");}
		if (EVO.nerveSwitch == 'off'){EVO.evolutionSwitch = 'on'; nerveCode = evo("'nerve'","Nerve");}
		if (EVO.vascularSwitch == 'off'){EVO.evolutionSwitch = 'on'; vascularCode = evo("'vascular'","Vascular");}
		if (EVO.muscleSwitch == 'off'){EVO.evolutionSwitch = 'on'; muscleCode = evo("'muscle'","Muscle");}
		if (EVO.respiratorySwitch == 'off'){EVO.evolutionSwitch = 'on'; respiratoryCode = evo("'respiratory'","Respiratory");}
		if (EVO.digestiveSwitch == 'off'){EVO.evolutionSwitch = 'on'; digestiveCode = evo("'digestive'","Digestive");}
		if (EVO.excretionSwitch == 'off'){EVO.evolutionSwitch = 'on'; excretionCode = evo("'excretion'","Excretion");}
		if (EVO.sightSwitch == 'off'){EVO.evolutionSwitch = 'on'; sightCode = evo("'sight'","Light Sense");}
	}
	if (EVO.sex == 0 && creation >= cost.sex){
		EVO.evolutionSwitch = 'on';
		sexCode = '<p title="Your cells evolve sexual reproduction." onclick="evos(\'reproduce\')"><b style="color:blue">Dioecy</b></p>';
	}
	if (EVO.specialzedEvo > 2 && creation >= special && EVO.radial == null){specializationSwitch();}
	if (EVO.specialzedEvo > 0 && creation >= special && EVO.radial == 'radial'){specializationSwitch();}
	if (EVO.specialzedEvo == 2 && creation >= special && EVO.radial == null){EVO.evolutionSwitch = 'on';
		symmetryCode = '<p title="Your cells and newly developed systems find efficency in organization and evolve into radial symetry." onclick="specialized(\'radial\')"><b style="color:blue">Radial Symetry</b></p>';
	}
	if (EVO.specialzedEvo == 0 && creation >= special && EVO.bilateral == null){
		EVO.evolutionSwitch = 'on';
		symmetryCode = '<p title="Your cells and newly developed systems find efficency in organization and evolve into bilateral symetry." onclick="specialized(\'bilateral\')"><b style="color:blue">Bilateral Symetry</b></p>';
	}
	if (EVO.radial == 'radial' && creation >= cost.peristalsis && EVO.peristalsisSwitch == 'off'){
		EVO.evolutionSwitch = 'on';
		peristalsisCode = '<p title="Your worm learns to undulate its body for motion." onclick="evos(\'peristalsis\')"><b style="color:blue">Peristalsis</b></p>';
	}
	if (EVO.bilateral == 'bilateral' && creation >= cost.diet && EVO.three.diet == null){
		EVO.evolutionSwitch = 'on';
		carnCode = '<p title="Your diet specializes to break down animal matter." onclick="evos(\'carn\')"><b style="color:blue">Carnivore</b></p>';
	}
	if (EVO.bilateral == 'bilateral' && creation >= cost.diet && EVO.three.diet == null){
		EVO.evolutionSwitch = 'on';
		herbCode = '<p title="Your diet specializes to break down plant matter." onclick="evos(\'herb\')"><b style="color:blue">Herbivore</b></p>';
	}
	if (EVO.stage > EVO.size.stage && EVO.three.diet !== null && creation >= EVO.size.max+1){
		EVO.evolutionSwitch = 'on';
		sizeCode = '<p title="Growing larger has many effects." onclick="evos(\'size\')"><b style="color:blue">Size ' + (EVO.size.max+1) + '</b></p>';
	}
	if (creation >= cost.boost && EVO.three.diet !== null && EVO.three.boost == null){
		EVO.evolutionSwitch = 'on';
		camoCode = '<p title="Camoflauge assists with hiding when hunting or avoiding being hunted." onclick="evos(\'camo\')"><b style="color:blue">Camoflauge</b></p>';
		terriCode = '<p title="Territorial creatures protect their area slowing potential food loss." onclick="evos(\'terri\')"><b style="color:blue">Territorial</b></p>';
		roamCode = '<p title="Raoming creatures can\'t stop moving finding new areas faster." onclick="evos(\'roam\')"><b style="color:blue">Roaming</b></p>';
		metaCode = '<p title="Hyper Metabolic creatures enter a hieghtened metabolic state when wounded." onclick="evos(\'meta\')"><b style="color:blue">Hyper Metabolic</b></p>';
	}
	var evolutionCode = '<p style="color:gold"><b>Evolutions</b></p>';
	if (EVO.evolutionSwitch == 'off'){doc('evolutionUpgrade','');}
	if (EVO.evolutionSwitch == 'on'){doc('evolutionUpgrade',evolutionCode + sexCode + balanceCode + nerveCode + vascularCode + muscleCode + respiratoryCode + digestiveCode + excretionCode + sightCode + symmetryCode + peristalsisCode + carnCode + herbCode + sizeCode + camoCode + terriCode + roamCode + metaCode);}
}

function evos(x){
	if (x == 'reproduce'){
		EVO.sex = 1;
		EVO.evolved += cost.sex;
	}
	if (EVO.sex == 1){
		doc('sexHTML','Dioecy');
		doc('evolutionCost',evolutionMath());
	}
	if (x == 'peristalsis'){
		EVO.peristalsisSwitch = 'on';
		EVO.evolved += cost.peristalsis;
	}
	if (EVO.peristalsisSwitch == 'on'){
		doc('peristalsisHTML','Peristalsis: <span id="peristalsis"></span>');
		doc('peristalsis',EVO.peristalsis);
	}
	if (x == 'carn'){
		EVO.three.diet = 'Carnivore';
		EVO.evolved += cost.diet;
		huntAuto();
		fun.hunt();
	}
	if (EVO.three.diet == 'Carnivore'){
		doc('diet','Meats');
	}
	if (x == 'herb'){
		EVO.three.diet = 'Herbivore';
		EVO.evolved += cost.diet;
		huntAuto();
		fun.hunt();
	}
	if (EVO.three.diet == 'Herbivore'){
		doc('diet','Plants');
	}
	if (EVO.three.diet !== null){
		doc('dietHTML','<br>Diet: ' + EVO.three.diet);
		doc('health','Health: <span onclick="hlth(\'+\')"> << </span><span id="hlth"></span><span onclick="hlth(\'-\')">% >> </span>');
		doc('hlth',EVO.hlth);
		doc('special','Special: <span onclick="spcl(\'+\')"> << </span><span id="spcl"></span><span onclick="spcl(\'-\')">% >> </span>');
		doc('spcl',EVO.spcl);
	}
	if (x == 'size'){
		EVO.size.max += 1;
		EVO.size.stage += 1;
		EVO.evolved += EVO.size.max;
	}
	if (x == 'camo'){
		EVO.three.boost = 'Camoflauge';
		EVO.evolved += cost.boost;
	}
	if (x == 'terri'){
		EVO.three.boost = 'Territorial';
		EVO.evolved += cost.boost;
	}
	if (x == 'roam'){
		EVO.three.boost = 'Roaming';
		EVO.evolved += cost.boost;
	}
	if (x == 'meta'){
		EVO.three.boost = 'Hyper Metabolic';
		EVO.evolved += cost.boost;
	}
	if (EVO.size.max > 0 || EVO.three.boost !== null){
		var size = '';
		var boost = '';
		if (EVO.size.max > 0){size = '<br>Size: ' + EVO.size.max;}
		if (EVO.three.boost !== null){boost = '<br>' + EVO.three.boost;}
		doc('boostHTML','<p>Boosted Evolutions<br>'+ size + boost + '</p>');
		if (EVO.three.boost !== null){evolutionCombat();}
	}
	EVO.evolutionSwitch = 'off';
	updateEvolution();
}

function specialized(x){
	if (x !== undefined){
		EVO.evolved += (EVO.specialized * cost.specialized);
		if (x !== 'radial'){EVO.specialzedEvo -= 1;}
		EVO.specialized += 1;
		EVO.evolutionSwitch = 'off';
	}
	function spl(a,b,c){
		doc(a + 'HTML','<div onmouseover="mouseOn(\'' + b +'\',\'' + a + '\')" onmouseout="mouseOff(\'' + b + '\')" onclick="specialize(\'' + a + '\')"><p><b id=\'' + a + "Button" + '\'>' + c + '</b><br>' + c + ': <span id=\'' + a + '\'></span></p></div><span id=\'' + b + '\'></span>');
		doc(a,EVO.three[a]);
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
	if (x == 'radial'){EVO.radial = x; x = undefined;}
	if (EVO.radial == 'radial'){doc('symetryHTML','Radial Symetry');}
	if (x == 'bilateral'){EVO.bilateral = x; x = undefined;}
	if (EVO.bilateral == 'bilateral'){doc('symetryHTML','Bilateral Symetry');}
	doc('moveHTML',4000-EVO.peristalsis-(EVO.two.muscle+EVO.three.muscle)*10);
	doc('specializeHTML','<p>Specilization Cost: <span id="specializeCost"></span></p>');
	doc('retreat','Retreat: <span onclick="run(\'+\')"> << </span><span id="run"></span><span onclick="run(\'-\')">% >> </span>');
	doc('run',EVO.run);
	specializeNext(x);
	updateMineral();
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

function peristalsis(){
	EVO.peristalsisLearn += fun.mul.nerve();
	if (EVO.peristalsisLearn > EVO.peristalsis && EVO.peristalsis < 1000){
		EVO.peristalsisLearn -= (EVO.peristalsis + 1);
		EVO.peristalsis += 1;
		doc('peristalsis',EVO.peristalsis);
		doc('moveHTML',4000-EVO.peristalsis-(fun.add.muscle()*10));
	}
}

function specializeMath(x){
	var z = {
		"balance": EVO.three.balance*(100-REC.balance.cost/2)/100,
		"nerve": EVO.three.nerve*(100-REC.nerve.cost/2)/100,
		"vascular": EVO.three.vascular*(100-REC.vascular.cost/2)/100,
		"muscle": EVO.three.muscle*(100-REC.muscle.cost/2)/100,
		"respiratory": EVO.three.respiratory*(100-REC.respiratory.cost/2)/100,
		"digestive": EVO.three.digestive*(100-REC.digestive.cost/2)/100,
		"excretion": EVO.three.excretion*(100-REC.excretion.cost/2)/100,
		"sight": EVO.three.sight*(100-REC.sight.cost/2)/100,
	}
	if (x !== undefined){z[x] = EVO.three[x]*(100-REC[x].cost)/100;}
	return Math.floor(10*Math.pow(2,z.balance + z.nerve + z.vascular + z.muscle + z.respiratory + z.digestive + z.excretion + z.sight));
}

function specializeNext(x){doc('specializeCost',specializeMath(x));}

function specialize(x){
	if (EVO.mineral >= specializeMath(x) && EVO.three[x] < REC[x].max+100){
		EVO.mineral -= specializeMath(x);
		EVO.three[x] += 1;
		doc(x,EVO.three[x]);
		updateMineral();
		specializeNext(x);
		stat();
		if (x == 'muscle'){doc('moveHTML',4000-EVO.peristalsis-(fun.add.muscle()*10));}
		if (x == 'sight'){light();}
	}
}

function light(){
	y = fun.add.sight();
	if (EVO.sun < y){y = EVO.sun;}
	document.getElementById("stage").style.backgroundColor = 'rgb(' + [y,y,y].join(',') + ')';
}

function color(x){
	var color = document.getElementById(x + 'Button');
	if (x == 'evolution' && EVO.mineral >= evolutionMath()){color.style.color = 'red';}
	else if (x == 'move' && EVO.mineral >= 4000-EVO.peristalsis-(fun.add.muscle()*10)){color.style.color = 'red';}
	else if (x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/) && EVO.mineral >= specializeMath(x)){color.style.color = 'red';}
	else {color.style.color = 'green';}
}

function tip(x){
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