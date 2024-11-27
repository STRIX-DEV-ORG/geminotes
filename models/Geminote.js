/**
 * Geminote model class
 * Represents a single note in the Geminote app.
 *
 * @class Geminote
 *
 * @property {string} id - Unique identifier for the note.
 * @property {string} title - The title of the note. Defaults to an empty string.
 * @property {string} content - The content of the note. Defaults to an empty string.
 * @property {string[]} tags - An array of tags associated with the note. Defaults to an empty array.
 * @property {Date} createdAt - The date and time when the note was created. Defaults to the current date and time.
 * @property {Date} updatedAt - The date and time when the note was last updated. Initially matches `createdAt`.
 *
 * @method {string} generateId - Generates a unique ID for the note.
 * @method {void} update - Updates the note's properties (title, content, tags) and the `updatedAt` timestamp.
 * @method {object} toJSON - Converts the note to a JSON-friendly format.
 * @static {Geminote} fromJSON - Recreates a `Geminote` object from JSON data.
 *
 * @example
 * // Create a new Geminote instance
 * const note = new Geminote("Hello, world!", "This is a test note.");
 * 
 * // Update the note's content
 * note.update({ content: "This is an updated note." });
 * 
 * // Convert the note to JSON
 * console.log(note.toJSON());
 * 
 * // Recreate a Geminote from JSON data
 * const jsonData = note.toJSON();
 * const recreatedNote = Geminote.fromJSON(jsonData);
 */
class Geminote {
  /**
   * Creates a new Geminote instance.
   * 
   * @param {string} [title=""] - The title of the note.
   * @param {string} [content=""] - The content of the note.
   * @param {string[]} [tags=[]] - An array of tags associated with the note.
   * @param {Date} [createdAt=new Date()] - The creation date of the note. Defaults to the current date.
   */
  constructor(title = "", content = "", tags = [], createdAt = new Date()) {
      this.id = this.generateId();
      this.title = title;
      this.content = content;
      this.tags = tags;
      this.createdAt = createdAt;
      this.updatedAt = createdAt;
  }

  /**
   * Generates a unique ID for the note.
   *
   * @returns {string} - A unique identifier for the note.
   */
  generateId() {
      return `geminote-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Updates the note's properties.
   *
   * @param {object} updates - An object containing the properties to update.
   * @param {string} [updates.title] - The new title of the note.
   * @param {string} [updates.content] - The new content of the note.
   * @param {string[]} [updates.tags] - The new tags for the note.
   */
  update({ title, content, tags }) {
      if (title !== undefined) this.title = title;
      if (content !== undefined) this.content = content;
      if (tags !== undefined) this.tags = tags;

      // Update the last modified timestamp
      this.updatedAt = new Date(); 
  }

  /**
   * Converts the note to a JSON-friendly format.
   *
   * @returns {object} - A JSON representation of the note.
   */
  toJSON() {
      return {
          id: this.id,
          title: this.title,
          content: this.content,
          tags: this.tags,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
      };
  }

  /**
   * Recreates a Geminote object from JSON data.
   *
   * @param {object} data - The JSON data representing the note.
   * @param {string} data.id - The unique identifier of the note.
   * @param {string} data.title - The title of the note.
   * @param {string} data.content - The content of the note.
   * @param {string[]} data.tags - The tags associated with the note.
   * @param {string|Date} data.createdAt - The creation date of the note.
   * @param {string|Date} data.updatedAt - The last update date of the note.
   * 
   * @returns {Geminote} - A new instance of `Geminote` based on the provided data.
   */
  static fromJSON(data) {
      const note = new Geminote(data.title, data.content, data.tags, new Date(data.createdAt));

      // Restore the unique ID and last modified timestamp
      note.id = data.id;
      note.updatedAt = new Date(data.updatedAt);
      
      return note;
  }
}
