const recstart =()=>{
	if (localStorage.getItem("REC") !== null){REC = JSON.parse(localStorage.getItem("REC"));}
	reincarnate();
}

const foodMath =()=>{return Math.floor(10*Math.pow(1.5,REC.food.min + REC.food.max));}
const stageMath =(x)=>{return Math.floor(10*Math.pow(2,REC[x]));}
const statMath =(x)=>{return Math.floor(10*Math.pow(2,REC[x].cost + REC[x].max));}
const gradeMath =()=>{return Math.floor(100*Math.pow(3,(REC.offensive + REC.defensive + REC.speed + REC.special + REC.ability)));}

const reincarnate =()=>{
	css('rec-bonus',REC.bonus);
	let food = '';
	let cytoplasm = '';
	let balance = '';
	let nerve = '';
	let vascular = '';
	let muscle = '';
	let respiratory = '';
	let digestive = '';
	let excretion = '';
	let sight = '';
	let off = '';
	let def = '';
	let spd = '';
	let spl = '';
	let cbt = '';
	let rec =(x)=>{return '<p id="'+x+'" class="rainbow" onmouseenter="next(this.id)" onmouseleave="clears(this.id)" onclick="upgrade(this.id)"></p>';}
	if (REC.cytoplasm < 40 && REC.bonus >= stageMath('cytoplasm')){cytoplasm = rec('cytoplasm');}
	ID('stageOne').innerHTML = cytoplasm;
	if (cytoplasm !== ''){css('cytoplasm',REC.cytoplasm+10);}
	if (REC.bonus >= foodMath()){
		food = rec('foodmax');
		if (REC.food.max+10 > REC.food.min){food += rec('foodmin');}
	}
	ID('foodHTML').innerHTML = food;
	if (food !== ''){
		css('food-max',REC.food.max*10);
		if (REC.food.max+10 > REC.food.min){css('food-min',REC.food.min*10);}
	}
	if (REC.offensive == 0 && REC.bonus >= gradeMath()){off = rec('offensive');}
	if (REC.defensive == 0 && REC.bonus >= gradeMath()){def = rec('defensive');}
	if (REC.speed == 0 && REC.bonus >= gradeMath()){spd = rec('speed');}
	if (REC.special == 0 && REC.bonus >= gradeMath()){spl = rec('special');}
	if (REC.offensive + REC.defensive + REC.speed + REC.special > 3 && REC.bonus >= gradeMath()){cbt = rec('ability');}
	ID('gradeHTML').innerHTML = off + def + spd + spl + cbt;
	if (REC.balance.cost < 100 && REC.bonus >= statMath('balance')){balance = rec('balance');}
	if (REC.nerve.cost < 100 && REC.bonus >= statMath('nerve')){nerve = rec('nerve');}
	if (REC.vascular.cost < 100 && REC.bonus >= statMath('vascular')){vascular = rec('vascular');}
	if (REC.muscle.cost < 100 && REC.bonus >= statMath('muscle')){muscle = rec('muscle');}
	if (REC.respiratory.cost < 100 && REC.bonus >= statMath('respiratory')){respiratory = rec('respiratory');}
	if (REC.digestive.cost < 100 && REC.bonus >= statMath('digestive')){digestive = rec('digestive');}
	if (REC.excretion.cost < 100 && REC.bonus >= statMath('excretion')){excretion = rec('excretion');}
	if (REC.sight.cost < 100 && REC.bonus >= statMath('sight')){sight = rec('sight');}
	ID('combatHTML').innerHTML = balance + nerve + vascular + muscle + respiratory + digestive + excretion + sight;
	if (balance !== ''){css('balance',REC.balance.cost);}
	if (nerve !== ''){css('nerve',REC.nerve.cost);}
	if (vascular !== ''){css('vascular',REC.vascular.cost);}
	if (muscle !== ''){css('muscle',REC.muscle.cost);}
	if (respiratory !== ''){css('respiratory',REC.respiratory.cost);}
	if (digestive !== ''){css('digestive',REC.digestive.cost);}
	if (excretion !== ''){css('excretion',REC.excretion.cost);}
	if (sight !== ''){css('sight',REC.sight.cost);}
}

const upgrade =(x)=>{
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

const next =(x)=>{
	if (x.slice(0,4) == 'food'){css('cost-'+x,foodMath());}
	else if (x == 'cytoplasm'){css('cost-'+x,stageMath(x));}
	else if (x.match(/^(balance|nerve|vascular|muscle|respiratory|digestive|excretion|sight)$/)){css('cost-'+x,statMath(x));}
	else if (x.match(/^(offensive|defensive|speed|special|ability)$/)){css('cost-'+x,gradeMath());}
	let z = ID('next');
	z.classList.replace(z.className,x);
}

const clears =(x)=>{
	let z = ID('next');
	z.classList.replace(z.className,'empty');
}

const restart =()=>{
	localStorage.setItem("REC", JSON.stringify(REC));
	window.location.assign("EVO.html");
}