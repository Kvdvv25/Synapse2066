// Connecting form to Google Sheet
let tickets_form = document.getElementById('tickets_form');

// Regex pattern
const emailPattern=/^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/;

// form validation
tickets_form.addEventListener('submit', function(event){
    event.preventDefault();

    let form = event.target;

    let data = {
        name: form.name.value,
        email: form.email.value,
        numberOfTickets: form.numberOfTickets.value
    }

    // Input values to check reauirements
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    // Checking if input matches requirements
    let valid = true;

    if(name === ''){
        console.log('name',name);
        document.querySelector('.error_name').innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Please insert your name";
        document.querySelector('.error_name').classList.remove('hidden');
        valid = false;
    } else{
        document.querySelector('.error_name').classList.add('hidden');
    }

    if(email === ''){
        document.querySelector('.error_email').innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Please insert your email.";
        document.querySelector('.error_email').classList.remove('hidden');
        valid = false;
    } else if(!emailPattern.test(email)){
        document.querySelector('.error_email').innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Invalid email format. Please enter a valid address such as name@example.com.";
    } else {
        document.querySelector('.error_email').classList.add('hidden');
    }

    if(valid){
        // Adding submission animation - only if valid submission
        let submitBtn = document.getElementById('submit');
        let originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';
    
        if(submitBtn){
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
        }
    
        // // Submitting data to the google sheet to store the reservations
        // fetch('https://script.google.com/macros/s/AKfycbwJxlVhjHyY9XpwRXXaxZwgdEQGSHWuzNhgMi6Uh2cxBwG5L-QTj_7vy-AQjGYolBPr/exec', {
        //     method: 'POST',
        //     mode:'no-cors',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': "application/json"
        //     }
        // })
        // .then( function(){
        //     console.log('Request sent');
        //     // alert('Your tickets were reserved');
        //     window.location.href = '/success_msg.html';
        //     form.reset();
        // })
        // .catch(function(error){
        //     console.error('Error', error);
        //     alert('Error:'+ error.message);
        // })
        // .finally(function(){
        //     if(submitBtn){
        //         submitBtn.disabled = false;
        //         submitBtn.innerHTML = originalBtnText;
        //     }
        // })

    }
    

})