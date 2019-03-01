const gift =()=>{
	ID('gift').style.display = 'none';
	EVO.stage.food += EVO.stage.num * 200;
	timer(clock.minute*5);
	function timer(t){
		t -= 1000;
		css('timer-gift',clock(t));
		(t > 0 ? setTimeout(timer,1000,t) : ID('gifts').innerHTML = '<div id="gift" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="gift()"></div>');
	}
}

const foods = {
	"check":()=>{
		let type;
		let check =(x)=>(EVO.stage.food > foods[x].amount());
		if (check('immeasurable')){type = 'immeasurable';}
		else if (check('copious')){type = 'copious';}
		else if (check('bountiful')){type = 'bountiful';}
		else if (check('abundant')){type = 'abundant';}
		else if (check('plentiful')){type = 'plentiful';}
		else if (check('adequate')){type = 'adequate';}
		else if (check('sparse')){type = 'sparse';}
		else if (check('scant')){type = 'scant';}
		else if (check('scarce')){type = 'scarce';}
		else {type = 'none';}
		return type;
	},
	"update":()=>{
		let x = ID('food');
		x.classList.replace(x.className,foods.check());
		x = ID('swirl').style;
		(EVO.stage[fun.food] >= move.cost() ? x.display = 'initial' : x.display = 'none');
	},
	"max":()=>{
		let onek =(x,y,z)=>{
			let a = (EVO[x][y] ? (1+((EVO[x][y].val || EVO[x][y])/1000))/(EVO.stage.num-z) : 1);
			if (isNaN(a)){
				console.log('Food Max '+y+' created a NaN. It was auto fixed.');
				a = 1;
			}
			return a;
		}
		return (EVO.stage.num*10000)
				*(1+((EVO.cross.foodmax||0)/10))
				*(1+(EVO.size.game/20))
				*onek('one','flagellum',0)
				*onek('two','motility',1)
				*onek('three','peristalsis',2)
				*onek('cross','traveler',EVO.stage.num-1)
				*body.stat.mul('muscle',1);
	},
	"min":()=>{
		return (100*EVO.cross.foodmin+EVO.size.game+body.stat.add('digestive')||1)
			*(1+(EVO.cross.foodmin||0)/10)
			*(1+EVO.size.game/40)
			*body.stat.mul('digestive',1);
	},
	"hunt":()=>((EVO.three.diet ? (EVO.three.diet == 'herb' ? 100 : 10) : 1)),
	"move":()=>(Math.floor(((Math.random()*(foods.max()-foods.min())+foods.min())*body.stat.mul('sight',1))/foods.hunt())),
	"amount":(x)=>(x*EVO.stage.num),
	"immeasurable": {
		"amount":()=>(foods.amount(20000)),
		"multi": 2.5,
		"timer": 1,
	},
	"copious": {
		"amount":()=>(foods.amount(17500)),
		"multi": 2.2,
		"timer": 1,
	},
	"bountiful": {
		"amount":()=>(foods.amount(15000)),
		"multi": 1.9,
		"timer": 1.3,
	},
	"abundant": {
		"amount":()=>(foods.amount(12500)),
		"multi": 1.6,
		"timer": 1.6,
	},
	"plentiful": {
		"amount":()=>(foods.amount(10000)),
		"multi": 1.3,
		"timer": 1.9,
	},
	"adequate": {
		"amount":()=>(foods.amount(7500)),
		"multi": 1,
		"timer": 2.2,
	},
	"sparse": {
		"amount":()=>(foods.amount(5000)),
		"multi": 0.8,
		"timer": 2.5,
	},
	"scant": {
		"amount":()=>(foods.amount(2500)),
		"multi": 0.6,
		"timer": 2.8,
	},
	"scarce": {
		"amount":()=>(foods.amount(0)),
		"multi": 0.4,
		"timer": 3.1,
	},
	"none": {
		"multi": 0.2,
		"timer": 3.4,
	},
};

