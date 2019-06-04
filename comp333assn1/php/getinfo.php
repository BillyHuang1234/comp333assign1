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
		$username= $_GET["user"];
		
		//create a sql select sentence to check whether the username and password is correct
		$query = "SELECT `content`,`username` FROM communication2 where username='$username'";
		$result = mysqli_query($conn, $query);
		
		$info=array();
		
		while($row=mysqli_fetch_assoc($result))
		{
			$info[]=$row;
		}
		
		echo json_encode($info);
	}

	mysqli_close($conn);

?>