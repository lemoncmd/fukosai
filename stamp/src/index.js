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
var c,ct,c2;
var w=window.outerWidth;
var h=window.outerHeight;
var i;

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
	context2=document.getElementById('con2');
	context.setAttribute("width",document.body.clientWidth-10);
	context.setAttribute("height",h);
	context2.setAttribute("width",document.body.clientWidth-10);
	context2.setAttribute("height",h);
	c=context.getContext("2d");
	c2=context2.getContext("2d");
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
	c.fillText('~With your smartphone you can know "FukoFes2017" that you do not know~',0/*(w/2)-(10*35)*/,h/2+l);
	i=new Image();
	i.src="2970.png";
	i.onload=function(){
		c2.translate(w-60,0);
		c.translate(0,0);
		var p=setInterval("dww("+400+","+0+")",10);
	}
}
function dww(k,o){
	c.beginPath();
	c2.beginPath();
	c.fillStyle="rgb(184,134,11)";
	c2.fillStyle="rgb(184,134,11)";
	c.fillRect(-(k/2),-(k/2),k,k);
	c.drawImage(i,-(k/2),-(k/2),k,k);
	c2.fillRect(-250,-250,500,500);
 	c2.drawImage(i,-250,-250,500,500);
	c.rotate(0.3*Math.PI/180);
	c2.rotate(-1*Math.PI/180);
}
