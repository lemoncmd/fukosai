<?php
function send(){
	echo "<html><head><meta http-equiv='Content-Type' content='text/html;charset=utf8'><meta http-equiv='refresh' content='0;../index.html'></head></html>";
	exit();
}
$t="";
if($_SERVER["REQUEST_METHOD"]!="POST"){
	send();
}
function che($c){
	$y="".kche($c);
	while(mb_strlen($yZ,"UTF-8")<5){
		$y="0".$y;
	}
	return $y;
}
function kche($passphrase,$plain_text){
	$salt=openssl_random_pseudo_bytes(256);
	$iv=openssl_random_pseudo_bytes(16);
	$iterations=999;
	$key=hash_pbkdf2("sha512",$passphrase,$salt,$iterations,64);
	$encrypted_data=openssl_encrypt($plain_text,'aes-256-cbc',hex2bin($key),OPENSSL_RAW_DATA,$iv);
	$data=array("ciphertext"=>base64_encode($encrypted_data),"iv"=>bin2hex($iv),"salt"=>bin2hex($salt));
	return json_encode($data);
}
$op=getallheaders();
$t=$op["tag"];
$oid=$op["id"];
if(!is_numeric($t)){
	send();
}
$b_goal="aiueo";
$ans=array(
	"1111" => "1@校長室",
	"2222" => "2@職員室",
	"3333" => "3@Ⅰ年Ｂ組前",
	"4444" => "4@化学室",
	"5555" => "5@Ⅱ年Ｃ組前",
	"6666" => "6@小講堂",
	"7777" => "7@グリーンコート",
	"8888" => "8@Ⅲ年ジャパリパーク",
	"9999" => "9@特別室前",
	"1010" => "10@Kosho is here",
	"1011" => "11@財務局",
	"1012" => "12@どくさいスイッチ"
);
function wr($d){
	global $oid;
	$mess=$_SERVER['REQUEST_TIME']."\n".$d."\n";
	file_put_contents("../users_file/".$oid.".oec",$mess,FILE_APPEND|LOCK_EX);
}
switch(intval($t)){
	case 4:
	case 0:
		$code=file_get_contents('php://input');
		foreach($ans as $key => $v){
			if($key==$code){
				echo $v;
				if(intval($t)!=4){
					wr("check:".$v);
				}else{
					wr("check:".$v."#load");
				}
				exit();
			}
		}
		echo "non";
		wr("non_check");
	break;
	case 1:
		do{
		$oid=uniqid("",true);
		}while(file_exists("../users_file/".$oid.".oec"));
		wr($_SERVER["HTTP_USER_AGENT"]);
		echo $oid;
	break;
	case 2:
		wr("GameOpen");
	break;
	case 3:
		$code=file_get_contents('php://input');
		$w="goal".$b_goal;
		if($code==$w){
			$tj=file("../users_file/".$oid.".oec",FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES);
			$result=array();
			foreach($tj as $u){
				if(strpos($u,"check")===0){
					if(array_search($u,$result)===false){
						array_push($result,$u);
					}
				}
			}
			$gcount=count($result);
			if($gcount>=12){
				echo "ok11";
				wr("11_goal");
			}elseif($gcount>=4){
				echo "ok4";
				wr("4_goal");
			}else{
				echo "non";
				wr("try_ok_goal");
			}
		}else{
			echo "non";
			wr("try_goal");
		}
	break;
	case 5:
		if(in_array("sha512",hash_algos())){
			echo "sha512";
		}else{
			echo "SHA512ハッシュは使えません";
		}
	break;
	case 6:
		$r="";
		foreach($ans as $key => $v){
			$r.=hash("sha512",$key)."@";
			$r.=kche($key,$v)."#";
		}
		$r.="goal@".hash("sha512","goal".$b_goal);
		echo $r;
	break;
	case 7:
		//オンラインになった時のログを記録
	break;
	default:
		echo "non";
	break;
}
?>
