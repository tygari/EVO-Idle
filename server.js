const express = require('express');
const app = express();
const path = require('path');
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'client','index.html'));
});
app.use('/client/',express.static(path.join(__dirname,'client')));
const serv = require('http').createServer(app);
const io = require('socket.io')(serv,{
	pingInterval: 10000,
	pingTimeout: 20000,
	cookie: false,
});
serv.listen(process.env.PORT || 5000);

const AWS = require('aws-sdk');
let awsConfig = {
	'region':'us-east-2',
	'endpoint':'https://dynamodb.us-east-2.amazonaws.com',
	'accessKeyId':'',
	'secretAccessKey':'',
}
AWS.config.update(awsConfig);

let dyna = new AWS.DynamoDB.DocumentClient();
const DB = {
	'get':(key)=>{
		let info = {
			'TableName': 'TailedBeastGamesDB',
			'Key': {'PlayerAccount' : key},
		};
		dyna.get(info,(err,data)=>{
			if(err){console.log('Dyna Get Fail: '+JSON.stringify(err,null,2));}
			else {console.log('Dyna Get Success: '+JSON.stringify(data,null,2));}
		});
	},
	'put':(key,loc,val)=>{
		let info = {
			'TableName': 'TailedBeastGamesDB',
			'Item': {'PlayerAccount' : key, loc:val},
		}
		dyna.put(info,(err,data)=>{
			if(err){console.log('Dyna Put Fail: '+JSON.stringify(err,null,2));}
			else {console.log('Dyna Put Success');}
		});
	},
	'mod':(key,exp,val)=>{
		let info = {
			'TableName': 'TailedBeastGamesDB',
			'Key': {'PlayerAccount' : key},
			'UpdateExpression': 'set '+exp+' = :x',
			'ExpressionAttributeValues':{':x': val},
		}
		dyna.update(info,(err,data)=>{
			if(err){console.log('Dyna Mod Fail: '+JSON.stringify(err,null,2));}
			else {console.log('Dyna Mod Success');}
		});
	},
	'del':(key)=>{
		let info = {
			'TableName': 'TailedBeastGamesDB',
			'Key': {'PlayerAccount' : key},
		};
		dyna.delete(info,(err,data)=>{
			if(err){console.log('Dyna Del Fail: '+JSON.stringify(err,null,2));}
			else {console.log('Dyna Del Success');}
		});
	},
};



//console.log(process.argv);
console.log('Server started.');

const SOCKET_LIST = {};
const CHAT = [];
var donation = {
	'SpecialWES': 225,
	'venti5': 25,
}

io.on('connection',(socket)=>{
	let t = new Date();
	console.log('socket connection: timestamp Y'+t.getFullYear()+':M'+t.getMonth()+':D'+t.getDate()
				+':H'+t.getHours()+':M'+t.getMinutes()+':S'+t.getSeconds());
	
	socket.player = {};
	socket.id = Math.random();
	socket.player.name = 'Guest'+(''+socket.id).slice(2,7);
	SOCKET_LIST[socket.id] = socket;
	socket.on('disconnect',()=>{
		delete SOCKET_LIST[socket.id];
	});
	socket.on('kong',(kong)=>{
		if (typeof kong === 'string'){
			if (typeof JSON.parse(kong) === 'object'){
				let player = JSON.parse(kong);
				if (typeof player.id === 'number' && player.id !== 0){socket.player.id = player.id;}
				if (typeof player.name === 'string' && player.name !== 'Guest'){socket.player.name = player.name;}
			}
		}
	});
	socket.emit('startChat',CHAT);
	let don = 0;
	for (let d in donation){
		don += donation[d];
	}
	socket.emit('donation',don);
	socket.on('sendMsgToServer',(data)=>{
		if (data == 'SYSTEMS ADMIN COMMAND CHAT RESET'){//FIX
			CHAT.splice(0,CHAT.length);
			for (let i in SOCKET_LIST){
				SOCKET_LIST[i].emit('startChat',CHAT);
			}
		}
		else {
			let t = new Date();
			data = '['+t.getHours()+':'+t.getMinutes()+'] '+socket.player.name+': '+data;
			CHAT.push(data);
			if (CHAT.length > 50){CHAT.shift();}
			for (let i in SOCKET_LIST){
				SOCKET_LIST[i].emit('addToChat',data);
			}
		}
	});
	
	//socket.on('buy',()=>{});
});

