var hangmanLifes = 5; //cate incercari are jucatorul
var nrLettersFound = 0;
var underlinedWord = "";
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //literele disponibile pt. gasirea cuvantului

//iau inputurile din HTML de la text si buton pt. cuvant si litera
var inputWord = document.getElementById("inputWord");
var inputLetter = document.getElementById("inputSearchLetter");
var buttonWord = document.getElementById("buttonWord");
var buttonLetter = document.getElementById("buttonLetter");

buttonWord.disabled = true; //dezactivez butonul de cuvant
buttonLetter.disabled = true; //dezactivez butonul de litera

inputWord.addEventListener("change", buttonHandle); //apelam functia cand inputul de la search word este schimbat, adica cand se adauga orice
function buttonHandle() {
  if (!(inputWord.value === "")) {
      buttonWord.disabled = false; //butonul de cuvant devine activ
  }
}

function addWordToHangman() {
  inputWord.disabled = true;
  buttonWord.disabled = true; //dezactivez butonul de cuvant, dupa ce s-a inserat deja un cuvant
  word = inputWord.value;
  for (var i = 0; i < word.length; ++i) {
    underlinedWord += "_";
  }
  document.getElementById("messageOnPage").innerHTML = underlinedWord + " (You have " + hangmanLifes + " more tries)";

  buttonLetter.disabled = false; // activez butonul de cautare a literelor, dupa ce s-a inserat cuvantul
}

function searchLettersInWord() {
  let letter = inputLetter.value;
  let found = "NO";
  if (alphabet.includes(letter)) {
    for (var i = 0; i < alphabet.length; ++i) {
      if (alphabet[i] == letter) {
          alphabet.splice(i, 1); //sterg litera, care s-a folosit, (se incepe de pe pozitia i si se sterge 1 element)
      }
    }
    for (var i = 0; i < word.length; ++i) { //parcurg literele cuvantului
      if (letter == word[i]) {
        found = "YES";
        ++nrLettersFound;

        String.prototype.replaceAt = function(index, replacement) {
          return this.substring(0, index) + replacement + this.substring(index + 1);
        } //se extrag caracterele de pe pozitia 0 pana pe pozitia 'index' (dar fara ea), apoi pe pozitia 'index' se pune noul caracterul, apoi se continua cu extragerea urmatorarelor caractere de pe pozitia 'index + 1' pana la sfarsit
        let guessingWord = underlinedWord.replaceAt(i, letter); //inlocuim caracterul, de pe pozitia i, cu caracterul letter
        underlinedWord = guessingWord; //pt. a nu se pierde literele gasite de dinainte
      }
    }
    if (found == "NO") { //daca nu s-a gasit nicio litera in cuvant
      --hangmanLifes;
    }
  } else {
    alert("You already tried this letter before, type a new one.");
  }
  if (nrLettersFound == word.length) { //win game
    alert("You won.");
    inputLetter.disabled = true; //dezactivez text-ul de cautare a literei
    buttonLetter.disabled = true; //dezactivez butonul de cautare a literei
  } else if (hangmanLifes == 0) { //lost game
    alert("You lost.\nThe word was: " + word + "\nHere, try again.");
    location.reload(); //refresh la pagina web
  }
  document.getElementById("messageOnPage").innerHTML = underlinedWord + " (You have " + hangmanLifes + " more tries)";
}
