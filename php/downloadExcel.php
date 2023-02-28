<?php
$conn = new mysqli("db4free.net:3306", "belyaev", "12345678", "feedback");
mysqli_set_charset($conn,"utf8");
mysqli_query($conn,'SET character_set_database = utf8');
mysqli_query ($conn,"SET NAMES 'utf8'");
$sql = "SELECT * FROM `clients`";
$setRec = mysqli_query($conn, $sql);
$columnHeader = "Название организации" . "\t" . "ФИО" . "\t" . "Телефон" . "\t" . "Оценка" . "\t" . "Продукты" . "\t" . "Дата" . "\t";
$setData = '';
while ($rec = mysqli_fetch_row($setRec)) {
    $rowData = '';
    foreach ($rec as $value) {
        $value = '"' . $value . '"' . "\t";
        $rowData .= $value;
    }
    $setData .= trim($rowData) . "\n";
}

header("Content-type: text/csv; charset=utf-8");
header("Content-Disposition: attachment; filename=download.csv");
header("Pragma: no-cache");
header("Expires: 0");

echo ucwords($columnHeader) . "\n" . $setData . "\n";
?>