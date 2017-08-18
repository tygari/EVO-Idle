function hlth(x){
	var hlth = EVO.hlth;
	if (x == '+'){hlth++;}
	if (x == '-'){hlth--;}
	if (hlth < 0){hlth = 0;}
	if (hlth > 100){hlth = 100;}
	EVO.hlth = hlth;
	doc('hlth',EVO.hlth);
}

function spcl(x){
	var spcl = EVO.spcl;
	if (x == '+'){spcl++;}
	if (x == '-'){spcl--;}
	if (spcl < 0){spcl = 0;}
	if (spcl > 100){spcl = 100;}
	EVO.spcl = spcl;
	doc('spcl',EVO.spcl);
}

function run(x){
	var run = EVO.run;
	if (x == '+'){run++;}
	if (x == '-'){run--;}
	if (run < 0){run = 0;}
	if (run > 100){run = 100;}
	EVO.run = run;
	doc('run',EVO.run);
}

function check(x,y){return x.cbtevo.indexOf(y);}

function evolutionCombat(){
	var creation = EVO.evolution - EVO.evolved + EVO.bonus + REC.bonus;
	var swt = 'off';
	var offCode = '';
	var defCode = '';
	var spdCode = '';
	var splCode = '';
	var combatCode = '';
	var mth = (1+EVO.cbtevo.length)*10;
	var chk;
	var stg;
	var cnt;
	var max = EVO.cbtMax + REC.cbt;
	if (EVO.specialized > 1 && Math.floor(EVO.stage/2) > EVO.offG + EVO.defG + EVO.spdG + EVO.splG && creation >= (EVO.offG + EVO.defG + EVO.spdG + EVO.splG + 1)*10){
		swt = 'on';
		if (EVO.muscleSwitch == 'on' || EVO.digestiveSwitch == 'on' || EVO.stage > 3) {offCode = '<p title="Offensive evolutions are the embodiment of those who strike first strike last." onclick="combat(\'off\')"><b style="color:purple">Offensive</b></p>';}
		if (EVO.respiratorySwitch == 'on' || EVO.sightSwitch == 'on' || EVO.stage > 3) {defCode = '<p title="Defensive evolutions are the embodiment of not having to last forever just last long enough." onclick="combat(\'def\')"><b style="color:purple">Defensive</b></p>';}
		if (EVO.vascularSwitch == 'on' || EVO.excretionSwitch == 'on' || EVO.stage > 3) {spdCode = '<p title="Speed evolutions are the embodiment if they can\'t be caught they can\'t be hurt." onclick="combat(\'spd\')"><b style="color:purple">Speed</b></p>';}
		if (EVO.balanceSwitch == 'on' || EVO.nerveSwitch == 'on' || EVO.stage > 3) {splCode = '<p title="Special evolutions are the embodiment of being able to do something amazing and terrifying." onclick="combat(\'spl\')"><b style="color:purple">Special</b></p>';}
	}
	if (EVO.offG > 0){
		chk = 0;
		if (check(EVO,'Extra Limbs') > -1){chk += 1;}
		if (check(EVO,'Fierce') > -1){chk += 1;}
		if (check(EVO,'Critical') > -1){chk += 1;}
		//if (check(EVO,'Gluttonous') > -1){chk += 1;}
		if (EVO.offG + REC.off > chk && max > EVO.cbtevo.length && creation >= mth){
			swt = 'on';
			stg = '';
			cnt = 0;
			var off = [];
			if (check(EVO,'Extra Limbs') == -1 && EVO.stage == 2){stg = '<p title="Extra Limbs are special limbs that do more than normal limbs." onclick="combat(\'limb\')"><b style="color:purple">Extra Limbs</b></p>';}
			if (check(EVO,'Fierce') == -1 && cnt < 2){off[cnt] = '<p title="Fierce creatures fight harder if not smarter." onclick="combat(\'frce\')"><b style="color:purple">Fierce</b></p>'; cnt++;}
			if (check(EVO,'Critical') == -1 && cnt < 2){off[cnt] = '<p title="Wild attacks sometimes hit vunerable spots." onclick="combat(\'crit\')"><b style="color:purple">Critical</b></p>'; cnt++;}
			//if (check(EVO,'Gluttonous') == -1 && cnt < 2){off[cnt] = '<p title="Gluttonous sinfully over eatting large amounts of food from your bigger kills." onclick="combat(\'glut\')"><b style="color:purple">Gluttonous</b></p>'; cnt++;}
			offCode = stg + off[0] + off[1];
		}
	}
	if (EVO.defG > 0){
		chk = 0;
		if (check(EVO,'Shell') > -1){chk += 1;}
		if (check(EVO,'Anti-Venom') > -1){chk += 1;}
		if (check(EVO,'Regeneration') > -1){chk += 1;}
		if (EVO.defG + REC.def > chk && max > EVO.cbtevo.length && creation >= mth){
			swt = 'on';
			stg = '';
			cnt = 0;
			var def = [];
			if (check(EVO,'Shell') == -1 && EVO.stage == 2){stg = '<p title="Shells are a protective coating of extracellular polymeric substance." onclick="combat(\'shell\')"><b style="color:purple">Shell</b></p>';}
			if (check(EVO,'Anti-Venom') == -1 && cnt < 2){def[cnt] = '<p title="AntiVenom neutralizes the powerful effects of venom." onclick="combat(\'anti\')"><b style="color:purple">Anti-Venom</b></p>'; cnt++;}
			if (check(EVO,'Regeneration') == -1 && cnt < 2){def[cnt] = '<p title="Regeneration heals wounds completely after battle." onclick="combat(\'regen\')"><b style="color:purple">Regeneration</b></p>'; cnt++;}
			defCode = stg + def[0] + def[1];
		}
	}
	if (EVO.spdG > 0){
		chk = 0;
		if (check(EVO,'Burst') > -1){chk += 1;}
		if (check(EVO,'Run') > -1){chk += 1;}
		if (check(EVO,'Streamline') > -1){chk += 1;}
		if (EVO.spdG + REC.spd > chk && max > EVO.cbtevo.length && creation >= mth){
			swt = 'on';
			stg = '';
			cnt = 0;
			var spd = [];
			if (check(EVO,'Burst') == -1 && EVO.stage == 2){stg = '<p title="Burst is a sudden surge of speed." onclick="combat(\'burst\')"><b style="color:purple">Burst</b></p>';}
			if (check(EVO,'Run') == -1 && cnt < 2){spd[cnt] = '<p title="Run how quickly one can flee a battle." onclick="combat(\'run\')"><b style="color:purple">Run</b></p>'; cnt++;}
			if (check(EVO,'Streamline') == -1 && cnt < 2){spd[cnt] = '<p title="Streamline refines the efficiency of the body in combat." onclick="combat(\'line\')"><b style="color:purple">Streamline</b></p>'; cnt++;}
			spdCode = stg + spd[0] + spd[1];
		}
	}
	if (EVO.splG > 0){
		chk = 0;
		if (check(EVO,'Electrogenesis') > -1){chk += 1;}
		if (check(EVO,'Venom') > -1){chk += 1;}
		if (check(EVO,'Luminesence') > -1){chk += 1;}
		if (EVO.splG + REC.spl > chk && max > EVO.cbtevo.length && creation >= mth){
			swt = 'on';
			stg = '';
			cnt = 0;
			var spl = [];
			if (check(EVO,'Electrogenesis') == -1 && EVO.stage == 2){stg = '<p title="Electrogenesis is the ability to create an electric field for both prey and predators." onclick="combat(\'elec\')"><b style="color:purple">Electrogenesis</b></p>';}
			if (check(EVO,'Venom') == -1 && cnt < 2){spl[cnt] = '<p title="Venom is the use of poisons for both prey and predators." onclick="combat(\'venom\')"><b style="color:purple">Venom</b></p>'; cnt++;}
			if (check(EVO,'Luminesence') == -1 && cnt < 2){spl[cnt] = '<p title="Luminesence is the ability to attract prey and blind predators." onclick="combat(\'lumin\')"><b style="color:purple">Luminesence</b></p>'; cnt++;}
			splCode = stg + spl[0] + spl[1];
		}
	}
	if (swt == 'on'){combatCode = '<p style="color:white" title="Choose your combat evolution carefully.">Combat Evolutions</p>';}
	doc('evolutionCombat',combatCode + offCode + defCode + spdCode + splCode);
	offCode = '';
	defCode = '';
	spdCode = '';
	splCode = '';
	var grade = 0;
	grade = EVO.offG*10;
	if (EVO.three.boost == 'Camoflauge'){grade += 5;}
	if (grade > EVO.off){offCode = '<p title="Offense effects health, stamina, and strength." onclick="cbtupg(\'off\')"><b style="color:purple">Offensive</b>';}
	grade = EVO.defG*10;
	if (EVO.three.boost == 'Territorial'){grade += 5;}
	if (grade > EVO.def){defCode = '<p title="Defense effects health, stamina, and constituion." onclick="cbtupg(\'def\')"><b style="color:purple">Defense</b>';}
	grade = EVO.spdG*10;
	if (EVO.three.boost == 'Roaming'){grade += 5;}
	if (grade > EVO.spd){spdCode = '<p title="Speed effects health, stamina, and agility." onclick="cbtupg(\'spd\')"><b style="color:purple">Speed</b>';}
	grade = EVO.splG*10;
	if (EVO.three.boost == 'Roaming'){grade += 5;}
	if (grade*10 > EVO.spl){splCode = '<p title="Special effects health, stamina, and dexterity." onclick="cbtupg(\'spl\')"><b style="color:purple">Special</b>';}
	var cbtcost = '<br>Experience: <span id="exp"></span><br>Combat Cost: <span id="cbtCost"></span></p>';
	if (offCode !== '' || defCode !== '' || spdCode !== '' || splCode !== ''){
		doc('cbt', offCode + defCode + spdCode + splCode + cbtcost);
		doc('exp',EVO.exp);
		doc('cbtCost',cbtMath());
	} else {doc('cbt','');}
	if (EVO.cbtevo.length > 0){
		var cbtevo = '';
		for (i = 0; i < EVO.cbtevo.length; i++){
			cbtevo = cbtevo + '<br>' + EVO.cbtevo[i];
		}
		doc('cbtevoHTML','<p>Combat Evolutions<br>' + cbtevo + '</p>');
	}
}

