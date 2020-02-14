var core = {};
core.start =()=>{
	ID(`talents`).style.display = (EVO.echo.talents.length > 0 ? `initial` : `none`);
	ID(`boost`).style.display = (EVO.echo.boost.length > 0 ? `initial` : `none`);
	
	if (ID(`gifts`)){
		ID(`gift`).style.display = `none`;
		css(`gift`,EVO.stage.num*200);
	} else {core.gift.check = false;}
	
	let id = ID(`bless`);
	if (id){
		if (EVO.timer.bless > 0){id.className = `blessed`}
		css(`bless`,clock(core.bless.rush()));
	} else {core.bless.check = false;}
	
	window[EVO.stage.wrd].HTMLSetup();
	if (EVO.one.ribosome){
		ID(`protein`).removeAttribute(`onclick`);
		ID(`natural`).style.visibility = `initial`;
		ID(`exotics`).style.visibility = `initial`;
		css(`protein`,EVO.protein.whole);
	}
	evolution.xcross.setup();
	evolution.temporal.setup();
	evolution[EVO.stage.wrd].setup();
	evolution();
	
	let time = Date.now() - EVO.game.date,
		max = 12*clock.minute*(EVO.temporal.extention||0)
			+(EVO.temporal.lock?8:Object.values(EVO.temporal).filter(t=>t===true).length)*clock.hour;
	if (time > max){time = max;}
	core.timer.rush(time);
	EVO.game.date = Date.now();
	save(Date.now());
	
	window[EVO.stage.wrd].InitializeProgram();
	core.foods.update();
	window[EVO.stage.wrd].updateFood();
	
	setTimeout(event,clock.minute*5);
	ID(`swirl`).setAttribute(`data-run`,`swirl`);
	core.bounce(`swirl`,24,`swirl`);
	core.timer.set();
	core.start.check = true;
	
	ID(`load`).style.display = `none`;
	
	if (!REC.player.name){
		ID('lay').classList.replace('layoff','layon');
		css(`player-id`,(``+REC.player.id).slice(2));
		document.getElementsByTagName(`player`)[0].style.display = `block`;
		document.getElementsByTagName(`name`)[0].style.display = `block`;
	}
}
core.start.check = false;

core.name =x=>{
	x = ID(x);
	let y = x.value;
	if(!y[y.length-1].match(/^[a-zA-Z0-9]*$/)){x.value = y.substring(0,y.length-1);}
}
core.name.submit =x=>{
	x = ID(x);
	let y = x.value.length;
	if (y > 3 && y < 13){
		REC.player.name = x.value;
		document.getElementsByTagName(`player`)[0].style.display = `none`;
		document.getElementsByTagName(`name`)[0].style.display = `none`;
		ID('lay').classList.replace('layon','layoff');
		save.set(`REC`);
		socket.emit(`playerInfo`,REC.player);
	}
}

core.timer =x=>{
	if (core.timer.pause){
		let c = core.timer;
		for (let id in EVO.timer){
			if(c[id]){c[id](clock.tenth+(EVO.temporal[id]||0));}
		}
	}
}
core.timer.set =()=>(setInterval(core.timer,clock.tenth));
core.timer.pause = true;
core.timer.rush =x=>{
	EVO.stage.rushed += x;
	x *= (1+(EVO.temporal.expansion||0)/100);
	while (x > 0){
		x -= clock.tenth;
		core.timer();
	}
}
core.timer.temporal =x=>{
	EVO.timer.temporal += x;
	evolution.temporal.calc();
}
core.timer.gift =x=>{
	if (core.gift.check){
		if (EVO.timer.gift > 0){
			EVO.timer.gift -= x;
			core.gift.time();
		}
		if (EVO.timer.gift < 1){ID(`gift`).style.display = `initial`;}
	}
}
core.timer.bless =x=>{
	if (core.bless.check){
		if (EVO.timer.bless > 0){
			EVO.timer.bless -= x;
			core.bless.time();
		}
		if (EVO.timer.bless < 1 && ID(`bless`).className == `blessed`){ID(`bless`).className = ``;}
	}
}
core.timer.auto =()=>{
	EVO.timer.auto -= (EVO.one.cilia ? core.foods[core.foods.check()].timer : 5+(EVO.one.membraneScore||0)*5)*(1+(EVO.temporal.auto||0)/100)*(1-(EVO.enviro.salt||0)/100);
	if (EVO.timer.auto < 1){
		core.growth.autoClick();
		EVO.timer.auto += clock.second;
	}
}
core.timer.photo =x=>{
	EVO.timer.synth -= x*(1-(EVO.enviro.salt||0)/100);
	if (EVO.timer.synth < 1){
		core.growth.photosynth();
		EVO.timer.synth += clock.second;
	}
}
core.timer.enviro =x=>{
	EVO.timer.enviro -= x;
	if (EVO.timer.enviro < 1){
		core.enviro.loop();
		EVO.timer.enviro = clock.minute;
	}
}
core.timer.roam =x=>{
	EVO.timer.roam -= x;
	if (EVO.timer.roam < 1){
		core.move();
		EVO.timer.roam = clock.hour-EVO.combat.speed*10000;
	}
}
core.timer.RNA =x=>{
	EVO.timer.RNA -= x*core.body.stat.mul(`vascular`,1);
	if (EVO.timer.RNA < 1){
		core.RNA();
		EVO.timer.RNA += clock.minute*5;
	}
}
core.timer.ribosome =x=>{
	EVO.timer.ribosome -= x*core.body.stat.mul(`vascular`,1);
	if (EVO.timer.ribosome < 1){
		core.ribosome();
		EVO.timer.ribosome += clock.hour;
	}
}
core.timer.protein =x=>{
	EVO.timer.protein -= x*core.body.stat.mul(`vascular`,1);
	if (EVO.timer.protein < 1){
		core.protein();
		EVO.timer.protein += clock.minute*5;
	}
}
core.timer.generation =x=>{
	EVO.timer.generation -= x*core.body.stat.mul(`vascular`,1);
	if (EVO.timer.generation < 1){
		core.body.cell.cell();
		EVO.timer.generation += clock.minute*5;
	}
}
core.timer.heal =x=>{
	EVO.timer.heal -= x*core.body.stat.mul(`balance`,1);
	if (EVO.timer.heal < 1){
		heal();
		EVO.timer.heal += clock.minute;
	} else {EVO.timer.heal = clock.minute;}
}
core.timer.cell =x=>{
	if (EVO.stage.num == 2){
		if (EVO.two.colony > 0 && EVO.two.colony >= core.body.cell.total()){
			EVO.timer.cell -= x*core.body.stat.mul(`balance`,1);
			if (EVO.timer.cell < 1){
				EVO.two.colony--;
				EVO.timer.cell += clock.minute;
			}
		} else {EVO.timer.cell = clock.minute;}
	}
}

