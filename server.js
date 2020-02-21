const express = require(`express`);
const app = express();
const path = require(`path`);
app.get(`/`,(req,res)=>{
	res.sendFile(path.join(__dirname,`client`,`index.html`));
});
app.use(`/client/`,express.static(path.join(__dirname,`client`)));
const serv = require(`http`).createServer(app);
const io = require(`socket.io`)(serv,{
	pingInterval: 10000,
	pingTimeout: 20000,
	cookie: false,
});
serv.listen(process.env.PORT || 5000);

const AWS = require(`aws-sdk`);
let awsConfig = {
	'region':`us-east-2`,
	'endpoint':`https://dynamodb.us-east-2.amazonaws.com`,
	'accessKeyId':``,
	'secretAccessKey':``,
}
AWS.config.update(awsConfig);

let dyna = new AWS.DynamoDB.DocumentClient();
const DB = {
	'get':(key)=>{
		let info = {
			'TableName': `TailedBeastGamesDB`,
			'Key': {'PlayerAccount' : key},
		};
		dyna.get(info,(err,data)=>{
			if(err){console.log(`Dyna Get Fail: ${JSON.stringify(err,null,2)}`);}
			else {console.log(`Dyna Get Success: ${JSON.stringify(data,null,2)}`);}
		});
	},
	'put':(key,loc,val)=>{
		let info = {
			'TableName': `TailedBeastGamesDB`,
			'Item': {'PlayerAccount' : key, loc:val},
		}
		dyna.put(info,(err,data)=>{
			if(err){console.log(`Dyna Put Fail: ${JSON.stringify(err,null,2)}`);}
			else {console.log(`Dyna Put Success`);}
		});
	},
	'mod':(key,exp,val)=>{
		let info = {
			'TableName': `TailedBeastGamesDB`,
			'Key': {'PlayerAccount' : key},
			'UpdateExpression': `set ${exp} = :x`,
			'ExpressionAttributeValues':{':x': val},
		}
		dyna.update(info,(err,data)=>{
			if(err){console.log(`Dyna Mod Fail: ${JSON.stringify(err,null,2)}`);}
			else {console.log(`Dyna Mod Success`);}
		});
	},
	'del':(key)=>{
		let info = {
			'TableName': `TailedBeastGamesDB`,
			'Key': {'PlayerAccount' : key},
		};
		dyna.delete(info,(err,data)=>{
			if(err){console.log(`Dyna Del Fail: ${JSON.stringify(err,null,2)}`);}
			else {console.log(`Dyna Del Success`);}
		});
	},
};



//console.log(process.argv);
console.log(`Server started.`);

const SOCKET_LIST = {};
const CHAT = [];
CHAT.id = 0;
var donation = {
	'SpecialWES': 225,
	'venti5': 25,
}

io.on(`connection`,(socket)=>{
	{
		let t = new Date(),player;
		console.log(`socket connection: timestamp Y${t.getFullYear()}:M${t.getMonth()}:D${t.getDate()}:H${t.getHours()}:M${t.getMinutes()}:S${t.getSeconds()}`);
	}
	socket.player = {};
	socket.id = Math.random();
	socket.player.id = socket.id;
	socket.player.name = `Guest${(``+socket.id).slice(2,7)}`;
	SOCKET_LIST[socket.id] = socket;
	socket.on(`disconnect`,()=>{
		delete SOCKET_LIST[socket.id];
	});
	socket.on(`playerInfo`,(player)=>{
		if(!!player.id && !!player.name && typeof player.id == `number` && typeof player.name == `string`){
			for (let i = 0; i < CHAT.length; i++){
				if (CHAT[i].pid === socket.player.id || CHAT[i].name === socket.player.name){
					CHAT[i].pid = player.id;
					CHAT[i].name = player.name;
				}
			}
			socket.player.id = player.id;
			socket.player.name = player.name;
			let chat = [];
			for (let i=0;i<CHAT.length;i++){
				chat[i] = Object.assign({},CHAT[i]);
				chat[i].txta = socket.player.id === CHAT[i].pid ? `R` : `L`;
				delete chat[i].pid;
			}
			socket.emit(`startChat`,chat);
		}
	});
	{
		let don = 0;
		for (let i in donation){
			don += donation[i];
		}
		socket.emit(`donation`,don);
	}
	socket.on(`sendMsgToServer`,(data)=>{
		if (typeof data == `object` && data != null && typeof data.game == `string` && typeof data.pid == `number`
			&& typeof data.name == `string` && typeof data.message == `string`){
			if (data.message == `SYSTEMS ADMIN COMMAND CHAT RESET`){//FIX
				CHAT.length = 0;
				for (let i in SOCKET_LIST){
					SOCKET_LIST[i].emit(`startChat`,CHAT);
				}
			}
			else {
				data.time = new Date();
				data.mid = ++CHAT.id;
				CHAT.push(data);
				if (CHAT.length > 50){CHAT.shift();}
				for (let i in SOCKET_LIST){
					data = Object.assign({},data);
					data.txta = socket.player.id === data.pid ? `R` : `L`;
					delete data.pid;
					SOCKET_LIST[i].emit(`addToChat`,data);
				}
			}
		}
	});
});

