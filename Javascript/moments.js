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
        title: 'Highlighted Moment 1',
        image1: 'images/bg_4.jpg',
        image2: 'images/bg_4.jpg',
        image3: 'images/bg_4.jpg',
        next: 'Moment2<img class="icon" src="/images/arrow2.png" alt="arrow pointing right">',
        nextLink: '/synopsis-moments.html?moment=2'
    },
    {
        moment: '2',
        title: 'Highlighted Moment 2',
        image1: 'images/bg_4.jpg',
        image2: 'images/bg_4.jpg',
        image3: 'images/bg_4.jpg',

        next: 'Moment3<img class="icon" src="/images/arrow2.png" alt="arrow pointing right">',
        nextLink: '/synopsis-moments.html?moment=3'
    },
    {
        moment: '3',
        title: 'Highlighted Moment 3',
        image1: 'images/bg_4.jpg',
        image2: 'images/bg_4.jpg',
        image3: 'images/bg_4.jpg',
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
document.getElementById('img3').src=moment_data.image3;
document.getElementById('nextLink').innerHTML=moment_data.next;
document.getElementById('nextLink').href=moment_data.nextLink;


  } else {
    document.body.textContent = "moment not found.";
  }
