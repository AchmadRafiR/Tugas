<?php

require_once "koneksi.php";

$id = $_GET['id'];
$sql = "SELECT * FROM tblpelanggan WHERE idpelanggan = $id";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
}