core.gift =()=>{
	EVO.stage.food += EVO.stage.num*200;
	EVO.timer.gift = clock.minute*5;
	ID(`gift`).style.display = `none`;
	core.gift.time();
}
core.gift.time =()=>(css(`timer-gift`,clock(EVO.timer.gift)));
core.gift.check = true;

core.bless =()=>{
	let id = ID(`bless`)
	if(id.className !== `blessed`){
		core.timer.rush(core.bless.rush());
		EVO.stage.blessed++;
		EVO.timer.bless = clock.hour-clock.second*30*(EVO.temporal.compression||0);
		id.className = `blessed`;
		core.bless.time();
	}
}
core.bless.rush =()=>(clock.minute*5*(1+(EVO.temporal.expansion||0)/100));
core.bless.time =()=>(css(`timer-bless`,clock(EVO.timer.bless)));
core.bless.check = true;

core.foods = {
	"check":()=>{
		let check =x=>(EVO.stage.food > core.foods[x].amount());
		return check(`immeasurable`)?`immeasurable`
			:check(`copious`)?`copious`
			:check(`bountiful`)?`bountiful`
			:check(`abundant`)?`abundant`
			:check(`plentiful`)?`plentiful`
			:check(`adequate`)?`adequate`
			:check(`sparse`)?`sparse`
			:check(`scant`)?`scant`
			:check(`scarce`)?`scarce`
			:`none`;
	},
	"update":()=>{
		let x = ID(`food`);
		x.classList.replace(x.className,core.foods.check());
		x = ID(`swirl`).style;
		EVO.stage[EVO.stage.ftype] >= core.move.cost() ? x.display = `initial` : x.display = `none`;
	},
	"max":()=>{
		let onek =(stg,mov,num)=>{
			let a = (EVO[stg][mov] ? (1+((EVO[stg][mov].val || EVO[stg][mov])/1000))/(EVO.stage.num-num) : 1);
			if (isNaN(a)){
				console.log(`Food Max ${mov} created a NaN. It was auto fixed.`);
				a = 1;
			}
			return a;
		}
		return (EVO.stage.num*10000)
				*(1+((EVO.cross.foodmax||0)/10))
				*(1+(EVO.size.game/20))
				*onek(`one`,`flagellum`,0)
				*onek(`two`,`motility`,1)
				*onek(`three`,`peristalsis`,2)
				*onek(`cross`,`traveler`,EVO.stage.num-1)
				*core.body.stat.mul(`muscle`,1);
	},
	"min":()=>{
		return (100*EVO.cross.foodmin+10*EVO.size.game+core.body.stat.add(`digestive`)||0)
			*(1+(EVO.cross.foodmin||0)/10)
			*(1+EVO.size.game/50)
			*core.body.stat.mul(`digestive`,1);
	},
	"hunt":()=>((EVO.three.diet ? (EVO.three.diet == `herb` ? 100 : 10) : 1)),
	"move":()=>(Math.floor(((Math.random()*(core.foods.max()-core.foods.min())+core.foods.min())*core.body.stat.mul(`sight`,1))/core.foods.hunt())),
	"amount":(x)=>(x*EVO.stage.num),
	"immeasurable": {
		"amount":()=>(core.foods.amount(20000)),
		"multi": 2.5,
		"timer": 80,
	},
	"copious": {
		"amount":()=>(core.foods.amount(17500)),
		"multi": 2.2,
		"timer": 70,
	},
	"bountiful": {
		"amount":()=>(core.foods.amount(15000)),
		"multi": 1.9,
		"timer": 60,
	},
	"abundant": {
		"amount":()=>(core.foods.amount(12500)),
		"multi": 1.6,
		"timer": 50,
	},
	"plentiful": {
		"amount":()=>(core.foods.amount(10000)),
		"multi": 1.3,
		"timer": 45,
	},
	"adequate": {
		"amount":()=>(core.foods.amount(7500)),
		"multi": 1,
		"timer": 40,
	},
	"sparse": {
		"amount":()=>(core.foods.amount(5000)),
		"multi": 0.8,
		"timer": 35,
	},
	"scant": {
		"amount":()=>(core.foods.amount(2500)),
		"multi": 0.6,
		"timer": 30,
	},
	"scarce": {
		"amount":()=>(core.foods.amount(0)),
		"multi": 0.4,
		"timer": 25,
	},
	"none": {
		"multi": 0.2,
		"timer": 20,
	},
};

