function recstart(){
	if (localStorage.getItem("REC") !== null){REC = JSON.parse(localStorage.getItem("REC"));}
	reincarnate();
}

function foodMath(){return Math.floor(10*Math.pow(1.5,REC.food.min + REC.food.max));}
function stageMath(x){return Math.floor(10*Math.pow(2,REC[x]));}
function statMath(x){return Math.floor(10*Math.pow(2,REC[x].cost + REC[x].max));}
function gradeMath(){return Math.floor(100*Math.pow(3,(REC.offensive + REC.defensive + REC.speed + REC.special + REC.ability)));}

function reincarnate(){
	css('rec-bonus',REC.bonus);
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
	let rec = function(x){return '<p id="'+x+'" class="rainbow" onmouseenter="next(this.id)" onmouseleave="clears(this.id)" onclick="upgrade(this.id)"></p>';}
	if (REC.cytoplasm < 40 && REC.bonus >= stageMath('cytoplasm')){cytoplasm = rec('cytoplasm');}
	doc('stageOne',cytoplasm);
	if (cytoplasm !== ''){css('cytoplasm',REC.cytoplasm+10);}
	if (REC.bonus >= foodMath()){
		food = rec('foodmax');
		if (REC.food.max+10 > REC.food.min){food += rec('foodmin');}
	}
	doc('foodHTML',food);
	if (food !== ''){
		css('food-max',REC.food.max*10);
		if (REC.food.max+10 > REC.food.min){css('food-min',REC.food.min*10);}
	}
	if (REC.offensive == 0 && REC.bonus >= gradeMath()){off = rec('offensive');}
	if (REC.defensive == 0 && REC.bonus >= gradeMath()){def = rec('defensive');}
	if (REC.speed == 0 && REC.bonus >= gradeMath()){spd = rec('speed');}
	if (REC.special == 0 && REC.bonus >= gradeMath()){spl = rec('special');}
	if (REC.offensive + REC.defensive + REC.speed + REC.special > 3 && REC.bonus >= gradeMath()){cbt = rec('ability');}
	doc('gradeHTML',off + def + spd + spl + cbt);
	if (REC.balance.cost < 100 && REC.bonus >= statMath('balance')){balance = rec('balance');}
	if (REC.nerve.cost < 100 && REC.bonus >= statMath('nerve')){nerve = rec('nerve');}
	if (REC.vascular.cost < 100 && REC.bonus >= statMath('vascular')){vascular = rec('vascular');}
	if (REC.muscle.cost < 100 && REC.bonus >= statMath('muscle')){muscle = rec('muscle');}
	if (REC.respiratory.cost < 100 && REC.bonus >= statMath('respiratory')){respiratory = rec('respiratory');}
	if (REC.digestive.cost < 100 && REC.bonus >= statMath('digestive')){digestive = rec('digestive');}
	if (REC.excretion.cost < 100 && REC.bonus >= statMath('excretion')){excretion = rec('excretion');}
	if (REC.sight.cost < 100 && REC.bonus >= statMath('sight')){sight = rec('sight');}
	doc('combatHTML',balance + nerve + vascular + muscle + respiratory + digestive + excretion + sight);
	if (balance !== ''){css('balance',REC.balance.cost);}
	if (nerve !== ''){css('nerve',REC.nerve.cost);}
	if (vascular !== ''){css('vascular',REC.vascular.cost);}
	if (muscle !== ''){css('muscle',REC.muscle.cost);}
	if (respiratory !== ''){css('respiratory',REC.respiratory.cost);}
	if (digestive !== ''){css('digestive',REC.digestive.cost);}
	if (excretion !== ''){css('excretion',REC.excretion.cost);}
	if (sight !== ''){css('sight',REC.sight.cost);}
}

function upgrade(x){
	if (x.slice(0,4) == 'food'){
		REC.bonus -= foodMath();
		REC.food[x.slice(-3)]++;
	}
	if (x == 'cytoplasm'){
		REC.bonus -= stageMath(x);
		REC[x]++;
	}
	if (x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/)){
		REC.bonus -= statMath(x);
		REC[x].cost++;
	}
	if (x.match(/^(offensive|defensive|speed|special|ability)$/)){
		REC.bonus -= gradeMath();
		REC[x]++;
	}
	clears(x);
	resave();
	reincarnate();
}

function next(x){
	if (x.slice(0,4) == 'food'){css('cost-'+x,foodMath());}
	else if (x == 'cytoplasm'){css('cost-'+x,stageMath(x));}
	else if (x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/)){css('cost-'+x,statMath(x));}
	else if (x.match(/^(offensive|defensive|speed|special|ability)$/)){css('cost-'+x,gradeMath());}
	let z = document.getElementById('next');
	z.classList.replace(z.className,x);
}

function clears(x){
	let z = document.getElementById('next');
	z.classList.replace(z.className,'empty');
}

function restart(){
	localStorage.setItem("REC", JSON.stringify(REC));
	window.location.assign("EVO1.html");
}