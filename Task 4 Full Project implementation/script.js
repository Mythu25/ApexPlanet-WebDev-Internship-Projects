let notes = JSON.parse(localStorage.getItem("notes")) || [];

    document.getElementById("noteForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      const dueDate = document.getElementById("dueDate").value;
      const tags = document.getElementById("tags").value.split(",").map(t => t.trim());
      const category = document.getElementById("category").value;
      const pinned = document.getElementById("pinNote").checked;
      const createdAt = new Date().toISOString();

      const note = { title, content, dueDate, tags, category, pinned, createdAt };
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
      this.reset();
      displayNotes();
    });

    function displayNotes() {
      const filterValue = document.getElementById("filter").value;
      const container = document.getElementById("notesContainer");
      container.innerHTML = "";

      const sortedNotes = [...notes].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

      sortedNotes.forEach((note, index) => {
        if (filterValue !== "all" && note.category !== filterValue) return;

        const div = document.createElement("div");
        div.className = "note";
        if (note.pinned) div.classList.add("pinned");
        if (new Date(note.dueDate) < new Date()) div.classList.add("overdue");

        div.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <div class="meta">📅 Due: ${note.dueDate} | 🕒 Created: ${new Date(note.createdAt).toLocaleString()}</div>
          <div class="meta">🏷️ Tags: ${note.tags.join(", ") || "None"}</div>
          <div class="meta">📁 Category: ${note.category}</div>
          <button onclick="editNote(${index})">✏️ Edit</button>
          <button onclick="deleteNote(${index})">❌ Delete</button>
          <button onclick="downloadNote(${index})">📘 Download</button>
        `;
        container.appendChild(div);
      });
    }

    function deleteNote(index) {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      displayNotes();
    }

    function editNote(index) {
      const note = notes[index];
      document.getElementById("title").value = note.title;
      document.getElementById("content").value = note.content;
      document.getElementById("dueDate").value = note.dueDate;
      document.getElementById("tags").value = note.tags.join(", ");
      document.getElementById("category").value = note.category;
      document.getElementById("pinNote").checked = note.pinned;
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      displayNotes();
    }

    function downloadNote(index) {
      const note = notes[index];
      const content = `📌 ${note.title}\n📝 ${note.content}\n📅 Due: ${note.dueDate}\n🕒 Created: ${new Date(note.createdAt).toLocaleString()}\n🏷️ Tags: ${note.tags.join(", ")}\n📁 Category: ${note.category}`;
      const blob = new Blob([content], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${note.title}.txt`;
      a.click();
    }

    function searchNotes() {
      const query = document.getElementById("searchBar").value.toLowerCase();
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.join(",").toLowerCase().includes(query)
      );

      const container = document.getElementById("notesContainer");
      container.innerHTML = "";

      const sortedFiltered = [...filtered].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

      sortedFiltered.forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";
        if (note.pinned) div.classList.add("pinned");
        if (new Date(note.dueDate) < new Date()) div.classList.add("overdue");

        div.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <div class="meta">📅 Due: ${note.dueDate} | 🕒 Created: ${new Date(note.createdAt).toLocaleString()}</div>
          <div class="meta">🏷️ Tags: ${note.tags.join(", ") || "None"}</div>
          <div class="meta">📁 Category: ${note.category}</div>
          <button onclick="editNote(${index})">✏️ Edit</button>
          <button onclick="deleteNote(${index})">❌ Delete</button>
          <button onclick="downloadNote(${index})">📘 Download</button>
        `;
        container.appendChild(div);
      });
    }

    function exportNotes() {
      if (notes.length === 0) {
        alert("No notes to export.");
        return;
      }

      let txt = notes
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .map(note =>
          `📌 ${note.pinned ? "[PINNED] " : ""}${note.title}\n📝 ${note.content}\n📅 Due: ${note.dueDate}\n🕒 Created: ${new Date(note.createdAt).toLocaleString()}\n🏷️ Tags: ${note.tags.join(", ")}\n📁 Category: ${note.category}\n`
        ).join("\n");

      const blob = new Blob([txt], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "MyNotes.txt";
      a.click();
      URL.revokeObjectURL(url);
    }

    function toggleDarkMode() {
      document.body.classList.toggle("dark");
    }

    window.addEventListener("load", displayNotes);
  
