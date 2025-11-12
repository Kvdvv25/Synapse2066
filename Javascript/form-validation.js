// Front-end part of ticket page

document.addEventListener('DOMContentLoaded', function(){
    const tickets_form = document.getElementById('tickets_form');

    // Regex pattern for email
    const emailPattern = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/;

    // Form validation
    tickets_form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Input values
        const userName = document.getElementById('name').value.trim();
        const userEmail = document.getElementById('email').value.trim();
        const userTickets = parseInt(document.getElementById('numberOfTickets').value);

        // Checking if input matches the requirements
        let valid = true;
        if(userName === ''){
            console.log('Name', userName);
            document.querySelector('.error_name').innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Please insert your name";
            document.querySelector('.error_name').classList.remove('hidden');
            valid = false;
        } else {
            document.querySelector('.error_name').classList.add('hidden');
        }

        if(userEmail === ''){
            document.querySelector('.error_email').innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Please insert your email.";
            document.querySelector('.error_email').classList.remove('hidden');
            valid = false;
        } else if(!emailPattern.test(userEmail)){
            document.querySelector('.error_email').innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Invalid email format. Please enter a valid address such as name@example.com.";
        } else {
            document.querySelector('.error_email').classList.add('hidden');
        }

        // If all checks are valid
        if(valid){

            // Submission animation 
            const submitBtn = document.getElementById('submit');
            if(submitBtn){
                submitBtn.disabled= true;
                submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
            }

            // fetching backend: send-email
            try{
                const response = await fetch('/.netlify/functions/send-email', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name:userName,
                        email:userEmail,
                        numberOfTickets:userTickets
                    })
                })

                const result = await response.json();

                if(response.ok){
                    console.log('Fetch successful');
                    setTimeout(function(){
                        window.location.href='/success-msg.html';
                    }, 2000)
                } else{
                    console.log('Error', result.error);
                }
            }
            catch (error){
                console.error('Error', error);
                alert('Error');
            }
        }
    })
})