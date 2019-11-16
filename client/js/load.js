var EVO = {
	"game":{
		"version": 0.46,
		"date": Date.now(),
	},
	"stage":{
		"num": 1,
		"food": 10000,
		"atp": 0,
		"ate": 0,
	},
	"echo":{
		'struc':['bubbleless'],
		'develop':[],
		'talents':[],
		'boost':[],
		'stage':['ATP','evolution'],
		'game':[],
		'body':[],
		'cross':[],
		'exotic':['protein'],
	},
	"evo":{
		"evolution": 0,
		"evolved": 0,
		"bonus": 0,
		"cost": 1.35,
	},
	"one":{
		"metacycle": 0,
	},
	"two":{},
	"three":{},
	"four":{},
	"five":{},
	"six":{},
	"combat":{},
	"cross":{},
	"exotic":{},
	"enviro":{
		"sun":{
			"shift": 1,
			"position": 1,
		},
		"virus": [1 ,0, 0, 0],
	},
	"size":{
		"game": 0,
		"stage": 0,
	},
	"protein":{
		"whole": 0,
		"partial": 0,
	},
};
var REC = {"bonus": 0};

(()=>{
	/*Save File load*/
	if (localStorage.getItem('REC') !== null){REC = JSON.parse(localStorage.getItem('REC'));}
	if (localStorage.getItem('EVO') !== null){EVO = JSON.parse(localStorage.getItem('EVO'));}
	let num = EVO.stage.num;
	[	'EVO',
		'EVO'+num,
		'CBT',
		'CRS',
		'EXO',
	].forEach((href)=>{
	  let x = document.createElement('link');
	  x.rel = 'stylesheet';
	  x.type = 'text/css';
	  x.href = 'css/'+href+'.css?version='+EVO.game.version;
	  x.async = false;
	  document.head.appendChild(x);
	});
	[	'REC',
		'EVO',
		'EVO'+num,
		'CBT',
		'CRS',
		'EXO',
		'VNT',
		//'depth',
	].forEach((src)=>{
	  let x = document.createElement('script');
	  x.type = 'text/javascript';
	  x.src = 'js/'+src+'.js?version='+EVO.game.version;
	  x.async = false;
	  document.head.appendChild(x);
	});
})();

const socket = io();

const chat = {
	"array":[],
	"flip":()=>{
		let id = ID('chat-box');
		if (id.checked){
			id.checked = false;
			css('chat-switch','\\2A01');
		}
		else {
			id.checked = true;
			css('chat-switch','\\2A02');
		}
	},
};
socket.on('startChat',(data)=>{
	css('chat','Hello! Welcome to EVO Idle!');
	chat.array = data;
	if(chat.array.length > 0){css('chat',chat.array.join(' \\a '));}
	let id = ID('chat-text');
	id.scrollTo(0,id.scrollHeight);
});
socket.on('addToChat',(data)=>{
	chat.array.push(data);
	if (chat.array.length > 50){chat.array.shift();}
	css('chat',chat.array.join(' \\a '));
	let id = ID('chat-text');
	id.scrollTo(0,id.scrollHeight);
});

var donation = 0;
socket.on('donation',(data)=>{
	donation = data;
});

window.addEventListener("load",()=>{
	//Creates Evolution Side Navs
	let A,
		C=(x,y,z)=>{
			x = ID(x).getElementsByTagName('echo-')[0];
			x.id = y;
			x.setAttribute('code','<p onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="'+z+'(this.id)"></p>');
		};
	C('stagenav','stageUpgrade','evolution.stage.evo');
	C('combatnav','combatUpgrade','combat');			 
	C('crossnav','crossUpgrade','evolution.xcross.evo');
	//C('exoticnav','exoticUpgrade','exotic');
	//Box Setups
	C=x=>{
		A = ID(x);
		A.setAttribute('code','<span onmouseenter="tip(this.id)" onmouseleave="tap(this.id)"></span>');
		A.setAttribute('echo',EVO.echo[x].join(' '));
	}
	C('struc');
	C('develop');
	C('talents');
	C('boost');
	//Creates Buttons
	C=x=>{
		A = ID(x+'box');
		A.setAttribute('code','<div class="button butcol red" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="buy(this.id)"><c></c><b onmouseenter="tip(this.parentNode.id,11)" onmouseleave="tip(this.parentNode.id)" onclick="buy(this.parentNode.id,11); event.stopPropagation()"></b></div>');
		A.setAttribute('echo',EVO.echo[x].join(' '));
	}
	C('stage');
	C('game');
	C('body');
	C('cross');
	C('exotic');
	//Combat Assist HTML Code
	C=(x,y)=>{ID('ii').insertAdjacentHTML('beforeend','<span id="'+y+'"><span onmousedown="gage(this.parentNode.id,-1)"></span><span id="'+x+'"></span><span onmousedown="gage(this.parentNode.id,1)"></span></span>');}
	C('health','hlth');
	C('stamina','stmn');
	C('retreat','rtrt');
	css('mouse','none');
	ID('protein').removeAttribute('onclick');
	setTimeout(start,clock.second);
	ID('chat-form').onsubmit =(x)=>{
		x.preventDefault();
		id = ID('chat-input');
		if(id.value.length > 0){
			socket.emit('sendMsgToServer',id.value);
			id.value = '';
		}
	}
});

document.addEventListener("mousemove",(mouse)=>{
	let x = mouse.clientX-40;
	if (x > window.innerWidth/2){x -= ID('mouse').offsetWidth;}
	css('mouseX',x+'px');
	css('mouseY',mouse.clientY+'px');
});

const ID =x=>(document.getElementById(x));

const css =(x,y)=>{
	if (!x.match(/^(mouse|mouseX|mouseY|bg-color|swirl-left|swirl-top|swirl-transform)$/)){y = '"'+y+'"';}
	return document.documentElement.style.setProperty('--'+x,y);
}

const echo =(x,y)=>{ID(x).setAttribute('echo',EVO.echo[y].join(' '))};

const copy =(loc,id,pos)=>{
	if (!Array.isArray(id)){id = [id];}
	if (pos == undefined){pos = 'afterend';}
	for (let i = 0; i < id.length; i++){
		let node = ID(loc);
		let copy = node.outerHTML;
		node.id = id[i];
		ID(id[i]).insertAdjacentHTML(pos,copy);
	}
}

const clock =(t)=>{
	//Only pass t a number for milliseconds
	let c=()=>(i>0||r!==''),r='',i=~~(t/clock.day);
	if(c()){r+=i+':'};
	i=~~((t/clock.hour)%24);
	if(c()){r+=(i>9?i+':':(r!==''?'0'+i+':':i+':'))};
	i=~~((t/clock.minute)%60);
	if(c()){r+=(i>9?i+':':(r!==''?'0'+i+':':i+':'))};
	i=~~((t/clock.second)%60);
	if(c()){r+=(i>9?i:(r!==''?'0'+i:i))};
	return r;
}
clock.second = 1000;
clock.minute = 60000;
clock.hour = 3.6e+6;
clock.day = 8.64e+7;
clock.week = 6.048e+8;
clock.month = 2.628e+9;
clock.year = 3.154e+10;
clock.decade = 3.154e+11;
clock.century = 3.154e+12;