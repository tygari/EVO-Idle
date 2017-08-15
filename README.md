# EVO-Idle
An idle game with an evolution theme.

Cell > MultiCell > Worm > Fish > Amphibian > Reptile
	
Stage 1 Cell
Bubble > Double Bubble > Phospholipid > Cell Wall
Bubble > RNA > Aerobic Respiration / Photophosphorylation > Nucleus > DNA > Mitochondria
Phospholipid > Cytoskeleton > Cilia & Flagellum
RNA & Phospholipid > Mitosis.  Mitosis is cell devide.  Lottery to get more evolution points.
Metabolism & Mitosis >> MultiCellular
	
Stage 2 MultiCellular
Stage Factor: 
Sexual Reproduction
Cellular Adhesion > Cellular Communication 	> Self-Organization
											> Quorum Sensing
											> Swarming Motility
											> Osmoregulation
Self-Organization > Cellular Specialization	> Statocyst
											> Nerves
											> Vascular
											> Muscle
											> Respiratory
											> Digestive
											> Excretion
											> Sight
2 Specializations > Circular Symmetry > 4 specializations > Dependency > 6 specializations > Radial Symmetry > 8 specializations
Dependency >> Worm
Circular Symmetry Gate tech 8 sides



Stage 2 Add Maybe
Touch

Stage 3 Worms
Movement = 3000 - Peristalsis - Muscle*10

	Dioecy		>
	Balance		>
	Nerves		>
	Vascular	>
	Muscle		>
	Respiratory	>
	Digestive	>
	Excretion	>
	Sight		>
	
	> 6 specializations > Radial Symmetry > 8 specializations > Bilateral Symmetry >
						> Peristalsis
				
	> Bilateral Symmetry	> Diet			> Boost
							> Carnivore		> Camoflauge
							> Herbivore		> Territorial
											> Roaming
											> Hyper
				
				
Hunting/Grazing System
	Diminishing returns on findng food in the a longer timer to acquire the next food unit.
	Sub areas
		Predator randomly removes a predeatory.
		Predator randomly removes a grazer.
		Grazer randomly removes a field.
		Field are limited.
		Predator 1-10.
		Grazer 1-100.
		Field 1-1000.
		A field will have 1-1000 food.
		Predator triggers every every 10 min - 1 min/predator (600000 ms - 60000 ms per predator).
		Grazer triggers every 10 minutes - 6 second per grazer (600000 ms - 6000 ms per grazer).
		When field are empty Grazer leaves.
		When grazer are empty Predator leaves.
		Player auto subarea moves 1 min after food hits 0.
		1 Predator ~*10 Grazer ~*10 Field

	carnivores
		Predator food will come from winning fights with predators and prey.
		Fight chance 100% target prey*4 + predator
		Killing opponent will reduce that number and award food.
		If opponent successfully runs than there will be no food.

	herbivores
		Herbivore food will come from fields.
		Fight chance predator + grazer/4 % target predator + grazer/4
		Killing opponent will reduce that amount.  No food reward for a herbivore.


CbtBoost

		Camoflauge = carnivore hunt timer reduced / herbivore fight precentage reduced. Offense +5
		Territorial = opposition timer takes longer to reduce a sub area. Defense +5
		Roaming = auto move timer is reduced. Speed +5
		Hyper Metabolic = metabolism is boosted while injured, injuries recover faster. Special +5

Skeleton
	Skeleton =
	Exoskeleton =

Stage 4 Fish
??? Skeleton
Hearing
Scent
Taste

CBT

Achievements
First Recarnation

High Scores
Most REC.bonus



Extracellular polymeric substances (EPSs) makes Biofilm

Balance:   reduces cell timer and ad timer
Nerve:   speeds up learning
Vascular:   speeds up autoclick
Muscle:   reduces currents damage and modifies movement
Respiratory:   modifies metabolism
Digestive:   effects healing & energy replenishment & advanced food
Excretion:   reduces toxins damage (toxin damage increases with number of cells)
Sight:    increases chance to find better food areas (max food per area)

Ctenophora

notochord
myomeres

Neoproterozoic   


