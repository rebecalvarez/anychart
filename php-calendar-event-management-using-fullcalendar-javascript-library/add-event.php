<?php
require_once "db.php";

$title = isset($_POST['title']) ? $_POST['title'] : "";
$start = isset($_POST['start_date_time']) ? $_POST['start_date_time'] : "";
$end = isset($_POST['end_date_time']) ? $_POST['end_date_time'] : "";

$sqlInsert = "INSERT INTO events (title,start_date_time,end_date_time) VALUES ('".$title."','".$start."','".$end ."')";

$result = mysqli_query($conn, $sqlInsert);

if (! $result) {
    $result = mysqli_error($conn);
}
?>