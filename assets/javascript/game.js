var winsText = document.getElementById("wins-count");
var currentWordText = document.getElementById("current-word");
var remainingGuessesText = document.getElementById("remaining-guesses");
var lettersGuessedText = document.getElementById("letters-guessed");

var hangMan = {

  animalList: ['ALLIGATOR', 'BULLDOG', 'BUTTERFLY', 'CHEETAH', 'CHAMELEON', 'CHIMPANZEE', 'CROCODILE',
              'DALMATIAN', 'DONKEY'],
  
  currentWord: '',

  wins: 0,
  lettersGuessed: [],
  remainingGuesses: 0,
  placeHolderWord: '',

  guessBuffer: 5,
  placeHolderCharacter: '_',

  initialize: function() {
    this.reset();
    reWriteDocument();
  },

  reset: function(){
    this.lettersGuessed = [];
    this.currentWord = this.animalList[Math.floor(Math.random() * this.animalList.length)];
    this.remainingGuesses = this.currentWord.length + this.guessBuffer;
    this.placeHolderWord =  this.placeHolderCharacter.repeat(this.currentWord.length);

    console.log("current word: " + this.currentWord);
  },

  evaluateUserInput: function(guessedLetter){
    if(this.lettersGuessed.indexOf(guessedLetter) == -1){
      if(this.currentWord.includes(guessedLetter)){

        var charArray = this.placeHolderWord.split('');
        for(var i=0; i< this.currentWord.length; i++){
          if(this.currentWord[i] === guessedLetter){
            charArray[i] = guessedLetter;
          }
        }
        this.placeHolderWord = charArray.join('');

        if(!(this.placeHolderWord.includes(this.placeHolderCharacter))) {
            this.wins++;
            this.reset();
        }
      }
      else{
        this.remainingGuesses--;
        if(this.remainingGuesses === 0){
          this.reset();
        }
        else{
          this.lettersGuessed.push(guessedLetter);
        }
      }
      reWriteDocument();
    }
  }
};

hangMan.initialize();

function reWriteDocument(){
  winsText.textContent = hangMan.wins;
  currentWordText.textContent = hangMan.placeHolderWord.split('').join (" ");
  remainingGuessesText.textContent = hangMan.remainingGuesses;
  lettersGuessedText.textContent = hangMan.lettersGuessed.join(" ");
  console.log("placeHolderWord: " + hangMan.placeHolderWord);
}

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {
  // Determines which key was pressed.
  var guessedCharacter = event.key;
  console.log("guessedCharacter: " + guessedCharacter);

  // checks if the pressed key is an alphabet
  if( guessedCharacter.length == 1 && (/[a-z]/i.test(guessedCharacter)))
  {
    var guessedLetter = guessedCharacter.toUpperCase();
    console.log("guessedLetter: "+ guessedLetter);

    hangMan.evaluateUserInput(guessedLetter);
  }
}