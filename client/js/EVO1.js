const fun = {
	"wrd": 'one',
	"food": 'atp',
	"DNA":()=>(EVO.one.DNA.val - EVO.one.DNA.sDNA),
	"failtimer": 0,
	"movement": 'flagellum',
	"move": 0,
};

const start =()=>{
	copy('struc','bubbleless');
	/*HTML Setup*/
	if (EVO.one.metabolism){
		copy('devone','metabolize');
		ID('metabolize').firstChild.id = EVO.one.metabolism.type;
	}
	copy('stage','ATP');
	ID('talents').style.display = 'none';
	ID('boost').style.display = 'none';
	ID('stat').style.display = 'none';
	ID('hlth').style.display = 'none';
	ID('stmn').style.display = 'none';
	ID('rtrt').style.display = 'none';
	css('foodtype','ATP');
	evolution.xcross.setup();
	evolution.stage.setup();
	evolution();
	/*Offline Progression*/
	let offline = Date.now() - EVO.game.date;
	if (offline > 8.64e+7){offline = 8.64e+7;}
	speedup(offline);
	EVO.game.date = Date.now();
	save(Date.now());
	start.check = true;
	/*Initialize Program*/
	foods.update();
	updateFood();
	setTimeout(enviro.loop,clock.minute);
	let time = clock.second;
	if (EVO.one.metabolism && EVO.one.metabolism.type == 'photo'){setTimeout(growth.photosynth,time);}
	if (EVO.one.cilia == 0){time = time*4-(EVO.one.membraneScore*1000);}
	setTimeout(growth.autoClick, growth.autotime(time));
	setTimeout(event,clock.minute*5);
	css('gift',EVO.stage.num*200);
	ID('load').style.display = 'none';
	swirly.start();
	leak();
}
start.check = false;

const leak =()=>{
	if (!EVO.one.metabolism){
		let a = Math.floor(EVO.stage.atp/2);
		EVO.stage.food += EVO.stage.atp-a;
		EVO.stage.atp = a;
		updateFood();
		setTimeout(leak,clock.second);
	}
}

const speedup =(x)=>{
	let t0 = performance.now();
	let time = clock.second;
	if (!EVO.one.cilia){time = growth.membrane(time);}
	let speedUp = new Array(10).fill(0);
	let y,z;
	while (x > speedUp[0]){
		z = 1;
		y = speedUp[z] + growth.autotime(time);
		if (speedUp[0] >= y){
			growth.autoClick();
			speedUp[z] = y;
		}
		z++;
		y = speedUp[z] + growth.phototime();
		if (EVO.one.metabolism && EVO.one.metabolism.type == 'photo' && speedUp[0] >= y){
			growth.photosynth();
			speedUp[z] = y;
		}
		z++;
		y = clock.minute;
		if (speedUp[0] >= speedUp[z] + y){
			enviro.loop();
			speedUp[z] = y;
		}
		if (EVO.one.ribosome){
			z++;
			y = clock.minute;
			if (speedUp[0] >= speedUp[z] + y){
				RNA();
				protein();
				speedUp[z] = y;
			}
			z++;
			y = clock.hour;
			if (speedUp[0] >= speedUp[z] + y){
				ribosome();
				speedUp[z] = y;
			}
		}
		//Increment
		speedUp[0] += 100;
	}
	let t1 = performance.now();
	console.log("Speedup call took " + (t1 - t0) + " milliseconds for " + x + " milliseconds which is " + clock(x) + ".");
}

