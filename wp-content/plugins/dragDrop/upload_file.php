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
	
	// Variables
	$uploaded = array();
	$errors = array();
	$output = array(
		'errors' => array(),
		'uploads' => array()
	);
	$uploadDIR = dirname(__FILE__).'/uploads';
	$allowedSize = 18000000;
	
	
	// If temp uploads directory doesn't exist, let's create it
	wp_mkdir_p($uploadDIR);
	
	// if files were passed, let's move them to the directory
	if(!empty($_FILES['file']['name'][0])){
		foreach($_FILES['file']['name'] as $position => $name) {
		
		
			// Variables
			$filePath = $uploadDIR.'/'.$name;
			
			// Validation

			if(ext_is_audio( $name ) === false){
				$extNotAudio = "Sorry, this file extension is not accepted";
				
				$output['errors'][] = array(
					'file_name' => $name,
					'error' => $extNotAudio,
					'type' => 'ext'
				);
				echo json_encode($output);
				exit();
			}
			if(file_size_allowed( $_FILES['file']['size'][$position], $allowedSize ) === false){
				$mbSize = $allowedSize / 1000000 . "mb";
				$fileTooBig = "Sorry, this file exceeds the size limit of $mbSize";
				$output['errors'][] = array(
					'file_name' => $name,
					'error' => $fileTooBig,
					'type' => 'size'
				);
				echo json_encode($output);
				exit();
			}
			if(empty($errors)){			
				if(move_uploaded_file($_FILES['file']['tmp_name'][$position], $uploadDIR.'/'.$name)){
					// Push file information to uploaded array
					$output['uploads'][] = array(
						'name' => $name,
						'file_path' => $filePath,
					);
				}	
			}
			
		}
	}

	echo json_encode($output);
	
	// Validation functions
	
	function ext_is_audio( $filename )
	{
		$exp = explode(".",$filename);
		$ext = end($exp);
		$allowed = array("mp3","m4a","wav","acc");
		
		if(in_array($ext, $allowed)){
			return true;
		}else {
			return false;
		}
	}
	function file_size_allowed( $filesize, $allowedSize ){
		if($filesize < $allowedSize){
			return true;
		}else {
			return false;
		}
	}