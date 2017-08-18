function save(x){
	var z = Date.now() - x;
	if (z > 20000){location.reload(true);}
	else {
		EVO.date = Date.now();
		localStorage.setItem("EVO", JSON.stringify(EVO));
		setTimeout(save, 10000, Date.now());
	}
}

function resave(){localStorage.setItem("REC", JSON.stringify(REC));}

function doc(x,y){return document.getElementById(x).innerHTML = y;}

function ad(){
	var adTimer = [5, 0];
	if (EVO.stage == 1){EVO.food += 200;}
	if (EVO.stage == 2){EVO.food += 400;}
	doc('adHTML',adTimer[0] +':0'+ adTimer[1]);
	setTimeout(timerAd, 1000);
	function timerAd(){
		if (adTimer[1] > -1){adTimer[1] -= 1;}
		if (adTimer[0] > 0 && adTimer[1] == -1){adTimer [1] = 59; adTimer[0] -= 1;}
		if (adTimer[1] > -1 && adTimer[1] < 10){doc('adHTML',adTimer[0] +':0'+ adTimer[1]);}
		if (adTimer[1] > 9){doc('adHTML',adTimer[0] +':'+ adTimer[1]);}
		if (adTimer[0] > 0 || adTimer[1] > 0){setTimeout(timerAd, 1000);}
		if (adTimer[0] <= 0 && adTimer [1] <= 0){doc('adHTML','<button type="button" onclick="ad()"><b>Play Ad</b>');}
	}
}

function sun(){
	if (EVO.sunSwitch == 'on' && EVO.sun < 100){EVO.sun += 1;}
	else if (EVO.sunSwitch == 'off' && EVO.sun > 0){EVO.sun -= 1;}
	else if (EVO.sunSwitch == 'on' && EVO.sun >= 100){EVO.sunSwitch = 'off';}
	else {EVO.sunSwitch = 'on';}
	if (EVO.stage > 1){light();}
}

function swirly(v,w,x,y,z){
	var swirl = document.getElementById('swirl');
	var a = 800;
	var b = 600;
	if (window.innerWidth-50 > a){a = window.innerWidth-50;}
	if (window.innerHeight-50 > b){b = window.innerHeight-50;}
	if (x <= 0){v = 'on';}
	if (x >= a){v = 'off';}
	if (y <= 0){w = 'on';}
	if (y >= b){w = 'off';}
	if (v == 'on'){x += 2;}
	else {x -= 2;}
	if (w == 'on'){y += 2;}
	else {y -= 2;}
	if (z >= 360){z = 0;}
	else {z += 12;}
	swirl.style.left = x + 'px';
	swirl.style.top = y + 'px';
	swirl.style.transform = 'rotate(' + z + 'deg)';
	setTimeout(swirly, 30, v, w, x, y, z);
}

var REC = {
	"bonusMax": 0,
	"bonus": 0,
	"food": {"max": 0, "min": 0,},
	"cytoplasm": 0,
	"off": 0,
	"def": 0,
	"spd": 0,
	"spl": 0,
	"cbt": 0,
	"balance": {"cost": 0, "max": 0,},
	"nerve": {"cost": 0, "max": 0,},
	"vascular": {"cost": 0, "max": 0,},
	"muscle": {"cost": 0, "max": 0,},
	"respiratory": {"cost": 0, "max": 0,},
	"digestive": {"cost": 0, "max": 0,},
	"excretion": {"cost": 0, "max": 0,},
	"sight": {"cost": 0, "max": 0,},
};

function carnate(x){
	doc('layStyle','div#lay {display: none; z-index: 2; background: #000; position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; text-align: center;} div#box {display: none; position: relative; z-index: 3; margin: 200px auto 0px auto; width: 300px; height: 100px; background-color: black; cursor: crosshair; text-align:center}');
	doc('boxHTML','<div id="box"><p style="color:white">Would you like to Reincarnate?</p><button type="button" style="color:white" onclick="nocarnate(' + x + ')">No&nbsp;&nbsp;&nbsp;<button type="button" style="color:white" onclick="recarnate()">Yes</div>');
	laySwitch();
}

function laySwitch(){
	var lay = document.getElementById('lay');
	var box = document.getElementById('box');
	lay.style.opacity = .5;
	if(lay.style.display == "block"){
		lay.style.display = "none";
		box.style.display = "none";
		doc('boxHTML','');
		doc('layStyle','');
	} else {
		lay.style.display = "block";
		box.style.display = "block";
	}
}

