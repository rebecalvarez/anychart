<?php
require_once "db.php";

$id = $_POST['id'];
$title = $_POST['title'];
$start = $_POST['start_date_time'];
$end = $_POST['end_date_time'];

$sqlUpdate = "UPDATE events SET title='" . $title . "',start='" . $start . "',end='" . $end . "' WHERE id=" . $id;
mysqli_query($conn, $sqlUpdate)
mysqli_close($conn);

?>