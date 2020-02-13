var one = {};
one.HTMLSetup =()=>{
	ID('stat').style.display = 'none';
	ID('hlth').style.display = 'none';
	ID('stmn').style.display = 'none';
	ID('rtrt').style.display = 'none';
	css('foodtype','ATP');
}
one.InitializeProgram =()=>{}

one.updateFood =()=>{
	core.foods.update();
	css('ATP',Math.floor(EVO.stage[EVO.stage.ftype]));
	let clr = ID('evolution').classList;
	(EVO.stage[EVO.stage.ftype] >= core.math('evolution',evolution.cost()) ? clr.replace('green','red') : clr.replace('red','green'));
	clr =(x)=>{if (EVO.one[x] !== undefined){evolution.one.data[x].color();}}
	clr('cytoplasm');
	clr('mitosis');
	clr('cilia');
	clr('flagellum');
	clr('RNA');
	clr('metabolism');
	clr('ribosome');
	clr('voracious');
	clr('glucose');
	clr('DNA');
	clr('mitochondria');
	clr('endoplasmic');
	clr('golgi');
	for (let id in EVO.cross){if (evolution.xcross.data[id].color){evolution.xcross.data[id].color();}}
}

let stage = evolution.one;
stage.setup =()=>{evolution.one.start();}
stage.start =()=>{
	for (let id in EVO.one){
		if (EVO.size.game > 0){css('size',EVO.size.game);}
		if (evolution.one.data[id]){
			typeof EVO.one[id] === 'object'?
				id == 'ribosome'?css(id,core.ribosome.add())
				:id == 'mitosis'?evolution.one.data.mitosis.css()
				:id == 'RNA'?css(id,core.RNA.RNA())
				:id == 'DNA'?css(id,evolution.one.data.DNA.calc())
				:css(evolution.one.data[id].id,EVO.one[id].val)
			:css(evolution.one.data[id].id,EVO.one[id]);
		}
	}
}
stage.evo =(x)=>{
	ID(x).removeAttribute('id');
	let z = x;
	if (x.match(/^(aerob|photo)$/)){x = 'metabolism';}
	EVO.evo.evolved += evolution.one.data[x].cost();
	if (!x.match(/^(size|multicelluar)$/) && evolution.one.data[x] && evolution.one.data[x].dat){EVO.one[x] = evolution.one.data[x].dat(z);}
	if (x.match(/^(bubble|doublebubble|phospholipid|cellwall|cytoskeleton|nucleus)$/)){
		if (x.match(/^(bubble|doublebubble|phospholipid|cellwall)$/)){
			EVO.one.membraneScore++;
			let a = EVO.echo.struc,
				b = ['bubble','doublebubble','phospholipid','cellwall'];
			a.splice(a.indexOf(b[EVO.one.membraneScore-1]||'bubbleless'),1,b[EVO.one.membraneScore]);
		}
		else {EVO.echo.struc.push(x);}
		echo('struc','struc');
	}
	else if (x.match(/^(RNA|DNA)$/)){
		EVO.echo.stage.splice(-1,0,x);
		echo('stagebox','stage');
	}
	else if (x.match(/^(mitosis|cytoplasm|cilia|flagellum|ribosome|metabolism|voracious|glucose|mitochondria|endoplasmic|golgi)$/)){
		EVO.echo.game.push(x);
		echo('gamebox','game');
	}
	else if (x == 'size'){
		if (EVO.echo.boost.indexOf('size') < 0){
			ID('boost').style.display = 'initial';
			EVO.echo.boost.push(x);
			echo('boost','boost');
		}
		evolution.one.data.size.dat();
		css('size',EVO.size.game);
	}
	else if (x == 'multicelluar'){evolution.one.data[x].dat();}
	if (EVO.one[x] !== undefined && evolution.one.data[x]){
		(typeof EVO.one[x] === 'object' ? css(evolution.one.data[x].id,EVO.one[x].val) : css(evolution.one.data[x].id,EVO.one[x]));
	}
	EVO.evo.one++;
	one.updateFood();
	evolution();
}
stage.thousand =(x,y)=>{
	y = (y > 1 ? 10-(EVO.one[x]%10) : 1);
	let z = evolution.one.data[x].math(y);
	if (EVO.stage[EVO.stage.ftype] >= z && (EVO.one[x] < 1000 || EVO.one[x].val < 1000)){
		EVO.stage[EVO.stage.ftype] -= z;
		EVO.one[x] += y;
		css(x,EVO.one[x]);
	}
}
stage.metamo =(x,y)=>{
	let z = evolution.one.data[x].math();
	y *= z
	if (EVO.stage[EVO.stage.ftype] >= y && core.RNA.RNA() >= z && EVO.one.metabolism.val > EVO.one[x]){
		EVO.stage[EVO.stage.ftype] -= y;
		EVO.one.RNA.sRNA += z;
		EVO.one[x]++;
		css(x,EVO.one[x]);
		css('RNA',core.RNA.RNA());
	}
}
stage.protein =(x)=>{
	z = evolution.one.data[x].math();
	if (EVO.stage[EVO.stage.ftype] >= z*3 && core.RNA.RNA() >= z && EVO.one[x] < 100 && core.ribosome.add() > EVO.one[x]){
		EVO.stage[EVO.stage.ftype] -= z*3;
		EVO.one.RNA.sRNA += z;
		EVO.one[x]++;
		EVO.one.ribosome.bonus -= EVO.one[x];
		css(x,EVO.one[x]);
		css('RNA',core.RNA.RNA());
		css('ribosome',EVO.one.ribosome.val+EVO.one.ribosome.bonus);
	}
}
stage.data = {
	//Membranes
	"bubble":{
		"id": 'bubble',
		"evo":()=>{if(EVO.one.metabolism.type == 'none'){evolution.evo.push('bubble');}},
		"cost":()=>{
			EVO.one.membraneScore = -1;
			EVO.one.metabolism.type = 'basic';
			EVO.echo.develop.push('basic');
			echo('develop','develop');
			delete EVO.timer.leak;
			return 0;
		},
	},
	"doublebubble":{
		"id": 'doublebubble',
		"evo":()=>{if (EVO.one.membraneScore == 0 && evolution.creations() >= evolution.one.data.doublebubble.cost()){evolution.evo.push('doublebubble');}},
		"cost":()=>(1),
	},
	"phospholipid":{
		"id": 'phospholipid',
		"evo":()=>{if (EVO.one.membraneScore == 1 && evolution.creations() >= evolution.one.data.phospholipid.cost()){evolution.evo.push('phospholipid');}},
		"cost":()=>(2),
	},
	"cellwall":{
		"id": 'cellwall',
		"evo":()=>{if (EVO.one.membraneScore == 2 && EVO.one.cytoskeleton && evolution.creations() >= evolution.one.data.cellwall.cost()){evolution.evo.push('cellwall');}},
		"cost":()=>(8),
	},
	//Currency
	"RNA":{
		"id": 'RNA',
		"evo":()=>{if (EVO.one.metabolism.type == 'basic' && evolution.creations() >= evolution.one.data.RNA.cost()){evolution.evo.push('RNA');}},
		"math":(x)=>(core.math('RNA',core.RNA.cost,x)),
		"buy":(x,y,z)=>{
			y = (y > 1 ? 10-(core.RNA.RNA()%10) : 1);
			z = evolution.one.data.RNA.math(y);
			if(EVO.stage[EVO.stage.ftype] >= z){
				EVO.stage[EVO.stage.ftype] -= z;
				EVO.one.RNA.val += y;
				css('RNA',core.RNA.RNA());
			}
		},
		"dat":()=>({"val": 0, "sRNA": 0, "rRNA": 0, "tRNA": 0,}),
		"cost":()=>(2),
		"color":()=>{
			let clr = ID('RNA').classList;
			if(EVO.stage[EVO.stage.ftype] >= evolution.one.data.RNA.math()){
				clr.replace('green','red');
				let x = 10-(core.RNA.RNA()%10);
				(EVO.stage[EVO.stage.ftype] >= evolution.one.data.RNA.math(x) && x > 1 ? css('RNA-x','x'+x) : css('RNA-x',''));
			} else {
				clr.replace('red','green');
				css('RNA-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-(core.RNA.RNA()%10);}
			css('cost-RNA',evolution.one.data.RNA.math(x));
		},
	},
	"DNA":{
		"id": 'DNA',
		"evo":()=>{if (EVO.one.membraneScore > 1 && EVO.one.RNA && core.RNA.RNA() > 10 && evolution.creations() >= evolution.one.data.DNA.cost()){evolution.evo.push('DNA');}},
		"math":(x)=>(core.math('DNA',core.RNA.cost,x)),
		"buy":(x,y,z)=>{
			y = (y > 1 ? 10-(evolution.one.data.DNA.calc()%10) : 1);
			z = evolution.one.data.DNA.math(y);
			if(core.RNA.RNA() >= z){
				EVO.one.RNA.sRNA += z;
				EVO.one.DNA.val += y;
				css('RNA',core.RNA.RNA());
				css('DNA',evolution.one.data.DNA.calc());
			}
		},
		"dat":()=>({"val": 0, "sDNA": 0, "rDNA": 0, "tDNA": 0,}),
		"cost":()=>(6),
		"color":()=>{
			let clr = ID('DNA').classList;
			if(core.RNA.RNA() >= evolution.one.data.DNA.math()){
				clr.replace('green','red');
				let x = 10-(evolution.one.data.DNA.calc()%10);
				(core.RNA.RNA() >= evolution.one.data.DNA.math(x) && x > 1 ? css('DNA-x','x'+x) : css('DNA-x',''));
			} else {
				clr.replace('red','green');
				css('DNA-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-(evolution.one.data.DNA.calc()%10);}
			css('cost-DNA',evolution.one.data.DNA.math(x));
		},
		"calc":()=>(EVO.one.DNA.val - EVO.one.DNA.sDNA),
	},
	//1k Evolutions
	"mitosis":{
		"id": 'mitosis',
		"evo":()=>{if (EVO.one.RNA && EVO.one.membraneScore > 1 && evolution.creations() >= evolution.one.data.mitosis.cost()){evolution.evo.push('mitosis');}},
		"math":()=>(core.math('mitosis',1.1)),
		"con":()=>(core.RNA.RNA() > EVO.one.mitosis.val*3 && EVO.stage[EVO.stage.ftype] >= evolution.one.data.mitosis.math() && EVO.one.mitosis.val < 1000),
		"buy":()=>{
			if (evolution.one.data.mitosis.con()){
				EVO.stage[EVO.stage.ftype] -= evolution.one.data.mitosis.math();
				EVO.one.mitosis.val += 1;
				evolution.one.data.mitosis.css();
				EVO.one.RNA.rRNA += Math.floor(EVO.one.mitosis.val/25);
				css('RNA',core.RNA.RNA());
				one.evoChance();
			}
		},
		"dat":()=>({"val": 0, "chance": 0, "learn": 0, "limit": 0,}),
		"cost":()=>(3),
		"color":()=>{
			let clr = ID('mitosis').classList;
			(evolution.one.data.mitosis.con() ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			if (x > 1){x = 10-EVO.one.mitosis%10;}
			css('cost-mitosis',evolution.one.data.mitosis.math());
		},
		"css":()=>{
			css('mitosis-chance',EVO.one.mitosis.chance);
			css('mitosis',EVO.one.mitosis.val*3);
		},
	},
	"cytoplasm":{
		"id": 'cytoplasm',
		"evo":()=>{if (EVO.one.membraneScore > 0 && evolution.creations() >= evolution.one.data.cytoplasm.cost()){evolution.evo.push('cytoplasm');}},
		"math":(x)=>(core.math('cytoplasm',1.1,x)),
		"buy":(x,y)=>{evolution.one.thousand(x,y);},
		"dat":()=>(0),
		"cost":()=>(1),
		"color":()=>{
			let clr = ID('cytoplasm').classList;
			if(EVO.stage[EVO.stage.ftype] >= evolution.one.data.cytoplasm.math()){
				clr.replace('green','red');
				let x = 10-(EVO.one.cytoplasm%10);
				(EVO.stage[EVO.stage.ftype] >= evolution.one.data.cytoplasm.math(x) && x > 1 ? css('cytoplasm-x','x'+x) : css('cytoplasm-x',''));
			} else {
				clr.replace('red','green');
				css('cytoplasm-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-EVO.one.cytoplasm%10;}
			css('cost-cytoplasm',evolution.one.data.cytoplasm.math(x));
		},
	},
	"cilia":{
		"id": 'cilia',
		"evo":()=>{if (EVO.one.cytoskeleton && EVO.one.membraneScore > 1 && evolution.creations() >= evolution.one.data.cilia.cost()){evolution.evo.push('cilia');}},
		"math":(x)=>(core.math('cilia',1.1,x)),
		"buy":(x,y)=>{evolution.one.thousand(x,y);},
		"dat":()=>(0),
		"cost":()=>(3),
		"color":()=>{
			let clr = ID('cilia').classList;
			if(EVO.stage[EVO.stage.ftype] >= evolution.one.data.cilia.math()){
				clr.replace('green','red');
				let x = 10-(EVO.one.cilia%10);
				(EVO.stage[EVO.stage.ftype] >= evolution.one.data.cilia.math(x) && x > 1 ? css('cilia-x','x'+x) : css('cilia-x',''));
			} else {
				clr.replace('red','green');
				css('cilia-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-EVO.one.cilia%10;}
			css('cost-cilia',evolution.one.data.cilia.math(x));
		},
	},
	"flagellum":{
		"id": 'flagellum',
		"evo":()=>{if (EVO.one.cytoskeleton && EVO.one.membraneScore > 1 && evolution.creations() >= evolution.one.data.flagellum.cost()){evolution.evo.push('flagellum');}},
		"math":(x)=>(core.math('flagellum',1.1,x)),
		"buy":(x,y)=>{evolution.one.thousand(x,y);},
		"dat":()=>(0),
		"cost":()=>(3),
		"color":()=>{
			let clr = ID('flagellum').classList;
			if(EVO.stage[EVO.stage.ftype] >= evolution.one.data.flagellum.math()){
				clr.replace('green','red');
				let x = 10-(EVO.one.flagellum%10);
				(EVO.stage[EVO.stage.ftype] >= evolution.one.data.flagellum.math(x) && x > 1 ? css('flagellum-x','x'+x) : css('flagellum-x',''));
			} else {
				clr.replace('red','green');
				css('flagellum-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-EVO.one.flagellum%10;}
			css('cost-flagellum',evolution.one.data.flagellum.math(x));
		},
	},
	"ribosome":{
		"id": 'ribosome',
		"evo":()=>{if (EVO.one.RNA && core.RNA.RNA() > 199 && evolution.creations() >= evolution.one.data.ribosome.cost()){evolution.evo.push('ribosome');}},
		"math":()=>(core.math('ribosome',1.5)),
		"con":()=>{
			x = evolution.one.data.ribosome.math();
			return EVO.stage[EVO.stage.ftype] >= x*3 && core.RNA.RNA() >= x && EVO.one.ribosome.val < 1000;
		},
		"buy":()=>{
			x = evolution.one.data.ribosome.math();
			if (evolution.one.data.ribosome.con()){
				EVO.stage[EVO.stage.ftype] -= x*3;
				EVO.one.RNA.sRNA += x;
				EVO.one.ribosome.val++;
				css('ribosome',EVO.one.ribosome.val+EVO.one.ribosome.bonus);
				css('RNA',core.RNA.RNA());
			}
		},
		"dat":()=>{
			ID('natural').style.visibility = 'initial';
			ID('exotics').style.visibility = 'initial';
			css('protein',EVO.protein.whole);
			EVO.one.RNA.sRNA += 200;
			css('RNA',core.RNA.RNA());
			EVO.timer.RNA = clock.minute*5;
			EVO.timer.ribosome = clock.hour;
			EVO.timer.protein = clock.minute*5;
			return {"val": 0, "bonus": 0, "partial": 0,};
		},
		"cost":()=>(5),
		"color":(x)=>{
			let clr = ID('ribosome').classList;
			(evolution.one.data.ribosome.con() ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.one.data.ribosome.math();
			css('cost-ribosome',x);
			css('cost-3-ribosome',x*3);
		},
	},
	//100 Evolutions
	"metabolism":{
		"id": 'metabolism',
		"evo":()=>{if (!EVO.one.metabolism.val && EVO.one.RNA && ID('basic') && EVO.one.RNA.val > 9 && evolution.creations() >= evolution.one.data.metabolism.cost()){
				evolution.evo.push('aerob');
				evolution.evo.push('photo');
			}
		},
		"math":()=>(core.math('metabolism',1.5)),
		"con":()=>(core.RNA.RNA() >= evolution.one.data.metabolism.math() && EVO.one.metabolism.val < 100),
		"buy":()=>{
			if (evolution.one.data.metabolism.con()){
				EVO.one.RNA.sRNA += evolution.one.data.metabolism.math();
				EVO.one.metabolism.val++;
				css('metabolism',EVO.one.metabolism.val);
				css('RNA',core.RNA.RNA());
			}
		},
		"dat":(x)=>{
			let a = EVO.echo.develop;
			a.splice(a.indexOf('basic'),1,x);
			echo('develop','develop');
			if (x == 'photo'){EVO.timer[x] = 0;}
			return {"val": 0, "type": x,};
		},
		"cost":()=>(4),
		"color":()=>{
			if(ID('metabolism')){
				let clr = ID('metabolism').classList;
				(evolution.one.data.metabolism.con() ? clr.replace('green','red') : clr.replace('red','green'));
			}
		},
		"tip":()=>{css('cost-metabolism',evolution.one.data.metabolism.math());},
	},
	"aerob":{"evo":()=>{if (false){}}},
	"photo":{"evo":()=>{if (false){}}},
	"mitochondria":{
		"id": 'mitochondria',
		"evo":()=>{if (EVO.one.DNA && EVO.one.metabolism.type !== 'basic' && evolution.creations() >= evolution.one.data.mitochondria.cost()){evolution.evo.push('mitochondria');}},
		"math":()=>(core.math('mitochondria',1.5)),
		"buy":()=>{
			x = evolution.one.data.mitochondria.math();
			if (evolution.one.data.DNA.calc() >= x){
				EVO.one.DNA.sDNA += x;
				EVO.one.mitochondria++;
				css('mitochondria',EVO.one.mitochondria);
				css('DNA',evolution.one.data.DNA.calc());
			}
		},
		"dat":()=>(0),
		"cost":()=>(7),
		"color":()=>{
			let clr = ID('mitochondria').classList;
			(evolution.one.data.DNA.calc() >= evolution.one.data.mitochondria.math() ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":()=>{css('cost-mitochondria',evolution.one.data.mitochondria.math());},
	},
	"voracious":{
		"id": 'voracious',
		"evo":()=>{if (EVO.one.metabolism.val && EVO.one.metabolism.type == 'aerob' && EVO.one.metabolism.val > clock.metacycle(25) && evolution.creations() >= evolution.one.data.voracious.cost()){evolution.evo.push('voracious');}},
		"math":()=>(core.math('voracious',1.5)),
		"buy":()=>{evolution.one.metamo('voracious',3);},
		"dat":()=>(0),
		"cost":()=>(8),
		"color":(x)=>{
			let clr = ID('voracious').classList;
			x = evolution.one.data.voracious.math();
			(EVO.stage[EVO.stage.ftype] >= x*3 && core.RNA.RNA() >= x ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.one.data.voracious.math();
			css('cost-voracious',x);
			css('cost-3-voracious',x*3);
		},
	},
	"glucose":{
		"id": 'glucose',
		"evo":()=>{if (EVO.one.metabolism.val && EVO.one.metabolism.type == 'photo' && EVO.one.metabolism.val > clock.metacycle(25) && evolution.creations() >= evolution.one.data.glucose.cost()){evolution.evo.push('glucose');}},
		"math":()=>(core.math('glucose',1.5)),
		"buy":()=>{evolution.one.metamo('glucose',3);},
		"dat":()=>(0),
		"cost":()=>(8),
		"color":(x)=>{
			let clr = ID('glucose').classList;
			x = evolution.one.data.glucose.math();
			(EVO.stage[EVO.stage.ftype] >= x*3 && core.RNA.RNA() >= x ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.one.data.glucose.math();
			css('cost-glucose',x);
			css('cost-3-glucose',x*3);
		},
	},
	"endoplasmic":{
		"id": 'endoplasmic',
		"evo":()=>{if (EVO.one.ribosome && EVO.one.nucleus && evolution.creations() >= evolution.one.data.endoplasmic.cost()){evolution.evo.push('endoplasmic');}},
		"math":()=>(core.math('endoplasmic',1.5)),
		"buy":()=>{evolution.one.protein('endoplasmic');},
		"dat":()=>(0),
		"cost":()=>(9),
		"color":(x)=>{
			let clr = ID('endoplasmic').classList;
			x = evolution.one.data.endoplasmic.math();
			(EVO.stage[EVO.stage.ftype] >= x*3 && core.RNA.RNA() >= x && core.ribosome.add() > EVO.one.endoplasmic ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.one.data.endoplasmic.math();
			css('cost-endoplasmic',x);
			css('cost-3-endoplasmic',x*3);
			css('cost-ribo-endoplasmic',EVO.one.endoplasmic+1);
		},
	},
	"golgi":{
		"id": 'golgi',
		"evo":()=>{if (EVO.one.endoplasmic && evolution.creations() >= evolution.one.data.golgi.cost()){evolution.evo.push('golgi');}},
		"math":()=>(core.math('golgi',1.5)),
		"buy":()=>{evolution.one.protein('golgi');},
		"dat":()=>(0),
		"cost":()=>(10),
		"color":(x)=>{
			let clr = ID('golgi').classList;
			x = evolution.one.data.golgi.math();
			(EVO.stage[EVO.stage.ftype] >= x*3 && core.RNA.RNA() >= x && core.ribosome.add() > EVO.one.golgi ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.one.data.golgi.math();
			css('cost-golgi',x);
			css('cost-3-golgi',x*3);
			css('cost-ribo-golgi',EVO.one.golgi+1);
		},
	},
	//Gate Evolutions
	"cytoskeleton":{
		"id": 'cytoskeleton',
		"evo":()=>{if (EVO.one.membraneScore > 0 && evolution.creations() >= evolution.one.data.cytoskeleton.cost()){evolution.evo.push('cytoskeleton');}},
		"dat":()=>(true),
		"cost":()=>(2),
	},
	"nucleus":{
		"id": 'nucleus',
		"evo":()=>{if (false && EVO.one.mitochondria && evolution.creations() >= evolution.one.data.nucleus.cost()){evolution.evo.push('nucleus');}},
		"dat":()=>(true),
		"cost":()=>(6),
	},
	"multicelluar":{
		"id": 'multicelluar',
		"evo":()=>{if (EVO.one.metabolism.val && EVO.one.mitosis && evolution.creations() >= evolution.one.data.multicelluar.cost() && EVO.stage[EVO.stage.ftype]/2 > 10000){evolution.evo.push('multicelluar');}},
		"dat":()=>{
			core.timer.pause = false;
			EVO.stage.num++;
			EVO.stage.wrd = 'two';
			EVO.stage.ftype = 'nutrient';
			EVO.stage.food = EVO.stage.food/2;
			EVO.stage.nutrient = EVO.stage.atp/2;
			delete EVO.stage.atp;
			EVO.timer.cell = 0;
			EVO.stage.mtype = 'motility';
			EVO.one.mitosis = EVO.one.mitosis.val;
			EVO.size.stage = 0;
			EVO.echo.stage = ['nutrient','colony','evolution'];
			EVO.echo.game = [];
			EVO.echo.struc = [];
			EVO.two = {
				"colony": 0,
				"body": 0,
				"bodyPart": 0,
				"specialized": 1,
			};
			EVO.enviro = {
				"sun":{
					"shift": EVO.enviro.sun.shift,
					"position": EVO.enviro.sun.position,
				},
				"virus": [1 ,0, 0, 0],
				"current": 50,
				"currentDamage": 0,
				"ph": 70,
				"phd": 0,
				"salinity": 35,
				"salt": 0,
				"toxin": 0,
			};
			EVO.combat = {
				"talent": 0,
				"cbtevo": [],
				"mhp": 0,
				"hp": 0,
				"hpheal": 0,
				"msp": 0,
				"sp": 0,
				"spheal": 0,
				"exp": 0,
				"scar": 0,
				"offense": 0,
				"defense": 0,
				"speed": 0,
				"special": 0,
				"body": 0,
				"soul": 0,
				"wind": 0,
				"expert": 0,
				"coward": 0,
				"survivor": 0,
				"rtrt": 100,
			};
			save.set(`EVO`);
			location.reload(true);
		},
		"cost":()=>(5),
	},
	//Size
	"size":{
		"id": 'size',
		"evo":()=>{
			if (EVO.one.metabolism.val && EVO.stage.num > EVO.size.stage && evolution.creations() >= evolution.one.data.size.cost() && EVO.one.cytoplasm > 99){
				css('size1',evolution.one.data.size.cost());
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

one.evoChance =()=>{
	let mit = EVO.one.mitosis;
	if ((Math.floor(Math.random()*100)+1) > mit.chance){
		mit.learn++;
		if (mit.learn > mit.chance){
			mit.chance++;
			mit.learn -= mit.chance;
		}
	} else {
		EVO.evo.bonus++;
		mit.limit--;
		if (mit.limit < 1){mit.chance--;}
		evolution();
	}
	css('mitosis-chance',mit.chance);
}