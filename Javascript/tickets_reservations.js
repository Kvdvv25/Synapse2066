// // Connecting form to Google Sheet
// let tickets_form = document.getElementById('tickets_form');

// // Regex pattern
// const emailPattern=/^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/;

// // form validation
// tickets_form.addEventListener('submit', function(event){
//     event.preventDefault();

//     let form = event.target;

//     let data = {
//         name: form.name.value,
//         email: form.email.value,
//         numberOfTickets: form.numberOfTickets.value
//     }

//     // Input values to check reauirements
//     let name = document.getElementById('name').value;
//     let email = document.getElementById('email').value;

//     // Checking if input matches requirements
//     let valid = true;

//     if(name === ''){
//         console.log('name',name);
//         document.querySelector('.error_name').innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Please insert your name";
//         document.querySelector('.error_name').classList.remove('hidden');
//         valid = false;
//     } else{
//         document.querySelector('.error_name').classList.add('hidden');
//     }

//     if(email === ''){
//         document.querySelector('.error_email').innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Please insert your email.";
//         document.querySelector('.error_email').classList.remove('hidden');
//         valid = false;
//     } else if(!emailPattern.test(email)){
//         document.querySelector('.error_email').innerHTML = "<i class='fa-solid fa-triangle-exclamation' style='color: #ff0a0a;'></i>  Invalid email format. Please enter a valid address such as name@example.com.";
//     } else {
//         document.querySelector('.error_email').classList.add('hidden');
//     }

//     if(valid){
//         // Adding submission animation - only if valid submission
//         let submitBtn = document.getElementById('submit');
//         let originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';
    
//         if(submitBtn){
//             submitBtn.disabled = true;
//             submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
//         }

//     }
    

// })