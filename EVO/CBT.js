function gage(x,y){
	var gage = EVO.combat[x];
	gage += y;
	if (gage < 0){gage = 0;}
	if (gage > 100){gage = 100;}
	EVO.combat[x] = gage;
	css(x,gage);
}

function check(x,y){return x.combat.cbtevo.indexOf(y);}

function evolutionCombat(){
	let combat = document.getElementById('combatnavevo');
	combat.classList.replace('taboff','gold');
	let com = EVO.combat;
	let creation = creations();
	let offCode = '';
	let defCode = '';
	let spdCode = '';
	let splCode = '';
	let mth = (1+com.cbtevo.length)*10;
	let chk,stg,cnt;
	let max = com.cbtMax + REC.ability;
	let cbt = function(y){return '<p id="'+y+'" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="combat(this.id)"></p>'};
	if (EVO.specialized > 1 && Math.floor(EVO.stage/2) > com.offG + com.defG + com.spdG + com.splG && creation >= (com.offG + com.defG + com.spdG + com.splG + 1)*10){
		if (EVO.muscleSwitch == 'on' || EVO.digestiveSwitch == 'on' || EVO.stage > 3) {offCode = cbt('offense');}
		if (EVO.respiratorySwitch == 'on' || EVO.sightSwitch == 'on' || EVO.stage > 3) {defCode = cbt('defense');}
		if (EVO.vascularSwitch == 'on' || EVO.excretionSwitch == 'on' || EVO.stage > 3) {spdCode = cbt('speed');}
		if (EVO.balanceSwitch == 'on' || EVO.nerveSwitch == 'on' || EVO.stage > 3) {splCode = cbt('special');}
	}
	if (com.offG > 0){
		chk = 0;
		if (check(EVO,'limb') > -1){chk += 1;}
		if (check(EVO,'frce') > -1){chk += 1;}
		if (check(EVO,'crit') > -1){chk += 1;}
		if (com.offG + REC.offensive > chk && max > com.cbtevo.length && creation >= mth){
			stg = '';
			cnt = 0;
			let off = [];
			if (check(EVO,'limb') == -1 && EVO.stage == 2){stg = cbt('limb');}
			if (check(EVO,'frce') == -1 && cnt < 2){off[cnt] = cbt('frce'); cnt++;}
			if (check(EVO,'crit') == -1 && cnt < 2){off[cnt] = cbt('crit'); cnt++;}
			offCode = stg + off[0] + off[1];
		}
	}
	if (com.defG > 0){
		chk = 0;
		if (check(EVO,'shell') > -1){chk += 1;}
		if (check(EVO,'anti') > -1){chk += 1;}
		if (check(EVO,'regen') > -1){chk += 1;}
		if (com.defG + REC.defensive > chk && max > com.cbtevo.length && creation >= mth){
			stg = '';
			cnt = 0;
			let def = [];
			if (check(EVO,'shell') == -1 && EVO.stage == 2){stg = cbt('shell');}
			if (check(EVO,'anti') == -1 && cnt < 2){def[cnt] = cbt('anti'); cnt++;}
			if (check(EVO,'regen') == -1 && cnt < 2){def[cnt] = cbt('regen'); cnt++;}
			defCode = stg + def[0] + def[1];
		}
	}
	if (com.spdG > 0){
		chk = 0;
		if (check(EVO,'burst') > -1){chk += 1;}
		if (check(EVO,'run') > -1){chk += 1;}
		if (check(EVO,'line') > -1){chk += 1;}
		if (com.spdG + REC.speed > chk && max > com.cbtevo.length && creation >= mth){
			stg = '';
			cnt = 0;
			let spd = [];
			if (check(EVO,'burst') == -1 && EVO.stage == 2){stg = cbt('burst');}
			if (check(EVO,'run') == -1 && cnt < 2){spd[cnt] = cbt('run'); cnt++;}
			if (check(EVO,'line') == -1 && cnt < 2){spd[cnt] = cbt('line'); cnt++;}
			spdCode = stg + spd[0] + spd[1];
		}
	}
	if (com.splG > 0){
		chk = 0;
		if (check(EVO,'elec') > -1){chk += 1;}
		if (check(EVO,'venom') > -1){chk += 1;}
		if (check(EVO,'lumin') > -1){chk += 1;}
		if (com.splG + REC.special > chk && max > com.cbtevo.length && creation >= mth){
			stg = '';
			cnt = 0;
			let spl = [];
			if (check(EVO,'elec') == -1 && EVO.stage == 2){stg = cbt('elec');}
			if (check(EVO,'venom') == -1 && cnt < 2){spl[cnt] = cbt('venom'); cnt++;}
			if (check(EVO,'lumin') == -1 && cnt < 2){spl[cnt] = cbt('lumin'); cnt++;}
			splCode = stg + spl[0] + spl[1];
		}
	}
	let combatCode = '<p class="combats gold"></p>';
	let code = combatCode + offCode + defCode + spdCode + splCode;
	doc('combatUpgrade',code);
	if (code == combatCode){
		combat.classList.replace('gold','taboff');
	}
	if((com.offG > 0 || com.defG > 0 || com.spdG > 0 || com.splG > 0) && !document.getElementById('experience')){
		copy('combat','experience');
		document.getElementById('experience').removeAttribute("onclick");
	}
	css('experience',Math.floor(com.exp));
	offCode = '';
	defCode = '';
	spdCode = '';
	splCode = '';
	let grade = 0;
	let html = function(z){
		if (grade > com[z] && !document.getElementById(z)){copy('combat',z);}
		if (0 < com[z] && grade <= com[z] && document.getElementById(z)){document.getElementById(z).remove();}
	}
	grade = com.offG*10;
	if (EVO.stage > 2 && EVO.three.boost == 'Camoflauge'){grade += 5;}
	html('offense');
	grade = com.defG*10;
	if (EVO.stage > 2 && EVO.three.boost == 'Territorial'){grade += 5;}
	html('defense');
	grade = com.spdG*10;
	if (EVO.stage > 2 && EVO.three.boost == 'Roaming'){grade += 5;}
	html('speed');
	grade = com.splG*10;
	if (EVO.stage > 2 && EVO.three.boost == 'Roaming'){grade += 5;}
	html('special');
	if (com.cbtevo.length > 0){
		let cbtevo = '';
		for (let i = 0; i < com.cbtevo.length; i++){
			cbtevo += '<span id="'+com.cbtevo[i]+'" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)"></span>';
		}
		doc('cbtevoHTML','<br><p>Combat Evolutions<br><br>' + cbtevo + '</p>');
	}
}

