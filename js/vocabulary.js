const buttons = document.querySelectorAll(".learn-btn");


buttons.forEach(button => {


    let card = button.parentElement;

    let word = card.dataset.word;


    if(localStorage.getItem(word) === "learned"){

        card.classList.add("learned");

        button.innerHTML="✓ Learned";

    }



    button.addEventListener("click",()=>{


        card.classList.toggle("learned");


        if(card.classList.contains("learned")){


            localStorage.setItem(word,"learned");

            button.innerHTML="✓ Learned";


        }

        else{


            localStorage.removeItem(word);

            button.innerHTML="Mark Learned";


        }


    });


});