<?php /*

	error_reporting(E_ALL);
*/
	header('HTTP/1.1 200 OK', 'Content-Type: application/json');
	
	// Dynamic require URL to grab wp-load.php in both local and production environments
	if($_SERVER['DOCUMENT_ROOT']=='/Applications/MAMP/htdocs'){
		$wpLoad_URL = '/gfa/wp-load.php';
	}else {
		$wpLoad_URL = '/wp-load.php';
	}
	
	
	require($_SERVER['DOCUMENT_ROOT'].$wpLoad_URL);
	$uploadDIR = dirname(__FILE__).'/uploads';
	
	
	// If temp uploads directory doesn't exist, let's create it
	wp_mkdir_p($uploadDIR);
	
	
	$uploaded = array();
	
	// if files exist
	if(!empty($_FILES['file']['name'][0])){
		foreach($_FILES['file']['name'] as $position => $name) {
			
			$filePath = $uploadDIR.'/'.$name;
			
			if(move_uploaded_file($_FILES['file']['tmp_name'][$position], $uploadDIR.'/'.$name)){
				// Push file information to uploaded array
				$uploaded[] = array(
					'name' => $name,
					'file_path' => $filePath,
				);
			}
			
		}
	}
	
	echo json_encode($uploaded);