function nocarnate(x){
	doc('eventHTML','');
	cost.fight = 'off';
	laySwitch();
	if (x == 'event'){setTimeout(eventEnd, 5000);}
	if (c == 'hunt'){fun.hunt();}
}

function recarnate(){
	resave();
	var bonus = 0;
	bonus += Math.floor((EVO.one.metabolism + EVO.one.mitochondria + fun.add.balance + fun.add.nerve + fun.add.vascular + fun.add.muscle + fun.add.respiratory + fun.add.digestive + fun.add.excretion + fun.add.sight + EVO.off + EVO.def + EVO.spd + EVO.spl)/10);
	REC.bonus += bonus;
	REC.bonusMax += bonus;
	localStorage.setItem("REC", JSON.stringify(REC));
	localStorage.removeItem("EVO");
	//var kongregate;
	//var LoadingAPI = window.parent.LoadingAPI;
	//if (LoadingAPI){
	//	kongregate = window.parent.kongregateAPI.getAPI();
	//	kongregate.stats.submit('Reincarnation Bonus', REC.bonusMax);
	//}
	window.location.assign("REC.html");
}

function recstart(){
	if (localStorage.getItem("REC") !== null){REC = JSON.parse(localStorage.getItem("REC"));}
	reincarnate();
	bcolors();
	colors();
}

function foodMath(){return Math.floor(10*Math.pow(1.5,REC.food.min + REC.food.max));}
function foodNext(){doc('cost',foodMath());}
function stageMath(x){return Math.floor(10*Math.pow(2,REC[x]));}
function stageNext(x){doc('cost',stageMath(x));}
function statMath(x){return Math.floor(10*Math.pow(2,REC[x].cost + REC[x].max));}
function statNext(x){doc('cost',statMath(x));}
function gradeMath(){return Math.floor(100*Math.pow(3,(REC.off + REC.def + REC.spd + REC.spl + REC.cbt)));}
function gradeNext(){doc('cost',gradeMath());}
function clears(){doc('cost','');}

