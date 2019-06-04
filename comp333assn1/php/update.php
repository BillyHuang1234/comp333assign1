<?php
	//put error information into php_errors.txt file
    ini_set("error_reporting",E_ALL);
    ini_set("log_errors","1");
    ini_set("error_log","php_errors.txt");
?>

<?php


	//connect to the mySQL server
	$conn = mysqli_connect("mysql.cms.waikato.ac.nz", "qh41", "my10650320sql", "qh41");
	//if not connet,display disconnect information
	if($conn == FALSE)
	{
		die("Error connecting to mysql server :". mysqli_connect_error());
	}

	if($_GET)
	{
		$data= $_GET["data"];
		
		$collection= explode("/", $data);
		
		$date=date("Y-m-d");
		
		$query = "insert into communication2 values ('$collection[0]','$collection[1]','$date') ";
		mysqli_query($conn, $query);  			
	}

	mysqli_close($conn);
?>