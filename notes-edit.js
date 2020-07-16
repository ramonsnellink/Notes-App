// test

const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#remove-note");
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
//check of de hash overeenkomt met een ID van een individuele note
let note = notes.find(function (note) {
  return note.id === noteId;
});

// als note leeg is (dus niet true), dan stuur terug naar index.html
if (note === undefined) {
  location.assign("./index.html");
}

//Zet de value van de velden wat we hebben opgeslagen als note.title en note.body
titleElement.value = note.title;
bodyElement.value = note.body;

// Luister naar events en sla veranderingen op

titleElement.addEventListener("input", function (e) {
  note.title = e.target.value;
  saveNotes(notes);
});

bodyElement.addEventListener("input", function (e) {
  note.body = e.target.value;
  saveNotes(notes);
});

removeElement.addEventListener("click", function (e) {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("./index.html");
});

window.addEventListener("storage", function (e) {
  if (e.key === "notes") {
    //assign de nieuwe waarde en parse het
    notes = JSON.parse(e.newValue);
  }
  let note = notes.find(function (note) {
    return note.id === noteId;
  });

  // als note leeg is (dus niet true), dan stuur terug naar index.html
  if (note === undefined) {
    location.assign("./index.html");
  }

  //Zet de value van de velden wat we hebben opgeslagen als note.title en note.body
  titleElement.value = note.title;
  bodyElement.value = note.body;
});