const growth = {
	"membrane":(x)=>(x*4-(EVO.one.membraneScore||0)*x),
	"metabolism":(x)=>{
		EVO.one.metacycle += body.stat.mul('nerve',1);
		x *= (1+(evolution.creations()/1000));
		x *= (1+(EVO.one.metabolism.val||0)/100);
		x *= (1+(EVO.one.mitochondria||0)/100);
		x *= (1+(EVO.cross.efficient||0)/100);
		x *= body.stat.mul('respiratory',1);
		if (EVO.three.boost == 'hyper' && EVO.combat.hp < EVO.combat.mhp){x *= (1+(EVO.combat.special/100));}
		x *= (1+(donation/1000));
		try {
			if (isNaN(x)){throw 'growth.metabolism is NaN';}
			else {return x;}
		}
		catch(err){
			console.log(err);
			return 0;
		}
	},
	"hunt":(x)=>{
		if (EVO.three.diet == 'carn'){x *= 1+(EVO.area.grazer-(EVO.area.predator*10))/100;}
		if (EVO.three.diet == 'herb'){x *= 1+((EVO.area.field/10)-EVO.area.grazer)/100;}
		try {
			if (isNaN(x)){throw 'growth.metabolism is NaN';}
			else {return x;}
		}
		catch(err){
			console.log(err);
			return 0;
		}
	},
	"autoClick":(x,y,z)=>{
		let type = foods.check();
		z = 0;
		z += (EVO.one.cilia||0)/EVO.stage.num;
		z += body.stat.add('digestive');
		z *= body.stat.mul('digestive',1);
		z *= (1-(EVO.enviro.phd||0)/100);
		z *= (foods[type].multi * (1+((EVO.one.voracious||0)+(EVO.two.rapacious||0))/200));
		if (EVO.three.diet){z = growth.hunt(z);}
		if (z < 1){z = 1;}
		y = z;
		if (EVO.one.metabolism && EVO.one.metabolism.type == 'aerob'){y = growth.metabolism(y);}
		y /= EVO.enviro.virus[0];
		try {
			if (isNaN(y) || isNaN(z)){throw 'growth.autoClick is NaN';}
			else {
				EVO.stage.food -= z;
				EVO.stage.ate += z;
				EVO.stage[fun.food] += y;
				if (EVO.stage.food < 0){EVO.stage.food = 0;}
			}
		}
		catch(err){console.log(err);}
		if (start.check){
			foods.update();
			updateFood();
			setTimeout(growth.autoClick,growth.autotime(EVO.one.cilia ? clock.second : growth.membrane(clock.second)));
		}
	},
	"autotime":(x)=>(Math.ceil((x ? x : clock.second)*foods[foods.check()].timer*(1+((EVO.enviro.salt||0)/100))*10)/10),
	"photosynth":(x)=>{
		let z = EVO.stage.num + (((EVO.one.glucose||0)+(EVO.two.fructose||0))/10);
		z *= (1+(EVO.enviro.sun.position/100));
		z = growth.metabolism(z);
		z *= (1+(EVO.size.game/100));
		if (EVO.stage.num > 1){z *= (1-(EVO.enviro.phd/100));}
		z /= EVO.enviro.virus[0];
		try {
			if (isNaN(z)){throw 'growth.photosynth is NaN';}
			else {EVO.stage[fun.food] += z;}
		}
		catch(err){console.log(err);}
		if (start.check){
			css('photosynthesis',Math.round(z));
			updateFood();
			setTimeout(growth.photosynth,growth.phototime());
		}
	},
	"phototime":()=>(Math.ceil(clock.second*(1+((EVO.enviro.salt||0)/100))*10)/10),
}
clock.metacycle =(x)=>((clock.hour*x-EVO.one.metacycle)/clock.hour);

const move =(x)=>{
	let z = move.cost();
	if (EVO.stage[fun.food] >= z){
		EVO.stage[fun.food] -= z;
		EVO.stage.food = foods.move();
		if (EVO.stage.num > 1){
			EVO.enviro.current = Math.floor(Math.random()*100)+1;
			css('current',(EVO.enviro.current/10));
			EVO.enviro.ph = Math.floor(Math.random()*140);
			css('ph',(EVO.enviro.ph/10));
			EVO.enviro.salinity = Math.floor(Math.random()*11)+30;
			css('salinity',EVO.enviro.salinity);
			move.learn();
		}
		if (EVO.three.diet){hunt.move();}
		if (start.check){
			updateFood();
			if (EVO.three.boost == 'roam'){
				clearTimeout(fun.move);
				fun.move = setTimeout(move,clock.hour-(EVO.combat.speed*10000));
			}
		}
	}
}
move.cost =()=>{
	let cost = 1000 * EVO.stage.num;
	if (EVO[fun.wrd][fun.movement]){
		if (typeof EVO[fun.wrd][fun.movement] == 'number'){cost -= EVO[fun.wrd][fun.movement];}
		else {cost -= EVO[fun.wrd][fun.movement].val;}
	}
	cost -= body.stat.add('muscle')*10;
	if (EVO.stage.num > 1){cost *= 1-((EVO.one.flagellum||0)/(EVO.stage.num*1000));}
	if (EVO.stage.num > 2){cost *= 1-((EVO.two.motility.val||0)/((EVO.stage.num-1)*1000));}
	if (EVO.stage.num > 3){cost *= 1-((EVO.three.peristalsis.val||0)/((EVO.stage.num-2)*1000));}
	if (EVO.cross.traveler){cost *= 1-(EVO.cross.traveler.val/1000);}
	cost *= 1+(EVO.size.game/100);
	if (EVO.one.membraneScore == 3){cost *= 1.5;}
	if (cost < 0){cost = 0;}
	cost = Math.ceil(cost);
	try {
		if (isNaN(cost)){throw 'move.cost is NaN';}
		else {return cost;}
	}
	catch(err){console.log(err);}
}
move.learn =()=>{
	if (EVO[fun.wrd][fun.movement]){
		let a = EVO[fun.wrd][fun.movement];
		a.learn += body.stat.mul('nerve',1);
		if (a.learn > a.val && a.val < 1000){
			a.val++;
			a.learn -= a.val;
			css(fun.movement,a.val);
		}
	}
	if (EVO.cross.traveler){
		EVO.cross.traveler.exp += body.stat.mul('nerve',1);
		let x = 0;
		if (EVO.one.flagellum && EVO.one.flagellum > x){x = EVO.one.flagellum;}
		if (EVO.two.motility && EVO.two.motility.val > x){x = EVO.two.motility.val;}
		if (EVO.three.peristalsis && EVO.three.peristalsis.val > x){x = EVO.three.peristalsis.val;}
		if (EVO.cross.traveler.exp > (EVO.cross.traveler.val+1)*10 && x > EVO.cross.traveler.val && EVO.cross.traveler.val < 1000){
			EVO.cross.traveler.val++;
			EVO.cross.traveler.exp -= EVO.cross.traveler.val*10;
			css('xtraveler',EVO.cross.traveler.val);
		}
	}
}

