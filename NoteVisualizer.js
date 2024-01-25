function generateNotes(){
    for (let i = 0; i <= 127; i++) {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.id = "note" + i;
        noteDiv.style.left = (0.78125 * i) + "vw";
        noteDiv.style.display = "none";
        noteDiv.style.background = "linear-gradient(to bottom, #141414, hsl(" + ((i / 127) * 225) + ", 100%, 50%))";

        document.getElementById("notes-container").appendChild(noteDiv);
    }
}

generateNotes();

function showNote(index) {
    document.getElementById("note" + index).style.display = "block";
    document.getElementById("note" + index).style.top = (170 - (10 * hideNoteSchedules[index])) + "vh";
    hideNoteSchedules[index]++;
}

hideNoteSchedules = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
function hideNote(index) {
    hideNoteSchedules[index]--;
    if(hideNoteSchedules[index] == 0 || true) {
        document.getElementById("note" + index).style.display = "none";
    }
}