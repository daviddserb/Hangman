var hangmanLifes = 3; //cate incercari are jucatorul
var nrLettersFound = 0;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //literele disponibile

//iau inputurile din HTML de la text si buton pt. cuvant si litera
inputWord = document.getElementById("inputWord");
inputLetter = document.getElementById("inputSearchLetter");
buttonWord = document.getElementById("buttonWord");
buttonLetter = document.getElementById("buttonLetter");

buttonWord.disabled = true; //dezactivez butonul de cuvant
buttonLetter.disabled = true; //dezactivez butonul de litera

inputWord.addEventListener("change", buttonHandle); //?
function buttonHandle() {
  if (!(inputWord.value === "")) {
      buttonWord.disabled = false; //butonul de cuvant devine activ
  }
}

function addWordToHangman() {
  inputWord.disabled = true;
  buttonWord.disabled = true; //dezactivez butonul de cuvant, dupa ce s-a inserat deja un cuvant
  wordValue = inputWord.value;
  wordUnderlines = []; //pt. ca nu ii dau un tip de date variabilei (in aceasta functie), se declara automat globala (deci o pot folosit si in alta functie)
  for (var i = 0; i < wordValue.length; ++i) {
    wordUnderlines[i] = '_';
  }
  document.getElementById("messageOnPage").innerHTML=wordUnderlines + " (You have " + hangmanLifes + " more tries)";

  buttonLetter.disabled = false; // activez butonul de cautare a literelor, dupa ce s-a inserat cuvantul
}

function searchLettersInWord() {
  var letter = inputLetter.value;
  var found = "NO";
  if (alphabet.includes(letter)) {
    for (var i = 0; i < alphabet.length; ++i) {
      if (alphabet[i] == letter) {
          alphabet.splice(i, 1); //sterg litera (de pe pozitia i), care s-a folosit, din alfabet (si 1 reprezinta cate litere sa sterg)
      }
    }
    for (var i = 0; i < wordValue.length; ++i) { //parcurg literele cuvantului
      if (letter == wordValue[i]) {
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
  if (nrLettersFound == wordValue.length) { //win game
    alert("You won.");
    location.reload(); //refresh la pagina web
  } else if (hangmanLifes == 0) { //lost game
    alert("You lost. The word was: " + wordValue);
    location.reload(); //refresh la pagina web
  }
  document.getElementById("messageOnPage").innerHTML=wordUnderlines + " (You have " + hangmanLifes + " more tries)";
}
