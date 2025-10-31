<?php

require_once 'database_connection.php';

// CONNECTING TO MYSQL
$servername="localhost";
$username="root";
$password="";

$connection=mysqli_connect($servername,$username,$password);

if($connection){
    echo "Connection to SQL successful";
}else{
    echo "ERROR: Connection to SQL".mysqli_error($connection);
    
}

// CREATING A DATABASE
$sql="CREATE DATABASE IF NOT EXISTS synapse_database";
$createDB=mysqli_query($connection,$sql);

if($createDB){
    echo "Creating database successful";
}else{
    echo "ERROR: Creating database";
}

// CREATING TABLE 1 (ONLY NECESSARY IF WE DO THE NEWSLETTER)
$sqlTable1="CREATE TABLE IF NOT EXISTS newsletter_subscribers(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    subscribed_to_newsletter BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
    
$createTable1=mysqli_query($connectionDB,$sqlTable1);

if($createTable1){
    echo "Creating table 1 successful";
} else{
    echo "ERROR: Creating table 1".mysqli_error($connectionDB);
}

// CREATING TABLE 2 (ONLY NECESSARY IF WE DO THE NEWSLETTER)
$sqlTable2="CREATE TABLE IF NOT EXISTS tickets_reservations(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    subscriber_id INT NOT NULL,
    number_of_tickets INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscriber_id) REFERENCES newsletter_subscribers(id)
)";
    
$createTable2=mysqli_query($connectionDB,$sqlTable2);

if($createTable2){
    echo "Creating table 2 successful";
} else{
    echo "ERROR: Creating table 2".mysqli_error($connectionDB);
}



// CREATING TABLE 3 - WITHOUT FOREIGN KEY IF WE DONT DO THE NEZSLETTER AND JUST KEEP THE TICKETS TABLE
$sqlTable3="CREATE TABLE IF NOT EXISTS ticket_reservation(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(400) NOT NULL UNIQUE,
    number_of_tickets INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
    
$createTable3=mysqli_query($connectionDB,$sqlTable3);

if($createTable3){
    echo "Creating table 3 successful";
} else{
    echo "ERROR: Creating table 3".mysqli_error($connectionDB);
}
?>