const evolution =()=>{
	let t0 = performance.now();
	
	let creation = evolution.creations();
	css('evolution',creation);
	let off =()=>(nav.classList.replace('gold','taboff'));
	let on =()=>(nav.classList.replace('taboff','gold'));
	let mouse = ' onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" ';
	
	let nav = ID('stagenavevo');
	let evo = ID('stageUpgrade');
	let html = '<p class="evolutions gold"></p><p id="stageevo"'+mouse+'onclick="evolution.stage.evo(this.id)"></p>';
	evo.innerHTML = html;
	evolution.stage();
	(evo.innerHTML == html ? off() : on());
	
	if(EVO.stage.num > 1){
		nav = ID('combatnavevo');
		evo = ID('combatUpgrade');
		html = '<p class="combats gold"></p><p id="combatevo"'+mouse+'onclick="combat(this.id)"></p>';
		evo.innerHTML = html;
		evolution.combat();
		(evo.innerHTML == html ? off() : on());
	}
	
	nav = ID('crossnavevo');
	evo = ID('crossUpgrade');
	html = '<p class="xcross gold"></p><p id="xcrossevo"'+mouse+'onclick="evolution.xcross.evo(this.id)"></p>';
	evo.innerHTML = html;
	evolution.xcross();
	(evo.innerHTML == html ? off() : on());
	
	//evolution.exotic();
	
	let t1 = performance.now();
	console.log("Evolution call took " + (t1 - t0) + " milliseconds.");
}
evolution.creations =()=>{return EVO.evo.evolution - EVO.evo.evolved + EVO.evo.bonus + REC.bonus;}
evolution.stage =()=>{
	for (let id in evolution.stage.data){
	if ((!EVO[fun.wrd][id] || id.match(/^(metabolism)$/)) && (!ID(id) || id.match(/^(size)$/))){evolution.stage.data[id].evo();}
	}
}
evolution.stage.copy =(x)=>{copy('stageevo',x);}

