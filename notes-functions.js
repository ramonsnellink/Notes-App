// Check for existing saved data
const getSavedNotes = function () {
  const notesJSON = localStorage.getItem("notes");

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

const saveNotes = function (notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};

//remove a note from the list

const removeNote = function (id) {
  const noteIndex = notes.findIndex(function (note) {
    return note.id === id;
  });
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate the DOM structure for a Note
const generateNoteDom = function (note) {
  const noteEl = document.createElement("div");
  const textEl = document.createElement("a");
  const button = document.createElement("button");

  // maak button met text "x"
  button.textContent = "x";
  noteEl.appendChild(button);
  button.addEventListener("click", function () {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  // maak span met note text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed Note";
  }
  textEl.setAttribute("href", `./edit.html#${note.id}`);

  noteEl.appendChild(textEl);

  return noteEl;
};

// Render application notes
// render de lijst van notes. Hier voert hij de de array in, en het filters object.
//maak een nieuwe array met de gefilterede notes
// return alleen als de note .title include de data uit filters.searchText. Die dus geupdate wordt door de functie beneden in het document
//clear de div tijdens het typen
// voor elk array item, maar een nieuwe P met textContent van note.title

const renderNotes = function (notes, filters) {
  const filtereredNotes = notes.filter(function (note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  document.querySelector("#notes").innerHTML = "";
  filtereredNotes.forEach(function (note) {
    const noteEl = generateNoteDom(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};
