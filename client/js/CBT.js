const gage =(x,y)=>{
	let gage = EVO.combat[x];
	gage += y;
	if (gage < 0){gage = 0;}
	if (gage > 100){gage = 100;}
	EVO.combat[x] = gage;
	css(x,gage);
}

const check =(x,y)=>{return x.combat.cbtevo.indexOf(y);}

evolution.combat =()=>{
	let cbt = EVO.combat;
	let evo =(x)=>{copy('combatevo',x);}
	let num = EVO.stage.num;
	let mod = num%2;
	let chk,mul,cnt;
	if ((EVO.stage.num > 2 || EVO.two.specialized > 1) && num%2 == 0 && num/2 > cbt.talent && evolution.creations() >= (cbt.talent + Math.floor(num/2))*10
		&& cbt.talent*10 <= cbt.offense+cbt.defense+cbt.speed+cbt.special){
		evo('talent');
	}
	if(cbt.talent > 0 && cbt.talent > cbt.cbtevo.length && evolution.creations() >= (cbt.cbtevo.length+Math.floor(num/2))*10){
		mul = EVO.stage.num/2*10;
		chk = 1;
		if (check(EVO,'limb') > -1){chk += 1;}
		if (check(EVO,'frce') > -1){chk += 1;}
		if (check(EVO,'crit') > -1){chk += 1;}
		if (Math.floor((body.stat.add('digestive')+body.stat.add('muscle'))/10+cbt.offense) > chk*mul){
			cnt = 0;
			if (check(EVO,'limb') == -1 && num == 2){evo('limb');}
			if (check(EVO,'frce') == -1 && cnt < 2+mod){evo('frce'); cnt++;}
			if (check(EVO,'crit') == -1 && cnt < 2+mod){evo('crit'); cnt++;}
		}
		chk = 1;
		if (check(EVO,'hard') > -1){chk += 1;}
		if (check(EVO,'anti') > -1){chk += 1;}
		if (check(EVO,'regen') > -1){chk += 1;}
		if (Math.floor((body.stat.add('excretion')+body.stat.add('vascular'))/10+cbt.defense) > chk*mul){
			cnt = 0;
			if (check(EVO,'hard') == -1 && num == 2){evo('hard');}
			if (check(EVO,'anti') == -1 && cnt < 2+mod){evo('anti'); cnt++;}
			if (check(EVO,'regen') == -1 && cnt < 2+mod){evo('regen'); cnt++;}
		}
		chk = 1;
		if (check(EVO,'burst') > -1){chk += 1;}
		if (check(EVO,'run') > -1){chk += 1;}
		if (check(EVO,'line') > -1){chk += 1;}
		if (Math.floor((body.stat.add('balance')+body.stat.add('nerve'))/10+cbt.speed) > chk*mul){
			cnt = 0;
			if (check(EVO,'burst') == -1 && num == 2){evo('burst');}
			if (check(EVO,'run') == -1 && cnt < 2+mod){evo('run'); cnt++;}
			if (check(EVO,'line') == -1 && cnt < 2+mod){evo('line'); cnt++;}
		}
		chk = 1;
		if (check(EVO,'elec') > -1){chk += 1;}
		if (check(EVO,'venom') > -1){chk += 1;}
		if (check(EVO,'lumin') > -1){chk += 1;}
		if (Math.floor((body.stat.add('respiratory')+body.stat.add('sight'))/10+cbt.special) > chk*mul){
			cnt = 0;
			if (check(EVO,'elec') == -1 && num == 2){evo('elec');}
			if (check(EVO,'venom') == -1 && cnt < 2+mod){evo('venom'); cnt++;}
			if (check(EVO,'lumin') == -1 && cnt < 2+mod){evo('lumin'); cnt++;}
		}
	}
}
evolution.combat.talent =()=>{
	let cbt = EVO.combat;
	if(cbt.talent > 0 && !ID('experience')){
		copy('combat','experience');
		ID('experience').removeAttribute("onclick");
	}
	css('experience',Math.floor(cbt.exp));
	let chk =(x,y)=>{
		let cnt = cbt[x];
		if (EVO.three.boost == y){cnt -= 5;}
		if (cnt < 0){cnt = 0;}
		return cnt;
	}
	let off = chk('offense','camo');
	let def = chk('defense','terri');
	let spd = chk('speed','roam');
	let spl = chk('special','hyper');
	let t = body.stat.total();
	let html =(w,x,y,z)=>{
		x = body.stat.add(x);
		y = body.stat.add(y);
		let a = 0;
		if (EVO.three.boost == w){a += 5;}
		if (EVO.cross[z] == 'on'){a += 5;}
		let exp = cbtMath(z);
		if (Math.floor((x+y+((t-x-y)/2))/10) > cbt[z] && cbt.exp >= exp && ((cbt.talent*10 > off+def+spd+spl) || (cbt[z] < a && a > 0))){
			if (!ID(z)){
				copy('combat',z);
				css(z,exp);
			}
		} else if (ID(z)){ID(z).remove();}
	}
	html('camo','muscle','digestive','offense');
	html('terri','vascular','excretion','defense');
	html('roam','balance','nerve','speed');
	html('hyper','sight','respiratory','special');
	if (cbt.cbtevo.length > 0){
		ID('talents').style.display = 'initial';
		for (let i = 0; i < cbt.cbtevo.length; i++){
			if(!ID(cbt.cbtevo[i])){copy('cbtevo',cbt.cbtevo[i]);}
		}
	}
}

