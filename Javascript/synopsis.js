//Storyline page

//hover to show image
const moments = document.querySelectorAll(".moment");
const mediaQuery = window.matchMedia('(min-width: 769px)');

// function handleDesktopMode(event) {
//     if (event.matches) {
        
//         if(moments){
//             console.log('Moments exist on another page');
        
//             moments.forEach( moment => {
//                 const link = moment.querySelector(".moment_link");
//                 const imgTarget = moment.querySelector('.moment_img');
            
//                 if(imgTarget||link){
//                     console.log('Both exist');
//                 } else {
//                     console.log('Image or link do not exist');
//                 }
            
//                 link.addEventListener('mouseenter', function(){
//                     imgTarget.style.display = 'flex';
//                 })
            
//                 link.addEventListener('mouseleave', function(){
//                     imgTarget.style.display = 'none';
//                 })
//             })
//         } else {
//             console.log('moments are on another page'); 
//         }

//     }
// }

const mediaQueryMobile = window.matchMedia('(max-width: 480px)');
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');

function handleMobileMode (event) {

    if(event.matches){
        console.log('this is the right window size')
        box1.addEventListener('click', function(){
            window.location.href='/synopsis-moments.html?moment=1'
            console.log('clicked')
        })
        box2.addEventListener('click', function(){
            window.location.href='/synopsis-moments.html?moment=2'
            console.log('clicked')
        })
        box3.addEventListener('click', function(){
            window.location.href='/synopsis-moments.html?moment=3'
            console.log('clicked')
        })
    }
    else{
        console.log('desktop window size')
       
        
            if(moments){
                console.log('Moments exist on another page');
            
                moments.forEach( moment => {
                    const link = moment.querySelector(".moment_link");
                    const imgTarget = moment.querySelector('.moment_img');
                
                    if(imgTarget||link){
                        console.log('Both exist');
                    } else {
                        console.log('Image or link do not exist');
                    }
                
                    link.addEventListener('mouseenter', function(){
                        imgTarget.style.display = 'flex';
                    })
                
                    link.addEventListener('mouseleave', function(){
                        imgTarget.style.display = 'none';
                    })
                })
            } else {
                console.log('moments are on another page'); 
            }
    
    
    }
}

mediaQueryMobile.addEventListener('change', handleMobileMode);
handleMobileMode(mediaQueryMobile);
