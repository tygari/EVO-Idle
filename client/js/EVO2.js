var two = {};
two.HTMLSetup =()=>{
	ID('nutrient').removeAttribute("onclick");
	ID('stat').style.display = 'none';
	ID('hlth').style.display = 'none';
	ID('stmn').style.display = 'none';
	ID('rtrt').style.display = 'none';
	css('foodtype','Nutrient');
	core.body.stat.data();
	core.body.eps();
	if(EVO.combat.talent > 0){
		css('experience',Math.floor(EVO.combat.exp));
		ID('experience').classList.replace('red','purple');
		ID('experience').removeAttribute("onclick");
	}
}
two.InitializeProgram =()=>{
	core.enviro.css();
	core.enviro.bgcolor();
	
}

two.updateFood =()=>{
	core.foods.update();
	css('nutrient',Math.floor(EVO.stage[EVO.stage.ftype]));
	let clr = ID('evolution').classList;
	(EVO.stage[EVO.stage.ftype] >= core.math('evolution',evolution.cost()) ? clr.replace('green','red') : clr.replace('red','green'));
	clr =(x)=>{if (EVO.two[x] !== undefined){evolution.two.data[x].color();}}
	clr('colony');
	clr('EPS');
	clr('rapacious');
	clr('fructose');
	core.body.stat.update();
	for (let id in EVO.cross){if (evolution.xcross.data[id].color){evolution.xcross.data[id].color();}}
}