const combat =(x)=>{
	let cbt = EVO.combat;
	let pc =()=>{
		cbt.cbtevo.push(x);
		copy('cbtevo',x);
	}
	if (x == 'talent'){
		cbt.talent += 1;
		evolution.combat.talent();
	}
	else if (x == 'limb'){pc();}
	else if (x == 'frce'){pc();}
	else if (x == 'crit'){pc();}
	else if (x == 'hard'){pc();}
	else if (x == 'anti'){pc();}
	else if (x == 'regen'){pc();}
	else if (x == 'burst'){pc();}
	else if (x == 'run'){pc();}
	else if (x == 'line'){pc();}
	else if (x == 'elec'){pc();}
	else if (x == 'venom'){pc();}
	else if (x == 'lumin'){pc();}
	if (x.match(/^(offense|defense|speed|special)$/)){EVO.evo.evolved += (cbt.offense + cbt.defense + cbt.speed + cbt.special)*10;}
	else {EVO.evo.evolved += (cbt.cbtevo.length+Math.floor(EVO.stage.num/2))*10;}
	evolution();
}

const cbtMath =(x)=>{return Math.floor(10*(2**EVO.combat[x]+(EVO.combat.offense+EVO.combat.defense+EVO.combat.speed+EVO.combat.special-EVO.combat[x])/2));}

const cbtupg =(x)=>{
	let y = cbtMath(x);
	if (EVO.combat.exp >= y){
		EVO.combat.exp -= y;
		EVO.combat[x] += 1;
		css(x,EVO.combat[x]);
		css('offense',cbtMath('offense'));
		css('defense',cbtMath('defense'));
		css('speed',cbtMath('speed'));
		css('special',cbtMath('special'));
		css('experience',Math.floor(EVO.combat.exp));
		cbtstat();
		evolution.combat.talent();
	}
}

const cbtstat =()=>{
	css('off',EVO.combat.offense);
	css('def',EVO.combat.defense);
	css('spd',EVO.combat.speed);
	css('spl',EVO.combat.special);
	css('str',Math.floor(EVO.combat.offense+(body.stat.add('muscle')+body.stat.add('digestive'))/10));
	css('dex',Math.floor(EVO.combat.special+(body.stat.add('respiratory')+body.stat.add('sight'))/10));
	css('con',Math.floor(EVO.combat.defense+(body.stat.add('vascular')+body.stat.add('excretion'))/10));
	css('agl',Math.floor(EVO.combat.speed+(body.stat.add('balance')+body.stat.add('nerve'))/10));
	let scar = EVO.combat.scar;
	if (EVO.cross.survivor){
		scar -= EVO.cross.survivor;
		if (scar < 0){scar = 0;}
	}
	EVO.combat.mhp = Math.floor((EVO.combat.defense+(body.stat.add('vascular')+body.stat.add('excretion'))/10) * (1+(EVO.combat.offense+EVO.combat.defense+EVO.combat.speed+EVO.combat.special)/100)*(1-(scar/100)));
	if (EVO.combat.mhp < 10){EVO.combat.mhp = 10;}
	css('mhp',EVO.combat.mhp);
	css('hp', EVO.combat.hp);
	EVO.combat.msp = EVO.combat.offense + EVO.combat.defense + EVO.combat.speed + EVO.combat.special + 10;
	css('msp',EVO.combat.msp);
	css('sp', EVO.combat.sp);
}