const enviro = {
	"loop":(x)=>{
		enviro.sun();
		if (EVO.stage.num > 1){
			enviro.effect('current',x);
			enviro.effect('ph',x);
			enviro.effect('salinity',x);
			if (body.cell.total()+EVO.two.body > EVO.one.cytoplasm/10 && EVO.two.body > 0){enviro.toxin(x);}
			enviro.adhesion(x);
		}
		if (start.check){setTimeout(enviro.loop,clock.minute);}
	},
	"current":{
		"hi": 100,
		"lo": 0,
	},
	"ph":{
		"hi": 140,
		"lo": 0,
	},
	"salinity":{
		"hi": 40,
		"lo": 30,
	},
	"effect":(x,y)=>{
		let z = Math.floor(Math.random()*3);
		if (z == 0 && EVO.enviro[x] < enviro[x].hi){EVO.enviro[x]++;}
		if (z == 1 && EVO.enviro[x] > enviro[x].lo){EVO.enviro[x]--;}
		if (x.match(/^(current|ph)$/)){
			if (start.check){css(x,(EVO.enviro[x]/10));}
			if (x == 'ph'){enviro.phDmg();}
		} else {
			if (start.check){css(x,EVO.enviro[x]);}
			if (x == 'salinity'){enviro.salt();}
		}
	},
	"adhesion":(x,y)=>{
		if (EVO.two.adhesion){y = EVO.two.adhesion.val;}
		if (EVO.two.body > (y||0) && Math.floor(Math.random()*100)+1 > (y||0)){
			EVO.enviro.currentDamage += EVO.enviro.current;
			if (EVO.enviro.currentDamage >= 100){
				EVO.enviro.currentDamage = 0;
				EVO.two.body--;
				if (start.check){body.cell.colony();}
				if (EVO.stage.num == 2 && EVO.two.adhesion){
					EVO.two.adhesion.learn += body.stat.mul('nerve',1);
					if (EVO.two.adhesion.learn > EVO.two.adhesion.val){
						EVO.two.adhesion.val++;	
						EVO.two.adhesion.learn -= EVO.two.adhesion.val;
						if (start.check){css('adhesion',EVO.two.adhesion.val);}
					}
				}
			}
		}
	},
	"phDmg":()=>{
		let phd;
		if (EVO.enviro.ph < 71){phd = 70-EVO.enviro.ph;}
		if (EVO.enviro.ph > 70){phd = EVO.enviro.ph-70;}
		phd = Math.ceil(phd/10);
		if (EVO[fun.wrd].EPS){
			EVO[fun.wrd].EPS -= phd;
			if (EVO[fun.wrd].EPS < 0){
				phd -= Math.abs(EVO[fun.wrd].EPS);
				EVO[fun.wrd].EPS = 0;
			} else {phd = 0;}
			css('EPS',EVO[fun.wrd].EPS);
		}
		EVO.enviro.phd = phd;
		EVO.combat.hp -= phd;
		if (EVO.combat.hp < 0){EVO.combat.hp = 0;}
	},
	"salt":()=>{
		let x = 0;
		if (EVO.two.osmoregulation){x = EVO.two.osmoregulation.val;}
		if (Math.floor(Math.random()*100)+1 > x){
			EVO.enviro.salt = Math.abs(EVO.enviro.salinity-35)*20;
			if (EVO.stage.num == 2 && EVO.two.osmoregulation && EVO.two.osmoregulation.val > -1){
				EVO.two.osmoregulation.learn += body.stat.mul('nerve',1);
				if (EVO.two.osmoregulation.learn > EVO.two.osmoregulation.val){
					EVO.two.osmoregulation.val++;
					EVO.two.osmoregulation.learn -= EVO.two.osmoregulation.val;
					css('osmoregulation',EVO.two.osmoregulation.val);
				}
			}
		} else {EVO.enviro.salt = 0;}
	},
	"toxcalc":()=>{
		let gen = EVO.two.body;
		let rndm = [];
		if (EVO.two.body > 0){rndm.push('body');}
		let bd =(x)=>{
			if (EVO.cross['gen'+x] && EVO.cross['gen'+x].val > 0){
				gen += EVO.cross['gen'+x].val;
				rndm.push(x);
			}
		}
		bd('balance');
		bd('nerve');
		bd('vascular');
		bd('muscle');
		bd('respiratory');
		bd('digestive');
		bd('excretion');
		bd('sight');
		let total = (body.cell.total()+gen)*(1+(EVO.size.game/100));
		let tox = body.stat.add('excretion')+EVO.one.cytoplasm/10;
		if (EVO.cross.detox){tox += EVO.cross.detox.val;}
		let calc = (total/10)*(1+(body.stat.add('digestive')-tox)/100);
		return [calc,total,rndm];
	},
	"toxin":(x)=>{
		let tox = enviro.toxcalc();
		EVO.toxin += tox[0];
		while (EVO.toxin > tox[1]){
			EVO.toxin -= tox[1];
			if (tox[2].length > 0){
				tox[2] = tox[2][Math.floor(Math.random()*tox[2].length)];
				if (tox[2] == 'body'){
					EVO.two.body--;
					if (start.check){css('body',EVO.two.body);}
				} else {
					EVO.cross['gen'+tox[2]].val--;
					if (start.check){css('xgen'+tox[2],EVO.cross['gen'+tox[2]].val);}
				}
			}
			EVO.combat.hp--;
			if (EVO.combat.hp < 0){EVO.combat.hp = 0;}
			EVO.combat.sp--;
			if (EVO.combat.sp < 0){EVO.combat.sp = 0;}
			if (start.check){
				css('hp',EVO.combat.hp);
				css('sp',EVO.combat.sp);
				body.cell.colony();
			}
			if (EVO.cross.detox && EVO.cross.detox.val < 100){
				EVO.cross.detox.exp++;
				if (EVO.cross.detox.exp > EVO.cross.detox.val*10 && tox[0]/100 > EVO.cross.detox.val){
					EVO.cross.detox.exp -= EVO.cross.detox.val*10;
					EVO.cross.detox.val++;
				}
			}
		}
		if (EVO.toxin < 0){EVO.toxin = 0;}
	},
	"sun":()=>{
		let a = EVO.enviro.sun;
		a.position += a.shift;
		if (a.position < 1 || a.position > 99){a.shift *= -1;}
		if (EVO.stage.num > 1){enviro.bgcolor();}
	},
	"bgcolor":()=>{
		let x = body.stat.add('sight');
		let y = EVO.enviro.sun.position;
		if (y < x){x = y;}
		css('bg-color','rgb('+[x,x,x].join('%,')+'%)');
		css('sun',x+'%');
	},
}

