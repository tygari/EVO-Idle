var three = {};
three.HTMLSetup =()=>{
	if (EVO.three.diet){
		if (EVO.three.diet == 'carn'){EVO.stage.ftype = 'meat';}
		if (EVO.three.diet == 'herb'){EVO.stage.ftype = 'plant';}
	}
	ID(EVO.stage.ftype).removeAttribute("onclick");
	ID('natural').style.visibility = 'initial';
	ID('bodies').style.visibility = 'initial';
	ID('hlth').style.display = 'none';
	ID('stmn').style.display = 'none';
	ID('rtrt').style.display = 'initial';
	css('foodtype',EVO.stage.ftype);
	css('body',EVO.two.body);
	core.body.stat.data();
	core.body.eps();
	if(EVO.combat.talent > 0){
		css('experience',Math.floor(EVO.combat.exp));
		ID('experience').classList.replace('red','purple');
		ID('experience').removeAttribute("onclick");
	}
}
three.InitializeProgram =()=>{
	if (ID("basic")){ID("basic").id = EVO.one.metabolism.type;}
	core.enviro.css();
	css('EPS',EVO.three.EPS);
	css('rtrt',EVO.combat.rtrt);
	core.enviro.bgcolor();
	if (EVO.three.diet){
		hunt.rehunt();
		hunt.pred.timer = setTimeout(hunt.pred,hunt.pred.time());
		hunt.graze.timer = setTimeout(hunt.graze,hunt.graze.time());
	}
	css('protein',EVO.protein.whole);
}

