//On page load, a fun fact should show
//Event listener 1: DOM Content Load
//Event listener 2: Submit; a new fun fact should show when the user clicks on the next button
//Event listener 3: Click; 'x' button; the user can remove their fun facts
//Interactivity: Save[heart] button; the heart should fill red when the user clicks on heart button and the fact will be saved below

const factsURL = 'https://asli-fun-fact-api.herokuapp.com/'


//When I click on the next button, a new fact should be displayed

//and if i like that quote, I can favorite (heart icon) and that quote will save at the bottom of the page under My fun facts
const favoritedFacts = []
let currentFact;

//Fetch fun facts
function fetchFunFact(address = factsURL){
    return fetch(address)
    .then(response => response.json())
    .then(({status, data}) => {
        return data
    })
}

// creates fact ui element
function createFactElement(data){
    const factContainer = document.createElement('div')
    const {id, fact, cat, hits} = data

    factContainer.innerText = fact
    return factContainer 
}

// this function handles fetching & loading the fact into the ui
function loadFact(){
    //1. fetch fact
    fetchFunFact().then((data)=>{
          // 2. load the fact into the ui
          currentFact = data
          const factContainer = createFactElement(data)
          const funFactContainer = document.getElementById("fun-fact");
          funFactContainer.innerHTML = ''
          funFactContainer.appendChild(factContainer)
    })

  
}



//Initialize function
function initialize(){
    //1. initial load of the fact
    loadFact()

    const nextFactButton = document.getElementById("next-fact")

    //2.  when a button is clicked, another fact is loaded
    nextFactButton.addEventListener('click',loadFact)

}


document.addEventListener('DOMContentLoaded', initialize)


/*
- i need a next button
    - fetch a new quote
- i need favoite button
- i need a delete button
{
    status:true,
    data:{
        id:"27",
        cat:"space",
        fact:"THE SUNSET ON MARS APPEARS BLUE",
        hits:"29"
    }
}
*/