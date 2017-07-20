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
var c,ct;
var w=window.outerWidth;
var h=window.outerHeight;

window.addEventListener("load",load);

function load(){
	if(_ua.Mobile||_ua.Tablet){
		var header=document.getElementById("header");
		//todo:insert menu button
	}
	init();
}
function init(){
	context=document.getElementById('con');
	context.setAttribute("width",document.body.clientWidth-10);
	context.setAttribute("height",h);
	c=context.getContext("2d");
	c.beginPath();
	c.fillStyle="rgb(184,134,11)";
	c.fillRect(0,0,w,h);
	var o=0;
	var l=0;
	if(w>350){
		l=50;
		c.font="50px 'Times New Roman'";
		o=(w/2)-(50*3.5);
	}else{
		l=(50-((350-w)/7));
		c.font=l+"px 'Times New Roman'";
		o=(w/2)-(l*3.5);
	}
	c.fillStyle="rgb(0,0,0)";
	c.fillText("スタンプラリー",o,h/2);
	c.font="10px 'Times New Roman'";
	c.fillText('~With your smartphone you can know "FukoFes2017" that you do not know~',0/*(w/2)-(10*35)*/,h/2+l);
	var i=new Image();
	i.src="2970.png";
	i.onload=function(){
		c.drawImage(i,-200,-200,400,400);
	}
}