core.growth = {
	"membrane":()=>(clock.second*(4-(EVO.one.membraneScore||0))),
	"metabolism":(x)=>{
		EVO.one.metacycle += core.body.stat.mul(`nerve`,1);
		x *= (1+(evolution.creations()/1000));
		x *= (1+(EVO.one.metabolism.val||0)/100);
		x *= (1+(EVO.one.mitochondria||0)/100);
		x *= (1+(EVO.cross.efficient||0)/100);
		x *= core.body.stat.mul(`respiratory`,1);
		if (EVO.three.boost == `hyper` && EVO.combat.hp < EVO.combat.mhp){x *= (1+(EVO.combat.special/100));}
		x *= (1+(donation/1000));
		try {
			if (isNaN(x)){throw `core.growth.metabolism is NaN`;}
			else {return x;}
		}
		catch(err){
			console.log(err);
			return 0;
		}
	},
	"hunt":(x)=>{
		if (EVO.three.diet == `carn`){x *= 1+(EVO.area.grazer-(EVO.area.predator*10))/100;}
		if (EVO.three.diet == `herb`){x *= 1+((EVO.area.field/10)-EVO.area.grazer)/100;}
		try {
			if (isNaN(x)){throw `core.growth.metabolism is NaN`;}
			else {return x;}
		}
		catch(err){
			console.log(err);
			return 0;
		}
	},
	"autoClick":(x,y,z)=>{
		z = 0;
		z += (EVO.one.cilia||0)/EVO.stage.num;
		z += core.body.stat.add(`digestive`);
		z *= core.body.stat.mul(`digestive`,1);
		z *= (1-(EVO.enviro.phd||0)/100);
		z *= (core.foods[core.foods.check()].multi * (1+((EVO.one.voracious||0)+(EVO.two.rapacious||0))/200));
		if (EVO.three.diet){z = core.growth.hunt(z);}
		if (z < 1){z = 1;}
		y = z;
		if (EVO.one.metabolism.type == `aerob`){y = core.growth.metabolism(y);}
		y /= EVO.enviro.virus[0];
		try {
			if (isNaN(y) || isNaN(z)){throw `core.growth.autoClick is NaN`;}
			else {
				EVO.stage.food -= z;
				EVO.stage.ate += z;
				EVO.stage[EVO.stage.ftype] += y;
				if (EVO.stage.food < 0){EVO.stage.food = 0;}
			}
		}
		catch(err){console.log(err);}
		if (core.start.check){
			core.foods.update();
			window[EVO.stage.wrd].updateFood();
		}
	},
	"photosynth":(x)=>{
		let z = EVO.stage.num + (((EVO.one.glucose||0)+(EVO.two.fructose||0))/10);
		z *= (1+(EVO.enviro.sun.position/100));
		z = core.growth.metabolism(z);
		z *= (1+(EVO.size.game/100));
		if (EVO.stage.num > 1){z *= (1-(EVO.enviro.phd/100));}
		z /= EVO.enviro.virus[0];
		try {
			if (isNaN(z)){throw `core.growth.photosynth is NaN`;}
			else {EVO.stage[EVO.stage.ftype] += z;}
		}
		catch(err){console.log(err);}
		if (core.start.check){
			css(`photosynthesis`,Math.round(z));
			window[EVO.stage.wrd].updateFood();
		}
	},
}
clock.metacycle =(x)=>((clock.hour*x-EVO.one.metacycle)/clock.hour);

core.move =(x)=>{
	let z = core.move.cost();
	if (EVO.stage[EVO.stage.ftype] >= z){
		EVO.stage[EVO.stage.ftype] -= z;
		EVO.stage.food = core.foods.move();
		if (EVO.stage.num > 1){
			EVO.enviro.current = Math.floor(Math.random()*100)+1;
			css(`current`,(EVO.enviro.current/10));
			EVO.enviro.ph = Math.floor(Math.random()*140);
			css(`ph`,(EVO.enviro.ph/10));
			EVO.enviro.salinity = Math.floor(Math.random()*11)+30;
			css(`salinity`,EVO.enviro.salinity);
			core.move.learn();
		}
		if (EVO.three.diet){hunt.core.move();}
		if (core.start.check){
			window[EVO.stage.wrd].updateFood();
		}
	}
	if(!EVO.temporal.lock){evolution.temporal.unlock();}
}
core.move.cost =()=>{
	let cost = 1000 * EVO.stage.num;
	if (EVO[EVO.stage.wrd][EVO.stage.mtype]){
		if (typeof EVO[EVO.stage.wrd][EVO.stage.mtype] == `number`){cost -= EVO[EVO.stage.wrd][EVO.stage.mtype];}
		else {cost -= EVO[EVO.stage.wrd][EVO.stage.mtype].val;}
	}
	cost -= core.body.stat.add(`muscle`)*10;
	if (EVO.stage.num > 1){cost *= 1-((EVO.one.flagellum||0)/(EVO.stage.num*1000));}
	if (EVO.stage.num > 2){cost *= 1-((EVO.two.motility.val||0)/((EVO.stage.num-1)*1000));}
	if (EVO.stage.num > 3){cost *= 1-((EVO.three.peristalsis.val||0)/((EVO.stage.num-2)*1000));}
	if (EVO.cross.traveler){cost *= 1-(EVO.cross.traveler.val/1000);}
	cost *= 1+(EVO.size.game/100);
	if (EVO.one.membraneScore == 3){cost *= 1.5;}
	if (cost < 0){cost = 0;}
	cost = Math.ceil(cost);
	try {
		if (isNaN(cost)){throw `core.move.cost is NaN`;}
		else {return cost;}
	}
	catch(err){console.log(err);}
}
core.move.learn =()=>{
	if (EVO[EVO.stage.wrd][EVO.stage.mtype]){
		let a = EVO[EVO.stage.wrd][EVO.stage.mtype];
		a.learn += core.body.stat.mul(`nerve`,1);
		if (a.learn > a.val && a.val < 1000){
			a.learn -= ++a.val;
			css(EVO.stage.mtype,a.val);
		}
	}
	if (EVO.cross.traveler){
		EVO.cross.traveler.exp += core.body.stat.mul(`nerve`,1);
		let x = 0;
		if (EVO.one.flagellum && EVO.one.flagellum > x){x = EVO.one.flagellum;}
		if (EVO.two.motility && EVO.two.motility.val > x){x = EVO.two.motility.val;}
		if (EVO.three.peristalsis && EVO.three.peristalsis.val > x){x = EVO.three.peristalsis.val;}
		if (EVO.cross.traveler.exp > (EVO.cross.traveler.val+1)*10 && x > EVO.cross.traveler.val && EVO.cross.traveler.val < 1000){
			EVO.cross.traveler.exp -= (++EVO.cross.traveler.val)*10;
			css(`xtraveler`,EVO.cross.traveler.val);
		}
	}
}

