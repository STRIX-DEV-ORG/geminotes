/**
 * GeminotesManager class
 * Manages a collection of Geminote objects
 * 
 * @class GeminotesManager
 * 
 * @property {Geminote[]} notes - Array of notes
 * 
 * @method {Geminote[]} loadFromStorage - Load notes from local storage
 * @method {void} saveToStorage - Save notes to local storage
 * @method {Geminote} addNote - Add a new note
 * @method {boolean} editNote - Edit an existing note by ID
 * @method {void} deleteNote - Delete a note by ID
 * @method {Geminote[]} getAllNotes - Retrieve all notes
 * @method {Geminote|null} findNote - Find a note by ID or title
 * 
 * @example
 * const manager = new GeminotesManager();
 * const note = manager.addNote("Hello", "This is a test note");
 * manager.editNote(note.id, { content: "Updated content" });
 * console.log(manager.getAllNotes());
 * 
 */
class GeminotesManager {
    constructor() {
      this.notes = this.loadFromStorage(); // Load notes from local storage on initialization
    }
  
    // Load notes from local storage
    loadFromStorage() {
      const data = JSON.parse(localStorage.getItem('geminotes')) || [];
  
      // Convert JSON data back into Geminote instances
      return data.map(noteData => Geminote.fromJSON(noteData));
    }
  
    // Save notes to local storage
    saveToStorage() {
      const jsonData = this.notes.map(note => note.toJSON());
      
      localStorage.setItem('geminotes', JSON.stringify(jsonData));
    }
  
    /**
     * Add a new note to the collection
     * 
     * @param {string} title - The title of the note
     * @param {string} content - The content of the note
     * @param {string[]} tags - The tags associated with the note
     * 
     * @returns {Geminote} - The newly created note
     */
    addNote(title = "", content = "", tags = []) {
      const newNote = new Geminote(title, content, tags);
      
      this.notes.push(newNote);
      this.saveToStorage();
  
      return newNote;
    }
  
    /**
     * Edit an existing note by ID
     * 
     * @param {string} id - The ID of the note to edit
     * @param {object} updates - An object containing the fields to update
     * 
     * @returns {boolean} - True if the note was updated successfully, false otherwise
     */
    editNote(id, updates) {
      const note = this.findNote({ id });
      if (!note) return false;
  
      note.update(updates); // Update the note fields
      this.saveToStorage();
  
      return true;
    }
  
    /**
     * Delete a note by ID
     * 
     * @param {string} id - The ID of the note to delete
     */
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id);
  
      this.saveToStorage();
    }
  
    // Retrieve all notes
    getAllNotes() {
      return this.notes;
    }
  
    /**
     * Find a note by ID or title
     * 
     * @param {object} searchParams - The search parameters (either id or title)
     * @param {string} [searchParams.id] - The ID of the note to find
     * @param {string} [searchParams.title] - The title of the note to find
     * 
     * @returns {Geminote|null} - The matching note, or null if not found
     */
    findNote({ id, title }) {
      if (id) {
        return this.notes.find(note => note.id === id);
      }
  
      if (title) {
        return this.notes.find(note => note.title.toLowerCase() === title.toLowerCase());
      }
  
      return null;
    }
  }
  