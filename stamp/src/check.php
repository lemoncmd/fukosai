<?php
function send(){
	echo "<html><head><meta http-equiv='Content-Type' content='text/html;charset=utf8'><meta http-equiv='refresh' content='0;index.html'></head></html>";
	exit();
}
if($_SERVER["REQUEST_METHOD"]!="POST"){
	send();
}
if(!is_numeric(file_get_contents('php://input'))){
	echo "non";
	exit();
}
//codeとして適当なのは、数値のみのもの
$code=intval(file_get_contents('php://input'));
switch($code){
	case 1111:
		echo "1@校長室";
		break;
	case 2222:
		echo "2@自治会室前";
		break;
	case 3333:
		echo "3@Ⅰ年Ａ組";
		break;
	case 4444:
		echo "4@事務室";
		break;
	case 5555:
		echo "5@グリーンコート";
		break;
	case 6666:
		echo "6@体育館";
		break;
	case 7777:
		echo "7@小講堂前";
		break;
	case 8888:
		echo "8@Ⅱ年Ｄ組前";
		break;
	case 9999:
		echo "9@化学実験室";
		break;
	case 1010:
		echo "10@wifiのパスワード";
		break;
	case 1011:
		echo "11@金融庁";
		break;
	case 1012:
		echo "12@アバダケダブラ";
		break;
	default:echo "non";
}
?>
