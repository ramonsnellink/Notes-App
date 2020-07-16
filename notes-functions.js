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

//Notes sorteren
const sortNotes = function (notes, sortBy) {
  if (sortBy === "byEdited") {
    // sort vergelijkt 2 items, a en b
    return notes.sort(function (a, b) {
      //check timestamps
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAlphabet") {
    return notes.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};
// Render application notes
// render de lijst van notes. Hier voert hij de de array in, en het filters object.
//maak een nieuwe array met de gefilterede notes
// return alleen als de note .title include de data uit filters.searchText. Die dus geupdate wordt door de functie beneden in het document
//clear de div tijdens het typen
// voor elk array item, maar een nieuwe P met textContent van note.title

const renderNotes = function (notes, filters) {
  notes = sortNotes(notes, filters.sortBy);
  const filtereredNotes = notes.filter(function (note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  document.querySelector("#notes").innerHTML = "";
  filtereredNotes.forEach(function (note) {
    const noteEl = generateNoteDom(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};

// Maak een Last edited bericht met timestamp geconverteerd naar xx tijd ago

const generateLastEdited = function (timestamp) {
  return `Last edited: ${moment(timestamp).fromNow()}`;
};
