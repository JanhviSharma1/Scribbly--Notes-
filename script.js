// Data Arrays
let activeNotes = [];
let archivedNotes = [];
let trashedNotes = [];
let currentEditIndex = null;
let currentView = "active";

// Modal Instance
const modal = new bootstrap.Modal(document.getElementById("noteModal"));

// Display Notes
function displayNotes() {
  // Show/Hide Sections Based on Current View
  document.getElementById("activeSection").style.display =
    currentView === "active" ? "block" : "none";
  document.getElementById("archiveSection").style.display =
    currentView === "archive" ? "block" : "none";
  document.getElementById("trashSection").style.display =
    currentView === "trash" ? "block" : "none";

  // Get the container for the current view
  let container =
    currentView === "active"
      ? document.getElementById("activeNotes")
      : currentView === "archive"
      ? document.getElementById("archivedNotes")
      : document.getElementById("trashedNotes");

  container.innerHTML = ""; // Clear existing notes

  let notesList =
    currentView === "active"
      ? activeNotes
      : currentView === "archive"
      ? archivedNotes
      : trashedNotes;

  // Render Notes
  notesList.forEach((note, index) => {
    let card = document.createElement("div");
    card.className = "note-card border p-3 rounded mb-3";

    card.innerHTML = `
      <h5>${note.title}</h5>
      <p>${note.description}</p>
      ${
        currentView === "active"
          ? `<button class="btn btn-secondary btn-sm me-2" onclick="editNote(${index})">Edit</button>
             <button class="btn btn-warning btn-sm me-2" onclick="archiveNote(${index})">Archive</button>
             <button class="btn btn-danger btn-sm" onclick="deleteNote(${index})">Delete</button>`
          : currentView === "archive"
          ? `<button class="btn btn-success btn-sm me-2" onclick="unarchiveNote(${index})">Unarchive</button>
             <button class="btn btn-secondary btn-sm me-2" onclick="editNoteInArchive(${index})">Edit</button>
             <button class="btn btn-danger btn-sm" onclick="deleteNoteFromArchive(${index})">Delete</button>`
          : `<button class="btn btn-success btn-sm me-2" onclick="restoreNoteFromTrash(${index})">Restore</button>
             <button class="btn btn-dark btn-sm" onclick="permanentlyDelete(${index})">Delete Permanently</button>`
      }
    `;

    container.appendChild(card);
  });
}

// Add/Edit Note
function saveNote() {
  const title = document.getElementById("noteTitle").value.trim();
  const description = document.getElementById("noteDescription").value.trim();

  if (!title || !description) {
    alert("Please fill in both fields.");
    return;
  }

  if (currentEditIndex === null) {
    // Add a new note
    activeNotes.unshift({ title, description });
  } else if (currentView === "active") {
    // Edit active note
    activeNotes[currentEditIndex] = { title, description };
  } else if (currentView === "archive") {
    // Edit archived note
    archivedNotes[currentEditIndex] = { title, description };
  }

  closeModal();
  displayNotes();
}

// Open Modal for New Note
function showModal() {
  currentEditIndex = null;
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteDescription").value = "";
  modal.show();
}

// Close Modal
function closeModal() {
  modal.hide();
}

// Edit Note (Active)
function editNote(index) {
  currentEditIndex = index;
  const note = activeNotes[index];
  document.getElementById("noteTitle").value = note.title;
  document.getElementById("noteDescription").value = note.description;
  modal.show();
}

// Edit Note (Archived)
function editNoteInArchive(index) {
  currentEditIndex = index;
  const note = archivedNotes[index];
  document.getElementById("noteTitle").value = note.title;
  document.getElementById("noteDescription").value = note.description;
  modal.show();
}

// Archive Note
function archiveNote(index) {
  const note = activeNotes.splice(index, 1)[0];
  archivedNotes.unshift(note);
  displayNotes();
}

// Unarchive Note
function unarchiveNote(index) {
  const note = archivedNotes.splice(index, 1)[0];
  activeNotes.unshift(note);
  displayNotes();
}

// Delete Note (Active)
function deleteNote(index) {
  const note = activeNotes.splice(index, 1)[0];
  trashedNotes.unshift(note);
  displayNotes();
}

