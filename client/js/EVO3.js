const fun = {
	"wrd": 'three',
	"food": 'mineral',
	"virus": [1 ,0, 0, 0],
	"failtimer": 0,
	"movement": 'peristalsis',
	"move": 0,
	"hunt": 0,
};

start.HTMLSetup =()=>{
	if (EVO.three.diet){
		if (EVO.three.diet == 'carn'){fun.food = 'meat';}
		if (EVO.three.diet == 'herb'){fun.food = 'plant';}
	}
	ID(fun.food).removeAttribute("onclick");
	ID('natural').style.visibility = 'initial';
	ID('bodies').style.visibility = 'initial';
	if (EVO.one.ribosome){
		ID('protein').removeAttribute("onclick");
		ID('exotics').style.visibility = 'initial';
	}
	ID('hlth').style.display = 'none';
	ID('stmn').style.display = 'none';
	ID('rtrt').style.display = 'initial';
	css('foodtype',fun.food);
	css('body',EVO.two.body);
	body.stat.data();
	body.eps();
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
	if (ID("basic")){ID("basic").id = EVO.one.metabolism.type;}
	foods.update();
	updateFood();
	enviro.css();
	css('protein',EVO.protein.whole);
	css('EPS',EVO.three.EPS);
	css('rtrt',EVO.combat.rtrt);
	enviro.bgcolor();
	if (EVO.two.generation){setTimeout(body.cell.cell,body.cell.timer());}
	if (EVO.three.diet){
		hunt.rehunt();
		hunt.pred.timer = setTimeout(hunt.pred,hunt.pred.time());
		hunt.graze.timer = setTimeout(hunt.graze,hunt.graze.time());
	}
	setTimeout(enviro.loop,clock.minute);
	setTimeout(growth.autoClick,growth.autotime());
	setTimeout(heal, heal.timer());
	if (EVO.one.metabolism.type == 'photo'){setTimeout(growth.photosynth,growth.phototime());}
	css('protein',EVO.protein.whole);
	setTimeout(protein,clock.minute);
	setTimeout(ribosome,clock.hour);
	css('gift',EVO.stage.num*200);
	//setTimeout(event, 300000);
	ID('load').style.display = 'none';
	swirly.start();
}
start.check = false;

