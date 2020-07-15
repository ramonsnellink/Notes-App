//Leeg object waar je de input in opslaat
let notes = getSavedNotes();

const filters = {
  searchText: "",
};
// render in ieder geval 1 keer de notes array
renderNotes(notes, filters);

// Selecter de input, luister naar input en geef dat een parameter van e
// assign het event aan het filters.searchText object.
// render de notes array opnieuw maar dan gefiltered, tijdens het typen.

document.querySelector("#create-note").addEventListener("click", function (e) {
  const id = uuidv4();
  notes.push({
    id: id,
    title: "",
    body: "",
  });
  saveNotes(notes);
  location.assign(`./edit.html#${id}`);
});
document.querySelector("#searchtext").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", function (e) {
  console.log(e.target.value);
});

window.addEventListener("storage", function (e) {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});

const now = moment();
now.subtract(1, "week").subtract(20, "days");
console.log(now.format("MMMM Qo, YYYY"));
console.log(now.fromNow());
const nowTimestamp = now.valueOf();
console.log(nowTimestamp);

console.log(moment(nowTimestamp).toString());
// November 3rd, 2003
