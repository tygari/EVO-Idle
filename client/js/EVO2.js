const fun = {
	"wrd": 'two',
	"food": 'nutrient',
	"virus": [1 ,0, 0, 0],
	"failtimer": 0,
	"movement": 'motility',
	"move": 0,
};

start.HTMLSetup =()=>{
	ID('nutrient').removeAttribute("onclick");
	if (EVO.one.ribosome){
		ID('protein').removeAttribute("onclick");
		ID('natural').style.visibility = 'initial';
		ID('exotics').style.visibility = 'initial';
	}
	ID('stat').style.display = 'none';
	ID('hlth').style.display = 'none';
	ID('stmn').style.display = 'none';
	ID('rtrt').style.display = 'none';
	css('foodtype','Nutrient');
	body.stat.data();
	body.eps();
	fun.cell = (1.1-(EVO.one.mitosis/2000)).toFixed(4);
	if(EVO.combat.talent > 0){
		css('experience',Math.floor(EVO.combat.exp));
		ID('experience').classList.replace('red','purple');
		ID('experience').removeAttribute("onclick");
	}
	evolution.xcross.setup();
	evolution.stage.setup();
	evolution();
}
start.InitializeProgram =()=>{
	foods.update();
	updateFood();
	enviro.css();
	enviro.bgcolor();
	setTimeout(enviro.loop,clock.minute);
	setTimeout(growth.autoClick,growth.autotime());
	if (EVO.two.specialized > 1){setTimeout(heal, heal.timer());}
	if (EVO.one.metabolism.type == 'photo'){setTimeout(growth.photosynth,growth.phototime());}
	css('protein',EVO.protein.whole);
	setTimeout(protein,clock.minute);
	setTimeout(ribosome,clock.hour);
	setTimeout(cell, cell.timer());
	setTimeout(event,clock.minute*5);
	css('gift',EVO.stage.num*200);
	ID('load').style.display = 'none';
	swirly.start();
}

const speedup =(x)=>{
	let t0 = performance.now();
	let speedUp = new Array(10).fill(0);
	let y,z;
	while (x > speedUp[0]){
		z = 1;
		y = speedUp[z] + growth.autotime();
		if (speedUp[0] >= y){
			growth.autoClick();
			speedUp[z] = y;
		}
		z++;
		y = speedUp[z] + growth.phototime();
		if (EVO.one.metabolism.type == 'photo' && speedUp[0] >= y){
			growth.photosynth();
			speedUp[z] = y;
		}
		z++;
		y = speedUp[z] + enviro.time();
		if (speedUp[0] >= y){
			enviro.loop();
			speedUp[z] = y;
		}
		z++;
		y = speedUp[z] + cell.timer();
		if (speedUp[0] >= y){
			cell();
			speedUp[z] = y;
		}
		if (EVO.one.ribosome){
			z++;
			y = speedUp[z] + RNA.time();
			if (speedUp[0] >= y){
				RNA();
				protein();
				speedUp[z] = y;
			}
			z++;
			y = speedUp[z] + ribosome.time();
			if (speedUp[0] >= y){
				ribosome();
				speedUp[z] = y;
			}
		}
		z++;
		y = speedUp[z] + body.cell.timer();
		if (EVO.two.generation && speedUp[0] >= y){
			body.cell.cell();
			speedUp[z] = y;
		}
		z++;
		y = speedUp[z] + heal.timer();
		if (EVO.two.specialized > 1 && speedUp[0] >= y){
			heal();
			speedUp[z] = y;
		}
		//Increment
		speedUp[0] += 100;
	}
	let t1 = performance.now();
	console.log("Speedup call took " + (t1 - t0) + " milliseconds for " + x + " milliseconds which is " + clock(x) + ".");
}

const cell =(x)=>{
	if (EVO.two.colony > 0 && EVO.two.colony >= body.cell.total()){EVO.two.colony--;}
	if (x !== start.check){setTimeout(cell, cell.timer());}
}
cell.timer =()=>(clock.minute*body.stat.mul('balance',-2));

const updateFood =()=>{
	foods.update();
	css('nutrient',Math.floor(EVO.stage[fun.food]));
	let clr = ID('evolution').classList;
	(EVO.stage[fun.food] >= math('evolution',EVO.evo.cost) ? clr.replace('green','red') : clr.replace('red','green'));
	clr =(x)=>{if (EVO.two[x] !== undefined){evolution.stage.data[x].color();}}
	clr('colony');
	clr('EPS');
	clr('rapacious');
	clr('fructose');
	body.stat.update();
	for (let id in EVO.cross){if (evolution.xcross.data[id].color){evolution.xcross.data[id].color();}}
}

