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

	is.top=(h-(i.width/2))-7+"px";
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
		alert("お使いのブラウザは参加条件を満たしていません。\n別の端末での参加を心よりお待ちしております。");
		return;
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
	cent_hint.innerHTML="<h3>～ヒントNo"+number+"～</h3>"+hnt[number-1]+"を探してみよう<br><br>";
}
function hint_close(){
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
			//alert(res);//debug用
			tophp(res);
		}
		qrcode.decode(FR.result);
	}
}
function tophp(res){
	var q=new XMLHttpRequest();
	q.onreadystatechange=function(){
		if(q.readyState==4&&q.status==200){
			if(q.responseText.search("non")==0){
				alert("このQRコードはチェックポイントではありません");
			}else{
				var vg=q.responseText.split("@");
				vg[0]=vg[0]-0;
				if(!isNaN(vg[0])){
					var ched="<div>";
					document.getElementById("i"+vg[0]).style.display="block";
					switch(vg[0]){
						case 1:case 2:case 3:case 4:
						document.getElementById("pa1_"+vg[0]).innerHTML="<h2>"+vg[1]+"</h2>";break;
						case 5:document.getElementById("pa2_1_1").innerHTML="<h2>"+vg[1]+"</h2>";break;
						case 6:document.getElementById("pa2_3_1").innerHTML="<h2>"+vg[1]+"</h2>";break;
						case 7:document.getElementById("pa2_1_2").innerHTML="<h2>"+vg[1]+"</h2>";break;
						case 8:document.getElementById("pa2_3_2").innerHTML="<h2>"+vg[1]+"</h2>";break;
						case 9:case 10:case 11:case 12:
						document.getElementById("pa3_"+(vg[0]-8)).innerHTML="<h2>"+vg[1]+"</h2>";break;
						default:
						alert("技術的な問題が発生しました。\nこの画面をスタンプラリースタッフまでご提示ください。\n\n(ERROR:switch_responseText is default)");
					}
				}else{
					alert("技術的な問題が発生しました。\nこの画面をスタンプラリースタッフまでご提示ください。\n\n(ERROR:responseText is NaN)");
				}
			}
		}
	}
	q.open("POST","./src/check.php",true);
	q.setRequestHeader("Content-Type","x-www-form-urlencoded");
	q.setRequestHeader("id","00001");
	q.send(res);
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
