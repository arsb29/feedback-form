<?php
// Формируем массив для JSON ответа
$result = array(
    'name' => 1,
    'phonenumber' => 2
);

// Переводим массив в JSON
echo json_encode($result);
?>
