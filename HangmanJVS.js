var hangmanLifes = 14;
var nrLettersFound = 0;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
alert(alphabet);

function addWordToHangman() {
  word = document.getElementById("inputWord").value; //pt. ca nu ii dau un tip de date variabilei, se declara automat globala
  wordUnderlines = [];
  for (var i = 0; i < word.length; ++i) {
    wordUnderlines[i] = '_';
  }
  document.getElementById("messageOnPage").innerHTML=wordUnderlines;
}

function searchLettersInWord() {
  var letter = document.getElementById("inputSearchLetter").value;
  var found = "NO";
  for (var i = 0; i < word.length; ++i) { //parcurg literele cuvantului
    if (letter == word[i]) {
      ++nrLettersFound;
      found = "YES";
      wordUnderlines[i] = letter;
    }
  }
  if (found == "NO") { //daca nu s-a gasit nicio litera in cuvant
    --hangmanLifes;
  }
  if (nrLettersFound == word.length) { //win game
    alert("You guessed the word!")
  } else if (hangmanLifes == 0) { //lost game
    alert("You didn't guess it.");
  }
  document.getElementById("messageOnPage").innerHTML=wordUnderlines + " (" + hangmanLifes + " more tries)";
}