const heal =()=>{
	if(cbt.check){
		let cost = Math.ceil(EVO.stage.num*(100-(EVO.one.mitosis/10)));
		if (EVO.combat.hp < EVO.combat.mhp && EVO.stage[fun.food] >= cost){
			EVO.stage[fun.food] -= cost;
			EVO.combat.hp += 1;
			css('hp', EVO.combat.hp);
		} else if (EVO.combat.sp < EVO.combat.msp && EVO.stage[fun.food] >= cost){
			EVO.stage[fun.food] -= cost;
			EVO.combat.sp += 1;
			css('sp', EVO.combat.sp);
		}
	}
	if (start.check){setTimeout(heal, heal.timer());}
};
heal.timer =()=>(Math.ceil(clock.minute*body.stat.mul('balance',-2)));


const abilityCost = {
	'limb': 3,
	'frce': 1,
	'crit': 0,
	'hard': 3,
	'anti': 1,
	'regen': 0,
	'burst': 3,
	'run': 1,
	'line': 0,
	'elec': 3,
	'venom': 3,
	'lumin': 3,
};

const cbt = {
	//Setup
	"cbt":(moveCost,opponent)=>{
		cbt.moveCost = moveCost;
		cbt.opponent = opponent;
		cbt.setup();
		(cbt.one.agl > cbt.two.agl ? cbt.plone() : cbt.pltwo());
	},
	"setup":()=>{
		cbt.check = false;
		cbt.fled = 'off';
		let sizeMod = Math.floor(Math.random()*5)+EVO.stage.num;
		if (sizeMod < 0){sizeMod = 0;}
		cbt.player(sizeMod);
		cbt.npc(sizeMod);
		cbt.exp = cbt.two.off + cbt.two.def + cbt.two.spd + cbt.two.spl + cbt.two.str + cbt.two.dex + cbt.two.con + cbt.two.agl;
		if (EVO.cross.survivor){cbt.exp *= (1+(EVO.cross.survivor/200));}
		if (EVO.cross.instinct){cbt.exp *= (1+(EVO.cross.instinct/100));}
	},
	//Entities
	"entity":()=>{
		return {
			"plcnt": 0,
			"off": 0,
			"def": 0,
			"spd": 0,
			"spl": 0,
			"str": 0,
			"dex": 0,
			"con": 0,
			"agl": 0,
			"mhp": 0,
			"hp": 0,
			"msp": 0,
			"sp": 0,
			"size": 0,
			"arm": 0,
			"combat":{
				"cbtevo": [],
			},
			"rtrt": 0,
			"line": 0,
			"elec": 'off',
			"venom": 'off',
			"vendur": 0,
			"wind": 'off',
		}
	},
	"player":(sizeMod)=>{
		cbt.one = cbt.entity();
		cbt.one.plcnt = 1;
		cbt.one.off = EVO.combat.offense;
		cbt.one.def = EVO.combat.defense;
		cbt.one.spd = EVO.combat.speed;
		cbt.one.spl = EVO.combat.special;
		cbt.one.mhp = EVO.combat.mhp;
		cbt.one.hp = EVO.combat.hp;
		cbt.one.msp = EVO.combat.msp;
		cbt.one.sp = EVO.combat.sp;
		cbt.one.size = EVO.size.game;
		cbt.one.combat.cbtevo = EVO.combat.cbtevo;
		cbt.one.rtrt = EVO.combat.rtrt;
		let size = cbt.one.size - sizeMod;
		cbt.one.str = Math.floor((EVO.combat.offense+(body.stat.add('muscle')+body.stat.add('digestive'))/10)*(1+(size/10)));
		cbt.one.con = Math.floor((EVO.combat.defense+(body.stat.add('vascular')+body.stat.add('excretion'))/10)*(1+(size/10)));
		cbt.one.dex = Math.floor((EVO.combat.special+(body.stat.add('respiratory')+body.stat.add('sight'))/10)*(1-(size/10)));
		cbt.one.agl = Math.floor((EVO.combat.speed+(body.stat.add('balance')+body.stat.add('nerve'))/10)*(1-(size/10)));
		if (EVO.one.membraneScore == 3){cbt.one.arm += Math.floor(EVO.size.game/10)+1;}
		cbt.one.arm += Math.floor(EVO.two.adhesion/50);
		if (EVO.cross.shell){cbt.one.arm += EVO.cross.shell;}
		if (EVO.stage.num > 2 && EVO.three.skeleton == 'exo'){
			cbt.one.arm += 1;
			if (EVO.stage.num > 3){Math.floor(body.stat.add('skeleton')/100);}
		}
		if (check(cbt.one,'line') > -1){cbt.one.line = Math.floor(cbt.one.spd/10);}
	},
	"npc":(sizeMod)=>{
		cbt.two = cbt.entity();
		cbt.two.plcnt = 2;
		let size = sizeMod - cbt.one.size;
		let points = Math.floor((EVO.combat.offense+EVO.combat.defense+EVO.combat.speed+EVO.combat.special)+(body.stat.add('muscle')+body.stat.add('digestive')+body.stat.add('vascular')+body.stat.add('excretion')+body.stat.add('balance')+body.stat.add('nerve')+body.stat.add('respiratory')+body.stat.add('sight'))/10);
		for (let i = 0; i < points; i++){
			let rnd = Math.floor(Math.random()*4);
			if (rnd == 0){cbt.two.str++;}
			else if (rnd == 1){cbt.two.con++;}
			else if (rnd == 2){cbt.two.dex++;}
			else if (rnd == 3){cbt.two.agl++;}
		}
		cbt.two.str = Math.floor(cbt.two.str*(1+(size/10)));
		cbt.two.con = Math.floor(cbt.two.con*(1+(size/10)));
		cbt.two.dex = Math.floor(cbt.two.dex*(1-(size/10)));
		cbt.two.agl = Math.floor(cbt.two.agl*(1-(size/10)));
		cbt.two.mhp = Math.floor(cbt.two.con*(1+(cbt.two.off+cbt.two.def+cbt.two.spd+cbt.two.spl)/100));
		cbt.two.msp = cbt.two.off+cbt.two.def+cbt.two.spd+cbt.two.spl+10;
		let expert = 0;
		if (EVO.cross.expert){expert = Math.floor(EVO.cross.expert/10);}
		cbt.two.arm = EVO.combat.cbtevo.length-expert;//FIX
		cbt.two.rtrt = 20;
		if (cbt.two.mhp < 10){cbt.two.mhp = 10;}
		cbt.two.hp = cbt.two.mhp;
		if (cbt.two.msp < 10){cbt.two.msp = 10;}
		cbt.two.sp = cbt.two.msp;
		if (check(cbt.two,'line') > -1){cbt.two.line = Math.floor(cbt.two.spd/10);}
	},
	//Variables
	"check": true,
	"hard": 'off',
	//Status Effects
	"electro":(x,y)=>{
		if (y.spl >= Math.floor((Math.random()*100)+1)){
			y.elec = 'on';
			if (x.plcnt == cbt.one.plcnt){cbt.elec = 'Your opponent has been stunned.';}
			if (x.plcnt == cbt.two.plcnt){cbt.elec = 'Your opponent has stunned you.';}
		}
	},
	"venom":(x,y)=>{
		y.venom = 'on';
		y.vendur = Math.floor(x.spl/5);
		if (x.plcnt == cbt.one.plcnt){cbt.veno = 'Your opponent has been poisoned.';}
		if (x.plcnt == cbt.two.plcnt){cbt.veno = 'Your opponent has poisoned you.';}
	},
	//Fighting Functions
	"sp":(x,y)=>{
		let spc = y - x.line;
		if (spc < 0){spc = 0;}
		return spc;
	},
	"plone":()=>{
		cbt.fight(cbt.one,cbt.two);
		if (cbt.one.hp > 0 && cbt.two.hp > 0 && cbt.fled == 'off'){setTimeout(cbt.pltwo,clock.second*3);}
		if (cbt.one.hp < 0){cbt.one.hp = 0;}
		if (cbt.two.hp < 0){cbt.two.hp = 0;}
	},
	"pltwo":()=>{
		cbt.fight(cbt.two,cbt.one);
		if (cbt.one.hp > 0 && cbt.two.hp > 0 && cbt.fled == 'off'){setTimeout(cbt.plone,clock.second*3);}
		if (cbt.one.hp < 0){cbt.one.hp = 0;}
		if (cbt.two.hp < 0){cbt.two.hp = 0;}
	},
	"fight":(attacker,defender)=>{
		cbt.vdmg = '';
		cbt.elec = '';
		cbt.veno = '';
		cbt.attNum = 1;
		cbt.text = '';
		cbt.hard = 'off';
		let spcAtt = 0;
		let spcDef = 0;
		if (attacker.venom == 'on'){
			let ven = Math.floor(defender.spl/5);
			if (check(attacker,'anti') > -1 && attacker.sp - cbt.sp(attacker,spcAtt) > 0){
				ven -= Math.floor(attacker.def/5);
				spcAtt += abilityCost.anti;
			}
			attacker.hp -= ven;
			if (attacker.plcnt == cbt.one.plcnt){
				EVO.combat.body += ven;
				if(EVO.cross.body){evolution.xcross.cntLrn('body',ven);}
			}
			attacker.vendur -= 1;
			if (attacker.plcnt == cbt.one.plcnt){cbt.vdmg = 'You recieved ' + ven + ' points of venom damage.';}
			if (attacker.plcnt == cbt.two.plcnt){cbt.vdmg = 'Your opponent recieved ' + ven + ' points of venom damage.';}
			if (attacker.vendur < 1){
				attacker.venom = 'off';
				if (attacker.plcnt == cbt.one.plcnt){cbt.vdmg += '\\a'+'You are no longer poisoned.';}
				if (attacker.plcnt == cbt.two.plcnt){cbt.vdmg += '\\a'+'Your opponent is no longer poisoned.';}
			}
		}
		if (attacker.elec == 'off' && attacker.hp > 0 && defender.hp > 0){
			let action = 'on';
			let attExh = 1;
			if (attacker.sp < 1){attExh = 2;}
			let defExh = 1;
			if (defender.sp < 1){defExh = 2;}
			let retreat = attacker.mhp*attacker.rtrt/100;
			let lumin = 'off';
			if (attacker.hp > retreat){
				let hit = attacker.dex;
				if (check(defender,'lumin') > -1 && defender.sp - cbt.sp(defender,spcDef) > 0){
					hit -= defender.spl/2;
					lumin = 'on';
					spcDef += abilityCost.lumin;
				}
				if (hit < 1){hit = 1;}
				let dge = defender.agl/2;
				if (check(defender,'burst') > -1 && defender.sp - cbt.sp(defender,spcDef) > 0){
					dge *= defender.spd/3;
					spcDef += abilityCost.burst;
				}
				if (dge < 1){dge = 1;}
				if (check(attacker,'limb') > -1 && attacker.sp - cbt.sp(attacker,spcAtt) > 0){
					cbt.attNum++;
					spcAtt += abilityCost.limb;
				}
				for (let i = 0; i < cbt.attNum; i++){
					cbt.attack(attacker,defender,i,spcAtt,spcDef,attExh,defExh,hit,dge,lumin);
					action = 'off';
				}
			}
			if (attacker.hp <= retreat && action == 'on'){
				let retreat = attacker.agl/2;
				if (attacker.plcnt == cbt.one.plcnt && EVO.cross.coward){retreat += EVO.cross.coward/10;}
				if (check(attacker,'burst') > -1 && attacker.sp - cbt.sp(attacker,spcAtt) > 0){
					retreat *= attacker.spd/3;
					spcAtt += abilityCost.burst;
				}
				if (check(attacker,'run') > -1 && attacker.sp - cbt.sp(attacker,spcAtt) > 0){
					retreat *= attacker.spd/5;
					spcAtt += abilityCost.run;
				}
				let chase = defender.agl/2;
				if (check(defender,'burst') > -1 && defender.sp - cbt.sp(defender,spcDef) > 0){
					chase *= defender.spd/3;
					spcDef += abilityCost.burst;
				}
				if (check(defender,'run') > -1 && defender.sp - cbt.sp(defender,spcDef) > 0){
					chase *= defender.spd/5;
					spcDef += abilityCost.run;
				}
				if (retreat < 1){retreat = 1;}
				if (chase < 1){chase = 1;}
				if (retreat/attExh > Math.random()*((retreat/attExh)+(chase/defExh))){
					cbt.fled = 'on';
					if (attacker.plcnt == cbt.one.plcnt){cbt.text = 'You managed to run away.';}
					if (attacker.plcnt == cbt.two.plcnt){cbt.text = 'Your opponent managed to run away.';}
					setTimeout(cbt.flee,clock.second*3,attacker);
				} else {
					if (attacker.plcnt == cbt.one.plcnt){cbt.text = 'You failed to run away.';}
					if (attacker.plcnt == cbt.two.plcnt){cbt.text = 'Your opponent failed to run away.';}
				}
			}
		}
		if (attacker.elec == 'on'){
			attacker.elec = 'off';
			if (attacker.plcnt == cbt.one.plcnt){cbt.elec += '\\a'+'You are no longer stunned.';}
			if (attacker.plcnt == cbt.two.plcnt){cbt.elec += '\\a'+'Your opponent is no longer stunned.';}
		}
		let text = cbt.vdmg;
		if (cbt.elec !== ''){
			if (text !== '' && cbt.elec !== ''){text += '\\a';}
			text += cbt.elec;
		}
		if (cbt.veno !== ''){
			if (text !== '' && cbt.veno !== ''){text += '\\a';}
			text += cbt.veno;
		}
		text += cbt.text;
		if (cbt.fled == 'off'){css('event-two',text);}
		if (cbt.one.hp < 1 && cbt.fled == 'off'){setTimeout(cbt.lose,clock.second*3);}
		if (cbt.two.hp < 1 && cbt.fled == 'off'){setTimeout(cbt.win,clock.second*3);}
		spcAtt = spcAtt - attacker.line;
		attacker.sp -= spcAtt;
		if (attacker.sp < 0){attacker.sp = 0;}
		if (attacker.plcnt == cbt.one.plcnt){
			EVO.combat.soul += spcAtt;
			if (EVO.cross.soul){evolution.xcross.cntLrn('soul',spcAtt);}
			if (attacker.wind == 'off' && attacker.sp < 1){
				attacker.wind == 'on';
				EVO.combat.wind++;
				if (EVO.cross.wind){
					if ((Math.random()*100)+1 < EVO.cross.wind.val){attacker.sp = attacker.msp;}
					evolution.xcross.cntLrn('wind',1);
				}
			}
		}
		spcDef = spcDef - defender.line;
		defender.sp -= spcDef;
		if (defender.sp < 0){defender.sp = 0;}
		if (defender.plcnt == cbt.one.plcnt){
			EVO.combat.soul += spcDef;
			if (EVO.cross.soul){evolution.xcross.cntLrn('soul',spcDef);}
			if (defender.wind == 'off' && defender.sp < 1){
				defender.wind == 'on';
				EVO.combat.wind++;
				if (EVO.cross.wind){
					if ((Math.random()*100)+1 < EVO.cross.wind.val){defender.sp = defender.msp;}
					evolution.xcross.cntLrn('wind',1);
				}
			}
		}
		EVO.combat.hp = cbt.one.hp;
		EVO.combat.sp = cbt.one.sp;
		css('hp',EVO.combat.hp);
		css('sp',EVO.combat.sp);
	},
	"attack":(attacker,defender,i,spcAtt,spcDef,attExh,defExh,hit,dge,lumin)=>{
		let number = '';
		let damage = 'miss';
		let critical = '';
		if (hit/attExh > Math.random()*((hit/attExh)+(dge/defExh))){
			if (defender.elec == 'off' && check(attacker,'elec') > -1 && attacker.sp - cbt.sp(attacker,spcAtt) > 0){
				electro(attacker,defender);
				spcAtt += abilityCost.elec;
			}
			if (defender.venom == 'off' && check(attacker,'venom') > -1 && attacker.sp - cbt.sp(attacker,spcAtt) > 0){
				venom(attacker,defender);
				spcAtt += abilityCost.venom;
			}
			let str = attacker.str;
			let dex = attacker.dex;
			if (lumin == 'on') {dex -= defender.spl/2;}
			if (str < dex){dex = str;}
			str = Math.floor(str);
			dex = Math.floor(dex);
			let dmg = (Math.random()*(str-dex))+dex;
			if (check(attacker,'limb') > -1){
				dmg = dmg/2;
				dmg += (dmg*attacker.off/100);
			}
			if (check(attacker,'frce') > -1 && attacker.sp - cbt.sp(attacker,spcAtt) > 0){
				dmg += (dmg*(attacker.off*2)/100);
				spcAtt += abilityCost.frce;
			}
			if (check(attacker,'crit') > -1 && (attacker.off*0.5).toFixed(1) > (Math.random()*100)+1){
				critical = 'crit';
				dmg *= ((attacker.off*2.5).toFixed(1)+100)/100;
			}
			dmg = ((dmg/attExh)-defender.arm);
			dmg = Math.floor(dmg);
			if (dmg < 1){dmg = 1;}
			if (check(defender,'hard') > -1 && (defender.sp - cbt.sp(defender,spcDef) > 0 || cbt.hard == 'on')){
				dmg -= defender.def;
				if (dmg < 0){dmg = 0;}
				if (cbt.hard == 'off'){spcDef += abilityCost.hard;}
				cbt.hard = 'on';
			}
			defender.hp -= dmg;
			if (defender == cbt.one){
				EVO.combat.body += dmg;
				if(EVO.cross.body){evolution.xcross.cntLrn('body',dmg);}
			}
			damage = dmg;
		}
		if (i == 0 && cbt.attNum > 1){number = 'first ';}
		if (i == 1){number = 'second ';}
		if (i == 2){number = 'third ';}
		if (i == 3){number = 'fourth ';}
		if (i == 4){number = 'fifth ';}
		if (critical == 'crit'){critical = 'was a critical and ';}
		if (cbt.text !== ''){cbt.text += '\\a';}
		if (damage == 'miss'){
			if (attacker.plcnt == cbt.one.plcnt){cbt.text += 'Your ' + number + 'hit missed.';}
			if (attacker.plcnt == cbt.two.plcnt){cbt.text += 'Your opponents ' + number + 'hit missed.';}
		} else {
			if (attacker.plcnt == cbt.one.plcnt){cbt.text += 'Your ' + number + 'hit ' + critical + 'dealt ' + damage + ' damage.';}
			if (attacker.plcnt == cbt.two.plcnt){cbt.text += 'Your opponents ' + number + 'hit ' + critical + 'dealt ' + damage + ' damage.';}
		}
	},
	"flee":(x)=>{
		cbt.exp /= 2;
		EVO.combat.exp += cbt.exp;
		css('experience',Math.floor(EVO.combat.exp));
		EVO.stage[fun.food] += cbt.moveCost;
		if (x.plcnt == cbt.one.plcnt){
			css('event-one','You successfully ran away.  You have run to a new area.');
			css('event-two','You gained ' + cbt.exp + ' experince.');
			EVO.combat.coward += 1;
			EVO.combat.survivor += 0.2;
			move();
		}
		if (x.plcnt == cbt.two.plcnt){
			css('event-one','Your opponent has successfully ran away.  They have ran to a new area.');
			css('event-two','You gained ' + cbt.exp + ' experince.');
			EVO.combat.expert += 0.2;
		}
		cbt.check = true;
	},
	"win":()=>{
		if(cbt.opponent){EVO.area[cbt.opponent]--;}
		let eat = body.stat.add('digestive')*10;
		if (cbt.two.mhp < eat){eat = cbt.two.mhp;}
		if (EVO.stage.num > 2 && EVO.three.diet == 'carn'){eat *= 10;}
		css('event-one','You defeated your opponent.');
		let reward = 'You gained ' + cbt.exp + ' experince.';
		if (EVO.stage.num == 2 || EVO.three.diet !== 'herb'){reward = 'You gained ' + cbt.exp + ' experince and ' + eat + ' food.';}
		css('event-two',reward);
		EVO.combat.exp += cbt.exp;
		css('experience',Math.floor(EVO.combat.exp));
		if (EVO.stage.num == 2 || EVO.three.diet !== 'herb'){EVO.stage.food += eat;}
		EVO.stage[fun.food] += cbt.moveCost;
		EVO.combat.expert += 1;
		cbt.check = true;
	},
	"lose":()=>{
		css('event-one','Your opponent defeated you.');
		css('event-two','');
		EVO.combat.exp += cbt.exp/2;
		css('experience',Math.floor(EVO.combat.exp));
		EVO.stage[fun.food] += cbt.moveCost;
		move();
		EVO.stage[fun.food] = 0;
		EVO.combat.survivor += 1;
		if (check(EVO,'regen') == -1){EVO.combat.scar += 1;}
		ID('lay').classList.replace('layoff','layon');
		setTimeout(rec.carnate,clock.second*10);
	},
}