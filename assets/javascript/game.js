
// Variables to access the DOM elements
var winsText = document.getElementById("wins-count");
var currentWordText = document.getElementById("current-word");
var remainingGuessesText = document.getElementById("remaining-guesses");
var lettersGuessedText = document.getElementById("letters-guessed");
// var jungleImage = document.getElementById("jungle-img");
var imageDiv = document.getElementById("img-div");

// variables to hold the images/sound file urls
var imgBaseUrl = "assets/images/";
var tryAgainImgName = "try-again";
var imageExtension = ".jpg";
var winningSoundUrl = "assets/sounds/applause.mp3";
var oopsSoundUrl = "assets/sounds/oops.mp3";

// Main game object
var hangMan = {

  animalList: ['BUTTERFLY', 'CHEETAH', 'CHAMELEON', 'CHIMPANZEE', 'CROCODILE',
              'DALMATIAN', 'DONKEY', 'GIRAFFE', 'ZEBRA', 'ELEPHANT', 'PARROT'],
  
  currentWord: '',

  wins: 0,
  lettersGuessed: [],
  remainingGuesses: 0,
  placeHolderWord: '',

  guessBuffer: 5,
  placeHolderCharacter: '_',

  // Function to start the game 
  initialize: function() {
    this.reset();
    reWriteDocument();
  },

  // Resets all variables to initial state except the win variable.
  // This method is called after each win and lose to restart the game.
  reset: function(){
    this.lettersGuessed = [];
    this.currentWord = this.animalList[Math.floor(Math.random() * this.animalList.length)];
    this.remainingGuesses = this.currentWord.length + this.guessBuffer;
    this.placeHolderWord =  this.placeHolderCharacter.repeat(this.currentWord.length);

    console.log("current word: " + this.currentWord);
  },


  // This method evaluates user's input on each keyup and takes appropriate steps. 
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

        if(this.currentWord === this.placeHolderWord) {
            this.wins++;
            renderAnimalImage();
            playSound(winningSoundUrl);
            this.reset();
        }
      }
      else{
        this.remainingGuesses--;
        if(this.remainingGuesses === 0){
          renderImage(tryAgainImgName);
          playSound(oopsSoundUrl);
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

// Game starting point
hangMan.initialize();

// Methid to update the DOM element
function reWriteDocument(){
  winsText.textContent = hangMan.wins;
  currentWordText.textContent = hangMan.placeHolderWord.split('').join (" ");
  remainingGuessesText.textContent = hangMan.remainingGuesses;
  lettersGuessedText.textContent = hangMan.lettersGuessed.join(" ");
}

// Method to render image to DOM
function renderAnimalImage(){
  // All animal images are stored in the same name as the words in the animal list.
  // Appending current word with the base url in order to get the full image path.
  renderImage(hangMan.currentWord.toLowerCase());
}

function renderImage(imageName)
{
  var imgPath = imgBaseUrl + imageName + imageExtension;
  var newImg = document.createElement("img");
  newImg.setAttribute("src", imgPath);
  newImg.setAttribute("class", "thumbnail animal-image");
  imageDiv.innerHTML = "";
  imageDiv.appendChild(newImg);
}

// Method to play sound
function playSound(soundUrl){
  var audio = new Audio(soundUrl);
  audio.play();
}

// This method executes on each user input
document.onkeyup = function(event){
  
  // Determines which key was pressed.
  var guessedCharacter = event.key;
  console.log("user character: " + guessedCharacter);

  // Checks if the pressed key is a letter
  if( guessedCharacter.length == 1 && (/[a-z]/i.test(guessedCharacter)))
  {
    // Converting to uppercase. This is for an easy comparison with the computer generated words, 
    // which are stored in upper case letters.
    var guessedLetter = guessedCharacter.toUpperCase();
    hangMan.evaluateUserInput(guessedLetter);
  }
}