const RNA =(x,y,z)=>{
	y = ribosome.add();
	y *= 1+(EVO.one.endoplasmic||0)/100;
	y *= 1+(EVO.one.golgi||0)/100;
	EVO.one.RNA.tRNA += y;
	z = math('RNA',RNA.cost);
	while (EVO.one.RNA.tRNA > 99 && EVO.stage[fun.food] >= z*(1-(EVO.one.ribosome.val/1000))){
		EVO.stage[fun.food] -= z;
		EVO.one.RNA.tRNA -= 100;
		EVO.one.RNA.rRNA++;
		css('RNA',RNA.RNA());
		updateFood();
		evolution();
	}
	if (start.check){setTimeout(RNA,clock.minute*2*body.stat.mul('vascular',-2));}
}
RNA.RNA =()=>{return (EVO.one.RNA ? EVO.one.RNA.val + EVO.one.RNA.rRNA - EVO.one.RNA.sRNA : 0);}
RNA.cost = 1.01;

const ribosome =(x)=>{
	EVO.one.ribosome.partial += ribosome.add();
	let y = Math.floor(1000*Math.pow(1.001,EVO.one.ribosome.bonus));
	if (EVO.one.ribosome.partial > y){
		EVO.one.ribosome.partial -= y;
		EVO.one.ribosome.bonus++;
	}
	if (start.check){
		css('ribosome',ribosome.add());
		setTimeout(ribosome,clock.hour*body.stat.mul('vascular',-2));
	}
}
ribosome.add =()=>{return EVO.one.ribosome.val + EVO.one.ribosome.bonus;}

const protein =(x)=>{
	let y = ribosome.add();
	y *= 1+(EVO.one.endoplasmic||0)/100;
	y *= 1+(EVO.one.golgi||0)/100;
	EVO.protein.partial += y;
	let z = Math.floor(1000*Math.pow(1.001,EVO.protein.whole));
	while (EVO.protein.partial >= z){
		EVO.protein.partial -= z;
		EVO.protein.whole++;
		z = Math.floor(1000*Math.pow(1.001,EVO.protein.whole));
	}
	if (start.check){
		css('protein',EVO.protein.whole);
		setTimeout(protein,clock.minute*2*body.stat.mul('vascular',-2));
	}
}

