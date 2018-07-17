const foods = {/* Random * ((max-min)*mod)*muscle + (min*mod)*sight */
	"check": function(){
		let type;
		let check = function(x){return EVO.food > foods[x].amount();}
		if (check('bountiful')){type = 'bountiful';}
		else if (check('abundant')){type = 'abundant';}
		else if (check('plentiful')){type = 'plentiful';}
		else if (check('sparse')){type = 'sparse';}
		else if (check('scarce')){type = 'scarce';}
		else {type = 'none';}
		return type;
	},
	"update": function(){
		let type = foods.check();
		let x = document.getElementById('food');
		x.classList.replace(x.className,foods[type].name);
	},
	"max": function(){return ((REC.food.max+EVO.size.game)*10)+100;},
	"min": function(){return (REC.food.min*10)+(EVO.size.game*5);},
	"mod": function(){return 100*EVO.stage;},
	"amount": function(x){
		x = x*EVO.stage;
		if (EVO.three){x /= foods[EVO.three.diet];}
		return x;
	},
	"Carnivore": 100,
	"Herbivore": 10,
	"bountiful": {
		"name": 'bountiful',
		"amount": function(){return foods.amount(10000);},
		"multi": 1.2,
		"timer": 0.5,
	},
	"abundant": {
		"name": 'abundant',
		"amount": function(){return foods.amount(7500);},
		"multi": 1,
		"timer": 1,
	},
	"plentiful": {
		"name": 'plentiful',
		"amount": function(){return foods.amount(5000);},
		"multi": 0.8,
		"timer": 1.5,
	},
	"sparse": {
		"name": 'sparse',
		"amount": function(){return foods.amount(2500);},
		"multi": 0.6,
		"timer": 2,
	},
	"scarce": {
		"name": 'scarce',
		"amount": function(){return foods.amount(0);},
		"multi": 0.4,
		"timer": 2.5,
	},
	"none": {
		"name": 'none',
		"multi": 0.2,
		"timer": 3,
	},
}

const currentMath = function(){
	let currents = Math.floor(Math.random()*3);
	if (currents == 0 && EVO.current < 100){EVO.current++;}
	if (currents == 1 && EVO.current > 0){EVO.current--;}
	css('current',(EVO.current/10));
}

const phMath = function(){
	let ph = Math.floor(Math.random()*3);
	if (ph == 0 && EVO.ph < 140){EVO.ph++;}
	if (ph == 1 && EVO.ph > 0){EVO.ph--;}
	css('ph',(EVO.ph/10));
}

const salinityMath = function(){
	let salinity = Math.floor(Math.random()*3);
	if (salinity == 0 && EVO.salinity < 40){EVO.salinity++;}
	if (salinity == 1 && EVO.salinity > 30){EVO.salinity--;}
	css('salinity',EVO.salinity);
	salinityDebuff();
}

const phDmg = function(){
	EVO.phd = 0;
	let phd;
	if (EVO.ph < 71){phd = 70-EVO.ph;}
	if (EVO.ph > 70){phd = EVO.ph-70;}
	EVO.EPS -= Math.floor(phd/10);
	if (EVO.EPS < 0){
		EVO.phd = Math.abs(phd);
		EVO.EPS = 0;
	}
	EVO.combat.hp -= EVO.phd;
	if(EVO.combat.hp < 0){EVO.combat.hp = 0;}
	if (EVO.biofilm == 'biofilm' || EVO.stage > 2){
		css('EPS',EVO.EPS);
	}
}

const salinityDebuff = function(){
	let a = 'osmoregulation';
	let b = 'osmisisLearn';
	let c = 'salinityCurse';
	if (Math.floor(Math.random()*100)+1 > EVO[a]){
		EVO[c] = ((Math.abs(EVO.salinity-35))*200)-EVO[a];
		if (EVO[a] >= 0){
			EVO[b] += fun.mul.nerve();
			if (EVO[b] > EVO[a]){
				EVO[b] -= (EVO[a] + 1);
				EVO[a]++;	
				css(a,EVO[a]);
			}
		}
	} else {EVO[c] = 0;}
}

const movement = function(){
	let a = fun.movement;
	let b = a+'Learn';
	EVO[b] += fun.mul.nerve();
	if (EVO[b] > EVO[fun.stage][a] && EVO[fun.stage][a] < 1000){
		EVO[b] -= (EVO[fun.stage][a]+1);
		EVO[fun.stage][a]++;
		css(a,EVO[fun.stage][a]);
	}
}