function combat(x){
	if (x == 'off'){EVO.offG += 1; EVO.cbtMax += 1;}
	if (x == 'def'){EVO.defG += 1; EVO.cbtMax += 1;}
	if (x == 'spd'){EVO.spdG += 1; EVO.cbtMax += 1;}
	if (x == 'spl'){EVO.splG += 1; EVO.cbtMax += 1;}
	if (x == 'limb'){EVO.cbtevo.push("Extra Limbs");}
	if (x == 'frce'){EVO.cbtevo.push("Fierce");}
	if (x == 'crit'){EVO.cbtevo.push("Critical");}
	//if (x == 'glut'){EVO.cbtevo.push("Gluttonous");}
	if (x == 'shell'){EVO.cbtevo.push("Shell");}
	if (x == 'anti'){EVO.cbtevo.push("Anti-Venom");}
	if (x == 'regen'){EVO.cbtevo.push("Regeneration");}
	if (x == 'burst'){EVO.cbtevo.push("Burst");}
	if (x == 'run'){EVO.cbtevo.push("Run");}
	if (x == 'line'){EVO.cbtevo.push("Streamline");}
	if (x == 'elec'){EVO.cbtevo.push("Electrogenesis");}
	if (x == 'venom'){EVO.cbtevo.push("Venom");}
	if (x == 'lumin'){EVO.cbtevo.push("Luminesence");}
	if (x.match(/^(off|def|spd|spl)$/)) {EVO.evolved += (EVO.offG + EVO.defG + EVO.spdG + EVO.splG)*10;}
	else {EVO.evolved += (1+EVO.cbtevo.length)*10;}
	evolutionCombat();
}

