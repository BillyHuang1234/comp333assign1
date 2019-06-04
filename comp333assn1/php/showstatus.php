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

		//create a sql select sentence to check whether the username and password is correct
		$query = "SELECT * FROM situation";
		$result = mysqli_query($conn, $query);
    	
    	
    	$status=array();
		
		while($row=mysqli_fetch_assoc($result))
		{
			$status[]=$row;
		}
		
		echo json_encode($status);
		
		mysqli_close($conn);
?>