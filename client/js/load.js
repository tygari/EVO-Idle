var EVO = {
	'game':{
		'version': 0.48,
		'date': Date.now(),
	},
	'stage':{
		'num': 1,
		'wrd': 'one',
		'ftype': 'atp',
		'food': 10000,
		'atp': 0,
		'ate': 0,
		'mtype': 'flagellum',
		'rushed':0,
		'blessed':0,
	},
	'timer':{
		'leak': 0,
		'bless': 0,
		'auto': 0,
		'enviro': 0,
	},
	'event':{
		'failtimer': 0,
		'move': 0,
	},
	'echo':{
		'struc':['bubbleless'],
		'develop':[],
		'talents':[],
		'boost':[],
		'stage':['ATP','evolution'],
		'game':[],
		'body':[],
		'cross':[],
		'temporal':['mote'],
		'exotic':['protein'],
	},
	'evo':{
		'evolution': 0,
		'evolved': 0,
		'bonus': 0,
		'one': 0,
	},
	'one':{
		'metacycle': 0,
		'metabolism':{
			'type': 'none',
		},
	},
	'two':{},
	'three':{},
	'four':{},
	'five':{},
	'six':{},
	'combat':{},
	'cross':{},
	'temporal':{
		'black': false,
		'blue': false,
		'green': false,
		'orange': false,
		'purple': false,
		'red': false,
		'white': false,
		'yellow': false,
	},
	'exotic':{},
	'enviro':{
		'sun':{
			'shift': 1,
			'position': 1,
		},
		'virus': [1 ,0, 0, 0],
	},
	'size':{
		'game': 0,
		'stage': 0,
	},
	'protein':{
		'whole': 0,
		'partial': 0,
	},
};
var REC = {
	'player':{
		'id': Math.random(),
	},
	'bonus': 0,
};

save =x=>{
	core.cheat();
	if (Date.now()-x > 20000){location.reload(true);}
	else {
		EVO.game.date = Date.now();
		save.set(`EVO`);
		setTimeout(core.save,10000,Date.now());
	}
}
save.set =x=>(localStorage.setItem(x,JSONCrush(JSON.stringify(window[x]))));
save.get =x=>(JSON.parse(JSONUncrush(decodeURIComponent(save.chk(x)))));
save.del =x=>(localStorage.removeItem(x));
save.chk =x=>(localStorage.getItem(x));

(()=>{
	/*Save File load*/
	if (save.chk(`REC`)){REC = save.get(`REC`);}
	else {save.set(`REC`);}
	if (save.chk(`EVO`)){EVO = save.get(`EVO`);}
	else {save.set(`EVO`);}
	let num = EVO.stage.num,
		chk =x=>(window.location.origin == 'http://localhost:5000'),
		loc =(x,y)=>(`${chk()?'':'https://cdn.jsdelivr.net/gh/tygari/EVO-Idle@latest/client/'}${x}/${y}${chk()?'':'.min'}.${x}?version=${EVO.game.version}`);
	[	`EVO`,
		`EVO${num}`,
		`CBT`,
		`CRS`,
		`TPR`,
		//`EXO`,
	].forEach((href)=>{
	  let x = document.createElement(`link`);
	  x.rel = `stylesheet`;
	  x.type = `text/css`;
	  x.href = loc(`css`,href);
	  x.async = false;
	  document.head.appendChild(x);
	});
	[	`REC`,
		`EVO`,
		`EVO${num}`,
		`CBT`,
		`CRS`,
		`TPR`,
		//`EXO`,
		`VNT`,
		//`depth`,
	].forEach((src)=>{
	  let x = document.createElement(`script`);
	  x.type = `text/javascript`;
	  x.src = loc(`js`,src);
	  x.async = false;
	  document.head.appendChild(x);
	});
})();

const socket = io();
socket.emit(`playerInfo`,REC.player);

const chat = {
	"array":[],
	"flip":()=>{
		let id = ID(`chat-box`);
		if (id.checked){
			id.checked = false;
			css(`chat-switch`,`\\2A01`);
		}
		else {
			id.checked = true;
			css(`chat-switch`,`\\2A02`);
		}
	},
};
chat.name =x=>{
	if (x !== REC.player.name){
		let y = ID(`chat-input`);
		y.value += `${y.value==0?'':' '}@${x} `;
	}
};
chat.html =x=>(`<div class="chat ${x.txta==='R'?'txtR':'txtL'}" data-mid="${``+x.mid}" onclick="chat.name(this.firstChild.dataset.name)"><p data-game="${x.game}" data-time="[${x.time.getHours()}:${x.time.getMinutes()}]" data-name="${x.name}"></p><p data-message="${x.message}"></p><div>`);
socket.on(`startChat`,(data)=>{
	let id = ID(`chat-text`);
	for (let i=0;i<data.length;i++){
		data[i].time = new Date(data[i].time);
		id.insertAdjacentHTML(`beforeend`,chat.html(data[i]));
	}
	chat.array = data;
	id.scrollTo(0,id.scrollHeight);
	ID(`chat-input`).disabled = false;
});
socket.on(`addToChat`,(data)=>{
	chat.array.push(data);
	let id = ID(`chat-text`);
	data.time = new Date(data.time);
	id.insertAdjacentHTML(`beforeend`,chat.html(data));
	while (id.childElementCount >50){
		id.removeChild(id.firstElementChild);
	}
	id.scrollTo(0,id.scrollHeight);
});

