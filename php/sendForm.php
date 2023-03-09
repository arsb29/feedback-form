<?php
$mysqli = new mysqli("db4free.net:3306", "belyaev", "12345678", "feedback");
// Check connection
if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}
mysqli_set_charset($mysqli,"utf8");
mysqli_query($mysqli,'SET character_set_database = utf8');
mysqli_query ($mysqli,"SET NAMES 'utf8'");
$sql = "INSERT INTO clients VALUES ('" . $_POST["organizationName"] . "', '" . $_POST["fio"] . "', '" . $_POST["phone"] . "', '" . $_POST["mark"] . "', '" . $_POST["products"] . "', '" . $_POST["date"] . "');";
$result = $mysqli -> query($sql);
$mysqli->close();
// Переводим массив в JSON
echo json_encode(array('result' => $result));
?>
