const event =()=>{
	let swch = 'off';
	ID('event').style.display = 'initial';
	let random = Math.floor((Math.random()*100)+1);
	if (EVO.stage.num == 1 && 0 < random && 10 >= random){
		swch = 'on';
		css('event-one','You met a friendly cell. \\a Would you like to share genes?');
		ID('eventtwo').innerHTML = '<p title="Horizontal Gene Transfer is the two single cell creatures meeting together and sharing genes." onclick="horizontal()"><b class="purple">HGT</b></p>';
		fun.failtimer = setTimeout(eventEnd, (Math.floor((Math.random()*clock.minute*4)+1)));
	}
	else if (EVO.stage.num == 1 && 10 < random && 20 >= random && EVO.RNASwitch == 'on'){
		swch = 'on';
		EVO.enviro.virus = [1 ,0, 0, 0];
		css('event-one','You met a virus. \\a It has infected you.');
		ID('eventtwo').innerHTML = '<p title="Click to fight the virus." onclick="antivirusM()"><b class="purple">Fight Virus</b></p>';
		EVO.enviro.virus[1] = Math.floor(Math.random()*RNA.RNA()*100);
		antivirusA();
	}
	else if (EVO.one.flagellum && 20 < random && 30 >= random){
		swch = 'on';
		css('event-one','The area has had an influx of food.');
		EVO.stage.food += Math.floor((Math.random()*5000*(1+(EVO.one.flagellum/100)))+1);
		setTimeout(eventEnd, clock.minute);
	}
	else if (EVO.stage.num > 1 && 90 < random && 100 >= random && EVO.specialized > 1 && body.cell.total()+EVO.two.body > 10 && EVO.stage[fun.food] >= 2000-EVO.two.motility-(EVO.two.muscle*10) && cbt.check){
		swch = 'on';
		let res = move.cost();
		EVO.stage[fun.food] -= res;
		updateFood();
		css('event-one','An aggressive colony of cells has entered your area. \\a They are attacking you.');
		cbt.cbt(res);
		setTimeout(busy,clock.second);
		const busy =()=>{(!cbt.check ? setTimeout(busy,clock.second) :setTimeout(eventEnd, clock.minute));}
	}
	if (swch == 'off'){
		ID('event').style.display = 'none';
		setTimeout(event, clock.minute*5);
	}
}
const horizontal =()=>{
	clearTimeout(fun.failtimer);
	if ((15-(EVO.one.membraneScore*5))+(RNA.RNA()/100) > Math.floor((Math.random()*100)+1)){EVO.evo.bonus++;}
	eventEnd();
}	
const antivirusM =()=>{
	EVO.enviro.virus[2] += 100;
	if (EVO.enviro.virus[2] >= EVO.enviro.virus[3]){
		EVO.enviro.virus[2] = 0;
		EVO.enviro.virus[3] += 100;
	}
	EVO.enviro.virus[1] -= EVO.enviro.virus[3];
}
const antivirusA =()=>{
	EVO.enviro.virus[1]--;
	if (EVO.enviro.virus[1] > 0){setTimeout(antivirusA, clock.second);}
	else {
		EVO.enviro.virus[0] = 1;
		eventEnd();
	}
}
const eventEnd =()=>{
	ID('event').style.display = 'none';
	css('event-one','');
	ID('eventone').innerHTML = '';
	css('event-two','');
	ID('eventtwo').innerHTML = '';
	setTimeout(event,(Math.floor((Math.random()*clock.minute*4)+1)));
}