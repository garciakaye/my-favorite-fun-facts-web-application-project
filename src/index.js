const factsUrl = 'https://asli-fun-fact-api.herokuapp.com/'
const commentUrl = "http://localhost:3000/comments"

let currentFact
//let submittedFact

//Fetch fun fact
function fetchFunFact(address = factsUrl){
    return fetch(address)
    .then(response => response.json())
    .then(({data}) => {
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
          const funFactContainer = document.getElementById("fun-fact")
          funFactContainer.innerHTML = ''
          funFactContainer.appendChild(factContainer)
    })
}


//save favorite fact
function saveFavoriteFact(){
    let funFact = document.getElementById("fun-fact").innerText
    const favoriteFact = document.getElementById("favorite-facts")
    const favoriteFactlist = document.createElement('li')
    favoriteFactlist.innerText = `${funFact}    `
    favoriteFact.appendChild(favoriteFactlist)
    let btn = document.createElement('button')
    btn.addEventListener('click', deleteFavFact)
    btn.textContent = 'x'
    favoriteFactlist.appendChild(btn)
}

//delete favorite fact
function deleteFavFact(e){
    e.target.parentNode.remove();
}

//submit fact
function submitFact(e){
    //debugger
    e.preventDefault();
    const submittedFact = {
        "body": document.getElementById("fact").value,
     };

    fetch(commentUrl, {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(submittedFact),
})
    .then(response => response.json())
    .then(data => {
        //debugger
        (appendSubmittedFact(data))
        document.getElementById("comment-box").reset()
})
    .catch((error) => {
  console.error('Error:', error);
});
}

function appendSubmittedFact(){
    let userInput = document.getElementById("fact").value
        const userFacts = document.getElementById("user-facts")
        const userFactsList = document.createElement('li')
        userFactsList.innerText = `${userInput}    `
        userFacts.appendChild(userFactsList)
        let btn = document.createElement('button')
        btn.addEventListener('click', deleteInput)
        btn.textContent = 'x'
        userFactsList.appendChild(btn)
}

function deleteInput(e){
    e.target.parentNode.remove();
}

//Initialize function
function initialize(){
    //debugger
    //1. initial load of the fact
    loadFact();


    const nextFactButton = document.getElementById("next-fact")

    //2.  when a button is clicked, another fact is loaded
    nextFactButton.addEventListener('click',loadFact)

    //3. when fact is saved, append to my favorite list
    const favoriteButton = document.getElementById("favorite")
    
    favoriteButton.addEventListener('click', saveFavoriteFact)
    
    //4. submit new fact
    const submitNewFact = document.getElementById("comment-box")

    submitNewFact.addEventListener('submit', submitFact)
    

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