const body = {
	"cell": {
		"total":(x)=>{
			let sum = 0;
			let f =(z)=>{sum += z*(z+1)/2;}
			if (x == undefined || x == 'balance'){f(body.stat.add('balance'));}
			if (x == undefined || x == 'nerve'){f(body.stat.add('nerve'));}
			if (x == undefined || x == 'vascular'){f(body.stat.add('vascular'));}
			if (x == undefined || x == 'muscle'){f(body.stat.add('muscle'));}
			if (x == undefined || x == 'respiratory'){f(body.stat.add('respiratory'));}
			if (x == undefined || x == 'digestive'){f(body.stat.add('digestive'));}
			if (x == undefined || x == 'excretion'){f(body.stat.add('excretion'));}
			if (x == undefined || x == 'sight'){f(body.stat.add('sight'));}
			return sum;
		},
		"colony":(x)=>{
			if (start.check && EVO.two.quorum || EVO.stage.num > 2){css('body',EVO.two.body);}
			evolution();
		},
		"body":(x)=>{
			if (x.substring(0,1) == 'x'){x = x.substring(1);}
			let y = EVO.two.body;
			if (EVO.cross['gen'+x]){y += EVO.cross['gen'+x].val;}
			return y;
		},
		"cell":(x)=>{
			EVO.two.bodyPart += (EVO.two.body+EVO.two.generation.val)*(1+((EVO.one.mitosis||0)/1000))*(1-(EVO.two.generation.val/100));
			if (EVO.two.bodyPart < 0){EVO.two.bodyPart = 0;}
			let y = Math.floor(1000*Math.pow(1.001,EVO.two.body));
			while (EVO.two.bodyPart > y){
				EVO.two.bodyPart -= y;
				EVO.two.body++;
			}
			if (start.check){css('body',EVO.two.body);}
			let b =(z)=>{
				if (EVO.cross[z]){
					EVO.cross[z].part += body.stat.add(z.substring(3))*(1+(EVO.one.mitosis/1000))*(1-((100-EVO.two.generation)/100));
					y = Math.floor(1000*Math.pow(1.001,EVO.cross[z].val));
					while (EVO.cross[z].part > y){
						EVO.cross[z].part -= y;
						EVO.cross[z].val++;
					}
					if (start.check){css(z,EVO.cross[z].val);}
				}
			}
			b('genbalance');
			b('gennerve');
			b('genvascular');
			b('genmuscle');
			b('genrespiratory');
			b('gendigestive');
			b('genexcretion');
			b('gensight');
			if (start.check){setTimeout(body.cell.cell,body.cell.timer());}
		},
		"timer":()=>{return clock.minute*5*body.stat.mul('vascular',-2);}
	},
	"stat": {
		"add":(x,z)=>{
			if (x.substring(0,1) == 'x'){x = x.substring(1);}
			z = 0;
			z += (EVO.two[x]||0);
			z += (EVO.three[x]||0);
			z += (EVO.four[x]||0);
			z += (EVO.five[x]||0);
			z += (EVO.six[x]||0);
			z += (EVO.cross[x]||0);
			return z;
		},
		"mul":(x,y,z)=>{
			if (x.substring(0,1) == 'x'){x = x.substring(1);}
			z = 1;
			z *= (1+(EVO.two[x]||0)/100*y);
			z *= (1+(EVO.three[x]||0)/100*y);
			z *= (1+(EVO.four[x]||0)/100*y);
			z *= (1+(EVO.five[x]||0)/100*y);
			z *= (1+(EVO.six[x]||0)/100*y);
			z *= (1+(EVO.cross[x]||0)/100*y);
			return z;
		},
		"total":()=>{return body.stat.add('balance')+body.stat.add('nerve')+body.stat.add('vascular')+body.stat.add('muscle')+body.stat.add('respiratory')+body.stat.add('digestive')+body.stat.add('excretion')+body.stat.add('sight');},
		"match":(x)=>{
			if (x.substring(0,1) == 'x'){x = x.substring(1);}
			return x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/);
		},
		"math":(x)=>{
			let loc = fun.wrd;
			if (x.substring(0,1) == 'x'){
				loc = 'cross';
				x = x.substring(1);
			};
			let a =(c)=>{
				let chk = 0;
				if (EVO[loc][c] !== undefined){chk = EVO[loc][c];}
				return chk;//*(100-(REC[c].cost||0)/2)/100
			};
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
			if (x !== undefined && EVO[loc][x] !== undefined){b[x] = EVO[loc][x];}//*(100-(REC[x].cost||0))/100
			return b.balance + b.nerve + b.vascular + b.muscle + b.respiratory + b.digestive + b.excretion + b.sight;
		},
		"buy":(x)=>{
			let y = math(x,2);
			let loc = fun.wrd;
			if (x.substring(0,1) == 'x'){
				loc = 'cross';
				x = x.substring(1);
			}
			let cost = body.stat.add(x)+1;
			if(EVO.stage[fun.food] >= y && body.cell.body(x) > cost && EVO[loc][x] < 100){//(REC[x].max||0)+
				EVO.stage[fun.food] -= y;
				EVO[loc][x]++;
				if (EVO.cross['gen'+x]){
					EVO.cross['gen'+x].val -= cost;
					if (EVO.cross['gen'+x].val < 0){
						cost = Math.abs(EVO.cross['gen'+x].val);
						EVO.cross['gen'+x].val = 0;
					}
					css('xgen'+x,EVO.cross['gen'+x].val);
				}
				EVO.two.body -= cost;
				css('body',EVO.two.body);
				y = x;
				if (loc == 'cross'){y = 'x'+y;}
				css(y,EVO[loc][x]);
				cbtstat();
				updateFood();
				if (x == 'sight'){enviro.bgcolor();}
			}
		},
		"data":()=>{
			let x =(y)=>{
				evolution.stage.data[y] = {
					"id": y,
					"evo":()=>{if (evolution.stage.statevo(y)){evolution.stage.copy(y);}},
					"math":()=>(math(y,1.5)),
					"buy":()=>{body.stat.buy(y)},
					"dat":()=>(0),
					"cost":()=>(EVO.two.specialized * 5),
					"color":()=>{
						let clr = ID(y).classList;
						(EVO.stage[fun.food] >= evolution.stage.data[y].math() && body.cell.body(y) > body.stat.add(y)+1 ? clr.replace('green','red') : clr.replace('red','green'));
					},
					"tip":()=>{
						css('cost-'+y,evolution.stage.data[y].math());
						css('body-'+y,body.stat.add(y)+1);
					},
				}
			};
			x('balance');
			x('nerve');
			x('vascular');
			x('muscle');
			x('respiratory');
			x('digestive');
			x('excretion');
			x('sight');
		},
		"update":()=>{
			let y =(x)=>{if (EVO.one[x] !== undefined){evolution.stage.data[x].color();}}
			y('balance');
			y('nerve');
			y('vascular');
			y('muscle');
			y('respiratory');
			y('digestive');
			y('excretion');
			y('sight');
		},
	},
	"eps":()=>{
		evolution.stage.data.EPS = {
			"id": 'EPS',
			"evo":()=>{if (false){}},
			"math":(x)=>(math('EPS',1.01,x)),
			"buy":(x,y)=>{
				y = (y > 1 ? 10-(EVO[fun.wrd].EPS%10) : 1);
				let z = evolution.stage.data.EPS.math(y);
				if (EVO.stage[fun.food] >= z){
					EVO.stage[fun.food] -= z;
					EVO[fun.wrd].EPS += y;
					css('EPS',EVO[fun.wrd].EPS);
				}
			},
			"color":()=>{
				let clr = ID('EPS').classList;
				if(EVO.stage[fun.food] >= evolution.stage.data.EPS.math()){
					clr.replace('green','red');
					let x = 10-(EVO[fun.wrd].EPS%10);
					(EVO.stage[fun.food] >= evolution.stage.data.EPS.math(x) && x > 1 ? css('EPS-x','x'+x): css('EPS-x',''));
				} else {
					clr.replace('red','green');
					css('EPS-x','');
				}
			},
			"tip":(x)=>{
				if (x > 2){y = 10-(EVO[fun.wrd].EPS%10);}
				css('cost-EPS',evolution.stage.data.EPS.math(x));
			},
		};
	},
}

