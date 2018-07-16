var EVO;

function start(){
	let date = '7/16/2018';
	let version = 0.3;
	css('date',date);
	css('version',version);
	if (localStorage.getItem('REC') !== null){
		REC = JSON.parse(localStorage.getItem('REC'));
	}
	if (localStorage.getItem('EVO') !== null){
		EVO = JSON.parse(localStorage.getItem('EVO'));
		if (EVO.version < version){soft();}
		cheat();
	}
}
window.addEventListener("load",function(){start()});

function play(){window.location.assign('EVO.html');}

function donate(){window.open('https://www.paypal.me/tygari');}

function reddit(){window.open('https://www.reddit.com/user/Tygari');}

function github(){window.open('https://github.com/tygari/EVO-Idle');}