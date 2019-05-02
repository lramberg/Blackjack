// when page loads 
    // initialize the board with
    // a 'shuffled' deck of cards X 2 = 104 in an object with card key: num value
    // ace value is 11
    // a beginning number of chips the player can bet in bank array
    // an empty pot array
    // an empty dealer array
    // an empty player array
    // an empty split array
    
// prompt player to make a bet
    // by clicking the bet button, chips will be removed one at a time from the bank array and added to the pot array. Player can only bet if there are chips in the bank

// once bets have been made, player can click the deal button which initializes card game
    // the card arr index 0 goes to player
    // 1 goes to dealer face down
    // 2 goes to player
    // 3 goes to dealer face up. 

// hit or stand buttons appear
    // if player array 0 === array 1, 
        // split option appears
            // card 1 pushes to split array 0
            // run hit and stand gameplay for each array
    // if hit, card 4 goes to player, repeat for each hit
        // if array.length - 1 is an ace and total > 21, reassign ace value to 1;
        // if sum of player array exceeds 21, player busts!
    // if stand is clicked
    // flip dealer card to reveal sum of dealer array
        // if sum of dealer array exceeds 21, dealer busts and player wins
        // if sum is <16, the next card index goes to dealer array 

// if dealer sum is > player sum && <21, dealer wins
    // chips in the pot go to the dealer
// if player sum is > dealer sum && <21, player wins
    // chips in pot go to player bank.
// if either array = 21, show blackjack message and win message

// if bank array has chips, game can continue, starting with bet function
    // else game is over and render a game over message.