var evolution =()=>{
	let t0 = performance.now();
	
	css(`evolution`,evolution.creations());
	let nav,evo,
		get =(x,y)=>{
			nav = ID(x);
			evo = ID(y);
			evolution.evo.length = 0;
		},
		set =()=>{
			evo.setAttribute(`echo`,evolution.evo.join(` `));
			(evolution.evo.length ? nav.classList.replace(`taboff`,`gold`) : nav.classList.replace(`gold`,`taboff`));
		};
	
	get(`stagenav`,`stageUpgrade`);
	evolution.stage();
	set();
	
	if(EVO.stage.num > 1){
		get(`combatnav`,`combatUpgrade`);
		evolution.combat();
		set();
	}
	
	get(`crossnav`,`crossUpgrade`);
	evolution.xcross();
	set();
	
	if(EVO.temporal.lock){
		get(`temporalnav`,`temporalUpgrade`);
		evolution.temporal();
		set();
	}
	
	//evolution.exotic();
	
	let t1 = performance.now();
	console.log(`Evolution call took ${t1-t0} milliseconds.`);
}
evolution.creations =()=>{return EVO.evo.evolution - EVO.evo.evolved + EVO.evo.bonus + REC.bonus;}
evolution.evo = [];
evolution.stage =()=>{
	for (let id in evolution[EVO.stage.wrd].data){
		let x = EVO[EVO.stage.wrd][id];
		if (typeof x === `number`){x = true;}
		if (!x || id.match(/^(metabolism)$/)){evolution[EVO.stage.wrd].data[id].evo();}
	}
}
evolution.cost =()=>{
	if (!EVO.evo[EVO.stage.wrd]){EVO.evo[EVO.stage.wrd] = 0;}
	return 1.20+EVO.evo[EVO.stage.wrd]*2.5/100;
};
evolution.one = {};
evolution.two = {};
evolution.three = {};
evolution.evolve =x=>{
	if (evolution[EVO.stage.wrd].data[x]){evolution[EVO.stage.wrd].evo(x);}
	if (evolution.combat.data[x]){evolution.combat.evo(x);}
	if (x.substring(0,1) === `x` && evolution.xcross.data[x.substring(1)]){evolution.xcross.evo(x);}
	if (x.substring(0,1) === `t` && evolution.temporal.data[x.substring(1)]){evolution.temporal.evo(x);}
}

