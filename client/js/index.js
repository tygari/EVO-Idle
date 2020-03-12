var EVO,
	REC,
	VER = 0.48,
	DATE = `3/11/2020`;

save =x=>{}
save.set =x=>(localStorage.setItem(x,JSON.stringify(window[x])));
save.get =x=>(JSON.parse(save.chk(x)));
save.del =x=>(localStorage.removeItem(x));
save.chk =x=>(localStorage.getItem(x));
	
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
	if(EVO.game.version < VER){
		save.set(`REC`);
		save.del(`EVO`);
	}
}

try {
	if (save.chk(`EVO`) !== null){
		let chk = JSON.parse(JSONUncrush(decodeURIComponent(save.chk(`EVO`))));
		typeof chk != `object` ? save.del(`EVO`) : save.set(`EVO`);
	}
}
catch(e){
	try {
		if (typeof save.get(`EVO`) !== `object`){save.del(`EVO`);}
	}
	catch(e){}
}

try {
	let chk = JSON.parse(JSONUncrush(decodeURIComponent(save.chk(`REC`))));
	if (typeof chk == `object` && chk != null){save.set(`REC`)};
}
catch(e){
	try {
		if (typeof save.get(`REC`) !== `object`){throw 'ERROR: Contact developer if you see this line.'};
	}
	catch(e){
		console.log(`Contact developer if you see this line.`);
	}
}

(()=>{
	let chk =x=>(window.location.origin == 'http://localhost:5000'),
		loc =(x,y)=>(`${chk()?'':'https://cdn.jsdelivr.net/gh/tygari/EVO-Idle@latest/'}client/${x}/${y}${chk()?'':'.min'}.${x}`);
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
	css(`date`,DATE);
	css(`version`,VER);
	
	/*
	if(save.chk(`EVO`)){css(`save1`,save.chk(`EVO`));}
	else {css(`save0`,`No Save File Located`);}
	css(`save2`,save.chk(`REC`));
	*/
});

const css =(x,y)=>(document.body.style.setProperty('--'+x,'"'+y+'"'));

const play =()=>{
	if(!!window.customElements){
		window.location.assign('client/EVO.html');
	} else {
		document.getElementById('lay').classList.replace('layoff','layon');
		document.getElementsByTagName(`web`)[0].style.display = `block`;
	}
},
donate =()=>{window.open('https://www.paypal.me/tygari')},
patreon =()=>{window.open('https://www.patreon.com/tailedbeastgames')},
discord =()=>{window.open('https://discord.gg/EmnM7zp')},
reddit =()=>{window.open('https://www.reddit.com/r/incremental_games/comments/aw1o07/evo_idle_ver_045_released/')},
github =()=>{window.open('https://github.com/tygari/EVO-Idle')};

const file =(x)=>{
	/*
	clearTimeout(file.time);
	navigator.clipboard.writeText(save.chk(x)).then(()=>{
	  css(`save0`,`File Successfully Saved to Clipboard`);
	},(err)=>{
	  css(`save0`,`File Failed to Saved to Clipboard`);
	});
	file.time = setTimeout(()=>{css(`save0`,`Click to Save to Clipboard`);},10000);
	*/
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