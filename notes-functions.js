// Check for existing saved data
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  return notesJSON ? JSON.parse(notesJSON) : [];
};

const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

//remove a note from the list

const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate the DOM structure for a Note
const generateNoteDom = (note) => {
  const noteEl = document.createElement("div");
  const textEl = document.createElement("a");
  const button = document.createElement("button");

  // maak button met text "x"
  button.textContent = "x";
  noteEl.appendChild(button);
  button.addEventListener("click", () => {
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
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    // sort vergelijkt 2 items, a en b
    return notes.sort((a, b) => {
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
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAlphabet") {
    return notes.sort((a, b) => {
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

const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);
  const filtereredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
  document.querySelector("#notes").innerHTML = "";
  filtereredNotes.forEach((note) => {
    const noteEl = generateNoteDom(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};

// Maak een Last edited bericht met timestamp geconverteerd naar xx tijd ago

const generateLastEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`;
