var EVO = {
	"stage": 1,
	"date": Date.now(),
	"one": {
		"metabolismType": 'basic',
		"metabolism": -1,
		"mitochondria": -1,
		"mitosis": 0,
		"cytoplasm": -1,
		"cilia": 0,
		"flagellum": 0,
		"membraneScore": 0,
		"ribosome": 0,
		"ribosomeBonus": 0,
		"ribosomePartial": 0,
		"endoplasmic": -1,
		"golgi": -1,
	},
	"sun": {
		"sunSwitch": 1,
		"position": 1,
	},
	"size": {
		"game": 0,
		"stage": 0,
	},
	"food": 10000,
	"atp": 0,
	"protein": {
		"whole": 0,
		"partial": 0,
	},
	"evo": {
		"evolution": 0,
		"evolved": 0,
		"bonus": 0,
		"cost": 1.4,
	},
	"mitosisSwitch": 'off',
	"mitosisLimit": 5,
	"mitosisChance": 0,
	"mitosisLearn": 0,
	"cytoskeleton": null,
	"nucleus": null,
	"ciliaSwitch": 'off',
	"flagellumSwitch": 'off',
	"ribosomeSwitch": 'off',
	"RNASwitch": 'off',
	"RNA": 0,
	"sRNA": 0,
	"rRNA": 0,
	"tRNA": 0,
	"DNASwitch": 'off',
	"DNA": 0,
	"sDNA": 0,
};

var fun = {
	"cytoplasm": function(x){return (100-(EVO.one.cytoplasm*((REC.cytoplasm+10)/1000)))*x/100;},
	"metabolism": function(){return (1+(EVO.one.metabolism/100))*(1+(EVO.one.mitochondria/100))*(1+(creations()/100));},
	"RNA": function(){return EVO.RNA + EVO.rRNA - EVO.sRNA;},
	"DNA": function(){return EVO.DNA - EVO.sDNA;},
	"virus": [1 ,0, 0, 0],
	"failtimer": 0,
	"move": 0,
	"moveCost": function(){
		let mem = 1;
		if (EVO.one.membraneScore == 3){mem = 1.5;}
		return Math.floor((1000-EVO.one.flagellum)*(1+(EVO.size.game/100))*mem);
	},
};

function start(){
	/*Save File load*/
	if (localStorage.getItem('REC') !== null){REC = JSON.parse(localStorage.getItem('REC'));}
	if (localStorage.getItem('EVO') !== null){EVO = JSON.parse(localStorage.getItem('EVO'));}
	/*HTML Alterations*/
	let html = function(x){document.getElementById(x+'box').insertAdjacentHTML('afterbegin','<div class="button butcol growoff" id="'+x+'" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="buy(this.id)"><c></c><b onmouseenter="tip(this.parentNode.id,11)" onmouseleave="tip(this.parentNode.id)" onclick="buy(this.parentNode.id,11); event.stopPropagation()"></b></div>');}
	html('stage');
	html('game');
	html('loot');
	copy('struc','bubble');
	copy('devone','metabolize');
	document.getElementById('metabolize').firstChild.id = 'basic';
	copy('stage','ATP');
	copy('stage','evolution','beforebegin');
	document.getElementsByTagName('label')[0].style.visibility = 'hidden';
	document.getElementsByTagName('label')[1].style.visibility = 'hidden';
	document.getElementById('boost').style.display = 'none';
	document.getElementById('stat').style.display = 'none';
	document.getElementById('health').style.display = 'none';
	document.getElementById('stamina').style.display = 'none';
	document.getElementById('retreat').style.display = 'none';
	evos();
	/*Initialize Program*/
	let offline = Date.now() - EVO.date;
	if (offline > 8.64e+7){offline = 8.64e+7;}
	speedup(offline);
	EVO.date = Date.now();
	save(Date.now());
	foods.update();
	updateATP();
	setTimeout(environment,60000);
	setTimeout(autoClick, 6001-EVO.one.cytoplasm*6);
	setTimeout(events,300000);
	setTimeout(swirly,30,2,2,Math.floor(Math.random()*window.innerWidth)-50,Math.floor(Math.random()*window.innerHeight)-50,0);
	css('gift',200);
}

