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
var hnt=["1年生の廊下",
		"2年B組前の廊下",
		"3年C組前",
		"地学室の近く",
		"金券販売所前",
		"体育館の吹き抜け",
		"グリーンコート",
		"化学部の模擬店",
		"特別室の近く",
		"Neo Kosho Free Wifiの発信元",
		"3年B組共田くんの財布の中",
		"地球上のどこか"];

var context,context2;
var w=window.outerWidth;
var h=window.outerHeight;
var i,i2;
var ymes;

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
	//h=Math.min(document.documentElement.scrollHeight||document.body.scrollHeight,window.innerHeight)-17;
	h=window.innerHeight-17;
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
	if(!(window.File&&window.FileReader)){
		if(!confirm("お使いのブラウザは参加条件を満たしていない可能性があります。\nゲーム画面へ進みますか？")){
			return;
		}
	}
	localStorage.setItem("fukofes2017_str","Have a great time!");
	document.getElementById("text").style.display="none";
	document.getElementById("game").style.display="block";
}
function open_file(){
	ymes="・QRコード以外がなるべく入らないようにして撮影する\n";
	ymes+="・QRコードを正面から15cm～20cm離れて撮影する\n";
	ymes+="・QRコードにピントをあてる\n";
	ymes+="・QRコードが中央に位置するよう撮影する";
	alert("カメラを起動してQRコードを撮影してください。");
	alert("～～撮影のヒント～～\n\n"+ymes);
	document.getElementById('up').click();
}
function path(number){
	document.getElementById("upload").style.display="none";
	document.getElementById("hint").style.display="block";
	hint.innerHTML="<h3>～ヒント～</h3>"+hnt[number-1]+"を探してみよう<br><br><button class='button5' onclick='close()'>ヒントを閉じる</button>";
//	var co=document.createElement("button");
//	co.onclick="close()";
//	document.getElementById("hint").appendChild(co);
}
function close(){
	document.getElementById("hint").style.display="none";
	document.getElementById("upload").style.display="block";
}
function pickup(f){
	if(f.length==0){
		alert("QRコードを撮影してください");
		return;
	}else if(f.length!=1){
		alert("複数ファイルを選択しないでください");
		return;
	}
	var file=f[0];
	if(!file.type.match(/image.*/)){
		alert("これは画像として認識できません");
		return;
	}
	var time_lost=new Date(file.lastModified);
	var lim=60;//画像の有効期限(秒)
	if(Math.abs(time_lost.getTime()-Date.now())>lim*1000){
		alert("撮影から"+(lim/60)+"分以上経過しています。\n再度撮影し直してください。");
		//return;
	}
	var FR=new FileReader();
	FR.readAsDataURL(file);
	FR.onload=function(){
		qrcode.callback=function(res){
			if(res=="error decoding QR Code"){
				alert("画像からQRコードを検出できませんでした。\nもう一度お試しください。");
			return;
			}
			alert(res);
		}
		qrcode.decode(FR.result);
	}
}
function what(){
	localStorage.setItem("fukofes2017_str","Have a great time!");
	document.getElementById("text").style.display="none";
	document.getElementById("its").style.display="block";
}
function retop(){
	document.getElementById("game").style.display="none";
	document.getElementById("its").style.display="none";
	document.getElementById("text").style.display="block";
}