function combat(x){
	let cbt = EVO.combat.cbtevo;
	if (x == 'offense'){EVO.combat.offG += 1; EVO.combat.cbtMax += 1;}
	else if (x == 'defense'){EVO.combat.defG += 1; EVO.combat.cbtMax += 1;}
	else if (x == 'speed'){EVO.combat.spdG += 1; EVO.combat.cbtMax += 1;}
	else if (x == 'special'){EVO.combat.splG += 1; EVO.combat.cbtMax += 1;}
	else if (x == 'limb'){cbt.push(x);}
	else if (x == 'frce'){cbt.push(x);}
	else if (x == 'crit'){cbt.push(x);}
	else if (x == 'shell'){cbt.push(x);}
	else if (x == 'anti'){cbt.push(x);}
	else if (x == 'regen'){cbt.push(x);}
	else if (x == 'burst'){cbt.push(x);}
	else if (x == 'run'){cbt.push(x);}
	else if (x == 'line'){cbt.push(x);}
	else if (x == 'elec'){cbt.push(x);}
	else if (x == 'venom'){cbt.push(x);}
	else if (x == 'lumin'){cbt.push(x);}
	if (x.match(/^(offense|defense|speed|special)$/)) {EVO.evolved += (EVO.combat.offG + EVO.combat.defG + EVO.combat.spdG + EVO.combat.splG)*10;}
	else {EVO.evolved += (1+cbt.length)*10;}
	evolutionCombat();
}

function cbtMath(){return Math.floor(10*Math.pow(2,EVO.combat.offense + EVO.combat.defense + EVO.combat.speed + EVO.combat.special));}

function cbtupg(x){
	if(EVO.combat.exp >= cbtMath()){
		EVO.combat.exp -= cbtMath();
		EVO.combat[x] += 1;
		css(x,EVO.combat[x]);
		stat();
		evolutionCombat();
		css('experience',Math.floor(EVO.combat.exp));
	}
}

