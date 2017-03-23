<?php
	
	
// 	error_reporting(E_ALL);
	header('HTTP/1.1 200 OK', 'Content-Type: application/json');
	
	// Dynamic require URL to grab wp-load.php in both local and production environments
	if($_SERVER['DOCUMENT_ROOT']=='/Applications/MAMP/htdocs'){
		$wpLoad_URL = '/gfa/wp-load.php';
	}else {
		$wpLoad_URL = '/wp-load.php';
	}
	
	
/*
	require($_SERVER['DOCUMENT_ROOT'].$wpLoad_URL);
	
	$str = '["01Deadicated.mp3","02SayAnything.mp3"]';
	
	$array = json_encode($str);
	$print = json_decode($str, true);
	
	print_r($print);
		$array = array("hello","world");
	print_r($array);
*/

	
/*
	foreach($print as $key => $file){
		$id = $key + 1;
		$upFILE = ABSPATH . 'wp-content/plugins/dragDrop/uploads/' . $file;
		echo "<br/>Key: $key | $upFILE <br/>";
	}
*/

$errors = array();
$fileName = '02-anomaly.mp2';

if(anon_test( $fileName ) === false){
	$msg = 'Not accepted';
	array_push($errors, $msg);
}

echo json_encode($errors);

function anon_test( $var ){
	$allowed = array("mp3","mp4","wav");
	$ext = end((explode(".",$var)));
	
	if(in_array($ext, $allowed)){
		return true;
	}else {
		return false;
	}
}