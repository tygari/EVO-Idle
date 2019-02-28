const enviros = {
	"array":[],
	"setup":()=>{
		for (let i = enviros.depth.lo; i < enviros.depth.hi+1; i++){
			let dep = enviros.array;
			dep[i] = {};
			dep[i].psi = i+15;
			dep[i].temp = 0;
			dep[i].current = 0;
			dep[i].salinity = 35;
			dep[i].ph = 700;
			dep[i].player = 0;
			dep[i].aerob = 0;
			dep[i].photo = 0;
		}
	},
	"depth":{
		"hi": 99,
		"lo": 0,
	},
	"current":{
		"hi": 100,
		"lo": 0,
		"bloom":()=>{
			let dep = enviros.array;
			for (let i = enviros.depth.lo; i < enviros.depth.hi+1; i++){
				if (dep[i].current > 0){
					dep[i].current -= 0.1;
					if (dep[i].current < 0){dep[i].current = 0;}
				}
			}
		},
	},
	"ph":{//display ph/100
		"hi": 1400,//pH goes up from to much carbon dioxide
		"lo": 0,//   pH goes down from to much oxygen
		"mod":()=>{
			let dep = enviros.array;
			for (let i = enviros.depth.lo; i < enviros.depth.hi+1; i++){
				dep[i].ph += dep[i].aerob-dep[i].photo;
				if (dep[i].ph < enviros.ph.lo){dep[i].ph = enviros.ph.lo;}
				if (dep[i].ph > enviros.ph.hi){dep[i].ph = enviros.ph.hi;}
			}
		},
	},
	"salinity":{
		"hi": 40,//High temperature, low rain
		"lo": 30,//Low temperature, high rain
	},
	"temp":{
		"hi": 100,
		"lo": 0,
	},
	"bloom":(env,loc,val,blm)=>{
		let dep = enviros.array;
		dep[loc][env] = val;
		enviros.loop(dep,env,loc,blm,val,1);
		enviros.loop(dep,env,loc,blm,val,-1);
	},
	"loop":(dep,env,loc,val,blm,inc)=>{
		for (let h = 1, i = loc+inc; i < loc+blm; h++, i+=inc){
			if (i < enviros.depth.lo || i > enviros.depth.hi){break;}
			let e = Math.round(val*((blm-h)*100/blm)/100);
			if (dep[i][env] < e){dep[i][env] = e;}
		}
	},
}
enviros.setup();
enviros.bloom('current',95,10,10);
enviros.current.bloom();
enviros.ph.mod();
console.log(enviros);