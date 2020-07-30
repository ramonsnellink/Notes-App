"use strict";

// zet de data in localstorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  // check of er data is. Is de data incorrect? Maak dan een nieuwe array
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
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
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // maak span met note text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed Note";
  }

  textEl.classList.add("list-item__title");

  noteEl.appendChild(textEl);
  noteEl.setAttribute("href", `./edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

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
  const notesEl = document.querySelector("#notes");

  notes = sortNotes(notes, filters.sortBy);
  const filtereredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

  notesEl.innerHTML = "";

  if (filtereredNotes.length > 0) {
    filtereredNotes.forEach((note) => {
      const noteEl = generateNoteDom(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

// Maak een Last edited bericht met timestamp geconverteerd naar xx tijd ago

const generateLastEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`;