function cbtMath(){return Math.floor(10*Math.pow(2,EVO.off + EVO.def + EVO.spd + EVO.spl));}

function cbtupg(x){
	if(EVO.exp >= cbtMath()){
		EVO.exp -= cbtMath();
		EVO[x] += 1;
		doc(x,EVO[x]);
		stat();
		evolutionCombat();
	}
}

function stat(){
	doc('off',EVO.off);
	doc('def',EVO.def);
	doc('spd',EVO.spd);
	doc('spl',EVO.spl);
	doc('str',Math.floor(EVO.off+(fun.add.muscle()+fun.add.digestive())/10));
	doc('dex',Math.floor(EVO.spl+(fun.add.respiratory()+fun.add.sight())/10));
	doc('con',Math.floor(EVO.def+(fun.add.vascular()+fun.add.excretion())/10));
	doc('agl',Math.floor(EVO.spd+(fun.add.balance()+fun.add.nerve())/10));
	EVO.mhp = (Math.floor(EVO.def+(fun.add.vascular()+fun.add.excretion())/10) * (1+(EVO.off + EVO.def + EVO.spd + EVO.spl)/100)) * (1-(EVO.scar/100));
	if (EVO.mhp < 10){EVO.mhp = 10;}
	doc('mhp',EVO.mhp);
	doc('hp', EVO.hp);
	EVO.msp = EVO.off + EVO.def + EVO.spd + EVO.spl + 10;
	doc('msp',EVO.msp);
	doc('sp', EVO.sp);
	var time = fun.mul.balance();
	if (EVO.hp < EVO.mhp || EVO.sp < EVO.msp){setTimeout(heal, Math.ceil(60000*time));}
	function heal(){
		if (EVO.hp < EVO.mhp){
			EVO.nutrient -= EVO.cellT;
			EVO.hp += 1;
			doc('hp', EVO.hp);
		} else if (EVO.sp < EVO.msp){
			EVO.nutrient -= EVO.cellT;
			EVO.sp += 1;
			doc('sp', EVO.sp);
		}
		if (EVO.hp < EVO.mhp || EVO.sp < EVO.msp){setTimeout(heal, Math.ceil(60000*time));}
	}
}

