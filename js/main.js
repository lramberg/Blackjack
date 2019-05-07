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
    var bankArray = [100, 100, 100, 100, 100, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
    var potArray = [];
    var dealer = [];
    var player = [];
    var split = [];
    var shuffledDeck = [];
    var playerSum;
    var dealerTotal;
    
    
    /*-------- cached elements --------*/
    var betBtn = document.getElementById('bet');
    var dealBtn = document.getElementById('deal');
    var hitBtn = document.getElementById('hit');
    var standBtn = document.getElementById('stand');
    var dealerCardContainer = document.getElementById('dealer');
    var playerCardContainer = document.getElementById('player');  
    
    /*------- event listeners ---------*/
    betBtn.addEventListener('click', makeBet);
    dealBtn.addEventListener('click', handleDeal);
    hitBtn.addEventListener('click', handleHit);
    standBtn.addEventListener('click', handleStand);
    
    /*------- functions ---------*/
    init();
    function init() {
        shuffle();
        
        
        // render();
    }
    
    
    function checkWinner() {
        if (playerSum > dealerTotal && playerSum <= 21) {
            alert('You win');
        } else {
            alert('dealer wins');
        }
        
        player = [];
        dealer = [];
        console.log(`cards remaining ${shuffledDeck.length}`);
    }
    
    function checkDealer() {
        if (dealerTotal <= 16) {
            dealer.push(shuffledDeck[0]);
            dealerTotal = getDealer();
        } else if (dealerTotal > 21) {
            alert("DEALER BUST");
            player = [];
            dealer = [];
        }
    }
    
    function getDealer() {
        var dealerNum = 0;
        for(i = 0; i < dealer.length; i++) {
            var d = dealer[i];
            for(var k in d) {
                dealerNum += d[k];
            }
        }
        return dealerNum;
    }
    
    function handleStand() {
        dealerTotal = getDealer();
        checkDealer();
        console.log(`dealer total is ${dealerTotal}`);
        // checkWinner();
    }

    function checkForBust() {
        if (playerSum > 21) {
            alert("PLAYER BUST!");
            dealer = [];
            player = [];
        } 
        console.log(`cards remaining ${shuffledDeck.length}`);
    }

    function getPlayer() {
        var finalNum = 0;
        for(i = 0; i < player.length; i++) {
            finalNum += player[i].value;
        }
        return finalNum;
    }
    
    function handleHit() {
        player.push(shuffledDeck[0]);
        shuffledDeck.shift();
        renderCard(playerCardContainer);
        playerSum = getPlayer();
        console.log(player);
        console.log(`player sum is ${playerSum}`);
        checkForBust();
    }

    function renderCard(arr, idx, container) {
        var newCard = document.createElement('div');
        newCard.setAttribute('class', `card ${arr[idx]}.face`);
        container.appendChild(newCard);
    }

    function handleDeal() {
        player.push(shuffledDeck[0]);
        shuffledDeck.shift();
        renderCard(player, 0, playerCardContainer);
        dealer.push(shuffledDeck[0]);
        shuffledDeck.shift();
        renderCard(dealer, 0, dealerCardContainer);
        player.push(shuffledDeck[0]);
        shuffledDeck.shift();
        renderCard(player, 1, playerCardContainer);
        dealer.push(shuffledDeck[0]);
        shuffledDeck.shift();
        renderCard(dealer, 1, dealerCardContainer);
        console.log(player);
        console.log(dealer);
        playerSum = getPlayer();
        console.log(`player sum is ${playerSum}`);
        checkForBust();
    }

    function makeBet() {
        if (bankArray.length > 0) {
            potArray.push(bankArray[0]);
            bankArray.shift();
            console.log(potArray);
            console.log(bankArray);
        } else {
            alert("you are out of money");
        }
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