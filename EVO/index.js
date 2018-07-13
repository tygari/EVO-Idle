function start(){
	let x = '2/27/2018';
	let y = 0.2;
	css('date','"'+x+'"');
	css('version','"'+y+'"');
	if (localStorage.getItem('REC') !== null){
		var REC = JSON.parse(localStorage.getItem('REC'));
	}
	if (localStorage.getItem('EVO') !== null){
		var EVO = JSON.parse(localStorage.getItem('EVO'));
		if (EVO.version < y){soft();}
		cheat();
	}
}

function play(){
	window.location.assign('EVO.html');
}

function donate(){
	window.open('https://www.paypal.me/tygari');
}

function reddit(){
	window.open('https://www.reddit.com/user/Tygari');
}

function github(){
	window.open('https://github.com/tygari/EVO-Idle');
}