function stat(){
	css('off',EVO.combat.offense);
	css('def',EVO.combat.defense);
	css('spd',EVO.combat.speed);
	css('spl',EVO.combat.special);
	css('str',Math.floor(EVO.combat.offense+(fun.add.muscle()+fun.add.digestive())/10));
	css('dex',Math.floor(EVO.combat.special+(fun.add.respiratory()+fun.add.sight())/10));
	css('con',Math.floor(EVO.combat.defense+(fun.add.vascular()+fun.add.excretion())/10));
	css('agl',Math.floor(EVO.combat.speed+(fun.add.balance()+fun.add.nerve())/10));
	EVO.combat.mhp = Math.floor((EVO.combat.defense+(fun.add.vascular()+fun.add.excretion())/10) * (1+(EVO.combat.offense+EVO.combat.defense+EVO.combat.speed+EVO.combat.special)/100)*(1-(EVO.combat.scar/100)));
	if (EVO.combat.mhp < 10){EVO.combat.mhp = 10;}
	css('mhp',EVO.combat.mhp);
	css('hp', EVO.combat.hp);
	EVO.combat.msp = EVO.combat.offense + EVO.combat.defense + EVO.combat.speed + EVO.combat.special + 10;
	css('msp',EVO.combat.msp);
	css('sp', EVO.combat.sp);
	if (EVO.combat.hp < EVO.combat.mhp || EVO.combat.sp < EVO.combat.msp){setTimeout(heal, Math.ceil(60000*fun.mul.balance()));}
}

function heal(){
	var stg;
	if (EVO.stage == 2){stg = 'nutrient';}
	if (EVO.stage == 3){stg = 'mineral';}
	var cost = 100-(EVO.one.mitosis/10);
	if (EVO.combat.hp < EVO.combat.mhp && EVO[stg] >= EVO.stage*cost){
		EVO[stg] -= EVO.stage*cost;
		EVO.combat.hp += 1;
		css('hp', EVO.combat.hp);
	} else if (EVO.combat.sp < EVO.combat.msp && EVO[stg] >= EVO.stage*cost){
		EVO[stg] -= EVO.stage*cost;
		EVO.combat.sp += 1;
		css('sp', EVO.combat.sp);
	}
	if (EVO.combat.hp < EVO.combat.mhp || EVO.combat.sp < EVO.combat.msp){setTimeout(heal, Math.ceil(60000*fun.mul.balance()));}
}

var abilityCost = {
	'limb': 3,
	'frce': 1,
	'crit': 0,
	'shell': 3,
	'anti': 1,
	'regen': 0,
	'burst': 3,
	'run': 1,
	'line': 0,
	'elec': 3,
	'venom': 3,
	'lumin': 3,
};