const buy =(x,y)=>{
	if (x == 'ATP'){
		if (EVO.stage.food > 0){
			EVO.stage[fun.food]++;
			EVO.stage.food--;
			foods.update();
		}
	}
	else if (x == 'evolution'){
		if(EVO.stage[fun.food] >= math(x,EVO.evo.cost)){
			EVO.stage[fun.food] -= math(x,EVO.evo.cost);
			EVO.evo[x]++;
		}
	}
	else if (x == 'EPS' && EVO[fun.wrd].EPS !== undefined){evolution.stage.data.EPS.buy(x,y);}
	else if (EVO[fun.wrd][x] !== undefined){evolution.stage.data[x].buy(x,y);}
	else if (x.substring(0,1) == 'x'){evolution.xcross.data[x.substring(1)].buy();}
	else if (x.match(/^(offense|defense|speed|special)$/)){cbtupg(x);}
	updateFood();
	if (EVO.stage.num == 2){body.cell.colony();}
	evolution();
	tip(x,y);
}

const math =(x,y,z)=>{
	let cost,evo;
	if (x == 'evolution'){evo = EVO.evo[x];}
	else if (body.stat.match(x)){evo = body.stat.math(x);}
	else if (x.substring(0,1) == 'x'){
		x.substring(0,1) == 'x';
		evo = (EVO.cross[x].val ? EVO.cross[x].val : EVO.cross[x]);
	}
	else if (x.match(/^(cilia|flagellum)$/)){evo = (EVO.one.cilia||0)+(EVO.one.flagellum||0);}
	else if (x == 'EPS' && EVO[fun.wrd].EPS !== undefined){evo = EVO[fun.wrd].EPS;}
	else if (EVO[fun.wrd][x] !== undefined){evo = (typeof EVO[fun.wrd][x] === 'object' ? EVO[fun.wrd][x].val : EVO[fun.wrd][x]);}
	if (evo !== undefined){
		if (z == undefined){z = 1;}
		cost = 10*(Math.pow(y,evo)*(Math.pow(y,z)-1))/(y-1);
		if (!x.match(/^(evolution|cytoplasm)$/)){cost *= 1-((EVO.one.cytoplasm||0)/(10000-body.stat.add('balance')-body.stat.add('vascular')));}
	}
	return (Math.floor(cost)||0);
}

const swirly =(v,w,x,y,z)=>{
	let W = (window.innerWidth-50 > 500 ? window.innerWidth-50 : 500);
	let H = (window.innerHeight-50 > 500 ? window.innerHeight-50 : 500);
	x += v;
	y += w;
	z += 12;
	if (x < 2 || x >= W){
		v *= -1;
		if (x < 0){x = 0;}
		if (x > W){x = W;}
	}
	if (y < 2 || y >= H){
		w *= -1;
		if (y < 0){y = 0;}
		if (y > H){y = H;}
	}
	if (z > 359){z = 0;}
	css('swirl-left',x+'px');
	css('swirl-top',y+'px');
	css('swirl-transform',z+'deg');
	setTimeout(swirly,30,v,w,x,y,z);
}
swirly.start =()=>{setTimeout(swirly,30,2,2,~~(Math.random()*window.innerWidth)-50,~~(Math.random()*window.innerHeight)-50,0);}

const tip =(x,y)=>{
	if (x == 'swirl'){css('cost-swirl',move.cost());}
	else if (x == 'evolution'){css('cost-evolution',math('evolution',EVO.evo.cost));}
	else if (EVO[fun.wrd][x] !== undefined && evolution.stage.data[x].tip){evolution.stage.data[x].tip(y);}
	else if (EVO.cross[x.substring(1)] !== undefined && evolution.xcross.data[x.substring(1)].tip){evolution.xcross.data[x.substring(1)].tip(y);}
	let z = ID('tip');
	z.classList.replace(z.className,x);
	css('mouse','initial');
}

const tap =(x)=>{
	let z = ID('tip');
	z.classList.replace(z.className,'empty');
	css('mouse','none');
}

