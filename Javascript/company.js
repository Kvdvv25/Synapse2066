const infoTitle = document.querySelectorAll(".info_title");
const infoColumns = document.querySelectorAll(".info_columns");
const mediaQueryMobile = window.matchMedia('(max-width: 480px)');


function handleMobileMode (event) {

    if(event.matches){
        for(let i = 0; i < infoTitle.length; i++){
            infoTitle[i].addEventListener("click", function(){
                this.classList.toggle("activeContent");
          
                let column = this.nextElementSibling;
                if(column.style.display === 'flex'){
                    column.style.display = "none";
                } else{
                    column.style.display = "flex";
                }
            })
        }
    } else{
        for(let i = 0; i < infoTitle.length; i++){
            infoTitle[i].removeEventListener("click", function(){})
        }
    }
}

mediaQueryMobile.addEventListener('change', handleMobileMode);
handleMobileMode(mediaQueryMobile);