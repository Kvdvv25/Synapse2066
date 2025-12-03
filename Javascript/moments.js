//slider
let sliderIndex = 1;
showSlides(sliderIndex);
 
function plusSlides(n){
    showSlides (sliderIndex += n);
}

function currentSlide(n){
    showSlides(sliderIndex=n);
}

function showSlides(n){
    let slides = document.getElementsByClassName('slides');

    if(n>slides.length){
        sliderIndex = 1;
        console.log('changing slide')
    } 

    if(n < 1){
        sliderIndex = slides.length;
        console.log('changing slide')
    }

    for(let i=0; i<slides.length; i++){
        slides[i].style.display = 'none';
    }

    slides[sliderIndex-1].style.display = 'block';
    console.log("Showing slide", sliderIndex);
}

//Moments 
let moments_content = [
    {
        moment: '1',
        title: 'First Connection',
        image1: 'images/First_Connection.png',
        image2: 'images/Final_Connection.png',
        description:"The eye-opening shot is when Leo enters the simulation for the first time. He can see Anna's POV feed and is shocked that his hacking attempt worked.",
        next: 'Digital&nbspDance<img class="icon" src="/images/arrow2.png" alt="arrow pointing right">',
        nextLink: '/synopsis-moments.html?moment=2'
    },
    {
        moment: '2',
        title: 'Digital Dance',
        image1: 'images/Digital_Dance.jpg',
        image2: 'images/Thinking_of_Anna.jpg',
        description:"This is a symbolic scene where Leo and Anna are synced together; it appears as if they are truly together in this happy, dreamy moment. In reality, Anna is still unaware of everything in the simulation, and this is Leo's last attempt to share a moment with her. Things take a down turn after this scene leading up to the climax.",
        next: 'Final&nbspConnection<img class="icon" src="/images/arrow2.png" alt="arrow pointing right">',
        nextLink: '/synopsis-moments.html?moment=3'
    },
    {
        moment: '3',
        title: 'Final Connection',
        image1: 'images/Anna_Sync.png',
        image2: 'images/Leo_Sync.png',
        description:"This is a crucial and emotionally high moment when Anna's hand responds to Leo's hand movement. It's a visual representation to show that they are in sync. <br><br> When Leo tries to move his hand, it leads to Anna's hand trembling, and instantly Leo tries to stabilize his hand and makes a fist as if he is holding Anna's hand. This actually works, and Anna's hand stabilizes.",
        next: 'Cast<img class="icon" src="/images/arrow2.png" alt="arrow pointing right">',
        nextLink: '/synopsis-storyline.html'
    }
]


// dynamic content - moments page
const urlParams = new URLSearchParams(window.location.search);
let momentID=urlParams.get('moment');

let moment_data = null;

for (let i = 0; i < moments_content.length; i++) {
  if (moments_content[i].moment === momentID) {
    moment_data = moments_content[i];
    console.log("highlighted moment found")
    break;
  }
}

if (moment_data) {
   
document.getElementById("title").innerHTML=moment_data.title;
document.getElementById('img1').src=moment_data.image1;
document.getElementById('img2').src=moment_data.image2;
document.getElementById('description').innerHTML=moment_data.description;
document.getElementById('nextLink').innerHTML=moment_data.next;
document.getElementById('nextLink').href=moment_data.nextLink;


  } else {
    document.body.textContent = "moment not found.";
  }
