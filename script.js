
document.addEventListener('DOMContentLoaded', () => {

    //Create your cards
    const cardArray = [

        {
            name    : 'pikachu',
            img     : 'assets/img/pikachu100.jpg'
        }, 
        {
            name    : 'pikachu',
            img     : 'assets/img/pikachu100.jpg'
        }, 
        {
            name    : 'bulbizarre',
            img     : 'assets/img/bulbizarre100.jpg'
        }, 
        {
            name    : 'bulbizarre',
            img     : 'assets/img/bulbizarre100.jpg'
        }, 
        {
            name    : 'aquali',
            img     : 'assets/img/aquali100.jpg'
        }, 
        {
            name    : 'aquali',
            img     : 'assets/img/aquali100.jpg'
        }, 
        {
            name    : 'evoli',
            img     : 'assets/img/evoli100.jpg'
        }, 
        {
            name    : 'evoli',
            img     : 'assets/img/evoli100.jpg'
        }, 
        {
            name    : 'pyroli',
            img     : 'assets/img/pyroli100.jpg'
        }, 
        {
            name    : 'pyroli',
            img     : 'assets/img/pyroli100.jpg'
        }, 
        {
            name    : 'leviator',
            img     : 'assets/img/leviator100.jpg'
        }, 
        {
            name    : 'leviator',
            img     : 'assets/img/leviator100.jpg'
        }, 
    ]

    //Html elements
    const gridContainer     = document.querySelector('.grid-container'); 
    const grid              = document.querySelector('.grid'); 
    const resultDisplay     = document.querySelector('#result'); 
    const message           = document.querySelector('#message'); 
    const startAgainBtn     = document.querySelector('button');
    
    //Arrays
    var cardsChosen         = []; 
    var cardsChosenId       = []; 
    var cardsWon            = []; 

    
    //You refresh the game by randomly placing the cards again on the cardboard
    cardArray.sort(()=> 0.5 - Math.random()); 
    //The user will be abble to refresh the game once they've won 
    startAgainBtn.addEventListener('click', function(){
        window.location.reload();
    });
    
    //Create your board
    function createBoard(){

        for (let i=0; i < cardArray.length; i++){
            var card = document.createElement('img');
            card.setAttribute('src', 'assets/img/tall-grass.jpg');
            card.setAttribute('data-id', i);
            card.classList.add('cards'); 
            card.addEventListener('click', flipCard); 
            // console.log(card); 
            //All the images will be put into the .grid div, using appendChild()
            // https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild
            grid.appendChild(card); 
        }
    }

    //Check for matches
    function checkForMatch(){
        //let's put all your cards in that function to be able to check them all
        var cards= document.querySelectorAll('img.cards'); 
        //let's take the first line of your cardsChosenId array and make it the first card the user picks up
        const optionOneId= cardsChosenId[0]; 
        //Same but for the second card they pick up
        const optionTwoId= cardsChosenId[1]; 
        //Then if the first item chosen deeply equals the second one (rather by their names than their id, that's why you use cardsChosen)
        if (cardsChosen[0] === cardsChosen[1]){
            //And a pokeball is assigned to them, meaning the pokemon is catched when the match is found
            cards[optionOneId].setAttribute('src', 'assets/img/tall-grass-pokeball.jpg');
            cards[optionTwoId].setAttribute('src', 'assets/img/tall-grass-pokeball.jpg');
            //Then the event flipCard is removed to prevent the user to play them again, not allowing them to trick they score
            cards[optionOneId].removeEventListener('click', flipCard); 
            cards[optionTwoId].removeEventListener('click', flipCard); 
            //Both of the cards are then sent to the cardsWon array to stock all the cards the user has won 
            cardsWon.push(cardsChosen); 
        }
        //if the cards don't match, they are flipped back over to be played again 
        else{
            cards[optionOneId].setAttribute('src', 'assets/img/tall-grass.jpg');
            cards[optionTwoId].setAttribute('src', 'assets/img/tall-grass.jpg');
        }
        //Either if these two things happen, you still want to clear the chosen array and the chosenId array, the user is now ready to flip out the cards again 
        cardsChosen= []; 
        cardsChosenId= []; 

        //Now you display the result to the user, passing through how many time they found a match, every match is worth 1 point 
        resultDisplay.textContent = cardsWon.length; 
        //If the cardsWon array deeply equals the card array (divided by two as there are 12 cards as you need to pair them to make a match)
        if (cardsWon.length === cardArray.length/2){
            //the user is alerted they won 
            message.textContent = "Congratulations, you caught them all !"; 
            //and the button start again is displayed
            startAgainBtn.classList.remove('hidden'); 
            gridContainer.classList.add('hidden'); 
        }

    }; 

    //Flip your cards
    function flipCard(){
        //checking if the event is working
        console.log('the user clicked on a card'); 
        //get the id of your cards
        //"The getAttribute() method of the Element interface returns the value of a specified attribute on the element." source : https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute 
        var cardId= this.getAttribute('data-id'); 
        //put it in an array to gather the cards the user has picked up, ordered by their names
        cardsChosen.push(cardArray[cardId].name); 
        console.log(cardsChosen); 
        //put those cards in a separate array to stock their id only
        cardsChosenId.push(cardId); 
        console.log(cardsChosenId); 
        //this setAttribute let you add an image to that square based on a card id 
        this.setAttribute('src', cardArray[cardId].img); 
        //you only want to put 2 cards in your chosenCards array : 
        if (cardsChosen.length === 2){
            //so every time the user pick up 2 cards, it will set up the function which checks the match
            console.log('the has choosen two cards'); 
            //setTimeOut will make the checking not happen too quickly, it will call the function after 300 milliseconds 
            setTimeout(checkForMatch, 300); 
        }

    }; 

    createBoard();
    
}); 