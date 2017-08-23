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
	if(location.hash=="#offline"){
		offline("");
	}else if(location.hash=="#online"){
		offline("on");
	}else if(location.hash=="#line"){
		if(localStorage.getItem("fukofes2017_str_off")){
			swal("","現在はオフラインモードで動作中です","info");
		}else{
			swal("","現在はオンラインモードで動作中です","info");
		}
	}
	context=document.getElementById('con1');
	context2=document.getElementById('con2');
	text=document.getElementById("text");
	i=document.getElementById("pic");
	i2=document.getElementById("pic2");
	for(j=1;j<13;j++)document.getElementById("h"+j).innerText="hint"+j;
	changeSize();
	setid();
	if(localStorage.getItem("fukofes2017_str_clea")){
		clea=localStorage.getItem("fukofes2017_str_clea").split(",");
		for(p=0;p<clea.length;p++){
			if(clea[p].search("goal")==0){
				document.getElementById("no5").innerText="ゴール済です";
				document.getElementById("no5").onclick=function(){swal("ゴール済です","引き続き附高祭2017をお楽しみください","success");};
				document.getElementById("no5").click();
			}else{
				tophp(clea[p],4);
			}
		}
	}
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
		what();
	}
}
function setid(){
	if((!localStorage.getItem("fukofes2017_str_id"))||(localStorage.getItem("fukofes2017_str_id")=="0000")){
		localStorage.setItem("fukofes2017_str_id","0000");
		tophp("",1);
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
}
function changeSpeed(){
	//力尽きたので誰か書いて～
}
function hash_reset(id_name){
	localStorage.setItem(id_name,"hogehoge");
	localStorage.removeItem(id_name);
}
function OfflinePHP(){
	this.onreadystatechange="";
	this.readyState=1;
	this.status=0;
	this.responseText="";
	this.open=function (a,b,c){};
	this.header=new Array();
	this.setRequestHeader=function (name,val){
		this.header.push(name);
		this.header.push(val);
	};
	this.send,this.onerror,this.ontimeout;
}
function offline(hiki){
	if(!localStorage.getItem("fukofes2017_str_off")){
		if(hiki=="512"){
			swal("","オフラインモードは公式にサポートされていない非推奨機能です。ゲームの動作が遅れる場合があります。","warning");
			alert("オンラインモード（現在のモード）の使用を強くおすすめします。");
			if(!confirm("オフラインモードへ切り替えますか？")){
				return;
			}
			alert("ただ今から切り替えに必要な通信を行います。\n「完了」のメッセージが出るまで操作を行わないでください。\n\n操作を行った場合、データが破損しプレイできなくなる可能性があります。");
			tophp("",6);
		}else if(hiki==""){
			if((!localStorage.getItem("fukofes2017_str_id"))||(localStorage.getItem("fukofes2017_str_id")=="0000")){
				alert("内部データが破損しているため、オフラインモードに切り替えできません。\nインターネット接続をご確認ください。");
				hash_reset("fukofes2017_str_log");
				hash_reset("fukofes2017_str_off");
				return;
			}
			tophp("",5);
		}
	}else{
		if((!localStorage.getItem("fukofes2017_str_id"))||(localStorage.getItem("fukofes2017_str_id")=="0000")){
			alert("内部データが破損しているため、オフラインモードを実行できません。\nオンラインモードに強制移行します。");
			hash_reset("fukofes2017_str_log");
			hash_reset("fukofes2017_str_off");
			return;
		}
		if(hiki=="on"){
			if(!confirm("オンラインモードへ切り替えますか？")){return;}
			if(localStorage.getItem("fukofes2017_str_log")){
				tophp(localStorage.getItem("fukofes2017_str_log"),7)
			}
			hash_reset("fukofes2017_str_log");
			hash_reset("fukofes2017_str_off");
		}else if(hiki=="no6"){
			alert("オフラインモードへの移行が完了しました。\n解除するには#onlineを付けURLを再読込してください。\n\n(#onlineを付けない状態ではすべての処理がオフラインモードで行われます)");
		}
	}
}
function shs(q,res){
	q.readyState=4;
	q.status=200;
	q.responseText="non";
	switch(q.header[5]){
	case 4:
	case 0:
		var tx=localStorage.getItem("fukofes2017_str_off").split("#");
		for(var df=0;df<tx.length;df++){
			tx[df]=tx[df].split("@");
		}
		for(var m=0;m<tx.length;m++){
			if(tx[m][0]==CryptoJS.SHA512(res).toString()){
				var passphrase=res;
				var encrypted_json_string=tx[m][1];
				var obj_json=JSON.parse(encrypted_json_string);
				var encrypted=obj_json.ciphertext;
				var salt=CryptoJS.enc.Hex.parse(obj_json.salt);
				var iv=CryptoJS.enc.Hex.parse(obj_json.iv);
				var key=CryptoJS.PBKDF2(passphrase,salt,{hasher:CryptoJS.algo.SHA512,keySize:64/8,iterations:999});
				var decrypted=CryptoJS.AES.decrypt(encrypted,key,{iv:iv});
				var fok=decrypted.toString(CryptoJS.enc.Utf8);
				if(fok!=""){
					if(q.header[5]!=4){
						wr("check:"+fok);
					}else{
						wr("check:"+fok+"#load");
					}
					q.responseText=fok;
					break;
				}
			}
		}
		if(q.responseText=="non"){wr("non_check");}
	break;
	case 1:
		alert("技術的な問題が発生しました。\nこの画面をスタンプラリースタッフまでご提示ください。\n\n(ERROR:offline get_id case1)");
	return;
	case 2:
		wr("GameOpen");
	break;
	case 3:
		var gcount=clea.length;
		if(gcount>=12){
			q.responseText="ok11";
			wr("11_goal");
		}else if(gcount>=4){
			q.responseText="ok4";
			wr("4_goal");
		}else{
			q.responseText="non";
			wr("try_ok_goal");
		}
	break;
	case 5:
	case 6:
	case 7:
		alert("技術的な問題が発生しました。\nこの画面をスタンプラリースタッフまでご提示ください。\n\n(ERROR:offline goto offline case5,6,7)");
	return;
	default:
	}
	q.onreadystatechange();
}
function wr(esp){
	var serval="";
	var kaban=new Date().getTime()/1000;
	if(localStorage.getItem("fukofes2017_str_log")){
		serval=localStorage.getItem("fukofes2017_str_log");
	}
	serval+=kaban+"\n"+esp;
	localStorage.setItem("fukofes2017_str_log",serval);
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
	history.pushState("","スタンプラリーゲーム画面",mainloca+"?code=top");
	gameviwe();
	if(check){
		check=false;
		tophp("",2);
	}
	if(clea.length>=12){
		alert("1階事務室にある最後のQRコードを読み取ってください");
	}
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
			}else if(res.search("goal")==0){
				if(clea.length>=4){
					if(clea.length>=12){
						tophp(res,3);
					}else if(confirm("一度ゴールすると続きから再開できません。\nゴールしますか？")){
						tophp(res,3);
					}
				}else{
					alert("4箇所以上チェックポイントを回ってからゴールしてください");
				}
			}else{
				tophp(res,0);
			}
		}
		var ce=document.createElement("canvas");
		document.body.appendChild(ce);
		var cf=ce.getContext("2d");
		var imgt=new Image();
		var yokow=500;
		imgt.src=FR.result;
		imgt.onload=function(){
			ce.width=yokow;
			ce.height=yokow*imgt.height/imgt.width
			cf.drawImage(imgt,0,0,yokow,yokow*imgt.height/imgt.width);
			var kf=cf.getImageData(0,0,yokow,(yokow*imgt.height/imgt.width));
			for(var bo=0;bo<kf.data.length;bo+=4){
				var onet=0.34*kf.data[bo]+0.5*kf.data[bo+1]+0.16*kf.data[bo+2];
				kf.data[bo]=onet;
				kf.data[bo+1]=onet;
				kf.data[bo+2]=onet;
			}
			cf.putImageData(kf,0,0);
			qrcode.decode(ce.toDataURL());
		}
	}
}
function tophp(res,hack){
	if(hack!=1){
		setid();
	}
	var corr=true;
	if(!localStorage.getItem("fukofes2017_str_off")){
		var q=new XMLHttpRequest();
	}else{
		if((!localStorage.getItem("fukofes2017_str_id"))||(localStorage.getItem("fukofes2017_str_id")=="0000")){
			if(navigator.onLine===true){
				alert("内部データが破損しているため、オフラインモードを実行できません。\nオンラインモードに強制移行します。");
				hash_reset("fukofes2017_str_log");
				hash_reset("fukofes2017_str_off");
				var q=new XMLHttpRequest();
				corr=false;
			}else{
				alert("内部データが破損しているため、オフラインモードを実行できません。\nインターネット接続を確認の上、再読み込みしてください。\n\nなお次回移行、接続時はオンラインモードに変更されます。");
				hash_reset("fukofes2017_str_log");
				hash_reset("fukofes2017_str_off");
				return;
			}
		}else{
			var q=new OfflinePHP();
		}
	}
	q.ontimeout=function(){
		alert("サーバーとの接続がタイムアウトしました。\nインターネット接続を確認の上、しばらくしてからもう一度お試しください。");
	}
	q.onerror=function(){
		if(navigator.onLine===true){
			alert("サーバーとの通信に失敗しました。一時的にアクセスが集中している可能性があります。\nしばらく待ってからもう一度お試しください。");
		}else{
			alert("現在、オフラインのためサーバーとの通信に失敗しました。\nインターネット接続をご確認ください。");
		}
	}
	q.onreadystatechange=function(){
		if(q.readyState==4&&q.status==200){
			switch(hack){
			case 4:
			case 0:
				if(q.responseText.search("non")==0){
					if(hack==0){
						alert("このQRコードはチェックポイントではありません");
					}
				}else{
					var vg=q.responseText.split("@");
					vg[0]=vg[0]-0;
					if(!isNaN(vg[0])){
						var ched="<div>";
						document.getElementById("i"+vg[0]).style.display="block";
						var yok;
						switch(vg[0]){
							case 1:case 2:case 3:case 4:
							yok=document.getElementById("pa1_"+vg[0]);break;
							case 5:yok=document.getElementById("pa2_1_1");break;
							case 6:yok=document.getElementById("pa2_3_1");break;
							case 7:yok=document.getElementById("pa2_1_2");break;
							case 8:yok=document.getElementById("pa2_3_2");break;
							case 9:case 10:case 11:case 12:
							yok=document.getElementById("pa3_"+(vg[0]-8));break;
							default:
							alert("技術的な問題が発生しました。\nこの画面をスタンプラリースタッフまでご提示ください。\n\n(ERROR:switch_responseText is default)");
							return;
						}
						var confiden=true;
						for(g=0;g<clea.length;g++){
							if(clea[g]==res){
								confiden=false;
							}
						}
						if(confiden){
							yok.innerHTML="<h2>"+vg[1]+"</h2>";
							clea.push(res);
							localStorage.setItem("fukofes2017_str_clea",clea.join(","));
						}else{
							if(hack==0){
								alert("このチェックポイントは通過済です。\nほかのチェックポイントを探してください。");
							}else if(hack==4){
								yok.innerHTML="<h2>"+vg[1]+"</h2>";
							}
						}
						if(hack==0){
							if(clea.length==4){
								alert("～ルール確認～\n\n・4箇所以上回った→参加賞\n・12箇所全て回った→参加賞＆景品抽選券\nを1階事務室にてお配りしています。");
								alert("現在4箇所のチェックポイントを通過しました。\nゲームを終了する場合は、1階事務室のQRコードを読み取り、参加賞をお受け取りください");
							}else if(clea.length>=12){
								alert("1階事務室にある最後のQRコードを読み取ってください");
							}
						}
					}else{
						if(hack==0){
							alert("技術的な問題が発生しました。\nこの画面をスタンプラリースタッフまでご提示ください。\n\n(ERROR:responseText is NaN)");
						}else{
							alert("技術的な問題が発生しました。\nこの画面をスタンプラリースタッフまでご提示ください。\n\n(ERROR:responseText is NaN case 4)");
						}
					}
				}
			break;
			case 1:
				localStorage.setItem("fukofes2017_str_id",q.responseText);
			break;
			case 2:break;
			case 3:
				if(q.responseText=="ok11"){
					document.getElementById("upload").style.display="none";
					document.getElementById("goal").style.display="block";
					clea.push("goal11");
					localStorage.setItem("fukofes2017_str_clea",clea.join(","));
					document.getElementById("no5").innerText="ゴール済です";
					document.getElementById("no5").onclick=function(){alert("ゴール済です");};
				}else if(q.responseText=="ok4"){
					document.getElementById("upload").style.display="none";
					document.getElementById("onegoal").style.display="block";
					clea.push("goal4");
					localStorage.setItem("fukofes2017_str_clea",clea.join(","));
					document.getElementById("no5").innerText="ゴール済です";
					document.getElementById("no5").onclick=function(){alert("ゴール済です");};
				}else{
					alert("4箇所以上チェックポイントを回ってからゴールしてください");
				}
			break;
			case 5:
				if(q.responseText=="sha512"){
					offline("512");
				}else{
					alert("技術的な問題が発生しました。\nこの画面をスタンプラリースタッフまでご提示ください。\n\n(ERROR:No use sha)");
				}
			break;
			case 6:
				localStorage.setItem("fukofes2017_str_off",q.responseText);
				offline("no6");
			break;
			case 7:break;
			default:alert("技術的な問題が発生しました。\nこの画面をスタンプラリースタッフまでご提示ください。\n\n(ERROR:res is non)");
			}
		}
	}
	q.open("POST","./src/check.php",true);
	q.setRequestHeader("Content-Type","x-www-form-urlencoded");
	q.setRequestHeader("id",localStorage.getItem("fukofes2017_str_id"));
	q.setRequestHeader("tag",hack);
	q.send(res);
	if(localStorage.getItem("fukofes2017_str_off")&&corr){
		shs(q,res);
	}
}
function what(){
	localStorage.setItem("fukofes2017_str","Have a great time!");
	document.getElementById("text").style.display="none";
	document.getElementById("its").style.display="block";
}
function what_h(){
	history.pushState("","スタンプラリールール説明",mainloca+"#what");
	what();
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