const hunt =()=>{
	if (cbt.check){
		if (EVO.stage.food < 1 && EVO.three.diet && EVO.combat.hp >= Math.floor(EVO.combat.hlth*EVO.combat.mhp/100) && EVO.combat.sp >= Math.floor(EVO.combat.spcl*EVO.combat.msp/100)){
			ID('event').style.display = 'initial';
			hunt[EVO.three.diet](move.cost(),hunt.random(),(EVO.three.boost == 'camo' ? EVO.combat.offense : 0));
			EVO.three.huntcycle += core.body.stat.mul('nerve',1);
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
	EVO.stage[EVO.stage.ftype] -= res;
	three.updateFood();
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
	if (core.start.check){hunt.pred.timer = setTimeout(hunt.pred,hunt.pred.time());}
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
	if (core.start.check){hunt.graze.timer = setTimeout(hunt.graze,hunt.graze.time());}
}
hunt.graze.time =()=>(clock.minute*10+hunt.terri()-EVO.area.grazer*clock.second*6);
hunt.terri =()=>((EVO.three.boost == 'terri' ? EVO.combat.defense*clock.second*6 : 0));
hunt.random =()=>(Math.floor(Math.random()*100+1));


three.updateFood =()=>{
	core.foods.update();
	css(EVO.stage.ftype,Math.floor(EVO.stage[EVO.stage.ftype]));
	let clr = ID('evolution').classList;
	(EVO.stage[EVO.stage.ftype] >= core.math('evolution',evolution.cost()) ? clr.replace('green','red') : clr.replace('red','green'));
	if (EVO.three.EPS !== undefined){evolution.three.data.EPS.color();}
	core.body.stat.update();
	for (let id in EVO.cross){if (evolution.xcross.data[id].color){evolution.xcross.data[id].color();}}
}

let stage = evolution.three;
stage.setup =()=>{
	evolution.three.start();
}
stage.start =()=>{
	let x = true;
	for (let id in EVO.three){
		if (x && core.body.stat.match(id)){
			cbtstat();
			x = false;
		}
		else if (EVO.size.game > 0){css('size',EVO.size.game);}
		if (evolution.three.data[id]){
			if (typeof EVO.three[id] === 'object'){css(evolution.three.data[id].id,EVO.three[id].val);}
			else {css(evolution.three.data[id].id,EVO.three[id]);}
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
				EVO.stage.ftype = y;
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
	EVO.evo.evolved += evolution.three.data[x].cost();
	if (!x.match(/^(size|fish)$/) && evolution.three.data[x] && evolution.three.data[x].dat){EVO.three[x] = evolution.three.data[x].dat(z);}
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
	else if (core.body.stat.match(x)){
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
		evolution.three.data.size.dat();
		css('size',EVO.size.game);
	}
	else if (x == 'fish'){evolution.three.data[x].dat();}
	if (EVO.three[x] !== undefined && evolution.three.data[x]){
		(typeof EVO.three[x] === 'object' ? css(evolution.three.data[x].id,EVO.three[x].val) : css(evolution.three.data[x].id,EVO.three[x]));
	}
	evolution();
}
stage.statevo =(x)=>{
	let z = false;
	if (!EVO.three[x]){
		let body = 30+(EVO.three.specialized*10);
		let creation = evolution.creations();
		let special = evolution.three.data[x].cost();
		let specialize = EVO.two.specialized + EVO.three.specialized;
		if (EVO.three.radial && (specialize == 8 || specialize == 9) && creation >= special && EVO.two.body >= body){z = true;}
		else if ((specialize == 6 || specialize == 7) && creation >= special && EVO.two.body >= body){z = true;}
	}
	return z;
}
stage.data = {
	"sex":{
		"id": 'sex',
		"evo":()=>{if (false && EVO.two.sex && evolution.creations() >= evolution.three.data.sex.cost()){evolution.evo.push('sex');}},
		"dat":()=>{
			EVO.evo.cost = (EVO.evo.cost-0.05).toFixed(2);
			return true;
		},
		"cost":()=>(2),
	},
	"peristalsis":{
		"id": 'peristalsis',
		"evo":()=>{if (EVO.two.specialized + EVO.three.specialized > 7 && evolution.creations() >= evolution.three.data.peristalsis.cost()){evolution.evo.push('peristalsis');}},
		"dat":()=>({"val": 0, "learn": 0}),
		"cost":()=>(3),
	},
	"diet":{
		"id": 'diet',
		"evo":()=>{if (EVO.three.bilateral && evolution.creations() >= evolution.three.data.diet.cost()){
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
		"evo":()=>{if (EVO.three.diet && evolution.creations() >= evolution.three.data.skeleton.cost()){
				evolution.evo.push('endo');
				evolution.evo.push('exo');
			}
		},
		"dat":(x)=>(x),
		"cost":()=>(10),
	},
	"boost":{
		"id": 'boost',
		"evo":()=>{if (EVO.three.diet && evolution.creations() >= evolution.three.data.boost.cost()){
				evolution.evo.push('camo');
				evolution.evo.push('terri');
				evolution.evo.push('roam');
				evolution.evo.push('hyper');
			}
		},
		"dat":(x)=>{
			if (x == 'roam'){EVO.timer.roam = clock.hour-EVO.combat.speed*10000;}
			return x
		},
		"cost":()=>(20),
	},
	//Gate Evolutions
	"circular":{
		"id": 'circular',
		"evo":()=>{if (false){;}},
	},
	"radial":{
		"id": 'radial',
		"evo":()=>{if (EVO.three.circular && EVO.two.specialized+EVO.three.specialized == 8 && core.body.cell.total() >= 30+(EVO.three.specialized*10) && evolution.creations() >= evolution.three.data.radial.cost()){evolution.evo.push('radial');}},
		"dat":()=>{
			delete EVO.three.circular;
			ID('structure').removeChild(ID('circular'));
			return true;
		},
		"cost":()=>(EVO.two.specialized * 5),
	},
	"bilateral":{
		"id": 'bilateral',
		"evo":()=>{if (EVO.three.radial && EVO.two.specialized+EVO.three.specialized == 10 && core.body.cell.total() >= 30+(EVO.three.specialized*10) && evolution.creations() >= evolution.three.data.bilateral.cost()){evolution.evo.push('bilateral');}},
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
			if (EVO.stage.num > EVO.size.stage && false && evolution.creations() >= evolution.three.data.size.cost()){
				css('size1',evolution.three.data.size.cost());
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