// Delete Note (Archived)
function deleteNoteFromArchive(index) {
  const note = archivedNotes.splice(index, 1)[0];
  trashedNotes.unshift(note);
  displayNotes();
}

// Restore Note (Trash)
function restoreNoteFromTrash(index) {
  const note = trashedNotes.splice(index, 1)[0];
  activeNotes.unshift(note);
  displayNotes();
}

// Permanently Delete Note
function permanentlyDelete(index) {
  trashedNotes.splice(index, 1);
  displayNotes();
}

// Switch View
function switchView(view) {
  currentView = view;
  displayNotes();
}

// Predefined Colors for Notes (Peach Rose Palette)
const noteColors = [
  "#F7E5EC",
  "#EEBEC6",
  "#D28A8C",
  "#FFD9CC",
  "#FDBA90",
  "#F9D4B2",
];

// Function to Get a Random Color
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * noteColors.length);
  return noteColors[randomIndex];
}

// Display Notes Function with Colors
function displayNotes() {
  let container =
    currentView === "active"
      ? document.getElementById("activeNotes")
      : currentView === "archive"
      ? document.getElementById("archivedNotes")
      : document.getElementById("trashedNotes");

  container.innerHTML = ""; // Clear the existing notes

  let notesList =
    currentView === "active"
      ? activeNotes
      : currentView === "archive"
      ? archivedNotes
      : trashedNotes;

  notesList.forEach((note, index) => {
    let card = document.createElement("div");
    card.className = "note-card border p-3 rounded mb-3";
    card.style.backgroundColor = note.color || getRandomColor(); // Assign random color

    card.innerHTML = `
      <h5>${note.title}</h5>
      <p>${note.description}</p>
      ${
        currentView === "active"
          ? `<button class="btn btn-secondary btn-sm me-2" onclick="editNote(${index})">Edit</button>
             <button class="btn btn-warning btn-sm me-2" onclick="archiveNote(${index})">Archive</button>
             <button class="btn btn-danger btn-sm" onclick="deleteNote(${index})">Delete</button>`
          : currentView === "archive"
          ? `<button class="btn btn-success btn-sm me-2" onclick="unarchiveNote(${index})">Unarchive</button>
             <button class="btn btn-secondary btn-sm me-2" onclick="editNoteInArchive(${index})">Edit</button>
             <button class="btn btn-danger btn-sm" onclick="deleteNoteFromArchive(${index})">Delete</button>`
          : `<button class="btn btn-success btn-sm me-2" onclick="restoreNoteFromTrash(${index})">Restore</button>
             <button class="btn btn-dark btn-sm" onclick="permanentlyDelete(${index})">Delete Permanently</button>`
      }
    `;

    container.appendChild(card);
  });
}

// Save Note Logic (Ensure Color is Assigned)
function saveNote() {
  const title = document.getElementById("noteTitle").value.trim();
  const description = document.getElementById("noteDescription").value.trim();

  if (!title || !description) {
    alert("Please fill in both fields.");
    return;
  }

  if (currentEditIndex === null) {
    activeNotes.unshift({ title, description, color: getRandomColor() }); // Add new note with random color
  } else if (currentView === "active") {
    activeNotes[currentEditIndex] = {
      ...activeNotes[currentEditIndex],
      title,
      description,
    };
  } else if (currentView === "archive") {
    archivedNotes[currentEditIndex] = {
      ...archivedNotes[currentEditIndex],
      title,
      description,
    };
  }

  closeModal();
  displayNotes();
}

// Function to Switch Between Views (Active, Archive, Trash)
function switchView(view) {
  currentView = view; // Update current view

  // Get all sections
  const activeSection = document.getElementById("activeSection");
  const archiveSection = document.getElementById("archiveSection");
  const trashSection = document.getElementById("trashSection");

  // Toggle visibility based on the view
  if (view === "active") {
    activeSection.style.display = "block";
    archiveSection.style.display = "none";
    trashSection.style.display = "none";
  } else if (view === "archive") {
    activeSection.style.display = "none";
    archiveSection.style.display = "block";
    trashSection.style.display = "none";
  } else if (view === "trash") {
    activeSection.style.display = "none";
    archiveSection.style.display = "none";
    trashSection.style.display = "block";
  }

  // Update the notes displayed in the selected section
  displayNotes();
}

// Initial call to set the default view
switchView("active");

// Initialize
displayNotes();