let stage = evolution.stage;
stage.setup =()=>{
	evolution.stage.start();
}
stage.start =()=>{
	let x = true;
	for (let id in EVO.two){
		if (id == 'quorum'){body.cell.colony();}
		else if (id == 'generation'){setTimeout(body.cell.cell,body.cell.timer());}
		else if (x && body.stat.match(id)){
			ID('stat').style.display = 'initial';
			ID('rtrt').style.display = 'initial';
			css('rtrt',EVO.combat.rtrt);
			ID('natural').style.visibility = 'initial';
			ID('bodies').style.visibility = 'initial';
			cbtstat();
			x = false;
		}
		else if (EVO.size.game > 0){css('size',EVO.size.game);}
		if (evolution.stage.data[id]){
			if (typeof EVO.two[id] === 'object'){css(evolution.stage.data[id].id,EVO.two[id].val);}
			else {css(evolution.stage.data[id].id,EVO.two[id]);}
		}
	}
}
stage.evo =(x)=>{
	ID(x).removeAttribute('id');
	EVO.evo.evolved += evolution.stage.data[x].cost();
	if (!x.match(/^(size|worm)$/) && evolution.stage.data[x] && evolution.stage.data[x].dat){EVO.two[x] = evolution.stage.data[x].dat();}
	if (x.match(/^(sex|adhesion|communication|organization|quorum|biofilm|osmoregulation|motility|generation|specialization|circular|dependency|radial)$/)){
		if (x == 'quorum'){body.cell.colony();}
		if (x == 'generation'){setTimeout(body.cell.cell,body.cell.timer());}
		EVO.echo.struc.push(x);
		echo('struc','struc');
	}
	else if (x.match(/^(|)$/)){
		EVO.echo.stage.splice(-1,0,x);
		echo('stagebox','stage');
	}
	else if (x.match(/^(rapacious|fructose)$/)){
		let y = EVO.echo.game,
			z = y.indexOf('experience');
		z < 0 ? y.push(x) : y.splice(y,1,x);
		echo('gamebox','game');
	}
	else if (body.stat.match(x)){
		EVO.two.specialized++;
		EVO.echo.body.push(x);
		echo('bodybox','body');
		cbtstat();
		if (EVO.two.specialized == 2){
			ID('stat').style.display = 'initial';
			ID('rtrt').style.display = 'initial';
			css('rtrt',EVO.combat.rtrt);
			ID('natural').style.visibility = 'initial';
			ID('bodies').style.visibility = 'initial';
			setTimeout(heal, heal.timer());
		}
	}
	else if (x == 'size'){
		if (EVO.echo.boost.indexOf('size') < 0){
			ID('boost').style.display = 'initial';
			EVO.echo.boost.push(x);
			echo('boost','boost');
		}
		evolution.stage.data.size.dat();
		css('size',EVO.size.game);
	}
	else if (x == 'worm'){evolution.stage.data[x].dat();}
	if (EVO.two[x] !== undefined && evolution.stage.data[x]){
		(typeof EVO.two[x] === 'object' ? css(evolution.stage.data[x].id,EVO.two[x].val) : css(evolution.stage.data[x].id,EVO.two[x]));
	}
	evolution();
}
stage.metamo =(x,y)=>{
	let z = evolution.stage.data[x].math();
	y *= z;
	if (EVO.stage[fun.food] >= y && RNA.RNA() >= z && EVO.one.metabolism.val > EVO.two[x]){
		EVO.stage[fun.food] -= y;
		EVO.one.RNA.sRNA += z;
		EVO.two[x]++;
		css(x,EVO.two[x]);
	}
}
stage.statevo =(x)=>{
	let z = false;
	let cell = 30+(EVO.two.specialized*10);
	let creation = evolution.creations();
	let special = evolution.stage.data[x].cost();
	if (EVO.two.radial && (EVO.two.specialized == 7 || EVO.two.specialized == 8) && creation >= special && EVO.two.body >= cell){z = true;}
	else if (EVO.two.dependency && (EVO.two.specialized == 5 || EVO.two.specialized == 6) && creation >= special && EVO.two.body >= cell){z = true;}
	else if (EVO.two.circular && (EVO.two.specialized == 3 || EVO.two.specialized == 4) && creation >= special && EVO.two.body >= cell){z = true;}
	else if (EVO.two.specialization && (EVO.two.specialized == 1 || EVO.two.specialized == 2) && creation >= special && EVO.two.body >= cell){z = true;}
	return z;
}
stage.data = {
	//MultiCell Evolutions
	"sex":{
		"id": 'sex',
		"evo":()=>{if (EVO.two.body >= 1 && evolution.creations() >= evolution.stage.data.sex.cost()){evolution.evo.push('sex');}},
		"dat":()=>{
			EVO.evo.cost = (EVO.evo.cost-0.05).toFixed(2);
			return true;
		},
		"cost":()=>(1),
	},
	"adhesion":{
		"id": 'adhesion',
		"evo":()=>{if (EVO.two.body >= 1 && evolution.creations() >= evolution.stage.data.adhesion.cost()){evolution.evo.push('adhesion');}},
		"dat":()=>({"val": 0, "learn": 0}),
		"cost":()=>(1),
	},
	"quorum":{
		"id": 'quorum',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 40 && evolution.creations() >= evolution.stage.data.quorum.cost()){evolution.evo.push('quorum');}},
		"dat":()=>(true),
		"cost":()=>(3),
	},
	"biofilm":{
		"id": 'biofilm',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 20 && evolution.creations() >= evolution.stage.data.biofilm.cost()){evolution.evo.push('biofilm');}},
		"dat":()=>{
			EVO.two.EPS = 0;
			EVO.echo.stage.splice(-1,0,'EPS');
			echo('stagebox','stage');
			css('EPS',EVO.two.EPS);
			return true;
		},
		"cost":()=>(4),
	},
	"generation":{
		"id": 'generation',
		"evo":()=>{if (EVO.two.organization && EVO.two.body >= 100 && evolution.creations() >= evolution.stage.data.generation.cost()){evolution.evo.push('generation');}},
		"dat":()=>({"val": 0, "learn": 0}),
		"cost":()=>(4),
	},
	"osmoregulation":{
		"id": 'osmoregulation',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 20 && evolution.creations() >= evolution.stage.data.osmoregulation.cost()){evolution.evo.push('osmoregulation');}},
		"dat":()=>({"val": 0, "learn": 0}),
		"cost":()=>(4),
	},
	"motility":{
		"id": 'motility',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 20 && evolution.creations() >= evolution.stage.data.motility.cost()){evolution.evo.push('motility');}},
		"dat":()=>({"val": 0, "learn": 0}),
		"cost":()=>(3),
	},
	//Currency
	"colony":{
		"id": 'colony',
		"evo":()=>{if (false){;}},
		"math":(x)=>(math('colony',fun.cell,x)),
		"buy":(x,y,z)=>{
			y = (y > 1 ? 10-(EVO.two.body%10) : 1);
			z = evolution.stage.data.colony.math(y);
			if (EVO.stage[fun.food] >= z){
				EVO.stage[fun.food] -= z;
				EVO.two.colony += y;
				EVO.two.body += y;
				if (EVO.two.generation !== undefined){generation(y);}
			}
		},
		"color":()=>{
			clr = ID('colony').classList;
			if (EVO.stage[fun.food] >= evolution.stage.data.colony.math()){
				clr.replace('green','red');
				let x = (EVO.two.quorum ? 10-(EVO.two.body%10) : 10);
				(EVO.stage[fun.food] >= evolution.stage.data.colony.math(x) && x > 1 ? css('colony-x','x'+x) : css('colony-x',''));
			} else {
				clr.replace('red','green');
				css('colony-x','');
			}
		},
		"tip":(x)=>{
			x = (x > 1 ? (EVO.two.quorum ? 10-(EVO.two.body%10) : 10) : 1);
			css('cost-colony',math('colony',fun.cell,x));
		},
	},
	//100 Evolutions
	"rapacious":{
		"id": 'rapacious',
		"evo":()=>{if (EVO.one.metabolism.type == 'aerob' && RNA.RNA() > 10 && EVO.one.metabolism.val > clock.metacycle(100) && evolution.creations() >= evolution.stage.data.rapacious.cost()){evolution.evo.push('rapacious');}},
		"math":()=>(math('rapacious',1.5)),
		"buy":()=>{evolution.stage.metamo('rapacious',3);},
		"dat":()=>(0),
		"cost":()=>(10),
		"color":()=>{
			let clr = ID('rapacious').classList;
			let x = evolution.stage.data.rapacious.math();
			(EVO.stage[fun.food] >= x*3 && RNA.RNA() >= x ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":()=>{
			let x = evolution.stage.data.rapacious.math();
			css('cost-rapacious',x);
			css('cost-3-rapacious',x*3);
		},
	},
	"fructose":{
		"id": 'fructose',
		"evo":()=>{if (EVO.one.metabolism.type == 'photo' && RNA.RNA() > 10 && EVO.one.metabolism.val > clock.metacycle(100) && evolution.creations() >= evolution.stage.data.fructose.cost()){evolution.evo.push('fructose');}},
		"math":()=>(math('fructose',1.5)),
		"buy":(x)=>{evolution.stage.metamo(x,3);},
		"dat":()=>(0),
		"cost":()=>(10),
		"color":()=>{
			let clr = ID('fructose').classList;
			let x = evolution.stage.data.fructose.math();
			(EVO.stage[fun.food] >= x*3 && RNA.RNA() >= x ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":()=>{
			let x = evolution.stage.data.fructose.math();
			css('cost-fructose',x);
			css('cost-3-fructose',x*3);
		},
	},
	//Gate Evolutions
	"communication":{
		"id": 'communication',
		"evo":()=>{if (EVO.two.adhesion && EVO.two.body >= 10 && evolution.creations() >= evolution.stage.data.communication.cost()){evolution.evo.push('communication');}},
		"dat":()=>(true),
		"cost":()=>(1),
	},
	"organization":{
		"id": 'organization',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 20 && evolution.creations() >= evolution.stage.data.organization.cost()){evolution.evo.push('organization');}},
		"dat":()=>(true),
		"cost":()=>(2),
	},
	"specialization":{
		"id": 'specialization',
		"evo":()=>{if (EVO.two.organization && EVO.two.body >= 30 && evolution.creations() >= evolution.stage.data.specialization.cost()){evolution.evo.push('specialization');}},
		"dat":()=>(true),
		"cost":()=>(2),
	},
	"circular":{
		"id": 'circular',
		"evo":()=>{if (EVO.two.specialized == 3 && body.cell.total() >= 30+(EVO.two.specialized*10) && evolution.creations() >= evolution.stage.data.circular.cost()){evolution.evo.push('circular');}},
		"dat":()=>(true),
		"cost":()=>(body.stat.evocost()),
	},
	"dependency":{
		"id": 'dependency',
		"evo":()=>{if (EVO.two.circular && EVO.two.specialized == 5 && body.cell.total() >= 30+(EVO.two.specialized*10) && evolution.creations() >= evolution.stage.data.dependency.cost()){evolution.evo.push('dependency');}},
		"dat":()=>(true),
		"cost":()=>(body.stat.evocost()),
	},
	"radial":{
		"id": 'radial',
		"evo":()=>{if (EVO.two.dependency && EVO.two.specialized == 7 && body.cell.total() >= 30+(EVO.two.specialized*10) && evolution.creations() >= evolution.stage.data.radial.cost()){evolution.evo.push('radial');}},
		"dat":()=>{
			let a = EVO.echo.struc;
			a.splice(a.indexOf('circular'),1,'radial');
			return true;
		},
		"cost":()=>(body.stat.evocost()),
	},
	"worm":{
		"id": 'worm',
		"evo":()=>{if (false && EVO.two.dependency && EVO.two.quorum && evolution.creations() >= evolution.stage.data.worm.cost()){evolution.evo.push('worm');}},
		"dat":()=>{
			EVO.stage.num++;
			EVO.stage.food = EVO.stage.food/2;
			EVO.stage.mineral = EVO.stage[fun.food]/2;
			delete EVO.stage[fun.food];
			EVO.size.stage = 0;
			EVO.echo.stage = ['mineral','evolution'];
			if (EVO.echo.boost.indexOf('size') > -1){EVO.echo.stage.splice(-1,0,'EPS')};
			EVO.echo.game = ['experience'];
			EVO.echo.develop.push('cells');
			EVO.three = {"huntcycle": 0,"specialized": 1,};
			EVO.combat.hlth = 100;
			EVO.combat.stmn = 100;
			for (let id in EVO.two){
				if (body.stat.match(id)){EVO.three[id] = 0;}//Adds evolved stage two stats to stage three evolutions
				if (id.match(/^(circular|radial)$/)){
					EVO.three[id] = true;
					delete EVO.two[id];
				}
				if (id = 'EPS'){
					EVO.three.EPS = EVO.two.EPS;
					delete EVO.two.EPS;
				}
			}
			localStorage.setItem('EVO', JSON.stringify(EVO));
			location.reload(true);
		},
		"cost":()=>(20),
	},
	//Size
	"size":{
		"id": 'size',
		"evo":()=>{
			if (EVO.stage.num > EVO.size.stage && EVO.two.body >= (EVO.size.stage+1)*200 && evolution.creations() >= evolution.stage.data.size.cost()){
				css('size1',evolution.stage.data.size.cost());
				evolution.evo.push('size');
			}
		},
		"dat":()=>{
			EVO.size.game++;
			EVO.size.stage++;
		},
		"cost":()=>(EVO.size.game+1),
	},
};

const generation =(z)=>{
	EVO.two.generation.learn += z*body.stat.mul('nerve',1);
	if (EVO.two.generation.learn >= (EVO.two.generation.val+1)*10 && EVO.two.generation.val < 100){
		EVO.two.generation.val++;
		EVO.two.generation.learn -= EVO.two.generation.val*10;
		css('generation',EVO.two.generation.val);
	}
}