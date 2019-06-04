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
		
		//create a sql select sentence to check whether the username and password is correct
		$query = "select count(*) as matches from `customer` where `username`='$collection[0]' ";
		$result = mysqli_query($conn, $query);
    	$row = mysqli_fetch_assoc($result);		
			//session_start();
		
		if($row['matches']==0)
		{
			$query = "insert into customer values ('$collection[0]','$collection[1]','$collection[2]','$collection[3]','$collection[4]')";
			mysqli_query($conn, $query);
			
			$situation='false';
			$query = "insert into situation values ('$situation','$collection[0]')";
			mysqli_query($conn, $query);
			
				
			echo "Add Successful";			
		}
			
		else
		{
			echo "The username has alredy used by someone!";		
		}
				
	}


	mysqli_close($conn);

?>