function speedup(x){
	let speedUp = [0,0,0,0,0,0,0,0];
	while (x > speedUp[0]){
		let type = foods.check();
		if (EVO.ciliaSwitch == 'on' && speedUp[0] >= speedUp[1] + ((1001-EVO.one.cytoplasm)*foods[type].timer)){
			autoClick('start');
			speedUp[1] = speedUp[0];
		}
		if (EVO.one.metabolismType == 'photo' && speedUp[0] >= speedUp[2] + (1001-EVO.one.cytoplasm)){
			photosynth('start');
			speedUp[2] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[3] + 60000){
			sun();
			speedUp[3] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[4] + 3600000){
			move('start');
			speedUp[4] = speedUp[0];
		}
		if (speedUp[0] >= speedUp[5] + 60000){
			RNA('start');
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
	let random = Math.floor((Math.random()*100)+1)
	if (0 < random && 10 >= random){
		swch = 'on';
		doc('event1HTML','You met a friendly cell.  Would you like to share genes?');
		doc('event2HTML','<p title="Horizontal Gene Transfer is the two single cell creatures meeting together and sharing genes." onclick="horizontal()"><b class="purple">HGT</b></p>');
		fun.failtimer = setTimeout(eventEnd, (Math.floor((Math.random()*240000)+1)));
	}
	if (10 < random && 20 >= random && EVO.RNASwitch == 'on'){
		swch = 'on';
		fun.virus[0] = 2;
		doc('event1HTML','You met a virus.  It has infected you.');
		doc('event2HTML','<p title="Click to fight the virus." onclick="antivirusM()"><b class="purple">Fight Virus</b></p>');
		fun.virus[1] = Math.floor((Math.random()*fun.RNA()*100)+1);
		antivirusA();
	}
	if (20 < random && 30 >= random){
		swch = 'on';
		doc('event1HTML','The area has had an influx of food.');
		EVO.food += Math.floor((Math.random()*5000*(1+(EVO.one.flagellum/100)))+1);
		setTimeout(eventEnd, 60000);
	}
	if (swch == 'off') {doc('eventHTML',''); setTimeout(events, 300000);}
}

function horizontal(){
	clearTimeout(fun.failtimer);
	if ((15-(EVO.one.membraneScore*5))+(fun.RNA()/100) > Math.floor((Math.random()*100)+1)){EVO.evo.bonus++;}
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
	fun.virus[1]--;
	if (fun.virus[1] > 0){setTimeout(antivirusA, 1000);}
	else {
		fun.virus[0] = 1;
		eventEnd();
	}
}

function eventEnd(){
	doc('eventHTML','');
	setTimeout(events, (Math.floor((Math.random()*240000)+1)));
}

function environment(){
	sun();
	setTimeout(environment, 60000);
}

function move(x){
	if (EVO.atp >= fun.moveCost()){
		EVO.atp -= fun.moveCost();
		EVO.food = Math.floor((Math.random()*((foods.max()-foods.min())*foods.mod())
			*(1+(EVO.one.flagellum/1000)))+(foods.min()*foods.mod()));
		if (x !== 'start'){
			updateATP();
			clearTimeout(fun.move);
			fun.move = setTimeout(move, 3600000);
		}
	}
}

function updateATP(){
	foods.update();
	css('ATP',Math.floor(EVO.atp));
	color('evolution');
	if (EVO.one.cytoplasm > -1){color('cytoplasm');}
	let clr = function(x){if (EVO[x+'Switch'] == 'on'){color(x);};}
	clr('mitosis');
	clr('cilia');
	clr('flagellum');
	clr('RNA');
	clr('ribosome');
	clr('endoplasmic');
	clr('golgi');
}

function autoClick(x){
	let type = foods.check();
	let feed = EVO.one.cilia*foods[type].multi;
	if (feed < 1){feed = 1;}
	EVO.food -= feed;
	if (EVO.one.metabolismType == 'aerob'){feed *= fun.metabolism();}
	EVO.atp += feed/fun.virus[0];
	if (EVO.food < 0){EVO.food = 0;}
	if (x !== 'start'){
		foods.update();
		updateATP();
		let time;
		if (EVO.one.cilia > 0){time = 1001-EVO.one.cytoplasm;}
		else {
			let a = EVO.one.membraneScore;
			if (a > 2){a = 2;}
			time = 6000-(a*2000);
		}
		setTimeout(autoClick, time*foods[type].timer);
	}
}

function photosynth(x){
	let z = (1+(EVO.sun.position/100))*(1+(EVO.size.game/100))*fun.metabolism();
	EVO.atp += z / fun.virus[0];
	if (x !== 'start'){
		css('photosynthesis',Math.round(z));
		updateATP();
		setTimeout(photosynth, 1001-EVO.one.cytoplasm);
	}
}

var cost = {
	"doublebubble": 1,
	"phospholipid": 2,
	"cellwall": 7,
	"mitosis": 4,
	"cytoplasm": 1,
	"cytoskeleton": 2,
	"cilia": 3,
	"flagellum": 3,
	"ribosome": 5,
	"RNA": 4,
	"DNA": 6,
	"metabolism": 5,
	"mitochondria": 7,
	"nucleus": 8,
	"endoplasmic": 9,
	"golgi": 9,
	"multicell": 5,
	"size": function(){return EVO.size.game+1;},
}

function updateEvolution(){
	let stage = document.getElementById('stagenavevo');
	let game = document.getElementById('gamenavevo');
	stage.classList.replace('taboff','gold');
	game.classList.replace('taboff','gold');
	let creation = creations();
	css('evolution',creation);
	let code = {
		"membrane": '',
		"mitosis": '',
		"cytoplasm": '',
		"cytoskeleton": '',
		"cilia": '',
		"flagellum": '',
		"ribosome": '',
		"metabolism": '',
		"mitochondria": '',
		"nucleus": '',
		"endoplasmic": '',
		"golgi": '',
		"na": '',
		"multicelluar": '',
		"size": '',
		"evolution": '<p class="evolutions gold"></p>',
	}
	let evos = function (x){return '<p id="'+x+'" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="evos(this.id)"></p>'};
	if (EVO.one.membraneScore == 0 && creation >= cost.doublebubble){
		code.membrane = evos('doublebubble');
	}
	if (EVO.one.membraneScore == 1 && creation >= cost.phospholipid){
		code.membrane = evos('phospholipid');
	}
	if (EVO.one.membraneScore == 2 && EVO.cytoskeleton == 'cytoskeleton' && creation >= cost.cellwall){
		code.membrane = evos('cellwall');
	}
	if (EVO.RNASwitch == 'on' && EVO.one.membraneScore >= 2 && EVO.mitosisSwitch == 'off' && creation >= cost.mitosis){
		code.mitosis = evos('mitosis');
	}
	if (EVO.one.membraneScore > 0 && EVO.one.cytoplasm == -1 && creation >= cost.cytoplasm){
		code.cytoplasm = evos('cytoplasm');
	}
	if (EVO.one.membraneScore > 1 && EVO.cytoskeleton === null && creation >= cost.cytoskeleton){
		code.cytoskeleton = evos('cytoskeleton');
	}
	if (EVO.cytoskeleton == 'cytoskeleton' && EVO.ciliaSwitch == 'off' && creation >= cost.cilia){
		code.cilia = evos('cilia');
	}
	if (EVO.cytoskeleton == 'cytoskeleton' && EVO.flagellumSwitch == 'off' && creation >= cost.flagellum){
		code.flagellum = evos('flagellum');
	}
	if (fun.RNA() > 199 && EVO.RNASwitch == 'on' && EVO.ribosomeSwitch == 'off' && creation >= cost.ribosome){
		code.ribosome = evos('ribosome');
	}
	if (EVO.RNASwitch == 'on' && EVO.one.metabolism == -1 && creation >= cost.metabolism){
		code.metabolism = evos('aerob');
		css('photosynthesis',0);
		code.metabolism += evos('photo');
	}
	if (EVO.DNASwitch == 'on' && EVO.one.mitochondria == -1 && creation >= cost.mitochondria){
		code.mitochondria = evos('mitochondria');
	}
	if (EVO.one.mitochondria > -1 && EVO.nucleus === null && creation >= cost.nucleus){
		code.nucleus = evos('nucleus');
	}
	if (EVO.one.ribosome > -1 && EVO.one.endoplasmic < 0 && EVO.nucleus == 'nucleus' && creation >= cost.endoplasmic){
		code.endoplasmic = evos('endoplasmic');
	}
	if (EVO.one.endoplasmic > -1 && EVO.one.golgi < 0 && creation >= cost.golgi){
		code.golgi = evos('golgi');
	}
	if (EVO.RNASwitch == 'off' && creation >= cost.RNA){
		code.na = evos('RNA');
	}
	if (EVO.DNASwitch == 'off' && EVO.one.membraneScore > 1 && EVO.one.metabolism > -1 && creation >= cost.DNA){
		code.na = evos('DNA');
	}
	if (EVO.stage > EVO.size.stage && EVO.one.metabolism > -1 && creation >= cost.size() && EVO.one.cytoplasm > 99){
		css('size1',cost.size());
		code.size = evos('size');
	}
	if (EVO.one.metabolism >= 0 && EVO.mitosisSwitch == 'on' && creation >= cost.multicell && (EVO.atp/2 + fun.RNA()*100 + fun.DNA()*10000) > 2000){
		code.multicelluar = evos('multicelluar');
	}
	let codes = code.evolution + code.membrane + code.cytoskeleton + code.na + code.nucleus + code.multicelluar;
	doc('stageUpgrade',codes);
	if (codes == code.evolution){stage.classList.replace('gold','taboff');}
	codes = code.evolution + code.mitosis + code.cytoplasm + code.cilia + code.flagellum + code.ribosome + code.metabolism + code.mitochondria + code.endoplasmic + code.golgi + code.size;
	doc('gameUpgrade',codes);
	if (codes == code.evolution){game.classList.replace('gold','taboff');}
}

function evos(x){
	let a;
	let b = 'struc';
	let c = 'stage';
	let d = 'game';
	let e = 'Switch';
	let f = 'Type';
	let g = 'on';
	let swtch = function(){return EVO[a+e] == g && !document.getElementById(a);}
	let great = function(){return EVO.one[a] > -1 && !document.getElementById(a);}
	let check = function(){return EVO[a] == a && !document.getElementById(a);}
	let on = function(){return EVO[a+e] = g;}
	let evo = function(){EVO.evo.evolved += cost[x];}
	if (x !== undefined){document.getElementById(x).removeAttribute('id');}
	if (x !== undefined && x.match(/^(doublebubble|phospholipid|cellwall)$/)){
		EVO.one.membraneScore++;
		evo();
	}
	a = EVO.one.membraneScore;
	let membrane = document.getElementById("structure").childNodes[0];
	if (a == 1){membrane.id = 'doublebubble';}
	if (a == 2){membrane.id = 'phospholipid';}
	if (a == 3){membrane.id = 'cellwall';}
	a = 'mitosis';
	if (x == a){
		on();
		evo();
	}
	if (swtch()){
		copy(d,a);
		css(a,EVO[a+'Chance']);
	}
	a = 'cytoplasm';
	if (x == a){
		EVO.one[x] = 0;
		evo();
	}
	if (great()){
		copy(d,a);
		css(a,EVO.one[a]);
	}
	a = 'cytoskeleton';
	if (x == a){
		EVO[x] = x;
		evo();
	}
	if (check()){
		copy(b,a);
	}
	a = 'cilia';
	if (x == a){
		on();
		evo();
	}
	if (swtch()){
		copy(d,a);
		css(a,EVO.one[a]);
	}
	a = 'flagellum';
	if (x == a){
		on();
		evo();
	}
	if (swtch()){
		copy(d,a);
		css(a,EVO.one[a]);
	}
	a = 'ribosome';
	if (x == a){
		on();
		evo();
	}
	if (swtch()){
		copy(d,a);
		css(a,EVO.one[a] + EVO.one[a+'Bonus']);
		a = 'protein';
		document.getElementsByTagName('label')[0].style.visibility = 'initial';
		document.getElementsByTagName('label')[1].style.visibility = 'initial';
		copy('loot',a);
		document.getElementById(a).removeAttribute('onclick');
		css(a,EVO[a].whole);
		setTimeout(RNA,60000);
		setTimeout(protein,60000);
		setTimeout(ribosome,3600000);
	}
	a = 'RNA';
	if (x == a){
		on();
		evo();
	}
	if (swtch()){
		copy(c,a);
	}
	a = 'DNA';
	if (x == a){
		on();
		evo();
	}
	if (swtch()){
		copy(c,a);
	}
	a = 'metabolism';
	if (x !== undefined && x.match(/^(aerob|photo)$/)){
		EVO.one[a+f] = x;
		EVO.one[a] = 0;
		EVO.evo.evolved += cost[a];
		if (x == 'photo'){photosynth();}
	}
	if (great()){
		copy(d,a);
		css(a,EVO.one[a]);
		document.getElementById('basic').id = EVO.one[a+f].slice(0,5).toLowerCase();
		if (EVO.one.metabolismType == 'photo'){photosynth();}
	}
	a = 'mitochondria';
	if (x == a){
		EVO.one[x] = 0;
		evo();
	}
	if (great()){
		copy(d,a);
		css(a,EVO.one[a]);
	}
	a = 'nucleus';
	if (x == a){
		EVO[x] = x;
		evo();
	}
	if (check()){
		copy(b,a);
	}
	a = 'endoplasmic';
	if (x == a){
		EVO.one[x] = 0;
		evo();
	}
	if (great()){
		copy(d,a);
		css(a,EVO.one[a]);
	}
	a = 'golgi';
	if (x == a){
		EVO.one[x] = 0;
		evo();
	}
	if (great()){
		copy(d,a);
		css(a,EVO.one[a]);
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
	updateATP();
	if (EVO['RNA'+e] == g){updateNA('RNA');}
	if (EVO['DNA'+e] == g){updateNA('DNA');}
	updateEvolution();
	tap();
	if (x == 'multicelluar'){multicelluar();}
}

function evoChance(x){
	let y = 'mitosisChance';
	if ((Math.floor(Math.random()*100)+1) > EVO[y]){
		let z = 'mitosisLearn';
		EVO[z]++;
		if (EVO[z] > EVO[y]){
			EVO[z] -= (EVO[y] + 1);
			EVO[y]++; 
		}
	} else {
		EVO.evo.bonus++;
		EVO.mitosisLimit--;
		if (EVO.mitosisLimit < 1){EVO[y]--;}
		updateEvolution();
	}
	css(x,EVO[y]);
}

function RNA(x){
	let y = EVO.one.ribosome + EVO.one.ribosomeBonus;
	if (EVO.one.endoplasmic > -1){y *= (1+(EVO.one.endoplasmic/100));}
	if (EVO.one.golgi > -1){y *= (1+(EVO.one.golgi/100));}
	EVO.tRNA += y;
	while (EVO.tRNA > 99 && EVO.atp >= math('RNA',xbuy.na)){
		EVO.atp -= math('RNA',xbuy.na);
		EVO.tRNA -= 100;
		EVO.rRNA++;
		updateNA('RNA');
	}
	if (x != 'start'){setTimeout(RNA,60000);}
}

function math(x,y,z){
	let evo;
	if (x == 'evolution'){evo = EVO.evo[x];}
	else if (x.match(/^(cilia|flagellum)$/)){evo = EVO.one.cilia+EVO.one.flagellum;}
	else if (EVO[x] !== undefined){evo = EVO[x];}
	else {evo = EVO.one[x];}
	if (z == undefined){z = 1;}
	let cnt = 0;
	for (let i = 0; i < z; i++){
		let math = 10*Math.pow(y,evo+i);
		if (!x.match(/^(evolution|cytoplasm)$/)){math = fun.cytoplasm(math);}
		math = Math.floor(math);
		cnt += math;
	}
	return cnt;
}

var xbuy = {
	"upgrade": 1.1,
	"meta": 2,
	"na": 1.01,
};

function buy(x,y){
	if (x == 'ATP'){
		if (EVO.food > 0){
			EVO.atp++;
			EVO.food--;
			foods.update();
		}
	}
	else if (x == 'evolution'){
		if(EVO.atp >= math(x,EVO.evo[x])){
			EVO.atp -= math(x,EVO.evo[x]);
			EVO.evo[x]++;
		}
	}
	else if (x.match(/^(cytoplasm|cilia|flagellum|mitosis)$/)){
		if (y > 1){y = 10-(EVO.one[x]%10);}
		else {y = 1;}
		if (EVO.atp >= math(x,xbuy.upgrade,y) && EVO.one[x] < 1000){
			EVO.atp -= math(x,xbuy.upgrade,y);
			EVO.one[x] += y;
			if (x == 'mitosis'){evoChance(x);}
			else {css(x,EVO.one[x]);}
		}
	}
	else if (x.match(/^(ribosome)$/)){
		y = math(x,xbuy.meta);
		if(EVO.atp >= y && fun.RNA() >= y && EVO.one[x] < 1000){
			EVO.atp -= y;
			EVO.sRNA += y;
			EVO.one[x]++;
			css(x,EVO.one[x]+EVO.one[x+'Bonus']);
		}
	}
	else if (x.match(/^(endoplasmic|golgi)$/)){
		y = math(x,xbuy.meta);
		if(EVO.atp >= y && fun.RNA() >= y && EVO.one[x] < 100 & EVO.one.ribosome + EVO.one.ribosomeBonus > EVO.one[x]){
			EVO.atp -= y;
			EVO.sRNA += y;
			EVO.one.ribosomeBonus--;
			EVO.one[x]++;
			css(x,EVO.one[x]);
			css('ribosome',EVO.one.ribosome+EVO.one.ribosomeBonus);
		}
	}
	else if (x.match(/^(metabolism|mitochondria)$/)){
		if (x == 'metabolism'){y = 'RNA';}
		if (x == 'mitochondria'){y = 'DNA';}
		if(fun[y]() >= math(x,xbuy.meta)){
			EVO['s'+y] += math(x,xbuy.meta);
			EVO.one[x]++;
			css(x,EVO.one[x]);
		}
	}
	else if (x.match(/^(RNA|DNA)$/)){
		let a,b,c;
		if (x == 'RNA'){a = EVO.atp; b = 'atp'; c = 1;}
		if (x == 'DNA'){a = fun.RNA(); b = 'sRNA'; c = -1;}
		if (y > 1){y = 10-(fun[x]()%10);}
		else {y = 1;}
		if(a >= math(x,xbuy.na,y)){
			EVO[b] -= math(x,xbuy.na,y)*c;
			EVO[x] += y;
		}
	}
	if (x.match(/^(ATP|evolution|cytoplasm|cilia|flagellum|mitosis|ribosome|RNA|endoplasmic|golgi)$/)){
		updateATP();
	}
	if (x.match(/^(ribosome|metabolism|RNA|DNA|endoplasmic|golgi)$/)){
		updateNA('RNA');
	}
	if (x.match(/^(mitochondria|DNA)$/)){
		updateNA('DNA');
	}
	if (x.match(/^(evolution|cytoplasm)$/)){
		updateEvolution();
	}
	tip(x,y);
}

function updateNA(x){
	css(x,fun[x]());
	color('RNA');
	if (EVO.ribosomeSwitch == 'on'){color('ribosome');}
	if (EVO.one.metabolism >= 0){color('metabolism');}
	if (EVO.DNASwitch == 'on'){color('DNA');}
	if (EVO.one.mitochondria >= 0){color('mitochondria');}
	if (EVO.one.endoplasmic >= 0){color('endoplasmic');}
	if (EVO.one.golgi >= 0){color('golgi');}
	updateEvolution();
}

function multicelluar(){
	EVO.evo.evolved += cost.multicell;
	var evolve = {
		"version": EVO.version,
		"stage": 2,
		"date": Date.now(),
		"evo": EVO.evo,
		"one": EVO.one,
		"sun": EVO.sun,
		"size": {
			"game": EVO.size.game,
			"stage": 0,
		},
		"food": EVO.food/2,
		"nutrient": EVO.atp/2,
		"protein": EVO.protein,
	};
	if (evolve.mitochondria < 0){evolve.mitochondria = 0;}
	localStorage.setItem('EVOE', JSON.stringify(evolve));
	clearTimeout(save);
	localStorage.removeItem('EVO');
	window.location.assign('EVO.html');
}

function color(x){
	let color = document.getElementById(x);
	let off = color.classList.replace('growon','growoff');
	let mod;
	let mods = function(a,b,c){
		mod = 10-(a%10);
		if (b >= math(x,c,mod) && mod > 1){css(x+'-x','x'+mod);}
		else {css(x+'-x','');}
	}
	if (x.match(/^(mitosis|cytoplasm|cilia|flagellum)$/) && EVO.atp >= math(x,xbuy.upgrade)){
		off;
		if (x !== 'mitosis'){
			mods(EVO.one[x],EVO.atp,xbuy.upgrade);
		}
	}
	else if (x == 'ribosome' && EVO.atp >= math(x,xbuy.meta) && fun.RNA() >= math(x,xbuy.meta)){off;}
	else if (x.match(/^(endoplasmic|golgi)$/) && EVO.atp >= math(x,xbuy.meta) && fun.RNA() >= math(x,xbuy.meta) & EVO.one.ribosome + EVO.one.ribosomeBonus > EVO.one[x]){off;}
	else if (x == 'RNA' && EVO.atp >= math(x,xbuy.na)){
		off;
		mods(fun.RNA(),EVO.atp,xbuy.na);
	}
	else if (x == 'DNA' && fun.RNA() >= math(x,xbuy.na)){
		off;
		mods(fun.DNA(),fun.RNA(),xbuy.na);
	}
	else if (x == 'metabolism' && fun.RNA() >= math(x,xbuy.meta)){off;}
	else if (x == 'mitochondria' && fun.DNA() >= math(x,xbuy.meta)){off;}
	else if (x == 'evolution' && EVO.atp >= math(x,EVO.evo[x])){off;}
	else {
		color.classList.replace('growoff','growon');
		if (x.match(/^(cytoplasm|cilia|flagellum|RNA|DNA)$/)){css(x+'-x','');}
	}
}

function tip(x,y){
	if (x == 'swirl'){css('cost-'+x,fun.moveCost());}
	else if (x == 'evolution'){css('cost-'+x,math(x,EVO.evo[x]));}
	else if (x.match(/^(metabolism|mitochondria)$/)){css('cost-'+x,math(x,xbuy.meta));}
	else if (x.match(/^(cytoplasm|cilia|flagellum|mitosis)$/)){
		if (y == 11){y = 10-EVO.one[x]%10;}
		css('cost-'+x,math(x,xbuy.upgrade,y));
	}
	else if (x.match(/^(ribosome|endoplasmic|golgi)$/)){css('cost-'+x,math(x,xbuy.meta));}
	else if (x.match(/^(RNA|DNA)$/)){
		if (y == 11){y = 10-(fun[x]()%10);}
		css('cost-'+x,math(x,xbuy.na,y));
	}
	let z = document.getElementById('tip');
	z.classList.replace(z.className,x);
	cssHTML('mouse','initial');
}

function tap(x){
	let z = document.getElementById('tip');
	z.classList.replace(z.className,'empty');
	cssHTML('mouse','none');
}