function reincarnate(){
	doc('bonus',REC.bonus);
	var food = '';
	var cytoplasm = '';
	var balance = '';
	var nerve = '';
	var vascular = '';
	var muscle = '';
	var respiratory = '';
	var digestive = '';
	var excretion = '';
	var sight = '';
	var off = '';
	var def = '';
	var spd = '';
	var spl = '';
	var cbt = '';
	if (REC.bonus >= foodMath()){
		food = '<p title="Increases maximum possible food found." onmouseover="foodNext()" onmouseout="clears()" onclick="upgrade(\'food\',\'max\')"><b class="colors">Food Maximum</b> &nbsp; +<span id="foodMax"></span>%</p>';
		if (REC.food.max+10 > REC.food.min){food += '<p title="Increases minimum possible food found." onmouseover="foodNext()" onmouseout="clears()" onclick="upgrade(\'food\',\'min\')"><b class="colors">Food Minimum</b> &nbsp; +<span id="foodMin"></span>%</p>';}
	}
	doc('foodHTML',food);
	if (food !== ''){
		doc('foodMax',REC.food.max*10);
		if (REC.food.max+10 > REC.food.min){doc('foodMin',REC.food.min*10);}
	}
	if (REC.cytoplasm < 100 && REC.bonus >= stageMath('cytoplasm')){cytoplasm = '<p title="Increases cytoplasm cost reduction." onmouseover="stageNext(\'cytoplasm\')" onmouseout="clears()" onclick="upgrade(\'cytoplasm\')"><b class="colors">Cytoplasm</b> &nbsp; -<span id="cytoplasm"></span>%</p>';}
	doc('stageOne',cytoplasm);
	if (cytoplasm !== ''){doc('cytoplasm',REC.cytoplasm+10);}
	if (REC.balance.cost < 100 && REC.bonus >= statMath('balance')){balance = '<p title="Reduces Balance cost by 1% in all stages.  Marginally reduces other combat stats cost."onmouseover="statNext(\'balance\')" onmouseout="clears()" onclick="upgrade(\'balance\',\'cost\')"><b class="colors">Balance</b> &nbsp; -<span id="balanceCost"></span>%</p>';}
	if (REC.nerve.cost < 100 && REC.bonus >= statMath('nerve')){nerve = '<p title="Reduces Nerve cost by 1% in all stages.  Marginally reduces other combat stats cost." onmouseover="statNext(\'nerve\')" onmouseout="clears()" onclick="upgrade(\'nerve\',\'cost\')"><b class="colors">Nerve</b> &nbsp; -<span id="nerveCost"></span>%</p>';}
	if (REC.vascular.cost < 100 && REC.bonus >= statMath('vascular')){vascular = '<p title="Reduces Vascular cost by 1% in all stages.  Marginally reduces other combat stats cost." onmouseover="statNext(\'vascular\')" onmouseout="clears()" onclick="upgrade(\'vascular\',\'cost\')"><b class="colors">Vascular</b> &nbsp; -<span id="vascularCost"></span>%</p>';}
	if (REC.muscle.cost < 100 && REC.bonus >= statMath('muscle')){muscle = '<p title="Reduces Muscle cost by 1% in all stages.  Marginally reduces other combat stats cost." onmouseover="statNext(\'muscle\')" onmouseout="clears()" onclick="upgrade(\'muscle\',\'cost\')"><b class="colors">Muscle</b> &nbsp; -<span id="muscleCost"></span>%</p>';}
	if (REC.respiratory.cost < 100 && REC.bonus >= statMath('respiratory')){respiratory = '<p title="Reduces Respiratory cost by 1% in all stages.  Marginally reduces other combat stats cost." onmouseover="statNext(\'respiratory\')" onmouseout="clears()" onclick="upgrade(\'respiratory\',\'cost\')"><b class="colors">Respiratory</b> &nbsp; -<span id="respiratoryCost"></span>%</p>';}
	if (REC.digestive.cost < 100 && REC.bonus >= statMath('digestive')){digestive = '<p title="Reduces Digestive cost by 1% in all stages.  Marginally reduces other combat stats cost." onmouseover="statNext(\'digestive\')" onmouseout="clears()" onclick="upgrade(\'digestive\',\'cost\')"><b class="colors">Digestive</b> &nbsp; -<span id="digestiveCost"></span>%</p>';}
	if (REC.excretion.cost < 100 && REC.bonus >= statMath('excretion')){excretion = '<p title="Reduces Excretion cost by 1% in all stages.  Marginally reduces other combat stats cost." onmouseover="statNext(\'excretion\')" onmouseout="clears()" onclick="upgrade(\'excretion\',\'cost\')"><b class="colors">Excretion</b> &nbsp; -<span id="excretionCost"></span>%</p>';}
	if (REC.sight.cost < 100 && REC.bonus >= statMath('sight')){sight = '<p title="Reduces Sight cost by 1% in all stages.  Marginally reduces other combat stats cost." onmouseover="statNext(\'sight\')" onmouseout="clears()" onclick="upgrade(\'sight\',\'cost\')"><b class="colors">Sight</b> &nbsp; -<span id="sightCost"></span>%</p>';}
	doc('combatHTML',balance + nerve + vascular + muscle + respiratory + digestive + excretion + sight);
	if (balance !== ''){doc('balanceCost',REC.balance.cost);}
	if (nerve !== ''){doc('nerveCost',REC.nerve.cost);}
	if (vascular !== ''){doc('vascularCost',REC.vascular.cost);}
	if (muscle !== ''){doc('muscleCost',REC.muscle.cost);}
	if (respiratory !== ''){doc('respiratoryCost',REC.respiratory.cost);}
	if (digestive !== ''){doc('digestiveCost',REC.digestive.cost);}
	if (excretion !== ''){doc('excretionCost',REC.excretion.cost);}
	if (sight !== ''){doc('sightCost',REC.sight.cost);}
	if (REC.off == 0 && REC.bonus >= gradeMath()){off = '<p title="Increase your max offensive potential." onmouseover="gradeNext()" onmouseout="clears()" onclick="upgrade(\'off\')"><b class="colors">Offense</b></p>';}
	if (REC.def == 0 && REC.bonus >= gradeMath()){def = '<p title="Increase your max defensive potential." onmouseover="gradeNext()" onmouseout="clears()" onclick="upgrade(\'def\')"><b class="colors">Defense</b></p>';}
	if (REC.spd == 0 && REC.bonus >= gradeMath()){spd = '<p title="Increase your max speed potential." onmouseover="gradeNext()" onmouseout="clears()" onclick="upgrade(\'spd\')"><b class="colors">Speed</b></p>';}
	if (REC.spl == 0 && REC.bonus >= gradeMath()){spl = '<p title="Increase your max special potential." onmouseover="gradeNext()" onmouseout="clears()" onclick="upgrade(\'spl\')"><b class="colors">Special</b></p>';}
	if (REC.off + REC.def + REC.spd + REC.spl == 4 && REC.bonus >= gradeMath()) {cbt = '<p title="Increase your max combat ability limit." onmouseover="gradeNext()" onmouseout="clears()" onclick="upgrade(\'cbt\')"><b class="colors">Ability</b></p>';}
	doc('gradeHTML',off + def + spd + spl + cbt);
}