const updateFood =()=>{
	foods.update();
	css('ATP',Math.floor(EVO.stage[fun.food]));
	let clr = ID('evolution').classList;
	(EVO.stage[fun.food] >= math('evolution',EVO.evo.cost) ? clr.replace('green','red') : clr.replace('red','green'));
	clr =(x)=>{if (EVO.one[x] !== undefined){evolution.stage.data[x].color();}}
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

let stage = evolution.stage;
stage.setup =()=>{evolution.stage.start();}
stage.start =()=>{
	for (let id in EVO.one){
		if (id.match(/^(membraneScore|cytoskeleton|nucleus)$/)){
			if (id == 'membraneScore'){
				let a = EVO.one.membraneScore;
				let membrane = ID('structure').firstElementChild;
				if (a == 0){membrane.id = 'bubble';}
				if (a == 1){membrane.id = 'doublebubble';}
				if (a == 2){membrane.id = 'phospholipid';}
				if (a == 3){membrane.id = 'cellwall';}
			}
			else {copy('struc',evolution.stage.data[id].id);}
		}
		else if (id.match(/^(RNA|DNA)$/)){copy('stage',evolution.stage.data[id].id);}
		else if (id == 'metabolism' && EVO.one.metabolism && EVO.one.metabolism.val !== undefined){copy('game',evolution.stage.data[id].id);}
		else if (id.match(/^(mitosis|cytoplasm|cilia|flagellum|ribosome|voracious|glucose|mitochondria|endoplasmic|golgi)$/)){
			copy('game',evolution.stage.data[id].id);
			if (id == 'ribosome'){
				ID('natural').style.visibility = 'initial';
				ID('exotics').style.visibility = 'initial';
				copy('exotic','protein');
				ID('protein').removeAttribute('onclick');
				//for (let i = 0; i < REC.exotic.length; i++){copy('exotic',exotic.evo[i]);}
				css('protein',EVO.protein.whole);
				setTimeout(RNA,clock.minute);
				setTimeout(protein,clock.minute);
				setTimeout(ribosome,clock.hour);
			}
		}
		else if (!ID('size') && EVO.size.game > 0){
			ID('boost').style.display = 'initial';
			copy('bstevo','size');
			css('size',EVO.size.game);
		}
		if (evolution.stage.data[id]){
			if (typeof EVO.one[id] === 'object'){
				if (id == 'ribosome'){css(id,ribosome.add());}
				else if (id == 'mitosis'){css(id,EVO.one.mitosis.chance);}
				else if (id == 'RNA'){css(id,RNA.RNA());}
				else if (id == 'DNA'){css(id,fun.DNA());}
				else {css(evolution.stage.data[id].id,EVO.one[id].val);}
			} else {css(evolution.stage.data[id].id,EVO.one[id]);}
		}
	}
}
stage.evo =(x)=>{
	ID(x).removeAttribute('id');
	let z = x;
	if (x.match(/^(aerob|photo)$/)){x = 'metabolism';}
	EVO.evo.evolved += evolution.stage.data[x].cost();
	if (!x.match(/^(size|multicelluar)$/) && evolution.stage.data[x] && evolution.stage.data[x].dat){EVO.one[x] = evolution.stage.data[x].dat(z);}
	if (x.match(/^(bubble|doublebubble|phospholipid|cellwall|cytoskeleton|nucleus)$/)){
		if (x.match(/^(bubble|doublebubble|phospholipid|cellwall)$/)){
			EVO.one.membraneScore++;
			let a = EVO.one.membraneScore;
			let b = ID('structure').firstElementChild;
			if (a == 0){b.id = 'bubble';}
			if (a == 1){b.id = 'doublebubble';}
			if (a == 2){b.id = 'phospholipid';}
			if (a == 3){b.id = 'cellwall';}
		}
		else {copy('struc',evolution.stage.data[x].id);}
	}
	else if (x.match(/^(RNA|DNA)$/)){
		copy('stage',evolution.stage.data[x].id);
	}
	else if (x.match(/^(mitosis|cytoplasm|cilia|flagellum|ribosome|metabolism|voracious|glucose|mitochondria|endoplasmic|golgi)$/)){
		copy('game',evolution.stage.data[x].id);
	}
	else if (x == 'size'){
		evolution.stage.data.size.dat();
		ID('boost').style.display = 'initial';
		if (!ID('size')){copy('bstevo','size');}
		css('size',EVO.size.game);
	}
	else if (x == 'multicelluar'){evolution.stage.data[x].dat();}
	if (EVO.one[x] !== undefined && evolution.stage.data[x]){
		(typeof EVO.one[x] === 'object' ? css(evolution.stage.data[x].id,EVO.one[x].val) : css(evolution.stage.data[x].id,EVO.one[x]));
	}
	updateFood();
	evolution();
}
stage.thousand =(x,y)=>{
	y = (y > 1 ? 10-(EVO.one[x]%10) : 1);
	let z = evolution.stage.data[x].math(y);
	if (EVO.stage[fun.food] >= z && (EVO.one[x] < 1000 || EVO.one[x].val < 1000)){
		EVO.stage[fun.food] -= z;
		EVO.one[x] += y;
		css(x,EVO.one[x]);
	}
}
stage.metamo =(x,y)=>{
	let z = evolution.stage.data[x].math();
	y *= z
	if (EVO.stage[fun.food] >= y && RNA.RNA() >= z && EVO.one.metabolism.val > EVO.one[x]){
		EVO.stage[fun.food] -= y;
		EVO.one.RNA.sRNA += z;
		EVO.one[x]++;
		css(x,EVO.one[x]);
		css('RNA',RNA.RNA());
	}
}
stage.protein =(x)=>{
	z = evolution.stage.data[x].math();
	if (EVO.stage[fun.food] >= z*3 && RNA.RNA() >= z && EVO.one[x] < 100 && ribosome.add() > EVO.one[x]){
		EVO.stage[fun.food] -= z*3;
		EVO.one.RNA.sRNA += z;
		EVO.one[x]++;
		EVO.one.ribosome.bonus -= EVO.one[x];
		css(x,EVO.one[x]);
		css('RNA',RNA.RNA());
		css('ribosome',EVO.one.ribosome.val+EVO.one.ribosome.bonus);
	}
}
stage.data = {
	//Membranes
	"bubble":{
		"id": 'bubble',
		"evo":()=>{if(!EVO.one.metabolism){evolution.stage.copy('bubble');}},
		"cost":()=>{
			EVO.one.membraneScore = -1;
			EVO.one.metabolism = {"type": 'basic',};
			copy('devone','metabolize');
			ID('metabolize').firstChild.id = EVO.one.metabolism.type;
			return 0;
		},
	},
	"doublebubble":{
		"id": 'doublebubble',
		"evo":()=>{if (EVO.one.membraneScore == 0 && evolution.creations() >= evolution.stage.data.doublebubble.cost()){evolution.stage.copy('doublebubble');}},
		"cost":()=>(1),
	},
	"phospholipid":{
		"id": 'phospholipid',
		"evo":()=>{if (EVO.one.membraneScore == 1 && evolution.creations() >= evolution.stage.data.phospholipid.cost()){evolution.stage.copy('phospholipid');}},
		"cost":()=>(2),
	},
	"cellwall":{
		"id": 'cellwall',
		"evo":()=>{if (EVO.one.membraneScore == 2 && EVO.one.cytoskeleton && evolution.creations() >= evolution.stage.data.cellwall.cost()){evolution.stage.copy('cellwall');}},
		"cost":()=>(6),
	},
	//Currency
	"RNA":{
		"id": 'RNA',
		"evo":()=>{if (EVO.one.metabolism && evolution.creations() >= evolution.stage.data.RNA.cost()){evolution.stage.copy('RNA');}},
		"math":(x)=>(math('RNA',RNA.cost,x)),
		"buy":(x,y,z)=>{
			y = (y > 1 ? 10-(RNA.RNA()%10) : 1);
			z = evolution.stage.data.RNA.math(y);
			if(EVO.stage[fun.food] >= z){
				EVO.stage[fun.food] -= z;
				EVO.one.RNA.val += y;
				css('RNA',RNA.RNA());
			}
		},
		"dat":()=>({"val": 0, "sRNA": 0, "rRNA": 0, "tRNA": 0,}),
		"cost":()=>(3),
		"color":()=>{
			let clr = ID('RNA').classList;
			if(EVO.stage[fun.food] >= evolution.stage.data.RNA.math()){
				clr.replace('green','red');
				let x = 10-(RNA.RNA()%10);
				(EVO.stage[fun.food] >= evolution.stage.data.RNA.math(x) && x > 1 ? css('RNA-x','x'+x) : css('RNA-x',''));
			} else {
				clr.replace('red','green');
				css('RNA-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-(RNA.RNA()%10);}
			css('cost-RNA',evolution.stage.data.RNA.math(x));
		},
	},
	"DNA":{
		"id": 'DNA',
		"evo":()=>{if (EVO.one.membraneScore > 1 && EVO.one.RNA && evolution.creations() >= evolution.stage.data.DNA.cost()){evolution.stage.copy('DNA');}},
		"math":(x)=>(math('DNA',RNA.cost,x)),
		"buy":(x,y,z)=>{
			y = (y > 1 ? 10-(fun.DNA()%10) : 1);
			z = evolution.stage.data.DNA.math(y);
			if(RNA.RNA() >= z){
				EVO.one.RNA.sRNA += z;
				EVO.one.DNA.val += y;
				css('RNA',RNA.RNA());
				css('DNA',fun.DNA());
			}
		},
		"dat":()=>({"val": 0, "sDNA": 0, "rDNA": 0, "tDNA": 0,}),
		"cost":()=>(5),
		"color":()=>{
			let clr = ID('DNA').classList;
			if(RNA.RNA() >= evolution.stage.data.DNA.math()){
				clr.replace('green','red');
				let x = 10-(fun.DNA()%10);
				(RNA.RNA() >= evolution.stage.data.DNA.math(x) && x > 1 ? css('DNA-x','x'+x) : css('DNA-x',''));
			} else {
				clr.replace('red','green');
				css('DNA-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-(fun.DNA()%10);}
			css('cost-DNA',evolution.stage.data.DNA.math(x));
		},
	},
	//1k Evolutions
	"mitosis":{
		"id": 'mitosis',
		"evo":()=>{if (EVO.one.RNA && EVO.one.membraneScore > 1 && evolution.creations() >= evolution.stage.data.mitosis.cost()){evolution.stage.copy('mitosis');}},
		"math":()=>(math('mitosis',1.1)),
		"buy":(z)=>{
			z = evolution.stage.data.mitosis.math();
			if (EVO.stage[fun.food] >= z && EVO.one.mitosis.val < 1000){
				EVO.stage[fun.food] -= z;
				EVO.one.mitosis.val += 1;
				evoChance();
			}
		},
		"dat":()=>({"val": 0, "chance": 0, "learn": 0, "limit": 0,}),
		"cost":()=>(3),
		"color":()=>{
			let clr = ID('mitosis').classList;
			(EVO.stage[fun.food] >= evolution.stage.data.mitosis.math() ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			if (x > 1){x = 10-EVO.one.mitosis%10;}
			css('cost-mitosis',evolution.stage.data.mitosis.math());
		},
	},
	"cytoplasm":{
		"id": 'cytoplasm',
		"evo":()=>{if (EVO.one.membraneScore > 0 && evolution.creations() >= evolution.stage.data.cytoplasm.cost()){evolution.stage.copy('cytoplasm');}},
		"math":(x)=>(math('cytoplasm',1.1,x)),
		"buy":(x,y)=>{evolution.stage.thousand(x,y);},
		"dat":()=>(0),
		"cost":()=>(1),
		"color":()=>{
			let clr = ID('cytoplasm').classList;
			if(EVO.stage[fun.food] >= evolution.stage.data.cytoplasm.math()){
				clr.replace('green','red');
				let x = 10-(EVO.one.cytoplasm%10);
				(EVO.stage[fun.food] >= evolution.stage.data.cytoplasm.math(x) && x > 1 ? css('cytoplasm-x','x'+x) : css('cytoplasm-x',''));
			} else {
				clr.replace('red','green');
				css('cytoplasm-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-EVO.one.cytoplasm%10;}
			css('cost-cytoplasm',evolution.stage.data.cytoplasm.math(x));
		},
	},
	"cilia":{
		"id": 'cilia',
		"evo":()=>{if (EVO.one.cytoskeleton && EVO.one.membraneScore > 1 && evolution.creations() >= evolution.stage.data.cilia.cost()){evolution.stage.copy('cilia');}},
		"math":(x)=>(math('cilia',1.1,x)),
		"buy":(x,y)=>{evolution.stage.thousand(x,y);},
		"dat":()=>(0),
		"cost":()=>(2),
		"color":()=>{
			let clr = ID('cilia').classList;
			if(EVO.stage[fun.food] >= evolution.stage.data.cilia.math()){
				clr.replace('green','red');
				let x = 10-(EVO.one.cilia%10);
				(EVO.stage[fun.food] >= evolution.stage.data.cilia.math(x) && x > 1 ? css('cilia-x','x'+x) : css('cilia-x',''));
			} else {
				clr.replace('red','green');
				css('cilia-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-EVO.one.cilia%10;}
			css('cost-cilia',evolution.stage.data.cilia.math(x));
		},
	},
	"flagellum":{
		"id": 'flagellum',
		"evo":()=>{if (EVO.one.cytoskeleton && EVO.one.membraneScore > 1 && evolution.creations() >= evolution.stage.data.flagellum.cost()){evolution.stage.copy('flagellum');}},
		"math":(x)=>(math('flagellum',1.1,x)),
		"buy":(x,y)=>{evolution.stage.thousand(x,y);},
		"dat":()=>(0),
		"cost":()=>(2),
		"color":()=>{
			let clr = ID('flagellum').classList;
			if(EVO.stage[fun.food] >= evolution.stage.data.flagellum.math()){
				clr.replace('green','red');
				let x = 10-(EVO.one.flagellum%10);
				(EVO.stage[fun.food] >= evolution.stage.data.flagellum.math(x) && x > 1 ? css('flagellum-x','x'+x) : css('flagellum-x',''));
			} else {
				clr.replace('red','green');
				css('flagellum-x','');
			}
		},
		"tip":(x)=>{
			if (x > 1){x = 10-EVO.one.flagellum%10;}
			css('cost-flagellum',evolution.stage.data.flagellum.math(x));
		},
	},
	"ribosome":{
		"id": 'ribosome',
		"evo":()=>{if (EVO.one.RNA && RNA.RNA() > 199 && evolution.creations() >= evolution.stage.data.ribosome.cost()){evolution.stage.copy('ribosome');}},
		"math":()=>(math('ribosome',1.25)),
		"buy":()=>{
			x = evolution.stage.data.ribosome.math();
			if (EVO.stage[fun.food] >= x*3 && RNA.RNA() >= x && EVO.one.ribosome.val < 1000){
				EVO.stage[fun.food] -= x*3;
				EVO.one.RNA.sRNA += x;
				EVO.one.ribosome.val++;
				css('ribosome',EVO.one.ribosome.val+EVO.one.ribosome.bonus);
				css('RNA',RNA.RNA());
			}
		},
		"dat":()=>{
			ID('natural').style.visibility = 'initial';
			ID('exotics').style.visibility = 'initial';
			copy('exotic','protein');
			ID('protein').removeAttribute('onclick');
			//for (let i = 0; i < REC.exotic.length; i++){copy('exotic',exotic.evo[i]);}
			css('protein',EVO.protein.whole);
			setTimeout(RNA,clock.minute);
			setTimeout(protein,clock.minute);
			setTimeout(ribosome,clock.hour);
			return {"val": 0, "bonus": 0, "partial": 0,};
		},
		"cost":()=>(4),
		"color":(x)=>{
			let clr = ID('ribosome').classList;
			x = evolution.stage.data.ribosome.math();
			(EVO.stage[fun.food] >= x*3 && RNA.RNA() >= x ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.stage.data.ribosome.math();
			css('cost-ribosome',x);
			css('cost-3-ribosome',x*3);
		},
	},
	//100 Evolutions
	"metabolism":{
		"id": 'metabolism',
		"evo":()=>{if (EVO.one.metabolism && !EVO.one.metabolism.val && EVO.one.RNA && !ID('aerob') && !ID('photo') && EVO.one.RNA.val > 9 && evolution.creations() >= evolution.stage.data.metabolism.cost()){
				evolution.stage.copy('aerob');
				evolution.stage.copy('photo');
			}
		},
		"math":()=>(math('metabolism',1.5)),
		"buy":()=>{
			x = evolution.stage.data.metabolism.math();
			if (RNA.RNA() >= x){
				EVO.one.RNA.sRNA += x;
				EVO.one.metabolism.val++;
				css('metabolism',EVO.one.metabolism.val);
				css('RNA',RNA.RNA());
			}
		},
		"dat":(x)=>{
			ID('metabolize').firstChild.id = x;
			if (x == 'photo'){setTimeout(growth.photosynth,clock.second);}
			return {"val": 0, "type": x,};
		},
		"cost":()=>(4),
		"color":()=>{
			if (EVO.one.metabolism.val){
				let clr = ID('metabolism').classList;
				(RNA.RNA() >= evolution.stage.data.metabolism.math() ? clr.replace('green','red') : clr.replace('red','green'));
			}
		},
		"tip":()=>{css('cost-metabolism',evolution.stage.data.metabolism.math());},
	},
	"mitochondria":{
		"id": 'mitochondria',
		"evo":()=>{if (EVO.one.DNA && evolution.creations() >= evolution.stage.data.mitochondria.cost()){evolution.stage.copy('mitochondria');}},
		"math":()=>(math('mitochondria',1.5)),
		"buy":()=>{
			x = evolution.stage.data.mitochondria.math();
			if (fun.DNA() >= x){
				EVO.one.DNA.sDNA += x;
				EVO.one.mitochondria++;
				css('mitochondria',EVO.one.mitochondria);
				css('DNA',fun.DNA());
			}
		},
		"dat":()=>(0),
		"cost":()=>(6),
		"color":()=>{
			let clr = ID('mitochondria').classList;
			(fun.DNA() >= evolution.stage.data.mitochondria.math() ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":()=>{css('cost-mitochondria',evolution.stage.data.mitochondria.math());},
	},
	"voracious":{
		"id": 'voracious',
		"evo":()=>{if (EVO.one.metabolism && EVO.one.metabolism.val && EVO.one.metabolism.type == 'aerob' && EVO.one.metabolism.val > clock.metacycle(25) && evolution.creations() >= evolution.stage.data.voracious.cost()){evolution.stage.copy('voracious');}},
		"math":()=>(math('voracious',1.5)),
		"buy":()=>{evolution.stage.metamo('voracious',3);},
		"dat":()=>(0),
		"cost":()=>(5),
		"color":(x)=>{
			let clr = ID('voracious').classList;
			x = evolution.stage.data.voracious.math();
			(EVO.stage[fun.food] >= x*3 && RNA.RNA() >= x ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.stage.data.voracious.math();
			css('cost-voracious',x);
			css('cost-3-voracious',x*3);
		},
	},
	"glucose":{
		"id": 'glucose',
		"evo":()=>{if (EVO.one.metabolism && EVO.one.metabolism.val && EVO.one.metabolism.type == 'photo' && EVO.one.metabolism.val > clock.metacycle(25) && evolution.creations() >= evolution.stage.data.glucose.cost()){evolution.stage.copy('glucose');}},
		"math":()=>(math('glucose',1.5)),
		"buy":()=>{evolution.stage.metamo('glucose',3);},
		"dat":()=>(0),
		"cost":()=>(5),
		"color":(x)=>{
			let clr = ID('glucose').classList;
			x = evolution.stage.data.glucose.math();
			(EVO.stage[fun.food] >= x*3 && RNA.RNA() >= x ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.stage.data.glucose.math();
			css('cost-glucose',x);
			css('cost-3-glucose',x*3);
		},
	},
	"endoplasmic":{
		"id": 'endoplasmic',
		"evo":()=>{if (EVO.one.ribosome && EVO.one.nucleus && evolution.creations() >= evolution.stage.data.endoplasmic.cost()){evolution.stage.copy('endoplasmic');}},
		"math":()=>(math('endoplasmic',1.5)),
		"buy":()=>{evolution.stage.protein('endoplasmic');},
		"dat":()=>(0),
		"cost":()=>(7),
		"color":(x)=>{
			let clr = ID('endoplasmic').classList;
			x = evolution.stage.data.endoplasmic.math();
			(EVO.stage[fun.food] >= x*3 && RNA.RNA() >= x && ribosome.add() > EVO.one.endoplasmic ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.stage.data.endoplasmic.math();
			css('cost-endoplasmic',x);
			css('cost-3-endoplasmic',x*3);
			css('cost-ribo-endoplasmic',EVO.one.endoplasmic+1);
		},
	},
	"golgi":{
		"id": 'golgi',
		"evo":()=>{if (EVO.one.endoplasmic && evolution.creations() >= evolution.stage.data.golgi.cost()){evolution.stage.copy('golgi');}},
		"math":()=>(math('golgi',1.5)),
		"buy":()=>{evolution.stage.protein('golgi');},
		"dat":()=>(0),
		"cost":()=>(7),
		"color":(x)=>{
			let clr = ID('golgi').classList;
			x = evolution.stage.data.golgi.math();
			(EVO.stage[fun.food] >= x*3 && RNA.RNA() >= x && ribosome.add() > EVO.one.golgi ? clr.replace('green','red') : clr.replace('red','green'));
		},
		"tip":(x)=>{
			x = evolution.stage.data.golgi.math();
			css('cost-golgi',x);
			css('cost-3-golgi',x*3);
			css('cost-ribo-golgi',EVO.one.golgi+1);
		},
	},
	//Gate Evolutions
	"cytoskeleton":{
		"id": 'cytoskeleton',
		"evo":()=>{if (EVO.one.membraneScore > 0 && evolution.creations() >= evolution.stage.data.cytoskeleton.cost()){evolution.stage.copy('cytoskeleton');}},
		"dat":()=>(true),
		"cost":()=>(1),
	},
	"nucleus":{
		"id": 'nucleus',
		"evo":()=>{if (EVO.one.mitochondria && evolution.creations() >= evolution.stage.data.nucleus.cost()){evolution.stage.copy('nucleus');}},
		"dat":()=>(true),
		"cost":()=>(6),
	},
	"multicelluar":{
		"id": 'multicelluar',
		"evo":()=>{if (EVO.one.metabolism && EVO.one.metabolism.val && EVO.one.mitosis && evolution.creations() >= evolution.stage.data.multicelluar.cost() && EVO.stage[fun.food]/2 > 10000){evolution.stage.copy('multicelluar');}},
		"dat":()=>{
			EVO.stage.num++;
			EVO.stage.food = EVO.stage.food/2;
			EVO.stage.nutrient = EVO.stage[fun.food]/2;
			delete EVO.stage[fun.food];
			EVO.one.mitosis = EVO.one.mitosis.val;
			EVO.size.stage = 0;
			localStorage.setItem('EVO', JSON.stringify(EVO));
			location.reload(true);
		},
		"cost":()=>(5),
	},
	//Size
	"size":{
		"id": 'size',
		"evo":()=>{
			if (EVO.one.metabolism && EVO.one.metabolism.val && EVO.stage.num > EVO.size.stage && evolution.creations() >= evolution.stage.data.size.cost() && EVO.one.cytoplasm > 99){
				css('size1',evolution.stage.data.size.cost());
				evolution.stage.copy('size');
			}
		},
		"dat":()=>{
			EVO.size.game++;
			EVO.size.stage++;
		},
		"cost":()=>(EVO.size.game+1),
	},
};

const evoChance =()=>{
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
	css('mitosis',mit.chance);
}