let stage = evolution.two;
stage.setup =()=>{
	evolution.two.start();
}
stage.start =()=>{
	let x = true;
	for (let id in EVO.two){
		if (x && core.body.stat.match(id)){
			ID('stat').style.display = 'initial';
			ID('rtrt').style.display = 'initial';
			css('rtrt',EVO.combat.rtrt);
			ID('natural').style.visibility = 'initial';
			ID('bodies').style.visibility = 'initial';
			cbtstat();
			x = false;
		}
		else if (EVO.size.game > 0){css('size',EVO.size.game);}
		if (evolution.two.data[id]){
			if (typeof EVO.two[id] === 'object'){css(evolution.two.data[id].id,EVO.two[id].val);}
			else {css(evolution.two.data[id].id,EVO.two[id]);}
		}
	}
	core.body.cell.colony();
}
stage.evo =(x)=>{
	ID(x).removeAttribute('id');
	EVO.evo.evolved += evolution.two.data[x].cost();
	if (!x.match(/^(size|worm)$/) && evolution.two.data[x] && evolution.two.data[x].dat){EVO.two[x] = evolution.two.data[x].dat();}
	if (x.match(/^(sex|adhesion|communication|organization|quorum|biofilm|osmoregulation|motility|generation|specialization|circular|dependency|radial)$/)){
		EVO.echo.struc.push(x);
		echo('struc','struc');
	}
	else if (x.match(/^(|)$/)){
		EVO.echo.stage.splice(-1,0,x);
		echo('stagebox','stage');
	}
	else if (x.match(/^(rapacious|fructose)$/)){
		let y = EVO.echo.game;
		y.indexOf('experience') < 0 ? y.push(x) : y.splice(y,1,x);
		echo('gamebox','game');
	}
	else if (core.body.stat.match(x)){
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
			EVO.timer.heal = clock.minute;
		}
	}
	else if (x == 'size'){
		if (EVO.echo.boost.indexOf('size') < 0){
			ID('boost').style.display = 'initial';
			EVO.echo.boost.push(x);
			echo('boost','boost');
		}
		evolution.two.data.size.dat();
		css('size',EVO.size.game);
	}
	else if (x == 'worm'){evolution.two.data[x].dat();}
	if (EVO.two[x] !== undefined && evolution.two.data[x]){
		(typeof EVO.two[x] === 'object' ? css(evolution.two.data[x].id,EVO.two[x].val) : css(evolution.two.data[x].id,EVO.two[x]));
	}
	EVO.evo.two++;
	two.updateFood();
	evolution();
}
stage.metamo =(x,y)=>{
	let z = evolution.two.data[x].math();
	y *= z;
	if (EVO.stage[EVO.stage.ftype] >= y && core.RNA.RNA() >= z && EVO.one.metabolism.val > EVO.two[x]){
		EVO.stage[EVO.stage.ftype] -= y;
		EVO.one.RNA.sRNA += z;
		EVO.two[x]++;
		css(x,EVO.two[x]);
	}
}
stage.statevo =(x)=>{
	let y = evolution.creations() >= evolution.two.data[x].cost() && EVO.two.body >= 30+(EVO.two.specialized*10),
		z =(a,b)=>(EVO.two.specialized == a || EVO.two.specialized == b);
	return EVO.two.radial && y && z(7,8) ? true
			:EVO.two.dependency && y && z(5,6) ? true
			:EVO.two.circular && y && z(3,4) ? true
			:EVO.two.specialization && y && z(1,2) ? true
			:false;
}
stage.data = {
	//MultiCell Evolutions
	"sex":{
		"id": 'sex',
		"evo":()=>{if (false && EVO.two.body >= 1 && evolution.creations() >= evolution.two.data.sex.cost()){evolution.evo.push('sex');}},
		"dat":()=>{
			EVO.evo.cost = (EVO.evo.cost-0.05).toFixed(2);
			return true;
		},
		"cost":()=>(1),
	},
	"adhesion":{
		"id": 'adhesion',
		"evo":()=>{if (EVO.two.body >= 1 && evolution.creations() >= evolution.two.data.adhesion.cost()){evolution.evo.push('adhesion');}},
		"dat":()=>({"val": 0, "learn": 0}),
		"cost":()=>(1),
	},
	"quorum":{
		"id": 'quorum',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 40 && evolution.creations() >= evolution.two.data.quorum.cost()){evolution.evo.push('quorum');}},
		"dat":()=>{
			core.body.cell.colony(true);
			return true;
		},
		"cost":()=>(3),
	},
	"biofilm":{
		"id": 'biofilm',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 20 && evolution.creations() >= evolution.two.data.biofilm.cost()){evolution.evo.push('biofilm');}},
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
		"evo":()=>{if (EVO.two.organization && EVO.two.body >= 100 && evolution.creations() >= evolution.two.data.generation.cost()){evolution.evo.push('generation');}},
		"dat":()=>{
			EVO.timer.generation = clock.minute*5;
			return {"val": 0, "learn": 0};
		},
		"cost":()=>(4),
	},
	"osmoregulation":{
		"id": 'osmoregulation',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 20 && evolution.creations() >= evolution.two.data.osmoregulation.cost()){evolution.evo.push('osmoregulation');}},
		"dat":()=>({"val": 0, "learn": 0}),
		"cost":()=>(4),
	},
	"motility":{
		"id": 'motility',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 20 && evolution.creations() >= evolution.two.data.motility.cost()){evolution.evo.push('motility');}},
		"dat":()=>({"val": 0, "learn": 0}),
		"cost":()=>(3),
	},
	//Currency
	"colony":{
		"id": 'colony',
		"evo":()=>{if (false){;}},
		"math":(x)=>(core.math('colony',(1.1-(EVO.one.mitosis/2000)).toFixed(4),x)),
		"buy":(x,y,z)=>{
			y = (y > 1 ? 10-(EVO.two.body%10) : 1);
			z = evolution.two.data.colony.math(y);
			if (EVO.stage[EVO.stage.ftype] >= z){
				EVO.stage[EVO.stage.ftype] -= z;
				EVO.two.colony += y;
				EVO.two.body += y;
				if (EVO.two.generation !== undefined){two.generation(y);}
				core.body.cell.colony();
			}
		},
		"color":()=>{
			clr = ID('colony').classList;
			if (EVO.stage[EVO.stage.ftype] >= evolution.two.data.colony.math()){
				clr.replace('green','red');
				let x = (EVO.two.quorum ? 10-(EVO.two.body%10) : 10);
				(EVO.stage[EVO.stage.ftype] >= evolution.two.data.colony.math(x) && x > 1 ? css('colony-x','x'+x) : css('colony-x',''));
			} else {
				clr.replace('red','green');
				css('colony-x','');
			}
		},
		"tip":(x)=>{
			x = (x > 1 ? (EVO.two.quorum ? 10-(EVO.two.body%10) : 10) : 1);
			css('cost-colony',core.math('colony',(1.1-(EVO.one.mitosis/2000)).toFixed(4),x));
		},
	},
	//100 Evolutions
	"rapacious":{
		"id": 'rapacious',
		"evo":()=>{if (EVO.one.metabolism.type == 'aerob' && core.RNA.RNA() > 10 && EVO.one.metabolism.val > clock.metacycle(100) && evolution.creations() >= evolution.two.data.rapacious.cost()){evolution.evo.push('rapacious');}},
		"math":()=>(core.math('rapacious',1.5)),
		"buy":()=>{evolution.two.metamo('rapacious',3);},
		"dat":()=>(0),
		"cost":()=>(12),
		"color":()=>{
			let clr = ID('rapacious').classList;
			let x = evolution.two.data.rapacious.math();
			(EVO.stage[EVO.stage.ftype] >= x*3 && core.RNA.RNA() >= x ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":()=>{
			let x = evolution.two.data.rapacious.math();
			css('cost-rapacious',x);
			css('cost-3-rapacious',x*3);
		},
	},
	"fructose":{
		"id": 'fructose',
		"evo":()=>{if (EVO.one.metabolism.type == 'photo' && core.RNA.RNA() > 10 && EVO.one.metabolism.val > clock.metacycle(100) && evolution.creations() >= evolution.two.data.fructose.cost()){evolution.evo.push('fructose');}},
		"math":()=>(core.math('fructose',1.5)),
		"buy":(x)=>{evolution.two.metamo(x,3);},
		"dat":()=>(0),
		"cost":()=>(12),
		"color":()=>{
			let clr = ID('fructose').classList;
			let x = evolution.two.data.fructose.math();
			(EVO.stage[EVO.stage.ftype] >= x*3 && core.RNA.RNA() >= x ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":()=>{
			let x = evolution.two.data.fructose.math();
			css('cost-fructose',x);
			css('cost-3-fructose',x*3);
		},
	},
	//Gate Evolutions
	"communication":{
		"id": 'communication',
		"evo":()=>{if (EVO.two.adhesion && EVO.two.body >= 10 && evolution.creations() >= evolution.two.data.communication.cost()){evolution.evo.push('communication');}},
		"dat":()=>(true),
		"cost":()=>(1),
	},
	"organization":{
		"id": 'organization',
		"evo":()=>{if (EVO.two.communication && EVO.two.body >= 20 && evolution.creations() >= evolution.two.data.organization.cost()){evolution.evo.push('organization');}},
		"dat":()=>(true),
		"cost":()=>(2),
	},
	"specialization":{
		"id": 'specialization',
		"evo":()=>{if (EVO.two.organization && EVO.two.body >= 30 && evolution.creations() >= evolution.two.data.specialization.cost()){evolution.evo.push('specialization');}},
		"dat":()=>(true),
		"cost":()=>(2),
	},
	"circular":{
		"id": 'circular',
		"evo":()=>{if (EVO.two.specialized == 3 && core.body.cell.total() >= 30+(EVO.two.specialized*10) && evolution.creations() >= evolution.two.data.circular.cost()){evolution.evo.push('circular');}},
		"dat":()=>(true),
		"cost":()=>(core.body.stat.evocost()),
	},
	"dependency":{
		"id": 'dependency',
		"evo":()=>{if (EVO.two.circular && EVO.two.specialized == 5 && core.body.cell.total() >= 30+(EVO.two.specialized*10) && evolution.creations() >= evolution.two.data.dependency.cost()){evolution.evo.push('dependency');}},
		"dat":()=>(true),
		"cost":()=>(core.body.stat.evocost()),
	},
	"radial":{
		"id": 'radial',
		"evo":()=>{if (EVO.two.dependency && EVO.two.specialized == 7 && core.body.cell.total() >= 30+(EVO.two.specialized*10) && evolution.creations() >= evolution.two.data.radial.cost()){evolution.evo.push('radial');}},
		"dat":()=>{
			let a = EVO.echo.struc;
			a.splice(a.indexOf('circular'),1,'radial');
			return true;
		},
		"cost":()=>(core.body.stat.evocost()),
	},
	"worm":{
		"id": 'worm',
		"evo":()=>{if (false && EVO.two.dependency && EVO.two.quorum && evolution.creations() >= evolution.two.data.worm.cost()){evolution.evo.push('worm');}},
		"dat":()=>{
			core.timer.pause = false;
			EVO.stage.num++;
			EVO.stage.wrd = 'three';
			EVO.stage.ftype = 'mineral';
			EVO.stage.food = EVO.stage.food/2;
			EVO.stage.mineral = EVO.stage[EVO.stage.ftype]/2;
			delete EVO.stage[EVO.stage.ftype];
			delete EVO.timer.cell;
			EVO.stage.mtype = 'peristalsis';
			EVO.size.stage = 0;
			EVO.echo.stage = ['mineral','evolution'];
			if (EVO.echo.boost.indexOf('size') > -1){EVO.echo.stage.splice(-1,0,'EPS')};
			EVO.echo.game = ['experience'];
			EVO.echo.develop.push('cells');
			EVO.three = {"huntcycle": 0,"specialized": 1,};
			EVO.combat.hlth = 100;
			EVO.combat.stmn = 100;
			for (let id in EVO.two){
				if (core.body.stat.match(id)){EVO.three[id] = 0;}//Adds evolved stage two stats to stage three evolutions
				if (id.match(/^(circular|radial)$/)){
					EVO.three[id] = true;
					delete EVO.two[id];
				}
				if (id = 'EPS'){
					EVO.three.EPS = EVO.two.EPS;
					delete EVO.two.EPS;
				}
			}
			save.set(`EVO`);
			location.reload(true);
		},
		"cost":()=>(25),
	},
	//Size
	"size":{
		"id": 'size',
		"evo":()=>{
			if (EVO.stage.num > EVO.size.stage && EVO.two.body >= (EVO.size.stage+1)*200 && evolution.creations() >= evolution.two.data.size.cost()){
				css('size1',evolution.two.data.size.cost());
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

two.generation =(z)=>{
	EVO.two.generation.learn += z*core.body.stat.mul('nerve',1);
	if (EVO.two.generation.learn >= (EVO.two.generation.val+1)*10 && EVO.two.generation.val < 100){
		EVO.two.generation.val++;
		EVO.two.generation.learn -= EVO.two.generation.val*10;
		css('generation',EVO.two.generation.val);
	}
}