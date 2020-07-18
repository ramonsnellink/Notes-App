//Leeg object waar je de input in opslaat
let notes = getSavedNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited",
};
// render in ieder geval 1 keer de notes array
renderNotes(notes, filters);

// Selecter de input, luister naar input en geef dat een parameter van e
// assign het event aan het filters.searchText object.
// render de notes array opnieuw maar dan gefiltered, tijdens het typen.
const timestamp = moment().valueOf();

document.querySelector("#create-note").addEventListener("click", (e) => {
  const id = uuidv4();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  saveNotes(notes);
  location.assign(`./edit.html#${id}`);
});
document.querySelector("#searchtext").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
// Add createdAt and updatedAt to the new notes (story timestamp)
// update updatedAt when someone edits a title or body
// delete all old notes before testing
