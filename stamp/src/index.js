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
var i,i2;

var gearR=200;

window.addEventListener("load",load);
window.addEventListener("resize",changeSize);

function load(){
	if(_ua.Mobile||_ua.Tablet){
		//something
	}
	init();
}
function init(){
	context=document.getElementById('con1');//context
	context2=document.getElementById('con2');//layout
	
	text=document.getElementById("text");

	i=document.getElementById("pic");
	i2=document.getElementById("pic2");

	changeSize();
}
function changeSize(){
	w=document.body.clientWidth;
	h=Math.min(document.documentElement.scrollHeight||document.body.scrollHeight,window.innerHeight)-17;

	var con=context.style;
	var con2=context2.style;

	document.body.style.height=h+"px";

//	var l=(w>350)?50:(50-((350-w)/7));
//	var o=(w/2)-(l*3.5);
//	con.font="normal "+l+"px 'Times New Roman'";

//	c.fillStyle="rgb(0,0,0)";
//	c.fillText("スタンプラリー",o,h/2);
//	c.font="20px 'Times New Roman'";
//	c.fillText('~With your smartphone you can know "FukoFes2017" that you do not know~',0/*(w/2)-(10*35)*/,h/2+l);

	i.width=i.height=gearR*2.2;
	i2.width=i2.height=gearR*1.7;

	var is=i.style;
	var is2=i2.style;

	is.top=(h-(i.width/2))+"px";
	is2.top="-"+(i2.width/2)+"px";
	is.left="-"+(i.height/2)+"px";
	is2.left=(w-(i2.height/2))+"px";
}
function changeSpeed(){
	//力尽きたので誰か書いて～
}
function start(){
	if(!localStorage.getItem("fukofes2017_str")){
		if(!confirm("はじめにルール説明をお読みください。\n（まだ読まれていない方はキャンセルボタンを押してください）\n\nゲームを開始しますか？")){
		return;
		}
	}
	localStorage.setItem("fukofes2017_str","Have a great time!");
	document.getElementById("text").style.display="none";
	document.getElementById("game").style.display="block";
	//ここにゲームスタート時の描画処理
}
function what(){
	localStorage.setItem("fukofes2017_str","Have a great time!");
	document.getElementById("text").style.display="none";
	document.getElementById("its").style.display="block";
}
function retop(){
	document.getElementById("its").style.display="none";
	document.getElementById("text").style.display="block";
}
