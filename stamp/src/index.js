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

window.addEventListener("load",load);

function load(){
	if(_ua.Mobile||_ua.Tablet){
		var header=document.getElementById("header");
		header.style.top="-100px";
		//todo:insert menu button
	}
	init();
}
function init(){
	w=document.body.clientWidth;
	h=Math.max(document.documentElement.scrollHeight||document.body.scrollHeight,window.innerHeight)-17;
	context=document.getElementById('con1');//context
	context2=document.getElementById('con2');//rayout
	
	text=document.getElementById("text");
	
	var con=context.style;
	var con2=context2.style;

	document.body.style.height=h+"px";

	var l=(w>350)?50:(50-((350-w)/7));
	var o=(w/2)-(l*3.5);
	con.font="normal "+l+"px 'Times New Roman'";

//	c.fillStyle="rgb(0,0,0)";
//	c.fillText("スタンプラリー",o,h/2);
//	c.font="20px 'Times New Roman'";
//	c.fillText('~With your smartphone you can know "FukoFes2017" that you do not know~',0/*(w/2)-(10*35)*/,h/2+l);

	var gearR=200;

	i=document.getElementById("pic");
	i2=document.getElementById("pic2");
	i.width=i.height=gearR*1.7;
	i2.width=i2.height=gearR*2.2

	var is=i.style;
	var is2=i2.style;

	is.top="-"+(i.width/2)+"px";
	is2.top="-"+(i2.width/2)+"px";
	is.left="-"+(i.height/2)+"px";
	is2.left=(w-(i2.height/2))+"px";
}
function changeSize(){

}
function changeSpeed(){

}