const speedup =(x)=>{
	let t0 = performance.now();
	let speedUp = new Array(10).fill(0);
	let y,z;
	while (x >= speedUp[0]){
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
		if (EVO.three.diet){
			z++;
			y = speedUp[z] + hunt.pred.time();
			if (speedUp[0] >= y){
				hunt.pred();
				speedUp[z] = y;
			}
			z++;
			y = speedUp[z] + hunt.graze.time();
			if (speedUp[0] >= y){
				hunt.graze();
				speedUp[z] = y;
			}
		}
		z++;
		y = speedUp[z] + enviro.time();
		if (speedUp[0] >= y){
			enviro.loop();
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
		if (speedUp[0] >= y){
			heal();
			speedUp[z] = y;
		}
		//Increment
		speedUp[0] += 100;
	}
	let t1 = performance.now();
	console.log("Speedup call took " + (t1 - t0) + " milliseconds for " + x + " milliseconds which is " + clock(x) + ".");
}

const hunt =()=>{
	if (cbt.check){
		if (EVO.stage.food < 1 && EVO.three.diet && EVO.combat.hp >= Math.floor(EVO.combat.hlth*EVO.combat.mhp/100) && EVO.combat.sp >= Math.floor(EVO.combat.spcl*EVO.combat.msp/100)){
			ID('event').style.display = 'initial';
			hunt[EVO.three.diet](move.cost(),hunt.random(),(EVO.three.boost == 'camo' ? EVO.combat.offense : 0));
			EVO.three.huntcycle += body.stat.mul('nerve',1);
		}
		if (cbt.check){
			hunt.rehunt();
			ID('event').style.display = 'none';
		}
	}
	else {setTimeout(hunt.busy,clock.second);}
}
hunt.carn =(res,fight,camo)=>{
	if (EVO.area.predator-(camo/2) > fight){
		css('event-one','You meet an aggressive predator.  You are being attacked.');
		hunt.cbt(res,'predator');
	}
	else if (EVO.area.predator-(camo/2)+(EVO.area.grazer*4)+camo > fight && EVO.area.grazer > 0){
		css('event-one','You find an unattentive grazer.  You are attacking.');
		hunt.cbt(res,'grazer');
	}
}
hunt.herb =(res,fight,camo)=>{
	if ((EVO.area.predator-(camo/2))*4 > fight && EVO.area.predator > 0){
		css('event-one','You meet an aggressive predator.  You are being attacked.');
		hunt.cbt(res,'predator');
	}
	else if ((EVO.area.predator-(camo/2))*4+(EVO.area.grazer/4)-camo > fight && EVO.area.grazer > 0){
		css('event-one','You meet a territorial grazer.  You are being attacked.');
		hunt.cbt(res,'grazer');
	}
	if (EVO.area.field > 0){EVO.area.field -= 1;}
}
hunt.cbt =(res,opp)=>{
	EVO.stage[fun.food] -= res;
	updateFood();
	cbt.cbt(res,opp);
}
hunt.busy =()=>{(cbt.check ? hunt.rehunt() : setTimeout(hunt.busy,clock.second));}
hunt.rehunt =(x)=>{
	x = EVO.three.diet;
	if (x == 'carn'){x = EVO.area.grazer*1000;}
	if (x == 'herb'){x = EVO.area.field*100;}
	hunt.timer = setTimeout(hunt, clock.minute*2.5-x);
}
hunt.move =()=>{
	EVO.area.predator = Math.floor(Math.random()*10)+1;
	EVO.area.grazer = Math.floor(Math.random()*(100-(EVO.area.predator*5))+(EVO.area.predator*5)+1);
	EVO.area.field = Math.floor(Math.random()*(1000-(EVO.area.grazer*5))+(EVO.area.grazer*5)+1);
	hunt.pred.timer = setTimeout(hunt.pred,hunt.pred.time());
	hunt.graze.timer = setTimeout(hunt.graze,hunt.graze.time());
}
hunt.pred =(x)=>{
	if (EVO.area.predator + (EVO.area.grazer*4) > hunt.random()){
		let fight = hunt.random();//d100 Roll
		if (EVO.area.grazer < 1){EVO.area.predator -= 1;}//Subtracts a Predator if no Grazers
		if (fight > 90 && EVO.area.predator > 0){EVO.area.predator -= 1;}//10% chance a Predator eliminates a Predator
		if (fight < 61 && EVO.area.grazer > 0){EVO.area.grazer -= 1;}//60% chance a Predator eliminates a Grazer
		if ((EVO.area.predator+1)*10 < EVO.area.grazer){EVO.area.predator += 1;}//Adds a Predator if a lot of Grazers and few Predators
	}
	if (start.check){hunt.pred.timer = setTimeout(hunt.pred,hunt.pred.time());}
}
hunt.pred.time =()=>(clock.minute*10+hunt.terri()-EVO.area.predator*clock.minute);
hunt.graze =(x)=>{
	if (((EVO.area.predator*4) + Math.floor(EVO.area.grazer/4)) > hunt.random()){
		let fight = hunt.random();//d100 Roll
		if (EVO.area.field < 1){EVO.area.grazer -= 1;}//Subtracts a Grazer if no Fields
		if (fight > 95 && EVO.area.predator > 0){EVO.area.predator -=1;}//5% chance a Grazer eliminates a Predator
		if (fight < 31 && EVO.area.grazer > 0){EVO.area.grazer -= 1;}//30% chance a Grazer eliminates a Grazer
		if (EVO.area.field > 0){EVO.area.field -= 1;}//Grazers eliminate a Field
		if ((EVO.area.grazer+1)*10 < EVO.area.field){EVO.area.grazer += 1;}//Adds a Field if a lot of Fields and few Gazers
	}
	if (start.check){hunt.graze.timer = setTimeout(hunt.graze,hunt.graze.time());}
}
hunt.graze.time =()=>(clock.minute*10+hunt.terri()-EVO.area.grazer*clock.second*6);
hunt.terri =()=>((EVO.three.boost == 'terri' ? EVO.combat.defense*clock.second*6 : 0));
hunt.random =()=>(Math.floor(Math.random()*100+1));


const updateFood =()=>{
	foods.update();
	css(fun.food,Math.floor(EVO.stage[fun.food]));
	let clr = ID('evolution').classList;
	(EVO.stage[fun.food] >= math('evolution',EVO.evo.cost) ? clr.replace('green','red') : clr.replace('red','green'));
	if (EVO.three.EPS !== undefined){evolution.stage.data.EPS.color();}
	body.stat.update();
	for (let id in EVO.cross){if (evolution.xcross.data[id].color){evolution.xcross.data[id].color();}}
}

let stage = evolution.stage;
stage.setup =()=>{
	evolution.stage.start();
}
stage.start =()=>{
	let x = true;
	for (let id in EVO.three){
		if (x && body.stat.match(id)){
			cbtstat();
			x = false;
		}
		else if (EVO.size.game > 0){css('size',EVO.size.game);}
		if (evolution.stage.data[id]){
			if (typeof EVO.three[id] === 'object'){css(evolution.stage.data[id].id,EVO.three[id].val);}
			else {css(evolution.stage.data[id].id,EVO.three[id]);}
		}
	}
}
stage.evo =(x,y)=>{
	let diet =(x)=>{
		if (x == 'carn'){y = 'meat';}
		if (x == 'herb'){y = 'plant';}
		if (!ID(y)){
			if (EVO.stage.mineral){
				EVO.stage[y] = EVO.stage.mineral;
				delete EVO.stage.mineral;
				fun.food = y;
				let a = EVO.echo.stage;
				a.splice(a.indexOf('mineral'),1,y);
				css('foodtype',y.charAt(0).toUpperCase() + y.slice(1));
				EVO.echo.develop.push(EVO.three.diet);
				echo('develop','develop');
				ID('hlth').style.display = 'initial';
				css('hlth',EVO.combat.hlth);
				ID('stmn').style.display = 'initial';
				css('stmn',EVO.combat.stmn);
			}
		}
	}
	ID(x).removeAttribute('id');
	let z = x;
	if (x.match(/^(carn|herb)$/)){x = 'diet';}
	if (x.match(/^(endo|exo)$/)){x = 'skeleton';}
	if (x.match(/^(camo|terri|roam|hyper)$/)){x = 'boost';}
	EVO.evo.evolved += evolution.stage.data[x].cost();
	if (!x.match(/^(size|fish)$/) && evolution.stage.data[x] && evolution.stage.data[x].dat){EVO.three[x] = evolution.stage.data[x].dat(z);}
	if (x.match(/^(sex|peristalsis|circular|radial|bilateral)$/)){
		EVO.echo.struc.push(x);
		echo('struc','struc');
	}
	else if (x.match(/^(|)$/)){
		EVO.echo.stage.splice(-1,0,x);
		echo('stagebox','stage');
	}
	else if (x.match(/^(|)$/)){
		let y = EVO.echo.game,
			z = y.indexOf('experience');
		z < 0 ? y.push(x) : y.splice(y,1,x);
		echo('gamebox','game');
	}
	else if (x.match(/^(diet|skeleton|boost)$/)){
		EVO.echo.develop.push(x);
		echo('develop','develop');
	}
	else if (body.stat.match(x)){
		EVO.three.specialized++;
		EVO.echo.body.push(x);
		echo('bodybox','body');
		cbtstat();
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
	else if (x == 'fish'){evolution.stage.data[x].dat();}
	if (EVO.three[x] !== undefined && evolution.stage.data[x]){
		(typeof EVO.three[x] === 'object' ? css(evolution.stage.data[x].id,EVO.three[x].val) : css(evolution.stage.data[x].id,EVO.three[x]));
	}
	evolution();
}
stage.statevo =(x)=>{
	let z = false;
	if (!EVO.three[x]){
		let body = 30+(EVO.three.specialized*10);
		let creation = evolution.creations();
		let special = evolution.stage.data[x].cost();
		let specialize = EVO.two.specialized + EVO.three.specialized;
		if (EVO.three.radial && (specialize == 8 || specialize == 9) && creation >= special && EVO.two.body >= body){z = true;}
		else if ((specialize == 6 || specialize == 7) && creation >= special && EVO.two.body >= body){z = true;}
	}
	return z;
}
stage.data = {
	"sex":{
		"id": 'sex',
		"evo":()=>{if (EVO.two.sex && evolution.creations() >= evolution.stage.data.sex.cost()){evolution.evo.push('sex');}},
		"dat":()=>{
			EVO.evo.cost = (EVO.evo.cost-0.05).toFixed(2);
			return true;
		},
		"cost":()=>(2),
	},
	"peristalsis":{
		"id": 'peristalsis',
		"evo":()=>{if (EVO.two.specialized + EVO.three.specialized > 7 && evolution.creations() >= evolution.stage.data.peristalsis.cost()){evolution.evo.push('peristalsis');}},
		"dat":()=>({"val": 0, "learn": 0}),
		"cost":()=>(3),
	},
	"diet":{
		"id": 'diet',
		"evo":()=>{if (EVO.three.bilateral && evolution.creations() >= evolution.stage.data.diet.cost()){
				evolution.evo.push('carn');
				evolution.evo.push('herb');
			}
		},
		"dat":(x)=>{
			EVO.area = {"predator": 0, "grazer": 0, "field": 0}
			hunt.move();
			hunt.rehunt();
			return x;
		},
		"cost":()=>(10),
	},
	"skeleton":{
		"id": 'skeleton',
		"evo":()=>{if (EVO.three.diet && evolution.creations() >= evolution.stage.data.skeleton.cost()){
				evolution.evo.push('endo');
				evolution.evo.push('exo');
			}
		},
		"dat":(x)=>(x),
		"cost":()=>(10),
	},
	"boost":{
		"id": 'boost',
		"evo":()=>{if (EVO.three.diet && evolution.creations() >= evolution.stage.data.boost.cost()){
				evolution.evo.push('camo');
				evolution.evo.push('terri');
				evolution.evo.push('roam');
				evolution.evo.push('hyper');
			}
		},
		"dat":(x)=>(x),
		"cost":()=>(20),
	},
	//Gate Evolutions
	"circular":{
		"id": 'circular',
		"evo":()=>{if (false){;}},
	},
	"radial":{
		"id": 'radial',
		"evo":()=>{if (EVO.three.circular && EVO.two.specialized+EVO.three.specialized == 8 && body.cell.total() >= 30+(EVO.three.specialized*10) && evolution.creations() >= evolution.stage.data.radial.cost()){evolution.evo.push('radial');}},
		"dat":()=>{
			delete EVO.three.circular;
			ID('structure').removeChild(ID('circular'));
			return true;
		},
		"cost":()=>(EVO.two.specialized * 5),
	},
	"bilateral":{
		"id": 'bilateral',
		"evo":()=>{if (EVO.three.radial && EVO.two.specialized+EVO.three.specialized == 10 && body.cell.total() >= 30+(EVO.three.specialized*10) && evolution.creations() >= evolution.stage.data.bilateral.cost()){evolution.evo.push('bilateral');}},
		"dat":()=>{
			delete EVO.three.radial;
			ID('structure').removeChild(ID('radial'));
			return true;
		},
		"cost":()=>(EVO.two.specialized * 5),
	},
	"fish":{
		"id": 'fish',
		"evo":()=>{if (false){evolution.evo.push('fish');}},
		"dat":()=>{;},
		"cost":()=>(20),
	},
	//Size
	"size":{
		"id": 'size',
		"evo":()=>{
			if (EVO.stage.num > EVO.size.stage && false && evolution.creations() >= evolution.stage.data.size.cost()){
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