const save = function(x){
	cheat();
	if (Date.now() - x > 20000){location.reload(true);}
	else {
		EVO.date = Date.now();
		localStorage.setItem("EVO", JSON.stringify(EVO));
		setTimeout(save,10000,Date.now());
	}
}

const cheat = function(){
	if (EVO.stage >= 1){
		if (EVO.one.metabolism > 100){hard();}
		if (EVO.one.mitochondria > 100){hard();}
		if (EVO.one.mitosis > 1000){hard();}
		if (EVO.one.cytoplasm > 1000){hard();}
		if (EVO.one.cilia > 1000){hard();}
		if (EVO.one.flagellum > 1000){hard();}
		if (EVO.one.ribosome > 1000){hard();}
	}
	if (EVO.stage >= 2){
		if (EVO.two.balance > REC.balance.max + 100){hard();}
		if (EVO.two.nerve > REC.nerve.max + 100){hard();}
		if (EVO.two.vascular > REC.vascular.max + 100){hard();}
		if (EVO.two.muscle > REC.muscle.max + 100){hard();}
		if (EVO.two.respiratory > REC.respiratory.max + 100){hard();}
		if (EVO.two.digestive > REC.digestive.max + 100){hard();}
		if (EVO.two.excretion > REC.excretion.max + 100){hard();}
		if (EVO.two.sight > REC.sight.max + 100){hard();}
	}
	if (EVO.stage >= 3){
		if (EVO.three.balance > REC.balance.max + 100){hard();}
		if (EVO.three.nerve > REC.nerve.max + 100){hard();}
		if (EVO.three.vascular > REC.vascular.max + 100){hard();}
		if (EVO.three.muscle > REC.muscle.max + 100){hard();}
		if (EVO.three.respiratory > REC.respiratory.max + 100){hard();}
		if (EVO.three.digestive > REC.digestive.max + 100){hard();}
		if (EVO.three.excretion > REC.excretion.max + 100){hard();}
		if (EVO.three.sight > REC.sight.max + 100){hard();}
	}
}

const soft = function(){
	localStorage.removeItem('EVO');
	window.location.assign('index.html');
}

const hard = function(){
	localStorage.removeItem('EVO');
	localStorage.removeItem('REC');
	window.location.assign('index.html');
}

const resave = function(){localStorage.setItem("REC", JSON.stringify(REC));}

const creations = function(){return EVO.evo.evolution - EVO.evo.evolved + EVO.evo.bonus + REC.bonus;}

const css = function(x,y){return document.body.style.setProperty('--'+x,'"'+y+'"');}

const cssHTML = function(x,y){return document.documentElement.style.setProperty('--'+x,y);}

const doc = function(x,y){return document.getElementById(x).innerHTML = y;}

const copy = function(x,y,z){
	if (z == undefined){z = 'afterend';}
	let node = document.getElementById(x);
	let copy = node.outerHTML;
	node.id = y;
	document.getElementById(y).insertAdjacentHTML(z,copy);
}

const gift = function(){
	var x = [5, 0];
	EVO.food += EVO.stage * 200;
	doc('adHTML',x[0] +':0'+ x[1]);
	setTimeout(z,1000);
	function z(){
		if (x[1] > -1){x[1]--;}
		if (x[0] > 0 && x[1] == -1){x[1] = 59; x[0]--;}
		if (x[1] > -1 && x[1] < 10){doc('adHTML',x[0] +':0'+ x[1]);}
		if (x[1] > 9){doc('adHTML',x[0] +':'+ x[1]);}
		if (x[0] > 0 || x[1] > 0){setTimeout(z,1000);}
		if (x[0] <= 0 && x [1] <= 0){doc('adHTML','<div id="gift" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="gift()"></div>');}
	}
}

document.addEventListener("mousemove", function(mouse){
	let X = mouse.clientX-40;
	if (X > window.innerWidth/2){X -= document.getElementById('mouse').offsetWidth;}
	cssHTML('mouseX',X+'px');
	cssHTML('mouseY',mouse.clientY+'px');
});

