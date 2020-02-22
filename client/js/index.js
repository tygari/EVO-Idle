var EVO,
	REC,
	VER = 0.48;
const rec =(x)=>{
	let sav = x;
	//Stage 1
	let bonus = sav.evo.evolution
			+ (sav.one.metabolism?(sav.one.metabolism.val||0):0)
			+ (sav.one.mitochondria||0)
			+ ((sav.one.cytoplasm||0)
				+ (sav.one.cilia||0)
				+ (sav.one.flagellum||0)
				+ (sav.one.mitosis||0))
				/10;
	//Stage 2
	if (EVO.two){bonus += (sav.two.adhesion?(sav.two.adhesion.val||0):0) + (sav.two.generation?(sav.two.generation.val||0):0)
			+ (sav.two.balance||0) + (sav.two.nerve||0)
			+ (sav.two.vascular||0) + (sav.two.muscle||0)
			+ (sav.two.respiratory||0) + (sav.two.digestive||0)
			+ (sav.two.excretion||0) + (sav.two.sight||0)
			+ (sav.two.motility?(sav.two.motility.val/10||0):0);}
	//Stage 3
	if (EVO.three){bonus += (sav.three.balance||0) + (sav.three.nerve||0)
		+ (sav.three.vascular||0) + (sav.three.muscle||0)
		+ (sav.three.respiratory||0) + (sav.three.digestive||0)
		+ (sav.three.excretion||0) + (sav.three.sight||0)
		+ (sav.three.peristalsis?(sav.three.peristalsis.val/10||0):0);}
	if (sav.combat){bonus += (sav.combat.offense||0) + (sav.combat.defense||0) + (sav.combat.speed||0) + (sav.combat.special||0);}
	bonus = Math.floor(bonus/10);
	REC.bonus += bonus;
	if(EVO.game.version < 0.48){
		localStorage.setItem("REC",JSON.stringify(REC));
		localStorage.removeItem("EVO");
	}
}

save =x=>{}
save.set =x=>(localStorage.setItem(x,JSONCrush(JSON.stringify(window[x]))));
save.get =x=>(JSON.parse(JSONUncrush(decodeURIComponent(save.chk(x)))));
save.del =x=>(localStorage.removeItem(x));
save.chk =x=>(localStorage.getItem(x));

if (save.chk('EVO') !== null){
	try {
		if(JSON.parse(save.chk('EVO')) && JSON.parse(save.chk('EVO')).game && JSON.parse(save.chk('EVO')).game.version < 0.48){
			if (save.chk('REC')){REC = JSON.parse(save.chk('REC'));}
			else {localStorage.setItem("REC", JSON.stringify(REC));}
			if (!REC.player){REC.player = {'id':Math.random()};}
			if (save.chk('EVO')){EVO = JSON.parse(save.chk('EVO'));}
			if (EVO.game.version < 0.47){rec(EVO);}
			if (EVO){save.set(`EVO`);}
			if (REC){save.set(`REC`);}
		}
	}
	catch(error){}
}

(()=>{
	let chk =x=>(window.location.origin == 'http://localhost:5000'),
		loc =(x,y)=>(`${chk()?'':'https://cdn.jsdelivr.net/gh/tygari/EVO-Idle@latest/'}client/${x}/${y}${chk()?'':'.min'}.${x}?version=${VER}`);
	[	'EVO',
		'index',
	].forEach((href)=>{
	  let x = document.createElement(`link`);
	  x.rel = `stylesheet`;
	  x.type = `text/css`;
	  x.href = loc(`css`,href);
	  x.async = false;
	  document.head.appendChild(x);
	});
})();

window.addEventListener(`load`,()=>{
	document.getElementsByTagName(`body`)[0].style.overflow = `auto`;
	css(`date`,`2/14/2020`);
	css(`version`,VER);
	
	if(save.chk(`EVO`)){css(`save1`,save.chk(`EVO`));}
	else {css(`save0`,`No Save File Located`);}
	css(`save2`,save.chk(`REC`));
});

const css =(x,y)=>(document.body.style.setProperty('--'+x,'"'+y+'"'));

const play =()=>{window.location.assign('client/EVO.html')},
donate =()=>{window.open('https://www.paypal.me/tygari')},
patreon =()=>{window.open('https://www.patreon.com/tailedbeastgames')},
discord =()=>{window.open('https://discord.gg/EmnM7zp')},
reddit =()=>{window.open('https://www.reddit.com/r/incremental_games/comments/aw1o07/evo_idle_ver_045_released/')},
github =()=>{window.open('https://github.com/tygari/EVO-Idle')};

const file =(x)=>{
	clearTimeout(file.time);
	navigator.clipboard.writeText(save.chk(x)).then(()=>{
	  css(`save0`,`File Successfully Saved to Clipboard`);
	},(err)=>{
	  css(`save0`,`File Failed to Saved to Clipboard`);
	});
	file.time = setTimeout(()=>{css(`save0`,`Click to Save to Clipboard`);},10000);
}
file.time;


const soft =()=>{
	localStorage.removeItem('EVO');
	location.reload(true);
},
hard =()=>{
	localStorage.removeItem('EVO');
	localStorage.removeItem('REC');
	location.reload(true);
};