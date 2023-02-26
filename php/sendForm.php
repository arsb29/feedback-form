<?php
$mysqli = new mysqli("db4free.net:3306", "belyaev", "12345678", "feedback");
// Check connection
if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

$sql = "INSERT INTO clients VALUES ('" . $_POST["fio"] . "');";
$result = $mysqli -> query($sql);
$mysqli->close();
// Переводим массив в JSON
echo json_encode(array('result' => $result));
?>