var donation = 0;
socket.on(`donation`,(data)=>{
	donation = data;
});

window.addEventListener("load",()=>{
	//Creates Evolution Side Navs
	let A,
		C=(x,y,z)=>{
			x = ID(x).getElementsByTagName(`echo-`)[0];
			x.id = y;
			x.setAttribute(`code`,`<p onmouseenter='core.tip(this.id)' onmouseleave='core.tap()' onclick='evolution.evolve(this.id)'></p>`);
		};
	C(`stagenav`,`stageUpgrade`);
	C(`combatnav`,`combatUpgrade`);			 
	C(`crossnav`,`crossUpgrade`);
	C(`temporalnav`,`temporalUpgrade`);
	//C(`exoticnav`,`exoticUpgrade`,`exotic`);
	//Box Setups
	C=x=>{
		A = ID(x);
		A.setAttribute(`code`,`<span onmouseenter='core.tip(this.id)' onmouseleave='core.tap()'></span>`);
		A.setAttribute(`echo`,EVO.echo[x].join(` `));
	}
	C(`struc`);
	C(`develop`);
	C(`talents`);
	C(`boost`);
	//Creates Buttons
	C=x=>{
		A = ID(`${x}box`);
		A.setAttribute(`code`,`<div class='button butcol red' onmouseenter='core.tip(this.id)' onmouseleave='core.tap()' onclick='core.buy(this.id)'><c></c><b onmouseenter='core.tip(this.parentNode.id,11)' onmouseleave='core.tip(this.parentNode.id)' onclick='core.buy(this.parentNode.id,11); event.stopPropagation()'></b></div>`);
		A.setAttribute(`echo`,EVO.echo[x].join(` `));
	}
	C(`stage`);
	C(`game`);
	C(`body`);
	C(`cross`);
	C(`temporal`);
	C(`exotic`);
	//Combat Assist HTML Code
	C=(x,y)=>{ID(`ii`).insertAdjacentHTML(`beforeend`,`<span id=${y}><span onmousedown='gage(this.parentNode.id,-1)'></span><span id=${x}></span><span onmousedown='gage(this.parentNode.id,1)'></span></span>`);}
	C(`health`,`hlth`);
	C(`stamina`,`stmn`);
	C(`retreat`,`rtrt`);
	css(`mouse`,`none`,true);
	ID(`protein`).removeAttribute(`onclick`);
	
	css(`player-id`,REC.player.id);
	ID(`chat-form`).onsubmit =x=>{
		x.preventDefault();
		id = ID(`chat-input`);
		if(id.value.length > 0){
			socket.emit(`sendMsgToServer`,{'game':'evoidle','pid':REC.player.id,'name':REC.player.name,'message':id.value});
			id.value = ``;
		}
	}
	
	setTimeout(core.start,clock.second);
	
});

document.addEventListener(`mousemove`,(mouse)=>{
	let x = mouse.clientX-40;
	if (x > window.innerWidth/2){x -= ID(`mouse`).offsetWidth;}
	css(`mouseX`,`${x}px`,true);
	css(`mouseY`,`${mouse.clientY}px`,true);
});

const ID =x=>(document.getElementById(x));

const css =(x,y,z)=>{
	if (typeof y === `undefined` || typeof y === `null`){return}
	if (z?false:true){y = `'${y}'`;}
	return document.documentElement.style.setProperty(`--`+x,y);
}

const echo =(x,y)=>{ID(x).setAttribute(`echo`,EVO.echo[y].join(` `))};

const copy =(loc,id,pos)=>{
	if (!Array.isArray(id)){id = [id];}
	if (pos == undefined){pos = `afterend`;}
	for (let i = 0; i < id.length; i++){
		let node = ID(loc);
		let copy = node.outerHTML;
		node.id = id[i];
		ID(id[i]).insertAdjacentHTML(pos,copy);
	}
}

const clock =(t)=>{//Pass 't' a number for milliseconds
	let c =(x,y)=>{
		i=~~((t/x)%y);
		if(i>0||r!==``){r+=(i>9?i:(r!==``?`0`+i:i))};
		if(r!==``&&x!==clock.second){r+=`:`;}
	},r=``,i;
	c(clock.day,365);
	c(clock.hour,24);
	c(clock.minute,60);
	c(clock.second,60);
	return r?r:0;
}
clock.tenth = 100;
clock.second = 1000;
clock.minute = 60000;
clock.hour = 3.6e+6;
clock.day = 8.64e+7;
clock.week = 6.048e+8;
clock.month = 2.628e+9;
clock.year = 3.154e+10;
clock.decade = 3.154e+11;
clock.century = 3.154e+12;