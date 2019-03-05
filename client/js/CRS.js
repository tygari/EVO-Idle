evolution.xcross =()=>{for (let id in evolution.xcross.data){if (!EVO.cross[id] && !ID('x'+id)){evolution.xcross.data[id].evo();}}}
let xcross = evolution.xcross;
xcross.setup =()=>{
	let z = evolution.xcross.data;
	let x =(a)=>{
		z[a] = {
			"id": 'x'+a,
			"evo":()=>{
				if (evolution.creations() >= evolution.xcross.cost() && body.stat.add(a) > 99){
					evolution.xcross.copy('x'+a);
				}
			},
			"buy":()=>{body.stat.buy('x'+a);},
			"dat":()=>(0),
			"color":()=>{
				let clr = ID('x'+a);
				if (EVO.stage[fun.food] >= math('x'+a,2) && body.cell.body(a) > body.stat.add(a)+1){clr.classList.replace('green','red');}
				else {clr.classList.replace('red','green');}
			},
			"tip":()=>{
				css('cost-x'+a,math('x'+a,2));
				css('body-'+a,body.stat.add(a)+1);
			},
		};
		z['gen'+a] = {
			"id": 'xgen'+a,
			"evo":()=>{
				if (evolution.creations() >= evolution.xcross.cost() && EVO.one.mitosis > 199 && EVO.two.generation > 19 && EVO.cross[a] > 1){
					evolution.xcross.copy('xgen'+a);
				}
			},
			"dat":()=>({"val": 0,"part": 0,}),
		};
	}
	x('balance');
	x('nerve');
	x('vascular');
	x('muscle');
	x('respiratory');
	x('digestive');
	x('excretion');
	x('sight');
	x =(a,b,c)=>{
		z[a] = {
			"id": 'x'+a,
			"evo":()=>{if (evolution.creations() >= evolution.xcross.cost() && body.stat.mul(b,1)*body.stat.mul(c,1) >= 5){evolution.xcross.copy('x'+a);}},
			"dat":()=>('on'),
		};
	}
	x('offense','digestive','muscle');
	x('defense','excretion','vascular');
	x('speed','balance','nerve');
	x('special','sight','respiratory');
	x =(a,b)=>{
		if (b == undefined){b = a;}
		z[a] = {
			"id": 'x'+a,
			"evo":()=>{if (evolution.creations() >= evolution.xcross.cost() && EVO.combat !== undefined && EVO.combat[a] > 99){evolution.xcross.copy('x'+a);}},
			"buy":()=>{
				let c = math('x'+a,2);
				if (EVO.combat.exp > c && EVO.combat[b] > EVO.cross[a]+1 && EVO.cross[a] < 100){
					EVO.combat.exp -= c;
					EVO.cross[a]++;
					if (a !== 'instinct'){EVO.combat[a] -= EVO.cross[a];}
					css('x'+a,EVO.cross[a]);
				}
			},
			"dat":()=>(0),
			"color":()=>{
				let clr = ID('x'+a);
				if (EVO.combat.exp > math('x'+a,2) && EVO.combat[b] > EVO.cross[a]+1 && EVO.cross[a] < 100){clr.classList.replace('green','red');}
				else {clr.classList.replace('red','green');}
			},
		};
	}
	x('expert');
	x('coward');
	x('survivor');
	x('instinct','exp');
	x =(a)=>{
		z[a] = {
			"id": 'x'+a,
			"evo":()=>{if (evolution.creations() >= evolution.xcross.cost() && EVO.combat[a] > 999){evolution.xcross.copy('x'+a);}},
			"dat":()=>({"val": 0,"exp": 0}),
		};
	}
	x('body');
	x('soul');
	x('wind');
	x =(a)=>{
		z[a] = {
			"id": 'x'+a,
			"evo":()=>{if (evolution.creations() >= evolution.xcross.cost() && EVO.stage.ate > 9999){evolution.xcross.copy('x'+a);}},
			"buy":()=>{
				let b = (EVO.cross.foodmax||0)+(EVO.cross.foodmin||0)+1;
				if (EVO.stage.ate >= 100**b && evolution.creations() >= b){
					EVO.evo.evolved += b;
					EVO.cross[a]++;
					css('x'+a,EVO.cross[a]);
					evolution();
				}
			},
			"dat":()=>(0),
			"color":()=>{
				let clr = ID('x'+a);
				let b = (EVO.cross.foodmax||0)+(EVO.cross.foodmin||0)+1;
				if (EVO.stage.ate >= 100**b && evolution.creations() >= b){clr.classList.replace('green','red');}
				else {clr.classList.replace('red','green');}
			},
			"tip":()=>{css('cost-'+a,(EVO.cross.foodmax||0)+(EVO.cross.foodmin||0)+1);},
		};
	}
	x('foodmax');
	x('foodmin');
	evolution.xcross.start();
}
xcross.start =()=>{
	for (let id in EVO.cross){
		if (evolution.xcross.data[id].buy){
			copy('cross',evolution.xcross.data[id].id);
		}
		if (typeof EVO.cross[id] === 'object'){
			css(evolution.xcross.data[id].id,EVO.cross[id].val);
		} else {
			css(evolution.xcross.data[id].id,EVO.cross[id]);
		}
	}
	if (Object.keys(EVO.cross).length > 0){
		ID('natural').style.visibility = 'initial';
		ID('xcross').style.visibility = 'initial';
	}
}
xcross.cost =()=>(5*(Object.keys(EVO.cross).length+1));
xcross.evo =(x)=>{
	ID(x).removeAttribute('id');
	x = x.substring(1);
	if (evolution.xcross.data[x].buy){copy('cross',evolution.xcross.data[x].id);}
	EVO.evo.evolved += evolution.xcross.cost();
	EVO.cross[x] = evolution.xcross.data[x].dat();
	(typeof EVO.cross[x] === 'object' ? css(evolution.xcross.data[x].id,EVO.cross[x].val) : css(evolution.xcross.data[x].id,EVO.cross[x]));
	if (x.match(/^(expert|coward|survivor)$/)){EVO.combat[x] -= 100;}
	evolution();
	ID('natural').style.visibility = 'initial';
	ID('xcross').style.visibility = 'initial';
}
xcross.copy =(x)=>{copy('xcrossevo',x);}
xcross.cntLrn =(x,y)=>{
	EVO.cross[x].exp += y;
	if (EVO.cross[x].exp > (EVO.cross[x].val+1)*100 && EVO.cross[x].val < 100){
		EVO.cross[x].val++;
		EVO.cross[x].exp -= EVO.cross[x].val*100;
	}
}
xcross.data = {
	"traveler": {
		"id": 'xtraveler',
		"evo":()=>{
			let x = (EVO.one.flagellum||0)+(EVO.two.motility||0)+(EVO.three.peristalsis||0);
			if (evolution.creations() >= evolution.xcross.cost() && x > 1000){evolution.xcross.copy('xtraveler');}
		},
		"dat":()=>({"val": 0, "exp": 0}),
	},
	"shell": {
		"id": 'xshell',
		"evo":()=>{if (evolution.creations() >= evolution.xcross.cost() && EVO.two.EPS > 999){evolution.xcross.copy('xshell');}},
		"buy":()=>{
			if (EVO.two.EPS >= 1000*(EVO.cross.shell+1)){
				EVO.cross.shell++;
				EVO.two.EPS -= 1000*EVO.cross.shell;
				css('xshell',EVO.cross.shell);
			}
		},
		"dat":()=>(0),
		"color":()=>{
			let clr = ID('xshell');
			if (EVO.EPS >= 1000*(EVO.cross.shell+1)){clr.classList.replace('green','red');}
			else {clr.classList.replace('red','green');}
		},
	},
	"detox": {
		"id": 'xdetoxification',
		"evo":()=>{
			if (EVO.stage.num > 1 && evolution.creations() >= evolution.xcross.cost() && enviro.toxcalc()[0]/10 > 99){
				evolution.xcross.copy('xdetox');
			}
		},
		"dat":()=>({"val": 0, "exp": 0}),
	},
	"efficient": {
		"id": 'xefficient',
		"evo":()=>{
			if (EVO.one.metabolism && (1+(EVO.one.metabolism.val||0)/100)*(1+(EVO.one.mitochondria||0)/100) >= clock.metacycle(250)/24 && evolution.creations() >= evolution.xcross.cost()){
				evolution.xcross.copy('xefficient');
			}
		},
		"buy":()=>{
			if (EVO.one.ribosome+EVO.one.ribosomeBonus > EVO.cross.efficient && (EVO.cross.efficient < EVO.one.metabolism.val
				|| EVO.cross.efficient < EVO.one.mitochondria)){
				EVO.cross.efficient++;
				EVO.one.ribosomeBonus -= EVO.cross.efficient;
				css('xefficient',EVO.cross.efficient);
			}
		},
		"dat":()=>(0),
		"color":()=>{
			let clr = ID('xefficient');
			if (EVO.one.ribosome+EVO.one.ribosomeBonus > EVO.cross.efficient && (EVO.cross.efficient < EVO.one.metabolism.val
				|| EVO.cross.efficient < EVO.one.mitochondria)){clr.classList.replace('green','red');}
			else {clr.classList.replace('red','green');}
		},
		"tip":()=>{css('cost-xefficient',EVO.cross.efficient+1);},
	},
};