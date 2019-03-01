//{"game":{"version":0.4,"date":1550981462503},"stage":{"num":2,"food":1915.4000000000144,"ate":93801.20000000097,"order":[],"nutrient":109439174239776940},"evo":{"evolution":1,"evolved":66,"bonus":1005,"cost":"1.30"},"one":{"metacycle":13470,"membraneScore":2,"metabolism":{"val":10,"type":"photo"},"cytoskeleton":true,"cilia":100,"flagellum":100,"cytoplasm":100,"RNA":{"val":1452,"sRNA":1442,"rRNA":2,"tRNA":70},"mitosis":59,"ribosome":{"val":10,"bonus":0,"partial":40}},"two":{"colony":520,"body":450,"bodyPart":909.61176,"specialized":1,"celladhesion":{"val":10,"learn":8},"sex":true,"communication":true,"EPS":0,"biofilm":true,"osmoregulation":{"val":22,"learn":7},"motility":{"val":1,"learn":1},"organization":true,"quorum":true,"generation":{"val":8,"learn":58},"specialization":true},"three":{},"four":{},"five":{},"six":{},"combat":{"talent":0,"cbtevo":[],"mhp":0,"hp":0,"msp":0,"sp":0,"exp":0,"scar":0,"offense":0,"defense":0,"speed":0,"special":0,"body":0,"soul":0,"wind":0,"expert":0,"coward":0,"survivor":0,"rtrt":100},"cross":{"foodmax":2},"exotic":[],"enviro":{"sun":{"shift":-1,"position":12},"current":11,"currentDamage":97,"ph":106,"phd":4,"salinity":30,"salt":0,"toxin":0},"size":{"game":3,"stage":2},"protein":{"whole":3,"partial":368},"toxin":418.8341000000004}
var EVO = {
	"game":{
		"version": 0.45,
		"date": Date.now(),
	},
	"stage":{
		"num": 1,
		"food": 10000,
		"atp": 0,
		"ate": 0,
	},
	"load":{
		'struc':['ATP', 'evolution',],
		'stage':[],
		'game':[],
		'boost':[],
		'body':[],
		'cross':[],
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

const load =()=>{
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
	  x.href = 'css/'+href+'.css';
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
	  x.src = 'js/'+src+'.js';
	  x.async = false;
	  document.head.appendChild(x);
	});
};
load.html =(x)=>{ID(x+'box').insertAdjacentHTML('afterbegin','<div class="button butcol red" id="'+x
		+'" onmouseenter="tip(this.id)" onmouseleave="tap(this.id)" onclick="buy(this.id)"><c></c><b onmouseenter="tip(this.parentNode.id,11)" onmouseleave="tip(this.parentNode.id)" onclick="buy(this.parentNode.id,11); event.stopPropagation()"></b></div>');}
load();

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
	load.html('stage');
	load.html('game');
	load.html('body');
	load.html('cross');
	load.html('exotic');
	let html =(x,y)=>{ID('ii').insertAdjacentHTML('beforeend','<span id="'+y+'"><span onmousedown="gage(\''+y+'\',-1)"></span><span id="'+x+'"></span><span onmousedown="gage(\''+y+'\',1)"></span></span>');}
	html('health','hlth');
	html('stamina','stmn');
	html('retreat','rtrt');
	copy('stage','evolution','beforebegin');
	css('mouse','none');
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

const ID =(x)=>(document.getElementById(x));

const css =(x,y)=>{
	if (!x.match(/^(mouse|mouseX|mouseY|bg-color|swirl-left|swirl-top|swirl-transform)$/)){y = '"'+y+'"';}
	return document.documentElement.style.setProperty('--'+x,y);
}

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

const clock =(t,c,r,i)=>{//Only t is passed
	c =()=>(i > 0 || r !== '');
	r = '';
	i = ~~(t/clock.day);
	if (c()){r += i+':';}
	i = ~~((t/clock.hour)%24);
	if (c()){r += (i > 9 ? i+':' : (r !== '' ? '0'+i+':' : i+':'));}
	i = ~~((t/clock.minute)%60);
	if (c()){r += (i > 9 ? i+':' : (r !== '' ? '0'+i+':' : i+':'));}
	i = ~~((t/clock.second)%60);
	if (c()){r += (i > 9 ? i : (r !== '' ? '0'+i : i));}
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