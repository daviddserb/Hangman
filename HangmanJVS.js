var hangmanLifes = 14;
var nrLettersFound = 0;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function addWordToHangman() {
  word = document.getElementById("inputWord").value; //pt. ca nu ii dau un tip de date variabilei (in functia asta), se declara automat globala (deci o pot folosit si in alta functie)
  wordUnderlines = [];
  for (var i = 0; i < word.length; ++i) {
    wordUnderlines[i] = '_';
  }
  document.getElementById("messageOnPage").innerHTML=wordUnderlines + " (You have " + hangmanLifes + " more tries)";
}

function searchLettersInWord() {
  var letter = document.getElementById("inputSearchLetter").value;
  var found = "NO";
  if (alphabet.includes(letter)) {
    for (var i = 0; i < alphabet.length; ++i) {
      if (alphabet[i] == letter) {
          alphabet.splice(i, 1); //sterg litera folosita din alfabet
      }
    }
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
  } else {
    alert("You already tried this letter before, type a new one.");
  }
  if (nrLettersFound == word.length) { //win game
    alert("You won.")
  } else if (hangmanLifes == 0) { //lost game
    alert("You lost.");
  }
  document.getElementById("messageOnPage").innerHTML=wordUnderlines + " (You have " + hangmanLifes + " more tries)";
}
