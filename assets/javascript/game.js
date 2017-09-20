
var animalList = ['ALLIGATOR', 'BULLDOG', 'BUTTERFLY', 'CHEETAH', 'CHAMELEON', 'CHIMPANZEE', 'CROCODILE',
                'DALMATIAN', 'DONKEY'];
var wins = 0;
var lettersGuessed =[];
var remainingGuesses = 0;
var currentWord = '';
var guessBuffer = 5;
var placeHolderWord = ''; 

var winsText = document.getElementById("wins-count");
var currentWordText = document.getElementById("current-word");
var remainingGuessesText = document.getElementById("remaining-guesses");
var lettersGuessedText = document.getElementById("letters-guessed");

function getRandomAnimal(){
   return animalList[Math.floor(Math.random() * animalList.length)];
}

function reset()
{
  wins = 0;
  lettersGuessed = [];
  currentWord = getRandomAnimal();
  console.log("current word: " + currentWord);
  remainingGuesses = currentWord.length + guessBuffer;
  placeHolderWord =  "_".repeat(currentWord.length);

  wtiteToDocument();
}

function wtiteToDocument()
{
  winsText.textContent = wins;
  remainingGuessesText.textContent = remainingGuesses;
  lettersGuessedText.textContent = lettersGuessed.join(" ");
  currentWordText.textContent = placeHolderWord.split('').join (" ");
  console.log("placeHolderWord: " + placeHolderWord);
}

function getMatchingIndexesArray(letter){
  var indexArray = [];
  var index = currentWord.indexOf(letter);
  if(index !== -1 )
  {
    indexArray.push(index);
    while (index >= 0) {
      index = currentWord.indexOf(letter, index + 1);
      if(index !== -1)
      {
        indexArray.push(index);
      }
    }
  }
  
  console.log("index array: " + indexArray);
  return indexArray;
}

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

  // Determines which key was pressed.
  var guessedCharacter = event.key;
  console.log("guessedCharacter: " + guessedCharacter);

  // checks if the pressed key is an alphabet
  if(/[a-z]/i.test(guessedCharacter))
  {
     var guessedLetter = guessedCharacter.toUpperCase();
     console.log("guessedLetter: "+ guessedLetter);
     if(currentWord.includes(guessedLetter))
     {  
        var matchingIndexesArray = getMatchingIndexesArray(guessedLetter);
        var charArray = placeHolderWord.split('');
        for (var i=0; i<matchingIndexesArray.length; i++)
        {
          var index = matchingIndexesArray[i];
          console.log("index: " + index); 
          charArray[index] = guessedLetter;
        }
        placeHolderWord = charArray.join('');
     }
     else
     {
        lettersGuessed.push(guessedLetter);
        remainingGuesses--;
     }
     wtiteToDocument();
  }
}


