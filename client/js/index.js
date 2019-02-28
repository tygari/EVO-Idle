//var loc = window.location.href;

if (localStorage.getItem('EVO') !== null){//Update REC
	let save = JSON.parse(localStorage.getItem('EVO'));
	if (save.game == undefined){
		let recar;
		if (localStorage.getItem('RE') !== null){recar = JSON.parse(localStorage.getItem('REC'));}
		else {
			recar = {
				"bonusMax": 0,
				"bonus": 0,
				"food": {"max": 0, "min": 0,},
				"cytoplasm": 0,
				"offensive": 0,
				"defensive": 0,
				"speed": 0,
				"special": 0,
				"ability": 0,
				"balance": {"cost": 0, "max": 0,},
				"nerve": {"cost": 0, "max": 0,},
				"vascular": {"cost": 0, "max": 0,},
				"muscle": {"cost": 0, "max": 0,},
				"respiratory": {"cost": 0, "max": 0,},
				"digestive": {"cost": 0, "max": 0,},
				"excretion": {"cost": 0, "max": 0,},
				"sight": {"cost": 0, "max": 0,},
				"exotic": [],
			};
		}
		for (let key in save.one){
			if (typeof save.one[key] === 'number' && save.one[key] < 0){save.one[key] = 0;}
		}
		let bonus = save.evo.evolution + save.one.metabolism + save.one.mitochondria + (save.one.cytoplasm + save.one.cilia + save.one.flagellum + save.one.mitosis)/10;
		if (save.two){
			for (let key in save.two){
				if (typeof save.two[key] === 'number' && save.two[key] < 0){save.two[key] = 0;}
			}
			bonus += save.two.celladhesion + save.two.generation
				+ save.two.balance + save.two.nerve
				+ save.two.vascular + save.two.muscle
				+ save.two.respiratory + save.two.digestive
				+ save.two.excretion + save.two.sight
				+ (save.two.motility/10);
		}
		if (save.three){
			for (let key in save.three){
				if (typeof save.three[key] === 'number' && save.three[key] < 0){save.three[key] = 0;}
			}
			bonus += save.three.balance + save.three.nerve
				+ save.three.vascular + save.three.muscle
				+ save.three.respiratory + save.three.digestive
				+ save.three.excretion + save.three.sight
				+ (save.three.peristalsis/10);
		}
		if (save.combat){bonus += save.combat.offense + save.combat.defense + save.combat.speed + save.combat.special;}
		bonus = Math.floor(bonus/100);
		recar.bonus += bonus;
		recar.bonusMax += bonus;
		localStorage.setItem("REC", JSON.stringify(recar));
		localStorage.removeItem('EVO');
	}
}

const load =()=>{
	[	'EVO',
		'index',
	].forEach((href)=>{
	  let x = document.createElement('link');
	  x.rel = 'stylesheet';
	  x.type = 'text/css';
	  x.href = 'client/css/'+href+'.css';
	  x.async = false;
	  document.head.insertBefore(x,document.getElementsByTagName("script")[0]);
	});
}
load();

window.addEventListener("load",()=>{
	document.getElementsByTagName("body")[0].style.overflow = 'auto';
	start();
});

const css =(x,y)=>(document.body.style.setProperty('--'+x,'"'+y+'"'));
const start =()=>{
	let date = '7/16/2018';
	let version = 0.4;
	css('date',date);
	css('version',version);
}
const play =()=>{window.location.assign('client/EVO.html');}
const donate =()=>{window.open('https://www.paypal.me/tygari');}
const reddit =()=>{window.open('https://www.reddit.com/r/incremental_games/comments/9sj0le/evo_idle_ver_04_released/');}
const github =()=>{window.open('https://github.com/tygari/EVO-Idle');}

const soft =()=>{
	localStorage.removeItem('EVO');
	location.reload(true);
}

const hard =()=>{
	localStorage.removeItem('EVO');
	localStorage.removeItem('REC');
	location.reload(true);
}