const save =(x)=>{
	cheat();
	if (Date.now()-x > 20000){location.reload(true);}
	else {
		EVO.game.date = Date.now();
		localStorage.setItem("EVO", JSON.stringify(EVO));
		setTimeout(save,10000,Date.now());
	}
}

const cheat =()=>{
	let key =(x)=>{return Object.keys(EVO[x]).length == 0;}
	if (key('one')){
		if (EVO.one.metabolism.val && EVO.one.metabolism > 100){hard();}
		if (EVO.one.mitochondria && EVO.one.mitochondria > 100){hard();}
		if (EVO.one.mitosis && EVO.one.mitosis > 1000){hard();}
		if (EVO.one.cytoplasm && EVO.one.cytoplasm > 1000){hard();}
		if (EVO.one.cilia && EVO.one.cilia > 1000){hard();}
		if (EVO.one.flagellum && EVO.one.flagellum > 1000){hard();}
		if (EVO.one.ribosome && EVO.one.ribosome.val > 1000){hard();}
	}
	if (key('two')){
		if (EVO.two.balance && EVO.two.balance > 100){hard();}
		if (EVO.two.nerve && EVO.two.nerve > 100){hard();}
		if (EVO.two.vascular && EVO.two.vascular > 100){hard();}
		if (EVO.two.muscle && EVO.two.muscle > 100){hard();}
		if (EVO.two.respiratory && EVO.two.respiratory > 100){hard();}
		if (EVO.two.digestive && EVO.two.digestive > 100){hard();}
		if (EVO.two.excretion && EVO.two.excretion > 100){hard();}
		if (EVO.two.sight && EVO.two.sight > 100){hard();}
	}
	if (key('three')){
		if (EVO.three.balance && EVO.three.balance > 100){hard();}
		if (EVO.three.nerve && EVO.three.nerve > 100){hard();}
		if (EVO.three.vascular && EVO.three.vascular > 100){hard();}
		if (EVO.three.muscle && EVO.three.muscle > 100){hard();}
		if (EVO.three.respiratory && EVO.three.respiratory > 100){hard();}
		if (EVO.three.digestive && EVO.three.digestive > 100){hard();}
		if (EVO.three.excretion && EVO.three.excretion > 100){hard();}
		if (EVO.three.sight && EVO.three.sight > 100){hard();}
	}
}

const soft =()=>{
	localStorage.removeItem('EVO');
	location.reload(true);
}

const hard =()=>{
	localStorage.removeItem('EVO');
	localStorage.removeItem('REC');
	location.reload(true);
}

const rec = {
	"carnate":()=>{
		ID('carnate').classList.replace('hidden','shown');
	},
	"nocarnate":()=>{
		ID('event').style.display = 'none';
		ID('lay').classList.replace('layon','layoff');
		ID('carnate').classList.replace('shown','hidden');
		cbt.check = true;
	},
	"recarnate":()=>{
		ID('lay').classList.replace('layon','layoff');
		ID('carnate').classList.replace('shown','hidden');
		//Stage 1
		let bonus = save.evo.evolution
				+ (save.one.metabolism.val||0)
				+ (save.one.mitochondria||0)
				+ (save.one.voracious||0)
				+ (save.one.glucose||0)
				+ (save.one.endoplasmic||0)
				+ (save.one.golgi||0)
				+ ((save.one.cytoplasm||0)
					+ (save.one.cilia||0)
					+ (save.one.flagellum||0)
					+ (save.one.mitosis||0)
					+ (save.one.ribosome.val||0)
				)
					/10;
		//Stage 2
		bonus += (save.two.adhesion.val||0) + (save.two.generation.val||0)
				+ (save.two.balance||0) + (save.two.nerve||0)
				+ (save.two.vascular||0) + (save.two.muscle||0)
				+ (save.two.respiratory||0) + (save.two.digestive||0)
				+ (save.two.excretion||0) + (save.two.sight||0)
				+ (save.two.rapacious||0) + (save.two.fructose||0)
				+ (save.two.motility.val/10||0);
		//Stage 3
		bonus += (save.three.balance||0) + (save.three.nerve||0)
			+ (save.three.vascular||0) + (save.three.muscle||0)
			+ (save.three.respiratory||0) + (save.three.digestive||0)
			+ (save.three.excretion||0) + (save.three.sight||0)
			+ (save.three.peristalsis.val/10||0);
		if (save.combat){bonus += (save.combat.offense||0) + (save.combat.defense||0) + (save.combat.speed||0) + (save.combat.special||0);}
		bonus = Math.floor(bonus/10);
		REC.bonus += bonus;
		rec.resave();
		localStorage.removeItem("EVO");
		//window.location.assign("REC.html");
		window.location.assign("EVO1.html");
	},
	"resave":()=>{localStorage.setItem("REC", JSON.stringify(REC));},
}