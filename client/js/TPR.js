evolution.temporal =()=>{
	for (let id in evolution.temporal.data){
		if (!EVO.temporal[id]){
			evolution.temporal.data[id].evo();
		}
	}
}
let temporal = evolution.temporal;
temporal.setup=()=>{
	let x =(id,c,evo,con)=>{
		evolution.temporal.data[id] = {
			"id": id,
			"evo":()=>{if (evo() && evolution.temporal.mote() >= evolution.temporal.data[id].cost()){evolution.evo.push(`t${id}`);}},
			"con":()=>(con!==undefined?con():true && evolution.temporal.mote()>EVO.temporal[id]+1),
			"buy":()=>{
				if(evolution.temporal.data[id].con()){
					EVO.temporal[id]++;
					EVO.temporal.smote += EVO.temporal[id];
					css(`t${id}`,EVO.temporal[id]);
					css(`mote`,evolution.temporal.mote());
					evolution.temporal.data[id].tip();
				}
			},
			"dat":()=>(0),
			"cost":()=>(EVO.temporal.evo+c),
			"color":()=>{
				let clr = ID(id).classList;
				(evolution.temporal.data[id].con()?clr.replace(`green`,`red`):clr.replace(`red`,`green`));
			},
			"tip":()=>{
				css(`cost-time-${id}`,EVO.temporal[id]+1);
				if(id == `redux`){css(`cost-redux-evo`,EVO.temporal.redux*10);}
			},
		};
	};
	x(`redux`,10,()=>(EVO.evo.evolution > 9),()=>(EVO.evo.evolution > EVO.temporal.redux*10));
	x(`auto`,1,()=>(EVO.one.metabolism.type == `aerob`));
	x(`photo`,1,()=>(EVO.one.metabolism.type == `photo`));
	x(`RNA`,1,()=>(EVO.one.RNA && EVO.one.RNA.val > 199));
	x(`ribosome`,1,()=>(EVO.one.ribosome && EVO.one.ribosome.val > 199));
	x(`protein`,1,()=>(EVO.protein.whole > 199));
	x(`generation`,1,()=>(EVO.two.generation
			&& EVO.two.generation.val+(EVO.cross.genbalance||0)+(EVO.cross.gennerve||0)
			+ (EVO.cross.genvascular||0)+(EVO.cross.genmuscle||0)+(EVO.cross.genrespiratory||0)
			+ (EVO.cross.gendigestive||0)+(EVO.cross.genexcretion||0)+(EVO.cross.gensight||0)
			> 99));
	x(`heal`,1,()=>(EVO.combat && EVO.combat.hpheal+EVO.combat.spheal > 9999));
	//x(`hunt`,1,);
	x(`roam`,1,()=>(EVO.three.boost == `roam`));
	x(`expansion`,5,()=>(EVO.stage.rushed > clock.day),()=>(EVO.stage.rushed > clock.day*(EVO.temporal.expansion+1)));
	x(`extention`,1,()=>(true));
	x(`compression`,3,()=>(EVO.stage.blessed>9),()=>(EVO.stage.blessed>EVO.temporal.compression*10));
	
	
	evolution.temporal.start();
}
temporal.start=()=>{
	if(EVO.temporal.lock){
		ID(`mote`).removeAttribute(`onclick`);
		ID(`natural`).style.visibility = `initial`;
		ID(`temporals`).style.visibility = `initial`;
		css(`mote`,evolution.temporal.mote());
		for (let id in EVO.temporal){
			if (evolution.temporal.data[id]){
				css(`t${id}`,EVO.temporal[id]);
			}
		}
	}
}
temporal.unlock =()=>{
	let x=0,c=1,i,d,m=()=>(i.match(/^(black|white)$/)?1:3),t=EVO.temporal;
	for(i in t){
		!t[i]?x+=m():c++;
	}
	if(~~(Math.random()*100)+1 > x){return}
	x=[];
	for (i in t){
		if(!t[i]){
			for (d=0;d<m();d++){
				x.push(i);
			}
		}
	}
	x = x[~~(Math.random()*x.length)];
	if(!ID(`timestrand`)){
		i = ID(`bounce`),
		d = i.getAttribute(`echo`).split(` `);
		d.push(`timestrand`);
		i.setAttribute(`echo`,d.join(` `));
	}
	i=ID(`timestrand`);
	i.setAttribute(`data-run`,x);
	i.style.filter = evolution.temporal[x]();
	core.bounce(`timestrand`,24,x,clock.minute*c);
}
temporal.black=()=>(`invert(0%) sepia(0%) saturate(0%) hue-rotate(120deg) brightness(0%) contrast(100%)`);
temporal.blue=()=>(`invert(7%) sepia(100%) saturate(7482%) hue-rotate(248deg) brightness(103%) contrast(144%)`);
temporal.green=()=>(`invert(49%) sepia(68%) saturate(1655%) hue-rotate(78deg) brightness(115%) contrast(132%)`);
temporal.orange=()=>(`invert(64%) sepia(62%) saturate(4893%) hue-rotate(0deg) brightness(104%) contrast(104%)`);
temporal.purple=()=>(`invert(9%) sepia(96%) saturate(6007%) hue-rotate(296deg) brightness(85%) contrast(120%)`);
temporal.red=()=>(`invert(12%) sepia(99%) saturate(7484%) hue-rotate(0deg) brightness(95%) contrast(112%)`);
temporal.white=()=>(`invert(100%) sepia(0%) saturate(7500%) hue-rotate(264deg) brightness(114%) contrast(103%)`);
temporal.yellow=()=>(`invert(94%) sepia(57%) saturate(7496%) hue-rotate(360deg) brightness(111%) contrast(100%)`);
temporal.timestrand=()=>{
	let x = ID(`timestrand`),t=EVO.temporal;
	t[x.getAttribute(`data-run`)] = true;
	x.setAttribute(`data-run`,``);
	core.tap();
	if(t.black&&t.blue&&t.green&&t.orange&&t.purple&&t.red&&t.white&&t.yellow){
		EVO.timer.temporal = 0;
		EVO.temporal = {
			'lock': true,
			'evo': 0,
			'amote': 0,
			'bmote': 0,
			'smote': 0,
		}
	}
}
temporal.calc =()=>{
	let x = EVO.temporal.amote+1;
	x = (x*(x+1)/2)*clock.minute*5;
	if (EVO.timer.temporal > x){
		EVO.temporal.amote++;
		css(`mote`,evolution.temporal.mote());
		evolution();
	}
	css(`mote-time`,clock(~~x-EVO.timer.temporal));
}
temporal.mote =()=>(EVO.temporal.amote + EVO.temporal.bmote - EVO.temporal.smote);
temporal.evo =x=>{
	ID(x).removeAttribute(`id`);
	EVO.echo.temporal.push(x);
	echo(`temporalbox`,`temporal`);
	x = x.substring(1);
	let data = evolution.temporal.data[x];
	EVO.temporal.smote += data.cost();
	EVO.temporal.evo++;
	EVO.temporal[x] = data.dat();
}
temporal.data ={}