const sun = function(){
	let a = EVO.sun;
	a.position += a.sunSwitch;
	if (a.position < 1 || a.position > 99){a.sunSwitch *= -1;}
	if (EVO.stage > 1){bgcolor();}
}

const protein = function(x){
	let y = EVO.one.ribosome + EVO.one.ribosomeBonus;
	if (EVO.one.endoplasmic > -1){y *= (1+(EVO.one.endoplasmic/100));}
	if (EVO.one.golgi > -1){y *= (1+(EVO.one.golgi/100));}
	EVO.protein.partial += y;
	while (EVO.protein.partial > 999){
		EVO.protein.partial -= 1000;
		EVO.protein.whole++;
	}
	css('protein',EVO.protein.whole);
	if (x !== 'start'){setTimeout(protein,60000);}
}

const ribosome = function(x){
	EVO.one.ribosomePartial += EVO.one.ribosome + EVO.one.ribosomeBonus;
	let y = Math.floor(1000*Math.pow(1.001,EVO.one.ribosomeBonus));
	if (EVO.one.ribosomePartial > y){
		EVO.one.ribosomePartial -= y;
		EVO.one.ribosomeBonus++;
	}
	css('ribosome',EVO.one.ribosome + EVO.one.ribosomeBonus);
	if (x !== 'start'){setTimeout(ribosome,3600000);}
}

const bgcolor = function(){
	let x = fun.add.sight();
	let y = EVO.sun.position;
	if (y < x){x = y;}
	cssHTML('bg-color','rgb(' + [x,x,x].join(',') + ')');
}

const swirly = function(v,w,x,y,z){
	let a = 800;
	let b = 600;
	if (window.innerWidth-50 > a){a = window.innerWidth-50;}
	if (window.innerHeight-50 > b){b = window.innerHeight-50;}
	x += v;
	y += w;
	z += 12;
	if (x < 2 || x >= a){
		v *= -1;
		if (x < 0){x = 0;}
		if (x > a){x = a;}
	}
	if (y < 2 || y >= b){
		w *= -1;
		if (y < 0){y = 0;}
		if (y > b){y = b;}
	}
	if (z > 359){z = 0;}
	cssHTML('swirl-left',x+'px');
	cssHTML('swirl-top',y+'px');
	cssHTML('swirl-transform',z+'deg');
	setTimeout(swirly,30,v,w,x,y,z);
}

var REC = {
	"bonusMax": 0,
	"bonus": 0,
	"food": {"max": 0, "min": 0,},
	"cytoplasm": 0,
	"offensive": 0,
	"defensive": 0,
	"speed": 0,
	"special": 0,
	"ability": 0,
	"balance": {"cost": 0, "max": 0,},
	"nerve": {"cost": 0, "max": 0,},
	"vascular": {"cost": 0, "max": 0,},
	"muscle": {"cost": 0, "max": 0,},
	"respiratory": {"cost": 0, "max": 0,},
	"digestive": {"cost": 0, "max": 0,},
	"excretion": {"cost": 0, "max": 0,},
	"sight": {"cost": 0, "max": 0,},
};

const carnate = function(){
	document.getElementById('carnate').classList.replace('hidden','shown');
}

const nocarnate = function(){
	doc('eventHTML','');
	document.getElementById('lay').classList.replace('layon','layoff');
	document.getElementById('carnate').classList.replace('shown','hidden');
	cost.fight = 'off';
}

const recarnate = function(){
	document.getElementById('lay').classList.replace('layon','layoff');
	document.getElementById('carnate').classList.replace('shown','hidden');
	resave();
	let bonus = 0;
	bonus += Math.floor((EVO.one.metabolism + EVO.one.mitochondria + fun.add.balance + fun.add.nerve + fun.add.vascular + fun.add.muscle + fun.add.respiratory + fun.add.digestive + fun.add.excretion + fun.add.sight + EVO.offense + EVO.defense + EVO.speed + EVO.special)/10);
	REC.bonus += bonus;
	REC.bonusMax += bonus;
	localStorage.setItem("REC", JSON.stringify(REC));
	localStorage.removeItem("EVO");
	//var kongregate;
	//var LoadingAPI = window.parent.LoadingAPI;
	//if (LoadingAPI){
	//	kongregate = window.parent.kongregateAPI.getAPI();
	//	kongregate.stats.submit('Reincarnation Bonus', REC.bonusMax);
	//}
	window.location.assign("REC.html");
}