function cbt(a,b,c){
	cost.fight = 'on';
	var one = {
		"off": EVO.off,
		"def": EVO.def,
		"spd": EVO.spd,
		"spl": EVO.spl,
		"str": 0,
		"dex": 0,
		"con": 0,
		"agl": 0,
		"mhp": EVO.mhp,
		"hp": EVO.hp,
		"msp": EVO.msp,
		"sp": EVO.sp,
		"arm": 0,
		"cbtevo": EVO.cbtevo,
		"run": EVO.run,
		"line": 0,
		"elec": 'off',
		"venom": 'off',
		"vendur": 0,
	};
	one.str = Math.floor(EVO.off+(fun.add.muscle()+fun.add.digestive())/10);
	one.dex = Math.floor(EVO.spl+(fun.add.respiratory()+fun.add.sight())/10);
	one.con = Math.floor(EVO.def+(fun.add.vascular()+fun.add.excretion())/10);
	one.agl = Math.floor(EVO.spd+(fun.add.balance()+fun.add.nerve())/10);
	if (check(one,'Shell') > -1){one.arm += EVO.def;}
	if (check(one,'Streamline') > -1){one.line = Math.floor(one.spd/10);}
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
		"cbtevo": [],
		"run": 0,
		"line": 0,
		"elec": 'off',
		"venom": 'off',
		"vendur": 0,
	};
	npc();
	function npc(){
		two.mhp = Math.floor(one.mhp + (EVO.stage+b)*5 - Math.random()*EVO.stage*10);
		two.msp = Math.floor(one.msp + (EVO.stage+b)*5 - Math.random()*EVO.stage*10);
		two.str = Math.floor(one.str + EVO.stage+b - Math.random()*EVO.stage*2);
		two.dex = Math.floor(one.dex + EVO.stage+b - Math.random()*EVO.stage*2);
		two.con = Math.floor(one.con + EVO.stage+b - Math.random()*EVO.stage*2);
		two.agl = Math.floor(one.agl + EVO.stage+b - Math.random()*EVO.stage*2);
		two.arm = EVO.cbtevo.length;
		two.run = 20;
	}
	if (two.mhp < 10){two.mhp = 10;}
	two.hp = two.mhp;
	if (two.msp < 10){two.msp = 10;}
	two.sp = two.msp;
	if (two.sp < 10){two.sp = 10;}
	if (two.str < 0){two.str = 0;}
	if (two.dex < 0){two.dex = 0;}
	if (two.con < 0){two.con = 0;}
	if (two.agl < 0){two.agl = 0;}
	if (check(two,'Streamline') > -1){two.line = Math.floor(two.spd/10);}
	function sp(x,y){
		var spc = y - x.line;
		if (spc < 0){spc = 0;}
		return spc;
	}
	function electro(x,y){
		if (y.spl >= Math.floor((Math.random()*100)+1)){
			y.elec = 'on';
			if (x == one){elec = '<p>Your opponent has been stunned.</p>';}
			if (x == two){elec = '<p>Your opponent has stunned you.</p>';}
		}
	}
	function venom(x,y){
		y.venom = 'on';
		y.vendur = Math.floor(x.spl/5);
		if (x == one){veno = '<p>Your opponent has been poisoned.</p>';}
		if (x == two){veno = '<p>Your opponent has poisoned you.</p>';}
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
	var limb;
	var crit;
	var act1;
	var act2;
	function fight(x,y){
		vdmg = '';
		elec = '';
		veno = '';
		limb = '';
		crit = '';
		act1 = '';
		act2 = '';
		var spcx = 0;
		var spcy = 0;
		if (x.venom == 'on'){
			var ven = Math.floor(y.spl/5);
			if (check(x,'Anti-Venom') > -1 && x.sp - sp(x,spcx) > 0){
				ven -= Math.floor(x.def/5);
				spcx += 1;
			}
			x.hp -= ven;
			x.vendur -= 1;
			if (x.vendur <= 0){x.venom = 'off';}
			if (x == one){vdmg = '<p>You recieved ' + ven + ' points of venom damage.</p>';}
			if (x == two){vdmg = '<p>Your opponent recieved ' + ven + ' points of venom damage.</p>';}
		}
		if (x.elec == 'off' && x.hp > 0 && y.hp > 0){
			var action = 'on';
			var exh = 1;
			if (x.sp < 1){exh = 2;}
			var oexh = 1;
			if (y.sp < 1){oexh = 2;}
			var run = x.mhp*x.run/100;
			var lumin = 'off';
			if (x.hp > run){
				if (check(x,'Extra Limbs') > -1 && x.sp - sp(x,spcx) > 0){
					limb = 'first';
					spcx += 3;
				}
				var hit = x.dex;
				if (check(y,'Luminesence') > -1 && y.sp - sp(y,spcy) > 0){
					hit -= Math.floor(y.spl/2);
					lumin = 'on';
					spcy += 3;
				}
				var dge = y.agl/2;
				if (check(y,'Burst') > -1 && y.sp - sp(y,spcy) > 0){
					dge *= Math.floor(y.spd/3);
					spcy += 3;
				}
				if (hit < 1){hit = 1;}
				if (dge < 1){dge = 1;}
				if (hit/exh > Math.random()*((hit/exh)+(dge/oexh))){
					if (y.elec == 'off' && check(x,'Electrogenesis') > -1 && x.sp - sp(x,spcx) > 0){electro(x,y); spcx += 3;}
					if (y.venom == 'off' && check(x,'Venom') > -1 && x.sp - sp(x,spcx) > 0){venom(x,y); spcx += 3;}
					var dex = x.dex;
					if (lumin == 'on') {dex -= y.spl/2;}
					if (dex < 0){dex = 0;}
					dex = Math.floor(dex);
					var dmg = (Math.random()*x.str-dex)+dex;
					if (limb == 'first '){
						dmg = dmg/2;
						dmg += (dmg*x.off/100);
					}
					if (check(x,'Fierce') > -1 && x.sp - sp(x,spcx) > 0){
						dmg += (dmg*(x.off*2)/100);
						spcx += 1;
					}
					if (check(x,'Critical') > -1 && (x.off*0.5).toFixed(1) > (Math.random()*100)+1){
						crit = 'critical '
						dmg *= ((x.off*2.5).toFixed(1)+100)/100;
					}
					dmg = ((dmg/exh)-y.arm);
					if (dmg < 1){dmg = 1;}
					dmg = Math.floor(dmg);
					y.hp -= dmg;
					if (x == one){act1 = '<p>Your ' + limb + crit + 'hit dealt ' + dmg + ' damage.</p>';}
					if (x == two){act1 = '<p>Your opponents ' + limb + crit + 'hit dealt ' + dmg + ' damage.</p>';}
				} else {
					if (x == one){act1 = '<p>Your ' + limb + 'hit missed.</p>';}
					if (x == two){act1 = '<p>Your opponents ' + limb + 'hit missed.</p>';}
				}
				if (limb == 'first'){
					crit = 'hit';
					if (hit/exh > Math.random()*((hit/exh)+(dge/oexh))){
						if (y.elec == 'off' && check(x,'Electrogenesis') > -1 && x.sp - sp(x,spcx) > 0){electro(x,y); spcx += 3;}
						if (y.venom == 'off' && check(x,'Venom') > -1 && x.sp - sp(x,spcx) > 0){venom(x,y); spcx += 3;}
						var dex = x.dex;
						if (lumin == 'on') {dex -= y.spl/2;}
						if (dex < 0){dex = 0;}
						dex = Math.floor(dex);
						var dmg = ((Math.random()*x.str-dex)+dex)/2 + (dmg*x.off/100);
						if (check(x,'Fierce') > -1 && x.sp  - sp(x,spcx) > 0){
							dmg += (dmg*(x.off*2)/100);
							spcx += 1;
						}
						if (check(x,'Critical') > -1 && (x.off*0.5).toFixed(1) > (Math.random()*100)+1){
							dmg *= ((x.off*2.5).toFixed(1)+100)/100;
						}
						dmg = ((dmg/exh)-y.arm);
						if (dmg < 1){dmg = 1;}
						dmg = Math.floor(dmg);
						y.hp -= dmg;
						if (x == one){act2 = '<p>Your second ' + crit + 'hit dealt ' + dmg + ' damage.</p>';}
						if (x == two){act2 = '<p>Your opponents second ' + crit + 'hit dealt ' + dmg + ' damage.</p>';}
					} else {
						if (x == one){act2 = '<p>Your second hit missed.</p>';}
						if (x == two){act2 = '<p>Your opponents second hit missed.</p>';}
					}
				}
				action = 'off';
			}
			if (x.hp <= run && action == 'on'){
				var rtr = x.agl/2;
				if (check(x,'Burst') > -1 && x.sp - sp(x,spcx) > 0){
					rtr *= Math.floor(x.spd/3);
					spcx += 3;
				}
				if (check(x,'Run') > -1 && x.sp - sp(x,spcx) > 0){
					rtr *= Math.floor(x.spd/5);
					spcx += 1;
				}
				var chs = y.agl/2;
				if (check(y,'Burst') > -1 && y.sp - sp(y,spcy) > 0){
					chs *= Math.floor(y.spd/3);
					spcy += 3;
				}
				if (check(y,'Run') > -1 && y.sp - sp(y,spcy) > 0){
					chs *= Math.floor(y.spd/5);
					spcy += 1;
				}
				if (rtr < 1){rtr = 1;}
				if (chs < 1){chs = 1;}
				if (rtr/exh > Math.random()*((rtr/exh)+(chs/oexh))){
					fled = 'on';
					if (x == one){act1 = '<p>You managed to run away.</p>';}
					if (x == two){act1 = '<p>Your opponent managed to run away.</p>';}
					setTimeout(flee(x), 3000);
				} else {
					if (x == one){act1 = '<p>You failed to run away.</p>';}
					if (x == two){act1 = '<p>Your opponent failed to run away.</p>';}
				}
			}
		}
		if (x.elec == 'on'){
			x.elec = 'off';
			if (x == one){elec = '<p>You are no longer stunned.</p>';}
			if (x == two){elec = '<p>Your opponent is no longer stunned.</p>';}
		}
		if (fled == 'off'){doc('event2HTML',vdmg + elec + veno + act1 + act2);}
		if (one.hp < 1 && fled == 'off'){setTimeout(lose, 3000);}
		if (two.hp < 1 && fled == 'off'){setTimeout(win, 3000);}
		spcx = spcx - x.line;
		if (spcx < 0){spcx = 0:}
		x.sp -= spcx;
		spcy = spcy - y.line;
		if (spcy < 0){spcy = 0:}
		y.sp -= spcy;
		EVO.hp = one.hp;
		EVO.sp = one.sp;
		doc('hp', EVO.hp);
		doc('sp', EVO.sp);
	}
	function flee(x){
		if (x == one){
			doc('event1HTML','You successfully ran away.  You have run to a new area.');
			doc('event2HTML','You gained ' + exp + ' experince.');
			EVO.exp += exp/2;
			if (EVO.stage == 2){EVO.nutrient += a;}
			if (EVO.stage == 3){EVO.mineral += a;}
			EVO.won += 1;
			move();
			stat();
			if (c == 'event'){event();}
			if (c == 'hunt'){hunts();}
		}
		if (x == two){
			doc('event1HTML','Your opponent has successfully ran away.  They have ran to a new area.');
			doc('event2HTML','You gained ' + exp + ' experince.');
			EVO.exp += exp/2;
			if (EVO.stage == 2){EVO.nutrient += a;}
			if (EVO.stage == 3){EVO.mineral += a;}
			EVO.lost += 1;
			stat();
			if (c == 'event'){event();}
			if (c == 'hunt'){hunts();}
		}
	}
	function win(){
		var eat = eat += fun.add.digestive()*10;
		if (two.mhp < eat){eat = two.mhp;}
		if (EVO.three.diet == 'Carnivore'){eat *= 10;}
		doc('event1HTML','You defeated your opponent.');
		var reward = 'You gained ' + exp + ' experince.';
		if (EVO.stage == 2 || EVO.three.diet !== 'Herbivore'){reward = 'You gained ' + exp + ' experince and ' + eat + ' food.';}
		doc('event2HTML',reward);
		EVO.exp += exp;
		if (EVO.stage == 2 || EVO.three.diet !== 'Herbivore'){EVO.food += eat;}
		if (EVO.stage == 2){EVO.nutrient += a;}
		if (EVO.stage == 3){EVO.mineral += a;}
		EVO.won += 1;
		stat();
		if (c == 'event'){event();}
		if (c == 'hunt'){hunts();}
	}
	function lose(){
		doc('event1HTML','Your opponent defeated you.');
		EVO.exp += exp/2;
		if (EVO.stage == 2){EVO.nutrient += a;}
		if (EVO.stage == 3){EVO.mineral += a;}
		move();
		EVO.nutrient = 0;
		EVO.lost += 1;
		if (check(one,'Regeneration') == -1){EVO.scar += 1;}
		stat();
		setTimeout(carnate,10000,c);
	}
	function event(){
		cost.fight = 'off';
		setTimeout(eventEnd,10000);
	}
	function hunts(){
		cost.fight = 'off';
		fun.hunt();
	}
}