function cbt(moveCost,npcSizeMod){
	cost.fight = 'on';
	var food;
	if (EVO.stage == 2){food = 'nutrient';}
	if (EVO.stage == 3){food = 'mineral';}
	var size;
	var one = {
		"off": EVO.combat.offense,
		"def": EVO.combat.defense,
		"spd": EVO.combat.speed,
		"spl": EVO.combat.special,
		"str": 0,
		"dex": 0,
		"con": 0,
		"agl": 0,
		"mhp": EVO.combat.mhp,
		"hp": EVO.combat.hp,
		"msp": EVO.combat.msp,
		"sp": EVO.combat.sp,
		"size": EVO.size.game,
		"arm": 0,
		"combat": {
			"cbtevo": EVO.combat.cbtevo,
		},
		"retreat": EVO.combat.retreat,
		"line": 0,
		"elec": 'off',
		"venom": 'off',
		"vendur": 0,
	};
	size = one.size - npcSizeMod;
	one.str = Math.floor((EVO.combat.offense+(fun.add.muscle()+fun.add.digestive())/10)*(1+(size/10)));
	one.con = Math.floor((EVO.combat.defense+(fun.add.vascular()+fun.add.excretion())/10)*(1+(size/10)));
	one.dex = Math.floor((EVO.combat.special+(fun.add.respiratory()+fun.add.sight())/10)*(1-(size/10)));
	one.agl = Math.floor((EVO.combat.speed+(fun.add.balance()+fun.add.nerve())/10)*(1-(size/10)));
	if (EVO.one.membraneScore == 3){one.arm += Math.floor(EVO.size.game/10)+1;}
	one.arm += Math.floor(EVO.two.celladhesion/50);
	if (check(one,'shell') > -1){one.arm += EVO.combat.defense;}
	if (EVO.stage >= 3 && EVO.three.skeleton == 'ExoSkeleton'){
		one.arm += 1;
		if (EVO.stage > 3){Math.floor(fun.add.skeleton()/100);}
	}
	if (check(one,'line') > -1){one.line = Math.floor(one.spd/10);}
	var two = {
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
		"arm": 0,
		"combat": {
			"cbtevo": [],
		},
		"retreat": 0,
		"line": 0,
		"elec": 'off',
		"venom": 'off',
		"vendur": 0,
	};
	npc();
	function npc(){
		size = npcSizeMod - one.size;
		var points = Math.floor((EVO.combat.offense+EVO.combat.defense+EVO.combat.speed+EVO.combat.special)+(fun.add.muscle()+fun.add.digestive()+fun.add.vascular()+fun.add.excretion()+fun.add.balance()+fun.add.nerve()+fun.add.respiratory()+fun.add.sight())/10);
		for (let i = 0; i < points; i++){
			let rnd = Math.floor(Math.random()*4);
			if (rnd == 0){two.str++;}
			else if (rnd == 1){two.con++;}
			else if (rnd == 2){two.dex++;}
			else if (rnd == 3){two.agl++;}
		}
		two.str = Math.floor(two.str*(1+(size/10)));
		two.con = Math.floor(two.con*(1+(size/10)));
		two.dex = Math.floor(two.dex*(1-(size/10)));
		two.agl = Math.floor(two.agl*(1-(size/10)));
		two.mhp = Math.floor(two.con*(1+(two.off+two.def+two.spd+two.spl)/100));
		two.msp = two.off+two.def+two.spd+two.spl+10;
		two.arm = EVO.combat.cbtevo.length;
		two.retreat = 20;
		if (two.mhp < 10){two.mhp = 10;}
		two.hp = two.mhp;
		if (two.msp < 10){two.msp = 10;}
		two.sp = two.msp;
	}
	if (check(two,'line') > -1){two.line = Math.floor(two.spd/10);}
	function sp(x,y){
		var spc = y - x.line;
		if (spc < 0){spc = 0;}
		return spc;
	}
	function electro(x,y){
		if (y.spl >= Math.floor((Math.random()*100)+1)){
			y.elec = 'on';
			if (x == one){elec = '<br>Your opponent has been stunned.';}
			if (x == two){elec = '<br>Your opponent has stunned you.';}
		}
	}
	function venom(x,y){
		y.venom = 'on';
		y.vendur = Math.floor(x.spl/5);
		if (x == one){veno = '<br>Your opponent has been poisoned.';}
		if (x == two){veno = '<br>Your opponent has poisoned you.';}
	}
	var fled = 'off';
	var exp = two.off + two.def + two.spd + two.spl + two.str + two.dex + two.con + two.agl;
	if (one.agl > two.agl){plone();}
	else {pltwo();}
	function plone(){
		fight(one,two);
		if (one.hp > 0 && two.hp > 0 && fled == 'off'){setTimeout(pltwo, 3000);}
		if (one.hp < 0){one.hp = 0;}
		if (two.hp < 0){two.hp = 0;}
	}
	function pltwo(){
		fight(two,one);
		if (one.hp > 0 && two.hp > 0 && fled == 'off'){setTimeout(plone, 3000);}
		if (one.hp < 0){one.hp = 0;}
		if (two.hp < 0){two.hp = 0;}
	}
	var vdmg;
	var elec;
	var veno;
	var attNum;
	var text;
	function fight(attacker,defender){
		vdmg = '';
		elec = '';
		veno = '';
		attNum = 1;
		text = '';
		var spcAtt = 0;
		var spcDef = 0;
		if (attacker.venom == 'on'){
			let ven = Math.floor(defender.spl/5);
			if (check(attacker,'anti') > -1 && attacker.sp - sp(attacker,spcAtt) > 0){
				ven -= Math.floor(attacker.defender/5);
				spcAtt += abilityCost.anti;
			}
			attacker.hp -= ven;
			attacker.vendur -= 1;
			if (attacker == one){vdmg = '<br>You recieved ' + ven + ' points of venom damage.';}
			if (attacker == two){vdmg = '<br>Your opponent recieved ' + ven + ' points of venom damage.';}
			if (attacker.vendur < 1){
				attacker.venom = 'off';
				if (attacker == one){vdmg += '<br>You are no longer poisoned.';}
				if (attacker == two){vdmg += '<br>Your opponent is no longer poisoned.';}
			}
		}
		if (attacker.elec == 'off' && attacker.hp > 0 && defender.hp > 0){
			var action = 'on';
			var attExh = 1;
			if (attacker.sp < 1){attExh = 2;}
			var defExh = 1;
			if (defender.sp < 1){defExh = 2;}
			var retreat = attacker.mhp*attacker.retreat/100;
			var lumin = 'off';
			if (attacker.hp > retreat){
				var hit = attacker.dex;
				if (check(defender,'lumin') > -1 && defender.sp - sp(defender,spcDef) > 0){
					hit -= Math.floor(defender.spl/2);
					lumin = 'on';
					spcDef += abilityCost.lumin;
				}
				if (hit < 1){hit = 1;}
				var dge = defender.agl/2;
				if (check(defender,'burst') > -1 && defender.sp - sp(defender,spcDef) > 0){
					dge *= Math.floor(defender.spd/3);
					spcDef += abilityCost.burst;
				}
				if (dge < 1){dge = 1;}
				if (check(attacker,'limb') > -1 && attacker.sp - sp(attacker,spcAtt) > 0){
					attNum++;
					spcAtt += abilityCost.limb;
				}
				for (let i = 0; i < attNum; i++){
					attack(i);
					action = 'off';
				}
				function attack(i){
					let number = '';
					let damage = 'miss';
					let critical = '';
					if (hit/attExh > Math.random()*((hit/attExh)+(dge/defExh))){
						if (defender.elec == 'off' && check(attacker,'elec') > -1 && attacker.sp - sp(attacker,spcAtt) > 0){
							electro(attacker,defender);
							spcAtt += abilityCost.elec;
						}
						if (defender.venom == 'off' && check(attacker,'venom') > -1 && attacker.sp - sp(attacker,spcAtt) > 0){
							venom(attacker,defender);
							spcAtt += abilityCost.venom;
						}
						var str = attacker.str;
						var dex = attacker.dex;
						if (lumin == 'on') {dex -= defender.spl/2;}
						if (str < dex){dex = str;}
						str = Math.floor(str);
						dex = Math.floor(dex);
						var dmg = (Math.random()*(str-dex))+dex;
						if (check(attacker,'limb') > -1){
							dmg = dmg/2;
							dmg += (dmg*attacker.off/100);
						}
						if (check(attacker,'frce') > -1 && attacker.sp - sp(attacker,spcAtt) > 0){
							dmg += (dmg*(attacker.off*2)/100);
							spcAtt += abilityCost.frce;
						}
						if (check(attacker,'crit') > -1 && (attacker.off*0.5).toFixed(1) > (Math.random()*100)+1){
							critical = 'crit';
							dmg *= ((attacker.off*2.5).toFixed(1)+100)/100;
						}
						dmg = ((dmg/attExh)-defender.arm);
						if (dmg < 1){dmg = 1;}
						dmg = Math.floor(dmg);
						defender.hp -= dmg;
						damage = dmg;
					}
					if (i == 0 && attNum > 1){number = 'first ';}
					if (i == 1){number = 'second ';}
					if (i == 2){number = 'third ';}
					if (i == 3){number = 'fourth ';}
					if (i == 4){number = 'fifth ';}
					if (critical == 'crit'){critical = 'was a critical and ';}
					if (damage == 'miss'){
						if (attacker == one){text += '<br>Your ' + number + 'hit missed.';}
						if (attacker == two){text += '<br>Your opponents ' + number + 'hit missed.';}
					} else {
						if (attacker == one){text += '<br>Your ' + number + 'hit ' + critical + 'dealt ' + damage + ' damage.';}
						if (attacker == two){text += '<br>Your opponents ' + number + 'hit ' + critical + 'dealt ' + damage + ' damage.';}
					}
				}
			}
			if (attacker.hp <= retreat && action == 'on'){
				var retreat = attacker.agl/2;
				if (check(attacker,'burst') > -1 && attacker.sp - sp(attacker,spcAtt) > 0){
					retreat *= Math.floor(attacker.spd/3);
					spcAtt += abilityCost.burst;
				}
				if (check(attacker,'run') > -1 && attacker.sp - sp(attacker,spcAtt) > 0){
					retreat *= Math.floor(attacker.spd/5);
					spcAtt += abilityCost.run;
				}
				var chase = defender.agl/2;
				if (check(defender,'burst') > -1 && defender.sp - sp(defender,spcDef) > 0){
					chase *= Math.floor(defender.spd/3);
					spcDef += abilityCost.burst;
				}
				if (check(defender,'run') > -1 && defender.sp - sp(defender,spcDef) > 0){
					chase *= Math.floor(defender.spd/5);
					spcDef += abilityCost.run;
				}
				if (retreat < 1){retreat = 1;}
				if (chase < 1){chase = 1;}
				if (retreat/attExh > Math.random()*((retreat/attExh)+(chase/defExh))){
					fled = 'on';
					if (attacker == one){text = '<br>You managed to run away.';}
					if (attacker == two){text = '<br>Your opponent managed to run away.';}
					setTimeout(flee(attacker), 3000);
				} else {
					if (attacker == one){text = '<br>You failed to run away.';}
					if (attacker == two){text = '<br>Your opponent failed to run away.';}
				}
			}
		}
		if (attacker.elec == 'on'){
			attacker.elec = 'off';
			if (attacker == one){elec = '<br>You are no longer stunned.';}
			if (attacker == two){elec = '<br>Your opponent is no longer stunned.';}
		}
		if (fled == 'off'){doc('event2HTML',vdmg + elec + veno + text);}
		if (one.hp < 1 && fled == 'off'){setTimeout(lose, 3000);}
		if (two.hp < 1 && fled == 'off'){setTimeout(win, 3000);}
		spcAtt = spcAtt - attacker.line;
		if (spcAtt < 0){spcAtt = 0;}
		attacker.sp -= spcAtt;
		spcDef = spcDef - defender.line;
		if (spcDef < 0){spcDef = 0;}
		defender.sp -= spcDef;
		EVO.combat.hp = one.hp;
		EVO.combat.sp = one.sp;
		css('hp', EVO.combat.hp);
		css('sp', EVO.combat.sp);
	}
	function flee(x){
		exp /= 2;
		EVO.combat.exp += exp;
		css('experience',Math.floor(EVO.combat.exp));
		EVO[food] += moveCost;
		if (x == one){
			doc('event1HTML','You successfully ran away.  You have run to a new area.');
			doc('event2HTML','You gained ' + exp + ' experince.');
			EVO.combat.lost += 1;
			move();
		}
		if (x == two){
			doc('event1HTML','Your opponent has successfully ran away.  They have ran to a new area.');
			doc('event2HTML','You gained ' + exp + ' experince.');
			EVO.combat.won += 1;
		}
		cost.fight = 'off';
	}
	function win(){
		var eat = fun.add.digestive()*10;
		if (two.mhp < eat){eat = two.mhp;}
		if (EVO.stage > 2 && EVO.three.diet == 'Carnivore'){eat *= 10;}
		doc('event1HTML','You defeated your opponent.');
		var reward = 'You gained ' + exp + ' experince.';
		if (EVO.stage == 2 || EVO.three.diet !== 'Herbivore'){reward = 'You gained ' + exp + ' experince and ' + eat + ' food.';}
		doc('event2HTML',reward);
		EVO.combat.exp += exp;
		css('experience',Math.floor(EVO.combat.exp));
		if (EVO.stage == 2 || EVO.three.diet !== 'Herbivore'){EVO.food += eat;}
		EVO[food] += moveCost;
		EVO.combat.won += 1;
		cost.fight = 'off';
	}
	function lose(){
		doc('event1HTML','Your opponent defeated you.');
		doc('event2HTML','');
		EVO.combat.exp += exp/2;
		css('experience',Math.floor(EVO.combat.exp));
		EVO[food] += moveCost;
		move();
		EVO[food] = 0;
		EVO.combat.lost += 1;
		if (check(one,'regen') == -1){EVO.combat.scar += 1;}
		document.getElementById('lay').classList.replace('layoff','layon');
		setTimeout(carnate,10000);
	}
}