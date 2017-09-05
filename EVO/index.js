function start(){
	colors();
	bcolors();
	var EVO;
	var REC;
	if (localStorage.getItem("EVO") !== null){
		EVO = JSON.parse(localStorage.getItem("EVO"));
		if (EVO.version < 0){soft();}
		if (EVO.stage == 1){
			if (EVO.one.metabolism > 100){hard();}
			if (EVO.one.mitochondria > 100){hard();}
			if (EVO.one.cytoplasm > 1000){hard();}
			if (EVO.one.cilia > 1000){hard();}
			if (EVO.flagellum > 1000){hard();}
			if (EVO.size.max > 1){hard();}
		}
		if (EVO.stage == 2){
			if (EVO.two.balance > REC.balance.max + 100){hard();}
			if (EVO.two.nerve > REC.nerve.max + 100){hard();}
			if (EVO.two.vascular > REC.vascular.max + 100){hard();}
			if (EVO.two.muscle > REC.muscle.max + 100){hard();}
			if (EVO.two.respiratory > REC.respiratory.max + 100){hard();}
			if (EVO.two.digestive > REC.digestive.max + 100){hard();}
			if (EVO.two.excretion > REC.excretion.max + 100){hard();}
			if (EVO.two.sight > REC.sight.max + 100){hard();}
			if (EVO.size.max > 3){hard();}
		}
		if (EVO.stage == 3){
			if (EVO.three.balance > REC.balance.max + 100){hard();}
			if (EVO.three.nerve > REC.nerve.max + 100){hard();}
			if (EVO.three.vascular > REC.vascular.max + 100){hard();}
			if (EVO.three.muscle > REC.muscle.max + 100){hard();}
			if (EVO.three.respiratory > REC.respiratory.max + 100){hard();}
			if (EVO.three.digestive > REC.digestive.max + 100){hard();}
			if (EVO.three.excretion > REC.excretion.max + 100){hard();}
			if (EVO.three.sight > REC.sight.max + 100){hard();}
			if (EVO.size.max > 7){hard();}
		}
	}
	if (localStorage.getItem("REC") !== null){
		var REC = JSON.parse(localStorage.getItem("REC"));
	}
}

function play(){
	var stage = 1;
	if (localStorage.getItem("EVO") !== null){
		var EVO = JSON.parse(localStorage.getItem("EVO"));
		stage = EVO.stage;
	}
	if (localStorage.getItem("EVOE") !== null){
		var EVOE = JSON.parse(localStorage.getItem("EVO"));
		stage = EVOE.stage;
	}
	if (stage == 1){window.location.assign("EVO1.html");}
	if (stage == 2){window.location.assign("EVO2.html");}
	if (stage == 3){window.location.assign("EVO3.html");}
	if (stage == 4){window.location.assign("EVO4.html");}
	if (stage == 5){window.location.assign("EVO5.html");}
	if (stage == 6){window.location.assign("EVO6.html");}
}

function colors(){
	var color = document.getElementById('title');
	red();
	function red(){color.style.color = 'red'; setTimeout(orange, 300);}
	function orange(){color.style.color = 'orange'; setTimeout(yellow, 300);}
	function yellow(){color.style.color = 'yellow'; setTimeout(green, 300);}
	function green(){color.style.color = 'green'; setTimeout(blue, 300);}
	function blue(){color.style.color = 'blue'; setTimeout(purple, 300);}
	function purple(){color.style.color = 'purple'; setTimeout(red, 300);}
}

function bcolors(){
	var color = document.getElementById('start');
	white();
	function white(){color.style.color = 'white'; setTimeout(black, 500);}
	function black(){color.style.color = 'black'; setTimeout(white, 500);}
}

function soft(){
	localStorage.removeItem("EVO");
	window.location.assign("index.html")
}

function hard(){
	localStorage.removeItem("EVO");
	localStorage.removeItem("REC");
	window.location.assign("index.html")
}

function donate(){
	window.open("https://www.paypal.me/tygari");
}

function reddit(){
	window.open("https://www.reddit.com/user/Tygari/");
}