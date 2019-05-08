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
    
/*-------- constants --------*/
var suits = ['s', 'c', 'd', 'h'];
var ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

var masterDeck = buildMasterDeck();


/*-------- app's state variables --------*/
var bankArray = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
var potArray = [];
var dealer = [];
var player = [];
var split = [];
var shuffledDeck = [];
var playerTotal;
var dealerTotal;
var winner = null;


/*-------- cached elements --------*/
var dealBtn = document.getElementById('deal');
var hitBtn = document.getElementById('hit');
var standBtn = document.getElementById('stand');
var chipBtn = document.getElementById('bank-chip');
var resetBtn = document.getElementById('reset');
var winBtn = document.getElementById('win');
var dealerCardContainer = document.getElementById('dealer');
var playerCardContainer = document.getElementById('player');  
var msg = document.getElementById('msg');
var potDisplay = document.getElementById('pot-chip');
var bankText = document.getElementById('bank-text');
var potText = document.getElementById('pot-text');

/*------- event listeners ---------*/
chipBtn.addEventListener('click', makeBet);
dealBtn.addEventListener('click', handleDeal);
hitBtn.addEventListener('click', handleHit);
standBtn.addEventListener('click', handleStand);
resetBtn.addEventListener('click', finishGame);
winBtn.addEventListener('click', finishGame);

/*------- functions ---------*/
init();
function init() {
    shuffle();
    render();
}

function finishGame() {
    if (winner === null) {
        return;
    } else if (winner === "player") {
        var matchPot = potArray.slice();
        for(i = 0; i < potArray.length; i++) {
            bankArray.push(potArray[i])
        }
        for(i = 0; i < matchPot.length; i++) {
            bankArray.push(matchPot[i]);
        }
    } else if (winner === "dealer") {
        potArray = [];
    }
    bankText.innerHTML = `You have $${sumBank()}`;
    potDisplay.innerHTML = "";
    potDisplay.setAttribute('class', 'hidden');
    resetBtn.setAttribute('class', 'hidden');
    winBtn.setAttribute('class', 'hidden');
    potArray = [];
    matchPot = [];
    playerCardContainer.innerHTML = '';
    dealerCardContainer.innerHTML = '';
    
}

function checkWinner() {
    if (winner === null) {
        return;
    } else if (winner === "player") {
        msg.textContent = "YOU WIN!";
        var matchPot = potArray.slice();
        for(i = 0; i < potArray.length; i++) {
            bankArray.push(potArray[i])
        }
        for(i = 0; i < matchPot.length; i++) {
            bankArray.push(matchPot[i]);
        }
        winBtn.removeAttribute('class');
    } else if (winner === "dealer") {
        msg.textContent = "DEALER WINS!";
        resetBtn.removeAttribute('class');
    }
    hitBtn.setAttribute('class', 'hidden');
    standBtn.setAttribute('class', 'hidden');
}
        
function flipCard() {
    var dealerCard = document.querySelector('.card.back-blue');
    dealerCard.setAttribute('class', `card ${dealer[0].face}`);
}
        
function checkDealer() {
    while (dealerTotal <= 16) {
        dealer.push(shuffledDeck[0]);
        shuffledDeck.shift();
        renderCard(dealer, dealer.length - 1, dealerCardContainer);
        dealerTotal = getDealer();
        dealerCheckAce();
        dealerTotal = getDealer();
        
        console.log(dealer);
    } 
    if (dealerTotal > 21) {
        msg.textContent = "DEALER BUST!";
        winner = "player";      
    }
}

function getDealer() {
    var dealerNum = 0;
    for(i = 0; i < dealer.length; i ++) {
        dealerNum += dealer[i].value;
    }
    return dealerNum;
}

function handleStand() {
    flipCard();
    dealerTotal = getDealer();
    checkDealer();

    if (playerTotal > dealerTotal && playerTotal <= 21) {
        winner = "player";
    } else if (dealerTotal > playerTotal && dealerTotal <= 21) {
        winner = "dealer";
    }

    checkWinner();
}

