<?php

	//put error information into php_errors.txt file
    ini_set("error_reporting",E_ALL);
    ini_set("log_errors","1");
    ini_set("error_log","php_errors.txt");

	//connect to the mySQL server
	$conn = mysqli_connect("mysql.cms.waikato.ac.nz", "qh41", "my10650320sql", "qh41");
	//if not connet,display disconnect information
	if($conn == FALSE)
	{
		die("Error connecting to mysql server :". mysqli_connect_error());
	}

	if($_GET)
	{
		//get username and password from index page
		$username = $_GET["username"];
		
		
		
		//create a sql select sentence to check whether the username and password is correct
		$query = "select count(*) as matches from `customer` where `username`='$username' ";
		$result = mysqli_query($conn, $query);
    	$row = mysqli_fetch_assoc($result);		
		//session_start();
		
		if($row['matches']==0)
		{
			echo "incorrect username";				
		}
			
		else {
			echo "correct username";		
			}
		
	}

	mysqli_close($conn);

?>