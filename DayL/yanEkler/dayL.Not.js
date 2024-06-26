document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("addButton");
    const noteModal = document.getElementById("noteModal");
    const closeModal = document.getElementsByClassName("close")[0];
    const saveNoteButton = document.getElementById("saveNoteButton");
    const modalTitle = document.getElementById("modalTitle");
    let isUpdating = false;
    let currentNote = null;

    addButton.addEventListener("click", function() {
        isUpdating = false;
        modalTitle.textContent = "Yeni Not Ekle";
        noteModal.style.display = "block";
        console.log(noteModal)
    });

    closeModal.addEventListener("click", function() {
        noteModal.style.display = "none";
        clearModalInputs();
    });

    window.addEventListener("click", function(event) {
        if (event.target == noteModal) {
            noteModal.style.display = "none";
            clearModalInputs();
        }
    });
// kaydetim
    saveNoteButton.addEventListener("click", function() {
        const noteTitle = document.getElementById("noteTitle").value;
        const noteContent = document.getElementById("noteContent").value;

        if (noteTitle && noteContent) {
            if (isUpdating && currentNote) {
                updateNote(currentNote, noteTitle, noteContent);
            } else {
                addNote(noteTitle, noteContent);
            }
            noteModal.style.display = "none";
            clearModalInputs();
        } else {
            alert("Lütfen başlık ve içerik giriniz.");
        }
    });

    function addNote(title, content) {
        const note = document.createElement("div");
        note.classList.add("note");

        const noteContentDiv = document.createElement("div");
        noteContentDiv.classList.add("note-content");

        //baslıgım
        const noteTitle = document.createElement("h3");
        noteTitle.textContent = title;
        noteContentDiv.appendChild(noteTitle);

        //not
        const noteContent = document.createElement("p");
        noteContent.textContent = content;
        noteContentDiv.appendChild(noteContent);

        //kaydedilen
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("note-buttons");

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-regular fa-trash-can fa-2xl" style="color: #ff0000;"></i>'; 
        deleteButton.classList.add("delete-button"); 
        deleteButton.addEventListener("click", function() {
            note.remove();
        });

        const updateButton = document.createElement("button");
        updateButton.innerHTML ='<i class="fa-solid fa-pencil fa-flip  fa-2xl" style="color: #7885ff;"></i>'
        updateButton.classList.add("update-button"); 
   
        
        updateButton.addEventListener("click", function() {
            isUpdating = true;
            currentNote = note;
            modalTitle.textContent = "Notu Güncelle";
            document.getElementById("noteTitle").value = title;
            document.getElementById("noteContent").value = content;
            noteModal.style.display = "block";
            
            
        });

        buttonsDiv.appendChild(updateButton);
       
        buttonsDiv.appendChild(deleteButton);

        note.appendChild(noteContentDiv);
        note.appendChild(buttonsDiv);

        document.getElementById("notes").appendChild(note);
    }

    function updateNote(note, title, content) {
        note.querySelector("h3").textContent = title;
        note.querySelector("p").textContent = content;
        currentNote = null;
        isUpdating = false;
    }

    function clearModalInputs() {
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteContent").value = "";
    }
});