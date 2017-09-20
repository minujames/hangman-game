
var animalList = ['ALLIGATOR', 'BULLDOG', 'BUTTERFLY', 'CHEETAH', 'CHAMELEON', 'CHIMPANZEE', 'CROCODILE',
                'DALMATIAN', 'DONKEY'];

var currentWord = '';

var wins = 0;
var lettersGuessed =[];
var remainingGuesses = 0;
var placeHolderWord = ''; 

var guessBuffer = 5;
var placeHolderCharacter = '_';

var winsText = document.getElementById("wins-count");
var currentWordText = document.getElementById("current-word");
var remainingGuessesText = document.getElementById("remaining-guesses");
var lettersGuessedText = document.getElementById("letters-guessed");

function initialize()
{
  reset();
  writeToDocument();
}

function reset()
{
  lettersGuessed = [];
  currentWord = getRandomAnimal();
  remainingGuesses = currentWord.length + guessBuffer;
  placeHolderWord =  placeHolderCharacter.repeat(currentWord.length);

  console.log("current word: " + currentWord);
}

function writeToDocument()
{
  winsText.textContent = wins;
  remainingGuessesText.textContent = remainingGuesses;
  lettersGuessedText.textContent = lettersGuessed.join(" ");
  currentWordText.textContent = placeHolderWord.split('').join (" ");
  console.log("placeHolderWord: " + placeHolderWord);
}

function getRandomAnimal(){
   return animalList[Math.floor(Math.random() * animalList.length)];
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
document.onkeyup = function(event) 
{
  // Determines which key was pressed.
  var guessedCharacter = event.key;
  console.log("guessedCharacter: " + guessedCharacter);

  // checks if the pressed key is an alphabet
  if( guessedCharacter.length == 1 && (/[a-z]/i.test(guessedCharacter)))
  {
    var guessedLetter = guessedCharacter.toUpperCase();
    console.log("guessedLetter: "+ guessedLetter);
    if(lettersGuessed.indexOf(guessedLetter) == -1)
    {
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
        if(!(placeHolderWord.includes(placeHolderCharacter)))
        {
            wins++;
            reset();
        }
      }
      else
      {
        remainingGuesses--;
        if(remainingGuesses == 0)
        {
          reset();
        }
        else
        {
          lettersGuessed.push(guessedLetter);
        }
      }
      writeToDocument();
    }
  }
}


