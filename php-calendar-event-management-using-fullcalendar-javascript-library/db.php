<?php
$conn = mysqli_connect("localhost","root","","givepulse_test") ;

if (!$conn)
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?>