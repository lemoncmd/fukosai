var _ua = (function(u){
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
      || u.indexOf("ipad") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1
  }
})(window.navigator.userAgent.toLowerCase());
var context,context2;
var w=window.outerWidth;
var h=window.outerHeight;
var mainloca=location.protocol+"//"+location.host+location.pathname;
var i,i2;
var ymes;
var sha;
var check=true;
var gearR=200;
var clea=[];

window.addEventListener("load",load);
window.addEventListener("resize",changeSize);
window.addEventListener("popstate",function(){
	alert("##");
	//retop()
});


function load(){
	if(_ua.Mobile||_ua.Tablet){
		//something
	}
	if(!localStorage){
		swal({title:"ERROR",text:"お使いの端末では、ゲームが正常に動作しない可能性があります。対応端末をご利用ください。",typr:"error"},function(){pf=false;});
	}
	if(location.hash=="#reset"){
		hash_reset("fukofes2017_str");
		hash_reset("fukofes2017_str_id");
		hash_reset("fukofes2017_str_clea");
		hash_reset("fukofes2017_str_off");
		hash_reset("fukofes2017_str_log");
	}
	init();
}
function init(){
	context=document.getElementById('con1');
	context2=document.getElementById('con2');
	text=document.getElementById("text");
	i=document.getElementById("pic");
	i2=document.getElementById("pic2");
	changeSize();
	if(location.search.replace("?","").match(/code=[a-zA-Z\d]+$/)){
		var tpo=location.search.split("=");
		gameviwe();
		if(tpo[1].search("goal")==0){
			tophp(tpo[1],3);
		}else if((tpo[1].search("top")==0)&&(tpo[1].length==3)){
		}else{
			tophp(tpo[1],0);
		}
	}
	if(location.hash=="#what"){
		what(1);
	}
}
function changeSize(){
	w=document.body.clientWidth;
	h=window.innerHeight-17;
	var con=context.style;
	var con2=context2.style;

	document.body.style.height=h+"px";

//	c.fillText('~With your smartphone you can know "FukoFes2017" that you do not know~',0/*(w/2)-(10*35)*/,h/2+l);

	i.width=i.height=gearR*2.2;
	i2.width=i2.height=gearR*1.7;

	var is=i.style;
	var is2=i2.style;

	is.top=(h-(i.width/2))-7+"px";
	is2.top="-"+(i2.width/2)+"px";
	is.left="-"+(i.height/2)+"px";
	is2.left=(w-(i2.height/2))+"px";
	
	var siri=document.getElementsByClassName("what_photo");
	var yokoy=Math.min(w/3,h/3);
	for(kal=0;kal<siri.length;kal++){
		siri[kal].style.width=yokoy+"px";
	}
}
function changeSpeed(){
	//力尽きたので誰か書いて～
}
function hash_reset(id_name){
	localStorage.setItem(id_name,"hogehoge");
	localStorage.removeItem(id_name);
}
function start(){
	if(!localStorage.getItem("fukofes2017_str")){
		what_h();
	}
	if(!(window.File&&window.FileReader)){
		alert("お使いのブラウザは参加条件を満たしていません。\n別の端末での参加を心よりお待ちしております。");
		return;
	}
	history.pushState("","スタンプラリーゲーム画面",mainloca+"?code=top");
	gameviwe();
}

function what(k){
	localStorage.setItem("fukofes2017_str","Have a great time!");
	document.getElementById("text").style.display="none";
	document.getElementById("its").style.display="block";
	what_c();
	document.getElementById("what"+k).style.display="block";
}
function what_c(){
	for(yyy=1;yyy<5;yyy++){
		document.getElementById("what"+yyy).style.display="none";
	}
}
function what_h(){
	history.pushState("","スタンプラリールール説明",mainloca+"#what");
	what(1);
}
function reretop(){
	what_c();
	retop();
}
function retop(){
	history.pushState("","スタンプラリートップ",mainloca+"");
	document.getElementById("game").style.display="none";
	document.getElementById("its").style.display="none";
	document.getElementById("text").style.display="block";
}
function gameviwe(){
	localStorage.setItem("fukofes2017_str","Have a great time!");
	document.getElementById("text").style.display="none";
	document.getElementById("game").style.display="block";
}