function dealerCheckAce() {
    let hasA = dealer.some(function(card) {
        var char = card.face.split('');
        return char[char.length-1] === 'A';
    });
    if (hasA && dealerTotal > 21) {
        for(i = 0; i < dealer.length; i++) {
            if (dealer[i].face === 'sA'){
                dealer[i].value = 1;
            } else if (dealer[i].face === 'cA') {
                dealer[i].value = 1;
            } else if (dealer[i].face === 'dA') {
                dealer[i].value = 1;
            } else if (dealer[i].face === 'hA') {
                dealer[i].value = 1;
            }
        }
    }
    
}

function checkForAce() {
    let hasA = player.some(function(card) {
        var char = card.face.split('');
        return char[char.length-1] === 'A';
    });
    if (hasA && playerTotal > 21) {
        for(i = 0; i < player.length; i++) {
        if (player[i].face === 'sA'){
            player[i].value = 1;
        } else if (player[i].face === 'cA') {
            player[i].value = 1;
        } else if (player[i].face === 'dA') {
            player[i].value = 1;
        } else if (player[i].face === 'hA') {
            player[i].value = 1;
        }
        }
    }
}

function checkForBust() {
    playerTotal = getPlayer();
    if (playerTotal > 21) {
        msg.textContent = "PLAYER BUST!";
        winner = "dealer";
    } 
}


function handleHit() {
    player.push(shuffledDeck[0]);
    shuffledDeck.shift();
    renderCard(player, player.length-1, playerCardContainer);
    playerTotal = getPlayer();
    checkForAce();
    checkForBust();
    checkWinner();
}

function getPlayer() {
    var finalNum = 0;
    for(i = 0; i < player.length; i++) {
        finalNum += player[i].value;
    }
    return finalNum;
}

function renderBack(container) {
    var newCard = document.createElement('div');
    newCard.setAttribute('class', 'card back-blue');
    container.appendChild(newCard);

}

function renderCard(arr, idx, container) {
    var newCard = document.createElement('div');
    newCard.setAttribute('class', `card ${arr[idx].face}`);
    container.appendChild(newCard);
}

function handleDeal() {
    player.push(shuffledDeck[0]);
    shuffledDeck.shift();
    renderCard(player, 0, playerCardContainer);
    dealer.push(shuffledDeck[0]);
    shuffledDeck.shift();
    renderBack(dealerCardContainer);
    player.push(shuffledDeck[0]);
    shuffledDeck.shift();
    renderCard(player, 1, playerCardContainer);
    dealer.push(shuffledDeck[0]);
    shuffledDeck.shift();
    renderCard(dealer, 1, dealerCardContainer);
    playerTotal = getPlayer();
    checkForAce(player);
    checkForBust();
    dealBtn.setAttribute('class', 'hidden');
    hitBtn.removeAttribute('class');
    standBtn.removeAttribute('class');
}

function sumPot() {
    var potTotal = 0;
    for(i = 0; i < potArray.length; i ++) {
        potTotal += potArray[i];
    }
    return potTotal;
}

function sumBank() {
    var bankTotal = 0;
    for(i = 0; i < bankArray.length; i ++) {
        bankTotal += bankArray[i];
    }
    return bankTotal;
}

function makeBet() {
    if (bankArray.length > 0) {
        potArray.push(bankArray[0]);
        bankArray.shift();
        bankText.innerHTML = `You have $${sumBank()}`;
        potDisplay.setAttribute('class', 'chip');
        potDisplay.innerHTML = `$${sumPot()}`;
    } else {
        msg.innerText = "You need more money"
    }
    dealBtn.removeAttribute('class');
}

function render() {
    bankText.innerHTML = `You have $${sumBank()}`;
    potDisplay.setAttribute('class', 'hidden');
    msg.textContent = "Click on your chips to make your bet";
    dealBtn.setAttribute('class', 'hidden');
    hitBtn.setAttribute('class', 'hidden');
    standBtn.setAttribute('class', 'hidden');
    resetBtn.setAttribute('class', 'hidden');
    winBtn.setAttribute('class', 'hidden');
}

function shuffle() {
    var tempDeck = masterDeck.slice();
    while (tempDeck.length) {
        var rndIdx = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    };
}

function buildMasterDeck() {
    var deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                face: `${suit}${rank}`,
                value: Number(rank) || (rank === 'A' ? 11 : 10)
            });
        });
    });
    return deck;
}