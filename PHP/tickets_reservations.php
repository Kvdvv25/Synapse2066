<?php
require_once 'database_connection.php';

//INITIALIZING INPUT
$name="";
$email="";
$numberOfTickets="";

//INITIALIZING ERROR MESSAGES
$nameError = "";
$emailError = "";
$ticketsError = "";


if($_SERVER["REQUEST_METHOD"]==="POST" && isset($_POST["confirmBtn"])){

    //INPUT
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $numberOfTickets = $_POST['numberOfTickets'] ?? '';

    //REGEX PATTERN
    $isNameValid = preg_match("/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/", $name);
    $isEmailValid = preg_match("/^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/", $email);

    $form_valid=true;

    //CHECKING & ERRORS
    if(!$isNameValid){
        $form_valid = false;
        $nameError = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Please use only letters, dashes, spaces and no special characters.";
    }
    
    if(!$isEmailValid){
        $form_valid = false;
        $emailError = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i> Invalid email format. Please enter a valid address such as name@example.com.";
    }

    if(empty($numberOfTickets)){
        $form_valid = false;
        $ticketsError = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i> Please select at least one ticket.";
    }

    //RESULT - SENDING TO THE DATABASE IF CORRECT
    if($form_valid){

        $insertData="INSERT INTO ticket_reservation (name, email, number_of_tickets)
        VALUES('$name', '$email', $numberOfTickets)";

        $addingToDB = mysqli_query($connectionDB, $insertData);

        if($addingToDB){
            header("Location: success_msg.html");
        } else{
            echo "Error: inserting the data";
        }

    }else{
        echo "<script>There was an issue, try again.</script>";
    }

}
?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../savecss/forms.css">
    <link rel="stylesheet" href="../savecss/clash-display.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet">
</head>
<body>
    <main>
        <div class="bgSection"></div>
        <section class="contentSection">

            <!-- BIG TITLE -->
            <div class="filmTitle">
                <h1>Synapse 2066</h1>
                <div class="shapes">
                    <div class="vl"></div>
                    <span class="dot"></span>
                </div>
            </div>

            <!-- MAIN CONTENT -->
            <div class="contentBox">

                <!-- TITLE -->
                <div class="titleBox descrBox">
                    <p class="formTitle">Free Premiere Tickets</p>
                    <button class="btn_icon"><i class="fa-solid fa-xmark fa-xl"></i></button>
                </div>

                <!-- EVENT DETAILS -->
                <div class="detailsBox descrBox">
                    <div id="location" class="details">
                        <p>Location:&nbsp</p>
                        <p>SAE House, 297 Kingsland Rd, London E8 4DD</p>
                    </div>
                    <div id="date" class="details">
                        <p>Date:&nbsp</p>
                        <p>12/12/25</p>
                    </div>
                </div>

                <div class="infoBox">
                    <div class="instructionTexts">
                        <p>Please enter your information and add one ticket for each guest:</p>
                    </div>

                    <!-- FORM -->
                    <form action="" method="post">
                    
                    <!-- ERROR MESSAGE -->
                    <?php if (!empty($nameError) || !empty($emailError) || !empty($ticketsError)): ?>
                        <span class="error_message">
                            <?php 
                            if (!empty($nameError)) echo $nameError . "<br>";
                            if (!empty($emailError)) echo $emailError . "<br>";
                            if (!empty($ticketsError)) echo $ticketsError;
                            ?>
                        </span>
                    <?php endif; ?>

                    <!-- INPUT FIELDS -->
                        <div class="form">
                            <div class="userInfo formPart">
                                <div class="nameBox formBox">
                                    <label class="labelUser" for="name">Name:</label>
                                    <input type="text" name="name" id="name" value="<?php echo htmlspecialchars($name); ?>">
                                </div>
                                <div class="emailBox formBox">
                                    <label class="labelUser" for="email">Email:</label>
                                    <input type="email" name="email" id="email" value="<?php echo htmlspecialchars($email); ?>">
                                </div>
                            </div>
                            <div class="tickets formPart">
                                <div class="ticketBox formBox">
                                    <label  class="labelUser" for="numberOfTickets">Number of Tickets:</label>
                                    <input type="number" name="numberOfTickets" id="numberOfTickets" min="1" max="40" value="<?php echo htmlspecialchars($numberOfTickets); ?>">
                                </div>
                            </div>
                        </div>  
                        
                        <!-- VALIDATION BUTTON -->
                        <button type="submit" class="btn_primary" id="confirmBtn" name="confirmBtn">Confirm</button>
                    </form>
                    </div>
                </div>
        </section>
    </main>
</body>
<script src="https://kit.fontawesome.com/cfd313fcca.js" crossorigin="anonymous"></script>
</html>