Combat System
Scar = losses this incarnation.

Primary Stats // stat = (specialize/10) + combat level
	Strength	=	Muscle		+	Digestive	+	Offense
	Dexeterity	=	Sight		+	Respiratory	+	Special
	Constituion	=	Vascular	+	Excretion	+	Defense
	Agility		=	Balance		+	Nerve		+	Speed

Health		= (Con * (Off + Def + Spd + Spl)) - Scar%
Stamina		= Off + Def + Spd + Spl
Armor		= 0
Max Damage	= Str (Min 1)
Min Damage	= Dex (Limited by Str)
Accuracy	= Dex%
Dodge		= Agl/2%
Retreat		= Agl/2%

Dmg = Random(Max - Min) - Opp Arm
Hit%= (Acc - Opp Agl/2)%
Rtr%= Agl/2%-Opp Agl/2%

Name				= Cost	= Formula
Offensive
	Extra Limbs		= 3		= 2x Attack/2 and Dmg +1% * Off
		Berserk		= 3		= Boosted damage, reduced hit% and dodge%, chance of extra attack?
	Fierce			= 1		= Dmg +2% * Off
		Wrathful	= 1		= Dmg +3% * Off
	Critical		= 0		= Crit chance +0.5% * Off; dmg +2.5% * Off
		***Gluttonous	= 0		= Food Reward +Off * 100
		
Defensive
	Shell			= 3		= Arm +Def/2
		Hide
	Anti-Venom		= 1		= Reduces Venom Power def/5
		
	Regeneration	= 0		= Scar -1
		Healing		= 0		= Heal Def/20 per round
Speed
	Burst			= 3		= Next Agl Action * Spd/3
	Run				= 1		= Retreat * Spd/5
	Streamline		= 0		= Stamina Cost - Spd/10
Special
	Electric		= 3		= Spl% Stun 1 rnd
	Venom			= 3		= Deals Spl/5 dmg per rnd Spl/5 rnds
	Luminesence		= 3		= Spl/2 Reduces Enemy Acc and Reduces Enemy min dmg

Potential Food Reward = Creature Health
Food Reward = Degiestive * 10 + Offensive * 100
Fatigue = Stamina 0 = Stats/2


Stage 3 - Worm		- Herbivore vs Carnivore pay Omnivore
Stage 4 - Fish		- 
Stage 5 - Amphibian	- 
Stage 6 - Reptile	- 


overflow



function buyCiliaCond() { return EVO.atp >= cilflaMath() && EVO.flagellum < 1000; }
function buyFlagellumCond() { return EVO.atp >= cilflaMath(); }

function buy(x) {
	if(x()){
		EVO.atp -= cilflaMath();
		EVO[x] += 1;
		document.getElementById(x).innerHTML = EVO[x];
		updateATP();
	}
	document.getElementById('cilflaCost').innerHTML = cilflaMath();
}
button: buy(buyCiliaCond);
button: buy(buyFlagellumCond);


var amount=[0,0,0];
var cost = [8,4,3];
var id = ['muscle','nerves','resp'];
var max=[0,3,0];

c=a+a*b;  c=math(a,b)
e=d=d*e;  e=math(d,e)

function math(i1,i2) {
 return i1+i1*i2;
}

	var xxxxCost;
	var xxxx;

	function buy(resourcestr,q){
		var quantity = q || 1;
		var resource = findResourceId(resourcestr);
		if(resource >= 0 && nutrient >= cost[resource]){
			amount[resorce] += qunatity;
			nutrient -= cost[resource];
			document.getElementById(id[resource]).innerHTML = amount[resorce];
			updateNutrients();
		}
	}
	function findResourceId(resourcestr) {	
		var resource = -1;
		for (var i=0;i<id.length,i++) {
			if (id[i]==resourcestr) {
				resource=i;
			}
		}
		return resource;
	}

	function color(resource){
		var element = document.getElementById(id[resource]+"Button");
		if (nutrient >= cost[resource]) {element.style.color = "red";}
		else {element.style.color = "green";}
	}

for (var i = 0; i < cost.length; i++) {
	color(i)
}
buy('muscle');
