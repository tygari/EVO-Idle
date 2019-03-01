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

/*
const DB =(opr,key,exp,val)=>{
	let info = {'TableName': 'TailedBeastGamesDB'};
	if (opr.match(/^(get|mod|del)$/)){info.Key = {'PlayerAccount' : key}};
	if (opr == 'put'){info.Item = {'PlayerAccount' : key, loc:val}};
	if (opr == 'mod'){
		info.UpdateExpression = 'set '+exp+' = :x';
		info.ExpressionAttributeValues = {':x': val};
	};
	if (opr == 'mod'){opr = 'update';}
	if (opr == 'del'){opr = 'delete';}
	dyna[opr](info,(err,data)=>{
		opr = opr.charAt(0).toUpperCase() + opr.slice(1);
		if(err){console.log('Dyna '+opr+' Fail: '+JSON.stringify(err,null,2));}
		else {console.log('Dyna '+opr+' Success: '+JSON.stringify(data,null,2));}
	});
}
*/

/*
DB.get({
	'TableName': 'TailedBeastGamesDB',
	'Key': {'PlayerAccount' : 1},
});*/

/*DB.put({
	'TableName': 'TailedBeastGamesDB',
	'Item': {'PlayerAccount' : 1,'PlayerInfo':{
		"Status": "null",
		"PictureURL": "null",
		"AccountCreation": Date(),
		"Username": "null",
		"LastLogin": 0,
		"Password": "null"
	}},
});*/

/*DB.mod({
	'TableName': 'TailedBeastGamesDB',
	'Key': {'PlayerAccount' : 1},
	'UpdateExpression': 'set PlayerInfo.AccountStatus = :status, PlayerInfo.Username = :username, PlayerInfo.LastLogin = :date',
	'ExpressionAttributeValues':{
		':status': 'Active',
		':username': 'Test',
		':date': Date(),
	},
});*/

/*DB.del({
	'TableName': 'TailedBeastGamesDB',
	'Key': {'PlayerAccount' : 1},
});*/

/*
<?php
	// A simple class for communicating with the Kongregate Server API
	class KongregateAPI{
		protected $api_key = 'e40c042a-a09e-4aaf-86d1-40e9e07ef716';
		// Initialize the class with the given api_key
		function __construct($api_key){
			$this->api_key = $api_key;
		}
		// Decodes/verifies a signed request. If the verification is successful
		// the associative array of params will be returned, otherwise null.
		public function parse_signed_request(){
			// Get the signed request from the request parameters
			if(is_null($_REQUEST['signed_request'])){
				error_log('No signed request');
				return(null);
			}
			// Split the string at the period character to get the signature/payload
			list($encoded_sig, $payload) = explode('.', $_REQUEST['signed_request'], 2); 
			// base64_url decode the payload and then parse it as JSON
			$sig = $this->base64_url_decode($encoded_sig);
			$data = json_decode($this->base64_url_decode($payload), true);
			// Verify the signature algorithm
			if (strtoupper($data['algorithm']) !== 'HMAC-SHA256'){
				error_log('Unknown algorithm. Expected HMAC-SHA256');
				return null;
			}
			// Make sure that we calculate the same signature for the payload as was sent
			$expected_sig = hash_hmac('sha256', $payload, $this->api_key, $raw = true);
			if ($sig !== $expected_sig){
				error_log('Bad Signed JSON signature!');
				return null;
			}
			// Return the params
			return $data;
		}
		// Decodes a base64_url encoded string
		protected function base64_url_decode($input){
			return base64_decode(strtr($input, '-_', '+/'));
		}
	}
?>
*/

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

