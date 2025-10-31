<?php
// SHOWING ERRORS
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CONNECTING TO DATABASE
$servername="localhost";
$username="root";
$password="";
$database="synapse_database";

$connectionDB=mysqli_connect($servername,$username,$password,$database);

// if($connectionDB){
//     echo "Connecting database successful";
// } else{
//     echo "ERROR: Connecting database".mysqli_error($connectionDB);
// }


?>