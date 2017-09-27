/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,activeUser,dice,prevDice,roundScore,targetScore,isPlaying;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
  if(isPlaying){
  //1.Roll the dice and generate a random number
  dice = Math.floor(Math.random()*6)+1;

  //2.Display the results

  var diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = 'dice-'+dice+'.png';

  //3.if the number is not 1 then add the current score
  // else make the current score 0 and change the active user
  if(dice === 6 && prevDice === 6)
  {
    scores[activeUser] = 0;
    document.getElementById('score-'+activeUser).textContent = '0';
    nextPlayer();
  }
  if(dice !== 1)
  {
      roundScore+=dice;
      document.querySelector('#current-'+activeUser).textContent
      = roundScore;
      prevDice = dice;

    }

  else{
    prevDice = 0;
    nextPlayer();
  }
}
});

document.querySelector('.btn-hold').addEventListener('click',function(){
  if(isPlaying){
  //1. add current score to global score
  scores[activeUser]+=roundScore;
  //2.display the global score
  document.getElementById('score-'+activeUser).textContent = scores[activeUser];

  var input = document.querySelector('.target-score').value;
  if(input){
    targetScore = input;
  }else{
    targetScore = 100;
  }
  //3. check if the play won else switch the players
  if(scores[activeUser] >= targetScore)
  {
    document.getElementById('name-'+activeUser).textContent = 'Winner!';
    document.querySelector('.dice').style.display='none';
    document.querySelector('.player-'+activeUser+'-panel').classList.add('winner');
    document.querySelector('.player-'+activeUser+'-panel').classList.remove('active');
    isPlaying = false;
  }
  else{
    nextPlayer();
  }
}
});

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
  scores=[0,0];
  activeUser = 0;
  roundScore = 0;
  prevDice = 0;
  isPlaying = true;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.dice').style.display='none';
}

function nextPlayer(){
  activeUser === 0 ? activeUser = 1 : activeUser = 0;
  roundScore = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
//  document.querySelector('#current-'+activeUser).textContent = roundScore;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}
