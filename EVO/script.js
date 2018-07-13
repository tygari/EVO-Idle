function script(){
	let stage = 1;
	if (localStorage.getItem('EVO') !== null){
		stage = JSON.parse(localStorage.getItem('EVO')).stage;
	}
	else if (localStorage.getItem('EVOE') !== null){
		stage = JSON.parse(localStorage.getItem('EVOE')).stage;
	}
	[
		'EVO.css',
		'EVO'+stage+'.css',
		'CBT.css'
	].forEach(function(href) {
	  let x = document.createElement('link');
	  x.rel = 'stylesheet';
	  x.type = 'text/css';
	  x.href = href;
	  x.async = false;
	  document.head.appendChild(x);
	});
	[
		'EVO.js',
		'REC.js',
		'EVO'+stage+'.js',
		'CBT.js'
	].forEach(function(src) {
	  let x = document.createElement('script');
	  x.type = 'text/javascript';
	  x.src = src;
	  x.async = false;
	  document.head.appendChild(x);
	});
}
script();
window.addEventListener("load",function(){start()});