function upgrade(x,y){
	if (x == 'food'){
		if (y == 'min'){
			REC.bonus -= foodMath();
			REC[x].min += 1;
		}
		if (y == 'max'){
			REC.bonus -= foodMath();
			REC[x].max += 1;
		}
	}
	if (x == 'cytoplasm'){
		REC.bonus -= stageMath(x);
		REC[x] += 1;
	}
	if (x == 'balance'){
		if (y == 'cost'){
			REC.bonus -= statMath(x);
			REC[x].cost += 1;
		}
	}
	if (x == 'nerve'){
		if (y == 'cost'){
			REC.bonus -= statMath(x);
			REC[x].cost += 1;
		}
	}
	if (x == 'vascular'){
		if (y == 'cost'){
			REC.bonus -= statMath(x);
			REC[x].cost += 1;
		}
	}
	if (x == 'muscle'){
		if (y == 'cost'){
			REC.bonus -= statMath(x);
			REC[x].cost += 1;
		}
	}
	if (x == 'respiratory'){
		if (y == 'cost'){
			REC.bonus -= statMath(x);
			REC[x].cost += 1;
		}
	}
	if (x == 'digestive'){
		if (y == 'cost'){
			REC.bonus -= statMath(x);
			REC[x].cost += 1;
		}
	}
	if (x == 'excretion'){
		if (y == 'cost'){
			REC.bonus -= statMath(x);
			REC[x].cost += 1;
		}
	}
	if (x == 'sight'){
		if (y == 'cost'){
			REC.bonus -= statMath(x);
			REC[x].cost += 1;
		}
	}
	if (x == 'off'){
		REC.bonus -= gradeMath();
		REC.off += 1;
	}
	if (x == 'def'){
		REC.bonus -= gradeMath();
		REC.def += 1;
	}
	if (x == 'spd'){
		REC.bonus -= gradeMath();
		REC.spd += 1;
	}
	if (x == 'spl'){
		REC.bonus -= gradeMath();
		REC.spl += 1;
	}
	if (x == 'cbt'){
		REC.bonus -= gradeMath();
		REC.cbt += 1;
	}
	clears();
	resave();
	reincarnate();
}

function restart(){
	localStorage.setItem("REC", JSON.stringify(REC));
	window.location.assign("EVO1.html");
}

function colors(){
	var color = document.getElementsByClassName('colors');
	red();
	function red(){
		for(i = 0; i < color.length; i++) {color[i].style.color = 'red';}
		setTimeout(orange, 300);
	}
	function orange(){
		for(i = 0; i < color.length; i++) {color[i].style.color = 'orange';}
		setTimeout(yellow, 300);
	}
	function yellow(){
		for(i = 0; i < color.length; i++) {color[i].style.color = 'yellow';}
		setTimeout(green, 300);
	}
	function green(){
		for(i = 0; i < color.length; i++) {color[i].style.color = 'green';}
		setTimeout(blue, 300);
	}
	function blue(){
		for(i = 0; i < color.length; i++) {color[i].style.color = 'blue';}
		setTimeout(purple, 300);
	}
	function purple(){
		for(i = 0; i < color.length; i++) {color[i].style.color = 'purple';}
		setTimeout(red, 300);
	}
}

function bcolors(){
	var color = document.getElementById('restart');
	white();
	function white(){color.style.color = 'white'; setTimeout(black, 500);}
	function black(){color.style.color = 'black'; setTimeout(white, 500);}
}