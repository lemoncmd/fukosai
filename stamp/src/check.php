<?php
function send(){
	echo "<html><head><meta http-equiv='Content-Type' content='text/html;charset=utf8'><meta http-equiv='refresh' content='0;index.html'></head></html>";
	exit();
}
if($_SERVER["REQUEST_METHOD"]!="POST"){
	send();
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
				wr("check:".$v);
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
			if($gcount<=12){
				echo "ok11";
				wr("11_goal");
			}elseif($gcount<=4){
				echo "ok4";
				wr("4_goal");
			}
		}else{
			echo "non";
			wr("try_goal");
		}
		//ToDo:記録を参照して何箇所回ったか調べる
	break;
	default:
		send();
	break;
}
?>