core.enviro = {
	"loop":(x)=>{
		core.enviro.sun();
		if (EVO.stage.num > 1){
			core.enviro.effect(`current`,x);
			core.enviro.effect(`ph`,x);
			core.enviro.effect(`salinity`,x);
			if (core.start.check){core.enviro.css();}
			if (core.body.cell.total()+EVO.two.body > EVO.one.cytoplasm/10 && EVO.two.body > 0){core.enviro.toxin();}
			core.enviro.adhesion(x);
		}
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
		if (z == 0 && EVO.enviro[x] < core.enviro[x].hi){EVO.enviro[x]++;}
		if (z == 1 && EVO.enviro[x] > core.enviro[x].lo){EVO.enviro[x]--;}
		if (x == `ph`){core.enviro.phDmg();}
		if (x == `salinity`){core.enviro.salt();}
	},
	"css":()=>{
		css(`current`,(EVO.enviro.current/10));
		css(`ph`,(EVO.enviro.ph/10));
		css(`salinity`,EVO.enviro.salinity);
	},
	"adhesion":(x,y)=>{
		if (EVO.two.adhesion){y = EVO.two.adhesion.val;}
		if (EVO.two.body > (y||0) && Math.floor(Math.random()*100)+1 > (y||0)){
			EVO.enviro.currentDamage += EVO.enviro.current;
			if (EVO.enviro.currentDamage >= 100){
				EVO.enviro.currentDamage = 0;
				EVO.two.body--;
				if (core.start.check){core.body.cell.colony();}
				if (EVO.stage.num == 2 && EVO.two.adhesion){
					EVO.two.adhesion.learn += core.body.stat.mul(`nerve`,1);
					if (EVO.two.adhesion.learn > EVO.two.adhesion.val){
						EVO.two.adhesion.learn -= ++EVO.two.adhesion.val;
						if (core.start.check){css(`adhesion`,EVO.two.adhesion.val);}
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
		if (EVO[EVO.stage.wrd].EPS){
			EVO[EVO.stage.wrd].EPS -= phd;
			if (EVO[EVO.stage.wrd].EPS < 0){
				phd -= Math.abs(EVO[EVO.stage.wrd].EPS);
				EVO[EVO.stage.wrd].EPS = 0;
			} else {phd = 0;}
			css(`EPS`,EVO[EVO.stage.wrd].EPS);
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
				EVO.two.osmoregulation.learn += core.body.stat.mul(`nerve`,1);
				if (EVO.two.osmoregulation.learn > EVO.two.osmoregulation.val){
					EVO.two.osmoregulation.learn -= ++EVO.two.osmoregulation.val;
					css(`osmoregulation`,EVO.two.osmoregulation.val);
				}
			}
		} else {EVO.enviro.salt = 0;}
	},
	"toxcalc":()=>{
		let gen = EVO.two.body;
		let rndm = [];
		if (EVO.two.body > 0){rndm.push(`body`);}
		let bd =(x)=>{
			if (EVO.cross[`gen${x}`] && EVO.cross[`gen${x}`].val > 0){
				gen += EVO.cross[`gen${x}`].val;
				rndm.push(x);
			}
		}
		bd(`balance`);
		bd(`nerve`);
		bd(`vascular`);
		bd(`muscle`);
		bd(`respiratory`);
		bd(`digestive`);
		bd(`excretion`);
		bd(`sight`);
		let total = (core.body.cell.total()+gen)*(1+(EVO.size.game/100));
		let tox = core.body.stat.add(`excretion`)+EVO.one.cytoplasm/10;
		if (EVO.cross.detox){tox += EVO.cross.detox.val;}
		let calc = (total/10)*(1+(core.body.stat.add(`digestive`)-tox)/100);
		return [calc,total,rndm];
	},
	"toxin":()=>{
		let tox = core.enviro.toxcalc();
		EVO.enviro.toxin += tox[0];
		while (EVO.enviro.toxin > tox[1]){
			EVO.enviro.toxin -= tox[1];
			if (tox[2].length > 0){
				tox[2] = tox[2][Math.floor(Math.random()*tox[2].length)];
				if (tox[2] == `body`){
					EVO.two.body--;
					if (core.start.check && EVO.two.quorum || EVO.stage.num > 2){css(`body`,EVO.two.body);}
				} else {
					EVO.cross[`gen`+tox[2]].val--;
					if (core.start.check){css(`xgen${tox[2]}`,EVO.cross[`gen${tox[2]}`].val);}
				}
			}
			EVO.combat.hp--;
			if (EVO.combat.hp < 0){EVO.combat.hp = 0;}
			EVO.combat.sp--;
			if (EVO.combat.sp < 0){EVO.combat.sp = 0;}
			if (core.start.check){
				css(`hp`,EVO.combat.hp);
				css(`sp`,EVO.combat.sp);
				core.body.cell.colony();
			}
			if (EVO.cross.detox && EVO.cross.detox.val < 100){
				EVO.cross.detox.exp++;
				if (EVO.cross.detox.exp > EVO.cross.detox.val*10 && tox[0]/100 > EVO.cross.detox.val){
					EVO.cross.detox.exp -= EVO.cross.detox.val*10;
					EVO.cross.detox.val++;
				}
			}
		}
		if (EVO.enviro.toxin < 0){EVO.enviro.toxin = 0;}
	},
	"sun":()=>{
		let a = EVO.enviro.sun;
		a.position += a.shift;
		if (a.position < 1 || a.position > 99){a.shift *= -1;}
		if (EVO.stage.num > 1){core.enviro.bgcolor();}
	},
	"bgcolor":()=>{
		let x = core.body.stat.add(`sight`);
		let y = EVO.enviro.sun.position;
		if (y < x){x = y;}
		css(`bg-color`,`rgb(${[x,x,x].join('%,')}%)`,true);
		css(`sun`,`${x}%`);
	},
}

core.RNA =(y,z)=>{
	y = core.ribosome.add();
	y *= 1+(EVO.one.endoplasmic||0)/100;
	y *= 1+(EVO.one.golgi||0)/100;
	EVO.one.RNA.tRNA += y;
	y = Math.floor(1000*(1.001**core.RNA.RNA()));
	z = core.math(`RNA`,core.RNA.cost);
	while (EVO.one.RNA.tRNA > y && EVO.stage[EVO.stage.ftype] >= z*(1-(EVO.one.ribosome.val/1000))){
		EVO.stage[EVO.stage.ftype] -= z;
		EVO.one.RNA.tRNA -= y;
		EVO.one.RNA.rRNA++;
		if (core.start.check){
			css(`RNA`,core.RNA.RNA());
			window[EVO.stage.wrd].updateFood();
			evolution();
		}
	}
}
core.RNA.RNA =()=>(EVO.one.RNA ? EVO.one.RNA.val + EVO.one.RNA.rRNA - EVO.one.RNA.sRNA : 0);
core.RNA.cost = 1.01;

core.ribosome =()=>{
	EVO.one.ribosome.partial += core.ribosome.add();
	let x = Math.floor(1000*(1.001**EVO.one.ribosome.bonus));
	if (EVO.one.ribosome.partial > x){
		EVO.one.ribosome.partial -= x;
		EVO.one.ribosome.bonus++;
	}
	if (core.start.check){
		css(`ribosome`,core.ribosome.add());
	}
}
core.ribosome.add =()=>(EVO.one.ribosome.val + EVO.one.ribosome.bonus);

core.protein =()=>{
	let x = core.ribosome.add();
	x *= 1+(EVO.one.endoplasmic||0)/100;
	x *= 1+(EVO.one.golgi||0)/100;
	EVO.protein.partial += x;
	x =()=>{Math.floor(1000*(1.001**EVO.protein.whole));}
	while (EVO.protein.partial >= x()){
		EVO.protein.partial -= x();
		EVO.protein.whole++;
	}
	if (core.start.check){
		css(`protein`,EVO.protein.whole);
	}
}

core.body = {
	"cell": {
		"total":(x)=>{
			let sum = 0;
			let f =(z)=>{sum += z*(z+1)/2;}
			if (x == undefined || x == `balance`){f(core.body.stat.add(`balance`));}
			if (x == undefined || x == `nerve`){f(core.body.stat.add(`nerve`));}
			if (x == undefined || x == `vascular`){f(core.body.stat.add(`vascular`));}
			if (x == undefined || x == `muscle`){f(core.body.stat.add(`muscle`));}
			if (x == undefined || x == `respiratory`){f(core.body.stat.add(`respiratory`));}
			if (x == undefined || x == `digestive`){f(core.body.stat.add(`digestive`));}
			if (x == undefined || x == `excretion`){f(core.body.stat.add(`excretion`));}
			if (x == undefined || x == `sight`){f(core.body.stat.add(`sight`));}
			return sum;
		},
		"colony":(x)=>{
			if (x || EVO.two.quorum || EVO.stage.num > 2){css(`body`,EVO.two.body);}
			if (!x){evolution();}
		},
		"body":(x)=>{
			if (x.substring(0,1) == `x`){x = x.substring(1);}
			let y = EVO.two.body;
			if (EVO.cross[`gen${x}`]){y += EVO.cross[`gen${x}`].val;}
			return y;
		},
		"cell":(x)=>{
			EVO.two.bodyPart += (EVO.two.body+EVO.two.generation.val)*(1+((EVO.one.mitosis||0)/1000))*(1-(EVO.two.generation.val/100));
			if (EVO.two.bodyPart < 0){EVO.two.bodyPart = 0;}
			let y = Math.floor(1000*(1.001**EVO.two.body));
			while (EVO.two.bodyPart > y){
				EVO.two.bodyPart -= y;
				EVO.two.body++;
			}
			if (core.start.check && EVO.two.quorum || EVO.stage.num > 2){css(`body`,EVO.two.body);}
			let b =(z)=>{
				z = `gen`+z
				if (EVO.cross[z]){
					EVO.cross[z].part += core.body.stat.add(z.substring(3))*(1+(EVO.one.mitosis/1000))*(1-((100-EVO.two.generation)/100));
					y = Math.floor(1000*(1.001**EVO.cross[z].val));
					while (EVO.cross[z].part > y){
						EVO.cross[z].part -= y;
						EVO.cross[z].val++;
					}
					if (core.start.check){css(z,EVO.cross[z].val);}
				}
			}
			b(`balance`);
			b(`nerve`);
			b(`vascular`);
			b(`muscle`);
			b(`respiratory`);
			b(`digestive`);
			b(`excretion`);
			b(`sight`);
		},
	},
	"stat":{
		"add":(x)=>{
			if (x.substring(0,1) == `x`){x = x.substring(1);}
			return (EVO.two[x]||0)
				+ (EVO.three[x]||0)
				+ (EVO.four[x]||0)
				+ (EVO.five[x]||0)
				+ (EVO.six[x]||0)
				+ (EVO.cross[x]||0);
		},
		"mul":(x,y)=>{
			if (x.substring(0,1) == `x`){x = x.substring(1);}
			return (1+(EVO.two[x]||0)/100*y)
				* (1+(EVO.three[x]||0)/100*y)
				* (1+(EVO.four[x]||0)/100*y)
				* (1+(EVO.five[x]||0)/100*y)
				* (1+(EVO.six[x]||0)/100*y)
				* (1+(EVO.cross[x]||0)/100*y);
		},
		"total":()=>(core.body.stat.add(`balance`)
					+core.body.stat.add(`nerve`)
					+core.body.stat.add(`vascular`)
					+core.body.stat.add(`muscle`)
					+core.body.stat.add(`respiratory`)
					+core.body.stat.add(`digestive`)
					+core.body.stat.add(`excretion`)
					+core.body.stat.add(`sight`)
					),
		"match":(x)=>{
			if (x.substring(0,1) == `x`){x = x.substring(1);}
			return x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/);
		},
		"math":(x)=>{
			let loc = EVO.stage.wrd;
			if (x.substring(0,1) == `x`){
				loc = `cross`;
				x = x.substring(1);
			};
			let a =(c)=>{
				let chk = 0;
				if (EVO[loc][c] !== undefined){chk = EVO[loc][c];}
				return chk;//*(100-(REC[c].cost||0)/2)/100
			};
			let b = {
				"balance": a(`balance`),
				"nerve":  a(`nerve`),
				"vascular":  a(`vascular`),
				"muscle":  a(`muscle`),
				"respiratory":  a(`respiratory`),
				"digestive":  a(`digestive`),
				"excretion":  a(`excretion`),
				"sight":  a(`sight`),
			};
			if (x !== undefined && EVO[loc][x] !== undefined){b[x] = EVO[loc][x];}//*(100-(REC[x].cost||0))/100
			return b.balance + b.nerve + b.vascular + b.muscle + b.respiratory + b.digestive + b.excretion + b.sight;
		},
		"buy":(x)=>{
			let y = core.math(x,2);
			let loc = EVO.stage.wrd;
			if (x.substring(0,1) == `x`){
				loc = `cross`;
				x = x.substring(1);
			}
			let cost = core.body.stat.add(x)+1;
			if(EVO.stage[EVO.stage.ftype] >= y && core.body.cell.body(x) > cost && EVO[loc][x] < 100){//(REC[x].max||0)+
				EVO.stage[EVO.stage.ftype] -= y;
				EVO[loc][x]++;
				if (EVO.cross[`gen${x}`]){
					EVO.cross[`gen${x}`].val -= cost;
					if (EVO.cross[`gen${x}`].val < 0){
						cost = Math.abs(EVO.cross[`gen${x}`].val);
						EVO.cross[`gen${x}`].val = 0;
					}
					css(`xgen${x}`,EVO.cross[`gen${x}`].val);
				}
				EVO.two.body -= cost;
				if (EVO.two.quorum || EVO.stage.num > 2){css(`body`,EVO.two.body);}
				y = x;
				if (loc == `cross`){y = `x${y}`;}
				css(y,EVO[loc][x]);
				cbtstat();
				window[EVO.stage.wrd].updateFood();
				if (x == `sight`){core.enviro.bgcolor();}
			}
		},
		"evocost":()=>(EVO.two.specialized*(EVO.stage.num+2)),
		"data":()=>{
			let x =(y)=>{
				evolution[EVO.stage.wrd].data[y] = {
					"id": y,
					"evo":()=>{if (evolution[EVO.stage.wrd].statevo(y)){evolution.evo.push(y);}},
					"math":()=>(core.math(y,1.5)),
					"buy":()=>{core.body.stat.buy(y)},
					"dat":()=>(0),
					"cost":()=>(core.body.stat.evocost()),
					"color":()=>{
						let clr = ID(y).classList;
						(EVO.stage[EVO.stage.ftype] >= evolution[EVO.stage.wrd].data[y].math() && core.body.cell.body(y) > core.body.stat.add(y)+1 ? clr.replace(`green`,`red`) : clr.replace(`red`,`green`));
					},
					"tip":()=>{
						css(`cost-${y}`,evolution[EVO.stage.wrd].data[y].math());
						css(`body-${y}`,core.body.stat.add(y)+1);
					},
				}
			};
			x(`balance`);
			x(`nerve`);
			x(`vascular`);
			x(`muscle`);
			x(`respiratory`);
			x(`digestive`);
			x(`excretion`);
			x(`sight`);
		},
		"update":()=>{
			let y =(x)=>{if (EVO.one[x] !== undefined){evolution[EVO.stage.wrd].data[x].color();}}
			y(`balance`);
			y(`nerve`);
			y(`vascular`);
			y(`muscle`);
			y(`respiratory`);
			y(`digestive`);
			y(`excretion`);
			y(`sight`);
		},
	},
	"eps":()=>{
		evolution[EVO.stage.wrd].data.EPS = {
			"id": `EPS`,
			"evo":()=>{if (false){}},
			"math":(x)=>(core.math(`EPS`,1.01,x)),
			"buy":(x,y)=>{
				y = (y > 1 ? 10-(EVO[EVO.stage.wrd].EPS%10) : 1);
				let z = evolution[EVO.stage.wrd].data.EPS.math(y);
				if (EVO.stage[EVO.stage.ftype] >= z){
					EVO.stage[EVO.stage.ftype] -= z;
					EVO[EVO.stage.wrd].EPS += y;
					css(`EPS`,EVO[EVO.stage.wrd].EPS);
				}
			},
			"color":()=>{
				let clr = ID(`EPS`).classList;
				if(EVO.stage[EVO.stage.ftype] >= evolution[EVO.stage.wrd].data.EPS.math()){
					clr.replace(`green`,`red`);
					let x = 10-(EVO[EVO.stage.wrd].EPS%10);
					(EVO.stage[EVO.stage.ftype] >= evolution[EVO.stage.wrd].data.EPS.math(x) && x > 1 ? css(`EPS-x`,`x${x}`): css(`EPS-x`,``));
				} else {
					clr.replace(`red`,`green`);
					css(`EPS-x`,``);
				}
			},
			"tip":(x)=>{
				if (x > 2){y = 10-(EVO[EVO.stage.wrd].EPS%10);}
				css(`cost-EPS`,evolution[EVO.stage.wrd].data.EPS.math(x));
			},
		};
	},
}

core.buy =(x,y)=>{
	if (x == `ATP`){
		if (EVO.stage.food > 0){
			EVO.stage[EVO.stage.ftype]++;
			EVO.stage.food--;
			core.foods.update();
		}
	}
	else if (x == `evolution`){
		if(EVO.stage[EVO.stage.ftype] >= core.math(x,evolution.cost())){
			EVO.stage[EVO.stage.ftype] -= core.math(x,evolution.cost());
			EVO.evo[x]++;
		}
	}
	else if (x == `EPS` && EVO[EVO.stage.wrd].EPS !== undefined){evolution[EVO.stage.wrd].data.EPS.buy(x,y);}
	else if (EVO[EVO.stage.wrd][x] !== undefined){evolution[EVO.stage.wrd].data[x].buy(x,y);}
	else if (x.substring(0,1) == `x`){evolution.xcross.data[x.substring(1)].buy();}
	else if (x.substring(0,1) == `t`){evolution.temporal.data[x.substring(1)].buy();}
	else if (x.match(/^(offense|defense|speed|special)$/)){cbtupg(x);}
	window[EVO.stage.wrd].updateFood();
	evolution();
	core.tip(x,y);
}

core.math =(x,y,z)=>{
	let cost,evo;
	if (x == `evolution`){evo = EVO.evo[x];}
	else if (core.body.stat.match(x)){evo = core.body.stat.math(x);}
	else if (x.substring(0,1) == `x`){
		x.substring(0,1) == `x`;
		evo = (EVO.cross[x].val ? EVO.cross[x].val : EVO.cross[x]);
	}
	else if (x.match(/^(cilia|flagellum)$/)){evo = (EVO.one.cilia||0)+(EVO.one.flagellum||0);}
	else if (x == `EPS` && EVO[EVO.stage.wrd].EPS !== undefined){evo = EVO[EVO.stage.wrd].EPS;}
	else if (EVO[EVO.stage.wrd][x] !== undefined){evo = (typeof EVO[EVO.stage.wrd][x] === `object` ? EVO[EVO.stage.wrd][x].val : EVO[EVO.stage.wrd][x]);}
	if (evo !== undefined){
		cost = 10*((y**evo)*((y**(z||1))-1))/(y-1);
		if (!x.match(/^(evolution|cytoplasm)$/)){cost *= 1-((EVO.one.cytoplasm||0)/(10000-core.body.stat.add(`balance`)-core.body.stat.add(`vascular`)));}
		if (x === `evolution`){cost *= 1-(EVO.temporal.redux||0)/1000;}
	}
	return (Math.floor(cost)||0);
}

core.bounce =(id,time,stop,timer)=>{
	core.bounce.loop({
		'id':id,
		'time':time,
		'run':stop,
		'timer':timer?timer:`none`,
		'func':core.bounce.loop,
		'incx':2*(Math.random()>0.5?1:-1),
		'incy':2*(Math.random()>0.5?1:-1),
		'x':~~(Math.random()*window.innerWidth)-50,
		'y':~~(Math.random()*window.innerHeight)-50,
		'z':~~(Math.random()*360),
	});
}
core.bounce.loop =(obj)=>{
	let W = (window.innerWidth-50 > 500 ? window.innerWidth-50 : 500),
		H = (window.innerHeight-50 > 500 ? window.innerHeight-50 : 500),
		o = ID(obj.id);
	obj.x += obj.incx;
	obj.y += obj.incy;
	obj.z += obj.time/2;
	if (obj.x < 2 || obj.x >= W){
		obj.incx *= -1;
		if (obj.x < 0){obj.x = 0;}
		if (obj.x > W){obj.x = W;}
	}
	if (obj.y < 2 || obj.y >= H){
		obj.incy *= -1;
		if (obj.y < 0){obj.y = 0;}
		if (obj.y > H){obj.y = H;}
	}
	if (obj.z > 359){obj.z = 0;}
	css(`${obj.id}-x`,`${obj.x}px`,true);
	css(`${obj.id}-y`,`${obj.y}px`,true);
	css(`${obj.id}-r`,`${obj.z}deg`,true);
	if (typeof obj.timer === `number`){obj.timer -= obj.time;}
	if ((obj.timer > 0 || obj.timer === `none`) && o && o.getAttribute(`data-run`) === obj.run){setTimeout(obj.func,obj.time,obj);}
	else {
		if(o){
			let id = ID(`bounce`),
				ar = id.getAttribute(`echo`).split(` `);
			ar.splice(ar.indexOf(o),1);
			id.setAttribute(`echo`,ar.join(` `));
		}
	}
}
core.bounce.route =(x,y)=>{
	x == `swirl`?core.move()
	:x == `timestrand`?evolution.temporal.timestrand()
	:null;
}

core.tip =(x,y)=>{
	x == `swirl`?css(`cost-swirl`,core.move.cost())
	:x == `evolution`?css(`cost-evolution`,core.math(`evolution`,evolution.cost()))
	:EVO[EVO.stage.wrd][x] !== undefined && evolution[EVO.stage.wrd].data[x].tip?evolution[EVO.stage.wrd].data[x].tip(y)
	:EVO.cross[x.substring(1)] !== undefined && evolution.xcross.data[x.substring(1)].tip?evolution.xcross.data[x.substring(1)].tip(y)
	:null;
	let z = ID(`tip`);
	z.classList.replace(z.className,x);
	css(`mouse`,`initial`,true);
}

core.tap =()=>{
	let z = ID(`tip`);
	z.classList.replace(z.className,`empty`);
	css(`mouse`,`none`,true);
}

core.cheat =()=>{
	let key =x=>(Object.keys(EVO[x]).length == 0);
	if (key(`one`)){
		if (EVO.one.metabolism.val && EVO.one.metabolism > 100){core.hard();}
		if (EVO.one.mitochondria && EVO.one.mitochondria > 100){core.hard();}
		if (EVO.one.mitosis && EVO.one.mitosis > 1000){core.hard();}
		if (EVO.one.cytoplasm && EVO.one.cytoplasm > 1000){core.hard();}
		if (EVO.one.cilia && EVO.one.cilia > 1000){core.hard();}
		if (EVO.one.flagellum && EVO.one.flagellum > 1000){core.hard();}
		if (EVO.one.ribosome && EVO.one.ribosome.val > 1000){core.hard();}
	}
	if (key(`two`)){
		if (EVO.two.balance && EVO.two.balance > 100){core.hard();}
		if (EVO.two.nerve && EVO.two.nerve > 100){core.hard();}
		if (EVO.two.vascular && EVO.two.vascular > 100){core.hard();}
		if (EVO.two.muscle && EVO.two.muscle > 100){core.hard();}
		if (EVO.two.respiratory && EVO.two.respiratory > 100){core.hard();}
		if (EVO.two.digestive && EVO.two.digestive > 100){core.hard();}
		if (EVO.two.excretion && EVO.two.excretion > 100){core.hard();}
		if (EVO.two.sight && EVO.two.sight > 100){core.hard();}
	}
	if (key(`three`)){
		if (EVO.three.balance && EVO.three.balance > 100){core.hard();}
		if (EVO.three.nerve && EVO.three.nerve > 100){core.hard();}
		if (EVO.three.vascular && EVO.three.vascular > 100){core.hard();}
		if (EVO.three.muscle && EVO.three.muscle > 100){core.hard();}
		if (EVO.three.respiratory && EVO.three.respiratory > 100){core.hard();}
		if (EVO.three.digestive && EVO.three.digestive > 100){core.hard();}
		if (EVO.three.excretion && EVO.three.excretion > 100){core.hard();}
		if (EVO.three.sight && EVO.three.sight > 100){core.hard();}
	}
}

core.soft =()=>{
	localStorage.recore.moveItem(`EVO`);
	location.reload(true);
}

core.hard =()=>{
	localStorage.recore.moveItem(`EVO`);
	localStorage.recore.moveItem(`REC`);
	location.reload(true);
}

core.rec = {
	"carnate":()=>{
		ID(`carnate`).classList.replace(`hidden`,`shown`);
	},
	"nocarnate":()=>{
		ID(`event`).style.display = `none`;
		ID(`lay`).classList.replace(`layon`,`layoff`);
		ID(`carnate`).classList.replace(`shown`,`hidden`);
		cbt.check = true;
	},
	"recarnate":()=>{
		ID(`lay`).classList.replace(`layon`,`layoff`);
		ID(`carnate`).classList.replace(`shown`,`hidden`);
		let save = EVO;
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
		save.set(`REC`);
		save.del(`EVO`);
		//window.location.assign("REC.html");
		window.location.assign(`index.html`);
	},
}