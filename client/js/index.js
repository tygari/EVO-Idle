//var loc = window.location.href;
var EVO;
var REC = {"bonus": 0};
const rec =()=>{
	let save = EVO;
	//Stage 1
	let bonus = save.evo.evolution
			+ (save.one.metabolism.val||0)
			+ (save.one.mitochondria||0)
			+ ((save.one.cytoplasm||0)
				+ (save.one.cilia||0)
				+ (save.one.flagellum||0)
				+ (save.one.mitosis||0))
				/10;
	//Stage 2
	bonus += (save.two.adhesion.val||0) + (save.two.generation.val||0)
			+ (save.two.balance||0) + (save.two.nerve||0)
			+ (save.two.vascular||0) + (save.two.muscle||0)
			+ (save.two.respiratory||0) + (save.two.digestive||0)
			+ (save.two.excretion||0) + (save.two.sight||0)
			+ (save.two.motility.val/10||0);
	//Stage 3
	bonus += (save.three.balance||0) + (save.three.nerve||0)
		+ (save.three.vascular||0) + (save.three.muscle||0)
		+ (save.three.respiratory||0) + (save.three.digestive||0)
		+ (save.three.excretion||0) + (save.three.sight||0)
		+ (save.three.peristalsis.val/10||0);
	if (save.combat){bonus += (save.combat.offense||0) + (save.combat.defense||0) + (save.combat.speed||0) + (save.combat.special||0);}
	bonus = Math.floor(bonus/10);
	REC.bonus += bonus;
	localStorage.setItem("REC", JSON.stringify(REC));
	localStorage.removeItem("EVO");
}
if (localStorage.getItem('EVO') !== null){
	if (localStorage.getItem('REC') !== null){REC = JSON.parse(localStorage.getItem('REC'));}
	if (localStorage.getItem('EVO') !== null){EVO = JSON.parse(localStorage.getItem('EVO'));}
	if (EVO.game.version < 0.45){
		if(REC && REC.bonusMax){
			delete REC.bonusMax;
			delete REC.food;
			delete REC.cytoplasm;
			delete REC.offensive;
			delete REC.defensive;
			delete REC.speed;
			delete REC.special;
			delete REC.ability;
			delete REC.balance;
			delete REC.nerve;
			delete REC.vascular;
			delete REC.muscle;
			delete REC.respiratory;
			delete REC.digestive;
			delete REC.excretion;
			delete REC.sight;
			delete REC.exotic;
		};
		rec();
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
const reddit =()=>{window.open('https://www.reddit.com/r/incremental_games/comments/aw1o07/evo_idle_ver_045_released/');}
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