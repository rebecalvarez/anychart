<?php
	// Define MySQL connection data
	$MYSQL['host'] = "localhost";
	$MYSQL['user'] = "root";
	$MYSQL['password'] = "";
	$MYSQL['database'] = "givepulse_test";

	// Connect to MySQL database
	$mysqli = mysqli_connect($MYSQL['host'],$MYSQL['user'],$MYSQL['password'],$MYSQL['database']);

	// Make SQL request
	// the Query is selecting the First Name and last Name of the users table naming 
	// it x and the duration_hours as value, so it can be read by the anychart algorithm 

	$result = $mysqli->query("SELECT CONCAT(u.first_name, ' ', u.last_name) as x, duration_hours as value FROM impacts JOIN users as u ON u.id = impacts.user_id ORDER BY duration_hours DESC LIMIT 5");

	// Loop through the result and populate an array
	$impacts = Array();
    while ($impacts[] = $result->fetch_assoc()){}
    array_pop($impacts);

	// Return the result and close MySQL connection
    $mysqli->close();
    header('Content-type: application/json');

	echo json_encode($impacts);
?>
